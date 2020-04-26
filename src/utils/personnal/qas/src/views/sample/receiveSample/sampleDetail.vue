<!-- 样品详情 -->
<template>
  <div style="height: 220px">
    <el-form
      label-width="210px"
      v-model="sampleForm"
      :inline="true"
      ref="sampleInfoForm"
    >
      <el-form-item label="样品编号:">
        <el-input
          placeholder=""
          v-model="sampleForm.sampleInfo.code"
          :disabled="true"
          class="dialog_input fontMainBlack"
        ></el-input>
      </el-form-item>
      <el-form-item label="样品名称:">
        <el-input
          placeholder=""
          v-model="sampleForm.sampleInfo.name"
          :disabled="true"
          class="dialog_input fontMainBlack"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品品种:">
        <el-input
          placeholder=""
          v-model="sampleForm.sampleInfo.product"
          :disabled="true"
          class="dialog_input fontMainBlack"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label="计划性质:">
        <el-input
          placeholder=""
          v-model="sampleForm.sampleInfo.nature__dsp"
          :disabled="true"
          class="dialog_input fontMainBlack"
        ></el-input>
      </el-form-item>
      <el-form-item label="样品重量(公斤):">
        <el-input
          placeholder=""
          v-model="sampleForm.sampleInfo.weight"
          :disabled="true"
          class="dialog_input fontMainBlack"
        ></el-input>
      </el-form-item>
      <el-form-item label="样品份数:">
        <el-input
          placeholder=""
          v-model="sampleForm.sampleInfo.sampleCopyNum"
          :disabled="true"
          class="dialog_input fontMainBlack"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label="扦样时间:">
        <el-input
          placeholder=""
          v-model="sampleForm.sampleInfo.samplingDt"
          :disabled="true"
          class="dialog_input fontMainBlack"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button class="step_btn" @click="closeSampleDetailShow">关闭</el-button>
  </div>
</template>

<script>
export default {
  name: "sampleDetail",
  data() {
    return {
      sampleForm: {
        sampleInfo: {
          code: "",
          name: "",
          product: "",
          nature__dsp: "",
          weight: "",
          sampleCopyNum: "",
          samplingDt: ""
        }
      }
    };
  },
  methods: {
    closeSampleDetailShow() {
      this.$emit("closeSampleDetailShow", "Y");
    },
    findSampleDetail() {
      const $this = this;
      this.$get({
        url: "/_data/sample/sample/findAllMsg",
        param: { qasSampleId: this.qasSampleId },
        fnc: data => {
          if (data.success && data.data) {
            let returnData = data.data;
            $this.sampleForm.sampleInfo.code = returnData.qasSample.code;
            $this.sampleForm.sampleInfo.name = returnData.qasSample.name;
            $this.sampleForm.sampleInfo.product =
              returnData.qasSamplingTask.productName;
            $this.sampleForm.sampleInfo.nature__dsp =
              returnData.qasPlan.nature__dsp;
            $this.sampleForm.sampleInfo.weight = returnData.qasSample.weight;
            $this.sampleForm.sampleInfo.sampleCopyNum =
              returnData.qasPlanSampleRequest.sampleCopyNum;
            $this.sampleForm.sampleInfo.samplingDt = $this.$dateUtl.getTime(
              returnData.qasSamplingTask.samplingDt
            );
          }
        }
      });
    }
  },
  props: {
    qasSampleId: {
      type: Number
    }
  },
  watch: {
    qasSampleId: {
      handler(val) {
        console.log(val);
        this.findSampleDetail();
      },
      immediate: true
    }
  }
};
</script>
