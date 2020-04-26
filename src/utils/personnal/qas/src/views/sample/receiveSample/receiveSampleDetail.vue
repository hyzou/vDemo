<template>
  <div>
    <!-- 内容 -->
    <el-form
      :model="sampleObject"
      :rules="sampleObjectrules"
      label-width="110px"
      :inline="true"
      ref="sampleForm"
    >
      <el-form-item label="样品名称:">
        <el-input
          placeholder="样品名称"
          v-model="sampleObject.name"
          :disabled="true"
          class="dialog_input"
        ></el-input>
      </el-form-item>
      <el-form-item label="扦样环节:">
        <el-input
          placeholder="扦样环节"
          v-model="sampleObject.link__dsp"
          :disabled="true"
          class="dialog_input"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label="样品编号:">
        <el-input
          placeholder="样品编号"
          v-model="sampleObject.code"
          :disabled="true"
          class="dialog_input"
        ></el-input>
      </el-form-item>
      <el-form-item label="样品用途:">
        <el-input
          placeholder="样品用途"
          v-model="sampleObject.isBackup__dsp"
          :disabled="true"
          class="dialog_input"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label="检测编号:" prop="testCode">
        <el-input
          placeholder="检测编号"
          v-model="sampleObject.testCode"
          class="dialog_input"
        ></el-input>
      </el-form-item>
      <el-form-item label="收样时间:">
        <el-date-picker
          v-model="sampleObject.receiveDt"
          type="date"
          value-format="yyyy-MM-dd"
          class="dialog_input"
          placeholder="选择日期"
          :clearable="false"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <br />
      <el-form-item label="收样人:">
        <el-input
          placeholder="收样人"
          v-model="sampleObject.receiveBy"
          :disabled="true"
          class="dialog_input"
        ></el-input>
      </el-form-item>
      <el-form-item label="要求检测单位:">
        <el-input
          placeholder="要求检测单位"
          v-model="sampleObject.qaOrgName"
          :disabled="true"
          class="dialog_input"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <el-button @click="showSampleDetail">查看详细信息</el-button>
    <el-button class="step_btn" @click="closeReceiveSample">关闭</el-button>
    <el-button type="primary" class="step_btn" @click="receiveSample"
      >保存</el-button
    >

    <!-- 样品详情弹框内容 -->
    <el-dialog
      :close-on-click-modal="false"
      title="样品详情"
      :visible.sync="sampleDetailShow"
      v-if="sampleDetailShow"
      :width="$constants.dialog_width"
      :top="$constants.dialog_margin_top"
      :append-to-body="true"
    >
      <!-- 详情组件内容 -->
      <sample-reap-detail
        :qasSampleId="sampleObject.qasSampleId"
        v-if="sampleReapDetailShow"
      ></sample-reap-detail>
      <sampleStockDetail
        :qasSampleId="sampleObject.qasSampleId"
        v-if="sampleStockDetailShow"
      ></sampleStockDetail>
      <sampleMarketDetail
        :qasSampleId="sampleObject.qasSampleId"
        v-if="sampleMarketDetailShow"
      ></sampleMarketDetail>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sampleDetailShow = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sampleReapDetail from "./sampleReapDetail";
import sampleStockDetail from "./sampleStockDetail";
import sampleMarketDetail from "./sampleMarketDetail";
export default {
  name: "receiveSampleDetail",
  data() {
    return {
      sampleObjectrules: {
        testCode: { required: true, message: "不得为空", trigger: "change" }
      },
      sampleObject: {
        qasSampleId: 0
      },
      sampleDetailShow: false,
      sampleReapDetailShow: false,
      sampleStockDetailShow: false,
      sampleMarketDetailShow: false,
      pickerOptions: {
        disabledDate(time) {
          let time1 = time.toLocaleDateString().replace(/\//g, "-");
          let time1Array = time1.split("-");
          time1Array[1] =
            time1Array[1] > 9 ? time1Array[1] : "0" + time1Array[1];
          time1Array[2] =
            time1Array[2] > 9 ? time1Array[2] : "0" + time1Array[2];
          time1 = time1Array.join("-");
          let time2 = new Date().toLocaleDateString().replace(/\//g, "-");
          let time2Array = time2.split("-");
          time2Array[1] =
            time2Array[1] > 9 ? time2Array[1] : "0" + time2Array[1];
          time2Array[2] =
            time2Array[2] > 9 ? time2Array[2] : "0" + time2Array[2];
          time2 = time2Array.join("-");
          return time1 < time2;
        }
      }
    };
  },
  components: {
    sampleReapDetail: sampleReapDetail,
    sampleStockDetail: sampleStockDetail,
    sampleMarketDetail: sampleMarketDetail
  },
  methods: {
    //收样功能
    receiveSample() {
      this.$refs["sampleForm"].validate(valid => {
        if (valid) {
          const $this = this;
          //先执行校验
          $this.$post({
            url: "/_data/sample/sample/validateQaOrgz",
            param: { qasSampleId: $this.sampleObject.qasSampleId },
            fnc: data => {
              if (!data.success) {
                //校验失败
                $this
                  .$confirm(
                    "系统检测到样品要求的检测单位与你的单位信息不一致，是否继续收样？",
                    "提示",
                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning"
                    }
                  )
                  .then(() => {
                    //点击确定  执行
                    $this.validateSample($this);
                  });
                return false;
              }
              //校验成功
              //校验是否是备样
              $this.validateSample($this);
            }
          });
        }
      });
    },
    validateSample(vm) {
      this.$post({
        url: "/_data/sample/sample/validateSample",
        param: { qasSampleId: this.sampleObject.qasSampleId },
        fnc: data => {
          if (!data.success) {
            //校验失败
            this.$confirm(
              "检测已经存在一份[在检/已检]样，是否作废原来的检测样？",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            ).then(() => {
              vm.sampleObject.cancelFlag = "Y"; //作废原来的检测样
              //点击确定  执行
              vm.doSample(vm);
            });
            return false;
          }
          //校验成功--不是备样
          //执行收样
          vm.doSample(vm);
        }
      });
    },
    doSample(vm) {
      vm.$post({
        url: "/_data/sample/sample/receiveSample",
        param: vm.sampleObject,
        fnc: data => {
          if (!data.success) {
            vm.$message({
              type: "warn",
              message: "收样失败"
            });
            console.log(data.msg);
            return false;
          }
          vm.$emit("successfulReceive", "Y");
        }
      });
    },
    showSampleDetail() {
      if (this.sampleObject.qasSampleId == 0) {
        return false;
      }
      this.sampleDetailShow = true;
      this.sampleReapDetailShow = false;
      this.sampleStockDetailShow = false;
      this.sampleMarketDetailShow = false;
      if (this.sampleObject.link == this.$constants.LINK_REAP) {
        this.sampleReapDetailShow = true;
      } else if (this.sampleObject.link == this.$constants.LINK_STOCK) {
        this.sampleStockDetailShow = true;
      } else if (this.sampleObject.link == this.$constants.LINK_MARKET) {
        this.sampleMarketDetailShow = true;
      }
    },
    closeReceiveSample() {
      this.$emit("closeReceive", "Y");
    }
  },
  props: {
    sampleDataObject: {
      type: Object
    }
  },
  watch: {
    sampleDataObject: {
      handler(val) {
        this.sampleObject = val;
        this.sampleObject.receiveDt = "";
      },
      immediate: true
    }
  }
};
</script>
