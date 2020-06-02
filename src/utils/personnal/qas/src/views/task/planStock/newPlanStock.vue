<template>
  <div class="dialog_root">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="计划信息" name="first">
        <planStockMsg ref="planStockMsg" class="height600"></planStockMsg>
        <el-button type="primary" class="step_btn" @click="step2">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="second" :disabled="tabs2_act">
        <plan-stock-task
          ref="planStockTask"
          class="height600"
          :selectedQasPlanId="qasPlanId"
        ></plan-stock-task>
        <el-button type="primary" class="step_btn" @click="step3">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="检验指标管理" name="third" :disabled="tabs3_act">
        <qaCheckItem
          ref="qaCheckItem"
          :selectedQasPlanId="qasPlanId"
          class="height600"
        ></qaCheckItem>
        <el-button type="primary" class="step_btn" @click="planOver">
          完成
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import planStockMsg from "./planStockMsg";
import planStockTask from "./planStockTask";
import qaCheckItem from "../../common/qaCheckItem";

export default {
  name: "newPlanStock",
  data() {
    return {
      activeName: "first",
      tabs2_act: true,
      tabs3_act: true,
      qasPlanId: 0 //计划id
    };
  },
  components: {
    planStockMsg,
    planStockTask,
    qaCheckItem
  },
  methods: {
    step2() {
      const $this = this;
      //执行校验
      this.$refs.planStockMsg.$refs["stockPlanForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        let uploadForm = new FormData();
        if ($this.qasPlanId && $this.qasPlanId > 0) {
          uploadForm.append("qasPlanId", $this.qasPlanId);
        }
        uploadForm.append("link", this.$constants.LINK_STOCK);
        //获取计划信息
        $this.$refs.planStockMsg.$refs["stockPlanForm"].fields.map(filed => {
          if (filed.labelFor != "viewfiles" && filed.labelFor != "flowComments")
            uploadForm.append(filed.labelFor, filed.fieldValue);
        });
        if (
          $this.$refs.planStockMsg.planForm.stdSuitsArray &&
          $this.$refs.planStockMsg.planForm.stdSuitsArray.length > 0
        ) {
          uploadForm.append(
            "stdSuits",
            $this.$refs.planStockMsg.planForm.stdSuitsArray.join(",")
          );
        }
        //产品信息
        //产品信息参数名
        let sampleRequestArray =
          $this.$refs.planStockMsg.planForm.sampleRequest;
        if (sampleRequestArray) {
          for (let index in sampleRequestArray) {
            /*product,grainbreedId,samplingRequire, sampleWeight, sampleCopyNum, requiredGrade*/
            let sampleRequestObject = sampleRequestArray[index];
            //产品信息处理
            uploadForm.append(
              "sampleRequest[" + index + "].productName",
              sampleRequestObject.productName
            );
            uploadForm.append(
              "sampleRequest[" + index + "].grainbreedId",
              sampleRequestObject.grainbreedId
            );

            if (sampleRequestObject.samplingRequire) {
              uploadForm.append(
                "sampleRequest[" + index + "].samplingRequire",
                sampleRequestObject.samplingRequire
              );
            }
            if (sampleRequestObject.sampleWeight) {
              uploadForm.append(
                "sampleRequest[" + index + "].sampleWeight",
                sampleRequestObject.sampleWeight
              );
            }
            uploadForm.append(
              "sampleRequest[" + index + "].sampleCopyNum",
              sampleRequestObject.sampleCopyNum
            );
            if (sampleRequestObject.requiredGradeList) {
              uploadForm.append(
                "sampleRequest[" + index + "].requiredGradeList",
                sampleRequestObject.requiredGradeList
              );
            }
          }
        }
        //附件
        let up_strName = "fileList";
        if ($this.$refs.planStockMsg.planForm.fileList.length > 0) {
          for (
            var i = 0;
            i < $this.$refs.planStockMsg.planForm.fileList.length;
            i++
          ) {
            uploadForm.append(
              up_strName,
              $this.$refs.planStockMsg.planForm.fileList[i].raw
            );
          }
        } else {
          if (uploadForm.has(up_strName)) uploadForm.delete(up_strName);
        }
        $this.submitPlan(uploadForm);
      });
    },
    step3() {
      this.tabs3_act = false;
      this.activeName = "third";
      this.$emit(this.$constants.EMIT_TRANSFRELOADDATA, "Y");
    },
    planOver() {
      const $this = this;
      this.$post({
        url: "/_data/task/plan/checkPublishDT",
        param: {
          qasPlanId: this.qasPlanId,
          publishDtStr: this.$refs.planStockMsg.planForm.publishDtStr
        },
        fnc: data => {
          $this.$emit("closeDialog", "all");
        }
      });
    },
    submitPlan(formData) {
      //获取任务信息
      const $this = this;
      this.$post({
        url:
          this.qasPlanId && this.qasPlanId > 0
            ? "/_data/task/plan/updatePlan"
            : "/_data/task/plan/insertPlan",
        param: formData,
        fnc: data => {
          if (!data.success) {
            this.$notify({
              type: "warning",
              title: "提示",
              message: data.msg,
              duration: 5000,
              offset: 100
            });
            return false;
          }
          if (data.data && (!this.qasPlanId || this.qasPlanId === 0)) {
            this.qasPlanId = data.data;
          }
          this.tabs2_act = false;
          this.activeName = "second";
          this.finTask($this);
          //通知父页面刷新列表
          this.$emit(this.$constants.EMIT_TRANSFRELOADDATA, "Y");
        }
      });
    },
    finTask(vm) {
      vm.$refs.planStockTask.init();
    },
    doActive() {
      if (this.activeName === "third") {
        if (this.qasPlanId > 0) {
          this.$refs.qaCheckItem.findRequestGrainBreed();
        }
      }
    }
  },
  mounted() {
    //设置当前登录用户的单位
    let userInfo = this.$store.getters.get_userInfo;
    let orgName = userInfo && userInfo.orgName ? userInfo.orgName : "";
    this.$refs.planStockMsg.planForm.entrustOrg = orgName;
    this.$refs.planStockMsg.titleCreate();
  }
};
</script>
