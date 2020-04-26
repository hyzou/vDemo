<template>
  <div class="dialog_root">
    <el-tabs v-model="activeName" type="card" @tab-click="doActive">
      <el-tab-pane label="计划信息" name="first">
        <planMarketMsg
          ref="planMarketMsg"
          class="height600"
          :selectedQasPlanId="qasPlanId"
          :disabledParam="disabledParam"
        ></planMarketMsg>
        <el-button class="step_btn" @click="planOver">
          关闭
        </el-button>
        <el-button type="primary" class="step_btn" @click="step2">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="second" :disabled="tabs2_act">
        <planMarketTask
          ref="planMarketTask"
          class="height600"
          :selectedQasPlanId="qasPlanId"
          :disabledParam="disabledParam"
        ></planMarketTask>
        <el-button class="step_btn" @click="planOver">
          关闭
        </el-button>
        <el-button type="primary" class="step_btn" @click="step3">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="检验指标管理" name="third" :disabled="tabs3_act">
        <div class="plan_from height600">
          <qaCheckItem
            ref="qaCheckItem"
            :selectedQasPlanId="qasPlanId"
            :disabledParam="disabledParam"
          ></qaCheckItem>
        </div>
        <el-button class="step_btn" @click="planOver">
          关闭
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import planMarketMsg from "./planMarketMsg";
import planMarketTask from "./planMarketTask";
import qaCheckItem from "../../common/qaCheckItem";
export default {
  name: "planMarketDetail",
  data() {
    return {
      activeName: "first",
      tabs2_act: false,
      tabs3_act: false,
      qasPlanId: 0, //计划id
      disabledParam: true
    };
  },
  components: {
    planMarketMsg,
    planMarketTask,
    qaCheckItem
  },
  methods: {
    step2() {
      this.tabs2_act = false;
      this.activeName = "second";
    },
    step3() {
      this.tabs3_act = false;
      this.activeName = "third";
    },
    planOver() {
      this.$emit("closeDialog", this.$constants.LINK_MARKET);
    },

    finTask(vm) {
      vm.$refs.planMarketTask.init();
    },
    findQasPlanVo() {
      const $this = this;
      //加载数据
      this.$get({
        url: "/_data/task/plan/findQasPlan",
        fnc: data => {
          if (data.success && data.data) {
            let resurtData = data.data;
            let planMsg = $this.$refs.planMarketMsg;
            //给platForm赋值
            resurtData.fileList = [];
            planMsg.planForm = resurtData;
            planMsg.planForm.fileList = [];
            //直接绑定到planForm的内容再次选择不回显 没有触发onchange时间  所以使用这种方法
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
            $this.finTask($this);
          }
        },
        param: { qasPlanId: this.qasPlanId }
      });
    },
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

<style scoped></style>
