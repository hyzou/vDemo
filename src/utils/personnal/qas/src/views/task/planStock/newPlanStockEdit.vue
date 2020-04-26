<template>
  <div class="dialog_root">
    <el-tabs v-model="activeName" type="card" @tab-click="doActive">
      <el-tab-pane label="计划信息" name="first">
        <planStockMsg
          ref="planStockMsg"
          class="height600"
          :selectedQasPlanId="qasPlanId"
        ></planStockMsg>
        <el-button type="primary" class="step_btn" @click="step2">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="second">
        <planStockTask
          ref="planStockTask"
          :selectedQasPlanId="qasPlanId"
          class="height600"
        ></planStockTask>
        <el-button type="primary" class="step_btn" @click="step3">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="检验指标管理" name="third">
        <div class="plan_from height600">
          <qaCheckItem
            ref="qaCheckItem"
            :selectedQasPlanId="qasPlanId"
          ></qaCheckItem>
        </div>
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
  name: "newPlanStockEdit",
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
        uploadForm.append("link", this.$constants.LINK_STOCK);
        uploadForm.append("qasPlanId", this.qasPlanId);
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
              "sampleRequest[" + index + "].qasPlanSampleRequestId",
              sampleRequestObject.qasPlanSampleRequestId
            );
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
            if (sampleRequestObject.requiredGrade) {
              uploadForm.append(
                "sampleRequest[" + index + "].requiredGrade",
                sampleRequestObject.requiredGrade
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
          $this.$emit("closeDialog", this.$constants.LINK_STOCK);
        }
      });
    },

    submitPlan(formData) {
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
          //通知父页面刷新列表
          this.$emit(this.$constants.EMIT_TRANSFRELOADDATA, "Y");
        }
      });
    },
    findQasPlanVo() {
      const $this = this;
      //加载数据
      this.$get({
        url: "/_data/task/plan/findQasPlan",
        fnc: data => {
          if (data.success && data.data) {
            let resurtData = data.data;
            let planMsg = $this.$refs.planStockMsg;
            //给platForm赋值
            resurtData.fileList = [];
            planMsg.planForm = resurtData;
            planMsg.planForm.fileList = [];
            //直接绑定到planForm的内容再次选择不回显 没有触发onchange时间  所以使用这种方法
            planMsg.$set(
              planMsg.planForm,
              "isTimingSent",
              resurtData.isTimingSent
            );
            planMsg.$set(
              planMsg.planForm,
              "stdSuitsArray",
              resurtData.stdSuitsList
            );
            planMsg.$set(
              planMsg.planForm,
              "startDtStr",
              $this.$dateUtl.getTime(resurtData.startDt)
            );
            planMsg.$set(
              planMsg.planForm,
              "publishDtStr",
              $this.$dateUtl.getTime(resurtData.publishDt)
            );
            planMsg.$set(
              planMsg.planForm,
              "deadlineDtStr",
              $this.$dateUtl.getTime(resurtData.deadlineDt)
            );
            //根据产品 设置品种的选项
            for (let index in planMsg.planForm.sampleRequest) {
              let samleRequest = planMsg.planForm.sampleRequest[index];
              if (planMsg.planForm.sampleRequest.length > 1) {
                planMsg.planForm.sampleRequest[index].action = "删除";
              }
              planMsg.products.map(p => {
                if (
                  samleRequest.productId == p.id &&
                  p.children &&
                  p.children.length
                ) {
                  planMsg.grainBreed[index] = p.children;
                }
              });
            }

            //获取任务信息
            $this.findTaskMsg($this);
            // $this.findPlanFiles($this);
          }
        },
        param: { qasPlanId: this.qasPlanId }
      });
    },
    findTaskMsg(vm) {
      vm.$refs.planStockTask.init();
    },
    /*findPlanFiles(vm) {
      vm.$refs.planStockMsg.findPlanFiles();
    },*/
    doActive() {
      if (this.activeName === "third") {
        if (this.qasPlanId > 0) {
          this.$refs.qaCheckItem.findRequestGrainBreed();
        }
      }
    }
  },
  created() {
    if (this.qasPlanId > 0) {
      this.findQasPlanVo();
    }
  },
  watch: {
    selectedQasPlanId: {
      handler(newVal) {
        this.qasPlanId = newVal;
      },
      immediate: true
    }
  },
  props: {
    selectedQasPlanId: {
      type: Number,
      default: 0
    }
  }
};
</script>
