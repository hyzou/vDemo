<template>
  <div class="plan_from">
    <el-form
      label-width="110px"
      :inline="true"
      :model="taskForm"
      :rules="taskFormRules"
      ref="pointTaskTableForm"
    >
      <!--表单第一行-->
      <el-form-item label="市:" prop="city.value">
        <el-cascader
          :options="area_tableData"
          v-model="taskForm.cityArray"
          :props="{
            expandTrigger: 'hover',
            label: 'text',
            value: 'id',
            checkStrictly: true
          }"
          @change="aeraChange"
          clearable
          ref="searchArea"
          placeholder="选择市"
          class="dialog_input"
        ></el-cascader>
      </el-form-item>
      <br />
      <!--表单第二行-->
      <el-form-item label="对象类型:" prop="targetType.value">
        <el-select
          v-model="taskForm.targetType.value"
          class="dialog_input"
          @change="targetTypeChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in targetTypeSelects"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <br />
      <!--表单第三行-->
      <el-form-item label="扦样单位/人:" prop="performCal">
        <el-input
          class="dialog_input"
          placeholder="扦样单位/人"
          v-model="performDesp"
          readonly
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            v-if="chosePerformBtn"
            @click="chosePerformOrg"
          ></i>
          <i
            slot="suffix"
            class="el-input__icon el-icon-circle-close"
            v-if="clearPerformBtn"
            @click="clearPerformOrg"
          ></i>
        </el-input>
      </el-form-item>
      <br />
      <!--表单第四行-->
      <el-form-item label="质检单位:" prop="qaOrg.value">
        <el-input
          class="dialog_input"
          placeholder="质检单位"
          v-model="taskForm.qaOrg.text"
          readonly
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            v-if="choseCheckBtn"
            @click="choseQasOrg"
          ></i>
          <i
            slot="suffix"
            class="el-input__icon el-icon-circle-close"
            v-if="clearCheckBtn"
            @click="clearQasOrg"
          ></i>
        </el-input>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择执行单位/人"
      :visible.sync="dialog_chose_sampler"
      v-if="dialog_chose_sampler"
      :append-to-body="true"
      :top="mg_top"
    >
      <sampler ref="sampler" @transfToSampler="importPerform"></sampler>
    </el-dialog>
    <el-dialog
      title="选择质检单位"
      :visible.sync="dialog_chose_checker"
      v-if="dialog_chose_checker"
      :append-to-body="true"
      :top="mg_top"
    >
      <checker ref="checker" @transfToChecker="importCheckOrg"></checker>
    </el-dialog>
  </div>
</template>
<script>
import checker from "../../common/checker";
import sampler from "../../common/sampler";
export default {
  name: "createMarketMonitorLink",
  components: {
    sampler: sampler,
    checker: checker
  },
  data() {
    return {
      mg_top: this.$constants.dialog_margin_top,
      taskForm: {
        city: { value: "", text: "" },
        cityArray: [],
        targetType: { value: "", text: "" },
        performOrg: { value: "", text: "" },
        performPeople: { value: "", text: "" },
        qaOrg: { value: "", text: "" },
        performCal: "" //最终的执行单位/人显示值
      },
      taskFormRules: {
        "city.value": {
          required: true,
          message: "请选择市"
        },
        "targetType.value": {
          required: true,
          message: "请选择监测对象"
        },
        performCal: { required: true, message: "请选择扦样单位/人" },
        "qaOrg.value": {
          required: true,
          message: "请选择质检单位"
        }
      },
      area_tableData: [], // 市选择框下拉列表数据
      targetTypeSelects: [],
      dialog_chose_sampler: false,
      dialog_chose_checker: false
    };
  },
  created() {
    // 设置下拉框选项
    this.setAeraOptionValues();
    this.setTargetSelectOpotion();
  },
  methods: {
    setTargetSelectOpotion() {
      const current = this;
      this.$Api.getDic("qas_market_target_type").then(data => {
        current.targetTypeSelects = data;
      });
    },
    setAeraOptionValues() {
      let data = this.$store.getters.get_areaLevel;
      this.area_tableData = JSON.parse(JSON.stringify(data));
      this.area_tableData.forEach(row => {
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
    },
    aeraChange() {
      let node = this.$refs.searchArea.getCheckedNodes();
      this.taskForm.city.value = node[0].value;
      this.taskForm.city.text = node[0].label;
    },
    targetTypeChange(value) {
      let node = {};
      node = this.targetTypeSelects.find(item => {
        return item.value === value;
      });
      this.taskForm.targetType.text = node.text;
    },
    chosePerformOrg() {
      this.dialog_chose_sampler = true;
    },
    choseQasOrg() {
      this.dialog_chose_checker = true;
    },
    showClearPerformBtn() {
      if (this.taskForm.performOrg.text || this.taskForm.performPeople.text) {
        return true;
      }
      return false;
    },
    showChosePerformBtn() {
      if (!this.taskForm.performOrg.text && !this.taskForm.performPeople.text) {
        return true;
      }
      return false;
    },
    showCheckPerformBtn() {
      if (!this.taskForm.qaOrg.text) {
        return true;
      }
      return false;
    },
    clearCheckPerformBtn() {
      if (this.taskForm.qaOrg.text) {
        return true;
      }
      return false;
    },
    importPerform(choseSamplerData) {
      let perform = { value: "", text: "" };
      let performPeople = { value: "", text: "" };
      perform.value = choseSamplerData.samplingOrgId;
      perform.text = choseSamplerData.samplingOrgName;
      if (choseSamplerData.performerId) {
        performPeople.value = choseSamplerData.performerId;
        performPeople.text = choseSamplerData.performerName;
        this.taskForm.performCal = performPeople.value;
      } else {
        this.taskForm.performCal = perform.value;
      }
      this.taskForm.performOrg = perform;
      this.taskForm.performPeople = performPeople;
      this.dialog_chose_sampler = false;
    },
    clearPerformOrg() {
      this.taskForm.performOrg = { value: "", text: "" };
      this.taskForm.performPeople = { value: "", text: "" };
      this.taskForm.performCal = "";
    },
    importCheckOrg(choseCheckData) {
      let check = { value: "", text: "" };
      check.value = choseCheckData.qaOrgId;
      check.text = choseCheckData.qaOrgName;
      this.taskForm.qaOrg = check;
      this.dialog_chose_checker = false;
    },
    clearQasOrg() {
      this.taskForm.qaOrg = { value: "", text: "" };
    }
  },
  computed: {
    performDesp: function() {
      if (this.taskForm.performPeople.text) {
        return this.taskForm.performPeople.text;
      } else if (this.taskForm.performOrg.text) {
        return this.taskForm.performOrg.text;
      }
      return "";
    },
    chosePerformBtn: function() {
      return this.showChosePerformBtn();
    },
    clearPerformBtn: function() {
      return this.showClearPerformBtn();
    },
    choseCheckBtn: function() {
      return this.showCheckPerformBtn();
    },
    clearCheckBtn: function() {
      return this.clearCheckPerformBtn();
    }
  }
};
</script>
