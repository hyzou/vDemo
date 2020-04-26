<template>
  <div class="dialog_root">
    <el-form
      label-width="110px"
      :inline="true"
      :model="taskEditForm"
      :rules="rules"
      ref="taskEditForm"
    >
      <!--表单第一行-->
      <el-form-item label="计划环节:">
        <el-input
          v-model="taskEditForm.link"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="计划性质:">
        <el-input
          v-model="taskEditForm.nature"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="产品品种:">
        <el-input
          v-model="taskEditForm.productName"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="品种分类:">
        <el-input
          v-model="taskEditForm.grainbreed"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <br />
      <!--表单第二行-->
      <el-form-item label="扦样单位/人:">
        <el-input
          v-model="taskEditForm.sampler"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="任务编号:">
        <el-input
          v-model="taskEditForm.code"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="要求完成日期:">
        <el-input
          v-model="taskEditForm.deadlineDt"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <br />
      <!--表单第三行-->
      <el-form-item label="样品数量(kg):">
        <el-input
          v-model="taskEditForm.sampleWeight"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="样品份数:">
        <el-input
          v-model="taskEditForm.sampleCopyNum"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="扦样方式:">
        <el-input
          v-model="taskEditForm.sampleWay"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="扦样要求:">
        <el-input
          v-model="taskEditForm.samplingRequire"
          class="dialog_input fontMainBlack"
          disabled
        ></el-input>
      </el-form-item>
      <br />
      <!--表单第四行-->
      <el-form-item label="目的地经度:" prop="longitude">
        <el-input
          v-model="taskEditForm.longitude"
          class="dialog_input fontMainBlack"
        ></el-input>
      </el-form-item>
      <el-form-item label="目的地维度:" prop="latitude">
        <el-input
          v-model="taskEditForm.latitude"
          class="dialog_input"
        ></el-input>
      </el-form-item>
      <el-form-item label="目的地地址:" prop="address">
        <el-input
          v-model="taskEditForm.address"
          class="dialog_input"
        ></el-input>
      </el-form-item>
      <el-form-item label="允许偏离半径:" prop="deviationRadius">
        <el-input
          v-model.number="taskEditForm.deviationRadius"
          class="dialog_input"
        ></el-input>
      </el-form-item>
      <br />
      <!--表单第五行-->
      <el-form-item label="扦样区域:">
        <el-cascader
          v-model="district"
          :options="areas"
          :props="{
            expandTrigger: 'hover',
            label: 'text',
            value: 'id',
            checkStrictly: true
          }"
          ref="taskEditArea"
          @change="taskEditAreaChange"
        ></el-cascader>
      </el-form-item>
      <div class="tool-bar bgfff">
        <el-button type="primary" @click="saveTaskEdit">保存</el-button>
        <el-button @click="cancelTaskEdit">关闭</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var isnumber = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        var reg = /^-?\d{0,10}(?:\.\d{0,6})?$/; //小数点左边最高16位，小数点右边最多4位
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入数字"));
        }
      }
    };
    return {
      rules: {
        //表单验证规则
        longitude: {
          validator: isnumber,
          message: "请输入数字",
          trigger: "change"
        },
        latitude: {
          validator: isnumber,
          message: "请输入数字",
          trigger: "change"
        },
        deviationRadius: {
          type: "integer",
          message: "请输入数字",
          trigger: "change"
        },
        district: {
          required: true,
          message: "请选择扦样区域"
        }
      },
      taskEditForm: {
        deviationRadius: null,
        address: "",
        latitude: null,
        longitude: null,
        samplingRequire: "",
        sampleCopyNum: null,
        sampleWeight: null,
        grainbreed: "",
        productName: "",
        link: "",
        nature: "",
        code: "",
        sampler: "",
        sampleWay: "",
        deadlineDt: "",
        district: "",
        linkCode: "1"
      },
      district: "",
      areas: []
    };
  },
  methods: {
    findData(vm) {
      if (0 === vm.taskId) {
        return false;
      }
      vm.$get({
        url: "/_data/task/samplingTask/loadData",
        fnc: data => {
          if (data && data.success) {
            let rowData = data.data;
            vm.taskEditForm = rowData;
            vm.taskEditForm.samplingRequire =
              rowData.qasPlanSampleRequest &&
              rowData.qasPlanSampleRequest.samplingRequire
                ? rowData.qasPlanSampleRequest.samplingRequire
                : "";
            vm.taskEditForm.sampleCopyNum =
              rowData.qasPlanSampleRequest &&
              rowData.qasPlanSampleRequest.sampleCopyNum
                ? rowData.qasPlanSampleRequest.sampleCopyNum
                : null;
            vm.taskEditForm.sampleWeight =
              rowData.qasPlanSampleRequest &&
              rowData.qasPlanSampleRequest.sampleWeight
                ? rowData.qasPlanSampleRequest.sampleWeight
                : null;
            vm.taskEditForm.grainbreed =
              rowData.qasPlanSampleRequest &&
              rowData.qasPlanSampleRequest.grainbreedId__dsp
                ? rowData.qasPlanSampleRequest.grainbreedId__dsp
                : "";
            vm.taskEditForm.productName =
              rowData.qasPlanSampleRequest &&
              rowData.qasPlanSampleRequest.productName
                ? rowData.qasPlanSampleRequest.productName
                : "";
            vm.taskEditForm.link = rowData.linkName;
            vm.taskEditForm.nature = rowData.natureName;
            vm.taskEditForm.deadlineDt =
              rowData.qasPlan && rowData.qasPlan.deadlineDt
                ? vm.$dateUtl.getTime(rowData.qasPlan.deadlineDt)
                : "";
            vm.taskEditForm.sampler = rowData.performerId__dsp
              ? rowData.performerId__dsp
              : rowData.samplingOrgName;
            vm.district = vm.taskEditForm.district;
            vm.taskEditForm.sampleWay =
              rowData.qasPlan && rowData.qasPlan.sampleWay__dsp
                ? rowData.qasPlan.sampleWay__dsp
                : "";
            vm.taskEditForm.linkCode =
              rowData.qasPlan && rowData.qasPlan.link
                ? rowData.qasPlan.link
                : vm.taskEditForm.linkCode;
          }

          vm.get_sampleArea(vm);
        },
        param: { qasSamplingTaskId: this.taskId }
      });
    },
    saveTaskEdit() {
      this.$refs["taskEditForm"].validate(valid => {
        if (valid) {
          this.$post({
            url: "/_data/task/samplingTask/updateSamplingTask",
            param: {
              district: this.taskEditForm.district,
              qasSamplingTaskId: this.taskId,
              longitude: this.taskEditForm.longitude,
              latitude: this.taskEditForm.latitude,
              address: this.taskEditForm.address,
              deviationRadius: this.taskEditForm.deviationRadius
            },
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
              this.$emit(this.$constants.TASKEDIT_CANCEL, "success");
            }
          });
        } else {
          return false;
        }
      });
    },
    cancelTaskEdit() {
      this.$emit(this.$constants.TASKEDIT_CANCEL, "close");
    },
    taskEditAreaChange() {
      let areas = this.$refs["taskEditArea"].getCheckedNodes();
      this.taskEditForm.district =
        areas[0] && areas[0].value ? areas[0].value : "";
    },
    get_sampleArea() {
      //非仓储
      if (this.$constants.LINK_MARKET != this.taskEditForm.linkCode) {
        this.areas = this.$store.getters.get_areaLevel;
        return false;
      }
      //仓储
      let data = this.$store.getters.get_areaLevel;
      this.areas = JSON.parse(JSON.stringify(data));
      this.areas.forEach(row => {
        if (row.children) {
          let code = row.id;
          if (
            code.length === 6 &&
            code.substr(2, 2) != "00" &&
            code.substr(4) === "00"
          ) {
            delete row.children;
          } else {
            row.disabled = true;
            if (row.children) {
              row.children.forEach(row => {
                let code = row.id;
                if (
                  code.length === 6 &&
                  code.substr(2, 2) != "00" &&
                  code.substr(4) === "00"
                ) {
                  delete row.children;
                } else {
                  if (row.children) {
                    row.children.forEach(row => {
                      let code = row.id;
                      if (
                        code.length === 6 &&
                        code.substr(2, 2) != "00" &&
                        code.substr(4) === "00"
                      ) {
                        delete row.children;
                      }
                    });
                  }
                }
              });
            }
          }
        }
      });
    }
  },
  created() {
    //获取数据
    const $this = this;
    this.findData($this);
  },
  props: {
    taskId: {
      type: Number,
      default: 0
    }
  }
};
</script>
