<template>
  <div class="height600">
    <div class="tool-bar bgfff">
      <span class="search_btn">通过地区筛选:</span>
      <el-cascader
        :options="area_tableData"
        :props="{
          expandTrigger: 'hover',
          label: 'text',
          value: 'id',
          checkStrictly: true
        }"
        clearable
        ref="searchArea"
        @change="searchAreaChange"
        placeholder="选择区域"
      ></el-cascader>
      <el-button type="primary" class="search_btn" @click="dialog_task = true">
        批量新增任务
      </el-button>
      <!--<el-button
        type="danger"
        class="search_btn"
        :disabled="btnDisabled"
        @click="removeTask"
        >批量删除</el-button
      >-->
      <el-button
        type="primary"
        class="search_btn"
        :disabled="btnDisabled"
        @click="dialog_samp = true"
      >
        批量指定扦样人
      </el-button>
      <el-button
        type="primary"
        class="search_btn"
        :disabled="btnDisabled"
        @click="dialog_checker = true"
      >
        批量指定质检人
      </el-button>
    </div>
    <!--<template>-->
    <el-form
      :inline="true"
      :model="pointTaskTableForm"
      :rules="rules"
      ref="pointTaskTableForm"
    >
      <el-table
        ref="pointTaskTable"
        :data="filtedData"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="500px"
        border
        @selection-change="doCheck"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="selection" width="60" fixed> </el-table-column>
        <el-table-column label="扦样单位/人" width="220">
          <template slot-scope="scope">
            {{ scope.row.performerName || scope.row.samplingOrgName }}
          </template>
        </el-table-column>
        <el-table-column prop="qaOrgName" label="检测单位/人" width="220">
        </el-table-column>

        <el-table-column prop="districtName" label="扦样区域" width="220">
        </el-table-column>

        <el-table-column prop="storeOrgName" label="承储企业" width="220">
        </el-table-column>
        <el-table-column prop="storePointName" label="库点名称" width="220">
        </el-table-column>
        <el-table-column prop="storeHouseName" label="仓房/油罐" width="120">
        </el-table-column>
        <el-table-column prop="stackName" label="货位名称" width="120">
        </el-table-column>
        <el-table-column label="储粮(油)性质" width="200">
          <template slot-scope="scope">
            <el-form-item
              :prop="'pointTask.' + scope.$index + '.grainProperty'"
              :rules="{
                required: true,
                message: '不得为空',
                trigger: 'change'
              }"
            >
              <el-select v-model="scope.row.grainProperty" placeholder="请选择">
                <el-option
                  v-for="item in grainPropertys"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="产品品种" width="250">
          <template slot-scope="scope">
            <el-form-item
              :prop="'pointTask.' + scope.$index + '.product'"
              style="width: 100px"
              :rules="{
                required: true,
                message: '不得为空',
                trigger: 'change'
              }"
            >
              <el-select
                v-model="scope.row.product"
                placeholder="请选择"
                @change="productChange($event, scope.row, scope.$index)"
              >
                <el-option
                  v-for="item in products"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :prop="'pointTask.' + scope.$index + '.grainbreedId'"
              style="width: 100px"
              :rules="{
                required: true,
                message: '不得为空',
                trigger: 'change'
              }"
            >
              <el-select v-model="scope.row.grainbreedId" placeholder="请选择">
                <el-option
                  v-for="item in grainBreeds[scope.$index]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="扦样个数" width="200">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.taskNum"
              :min="1"
              size="mini"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleCopy(scope.$index, scope.row)"
              >复制</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDtl(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!--</template>-->
    <template>
      <div style="margin-top: 5px">
        <span>已选择{{ selectNum }}条</span>
      </div>
    </template>

    <!-- 批量新增任务 -->
    <el-dialog
      title="批量新增任务"
      :visible.sync="dialog_task"
      v-if="dialog_task"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <createTask
        @pointLayOutTransSureData="pointLayOutTransSureData"
        :selectGrainBreeds="childGrainBreeds"
      ></createTask>
    </el-dialog>
    <!--批量指定扦样人弹窗-->
    <el-dialog
      title="批量指定扦样人"
      :visible.sync="dialog_samp"
      v-if="dialog_samp"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <sampler @transfSampler="getSampler" :sourceD="sourceD"></sampler>
    </el-dialog>
    <!--批量指定质检人弹窗-->
    <el-dialog
      title="批量指定质检人"
      :visible.sync="dialog_checker"
      v-if="dialog_checker"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <checker @transfChecker="getChecker" :sourceD="sourceD"></checker>
    </el-dialog>
  </div>
</template>

<script>
import sampler from "../../common/sampler";
import checker from "../../common/checker";
import createTask from "./createTask";

export default {
  name: "pointLayout",
  data() {
    return {
      taskNum: 1,
      rules: {},
      pointTaskTableForm: {
        pointTask: []
      },
      mg_top: "4%",
      dilogWith: "75%",
      btnDisabled: true,
      dialog_samp: false,
      dialog_checker: false,
      dialog_task: false,
      sourceD: "sourceD",
      area_tableData: [],
      reg: "",
      selectNum: 0,
      qasPlanId: 0,
      grainPropertys: [], //粮油性质
      products: [], //产品
      productgrainBreeds: [], //产品品种关联
      grainBreeds: [], //品种
      childGrainBreeds: [] //所有品种集合->用于筛选库点、仓房、货位
    };
  },
  methods: {
    getSampler(samplerParam) {
      const $this = this;
      //指定扦样单位/人
      let areaTableArray = this.$refs.pointTaskTable.selection;
      if (areaTableArray) {
        areaTableArray.forEach(item => {
          if (samplerParam.activeName === "first") {
            //扦样单位
            $this.$set(item, "samplingOrgName", samplerParam.samplingOrgName);
            $this.$set(item, "samplingOrgId", samplerParam.samplingOrgId);
            $this.$set(item, "performerName", "");
            $this.$set(item, "performerId", "");
          } else {
            $this.$set(item, "samplingOrgName", "");
            $this.$set(item, "samplingOrgId", "");
            $this.$set(item, "performerName", samplerParam.performerName);
            $this.$set(item, "performerId", samplerParam.performerId);
          }
        });
      }
      this.dialog_samp = false;
    },
    getChecker(checlerParam) {
      const $this = this;
      let areaTableArray = this.$refs.pointTaskTable.selection;
      if (areaTableArray) {
        areaTableArray.forEach(item => {
          $this.$set(item, "qaOrgName", checlerParam.qaOrgName);
          $this.$set(item, "qaOrgId", checlerParam.qaOrgId);
        });
      }
      this.dialog_checker = false;
    },
    searchAreaChange() {
      let areas = this.$refs["searchArea"].getCheckedNodes();
      let nameArray =
        areas[0] && areas[0].pathLabels ? areas[0].pathLabels : [];
      let areaName = "";
      for (let index in nameArray) {
        areaName += nameArray[index];
      }
      this.reg = areaName;
    },
    doCheck(val) {
      this.selectNum = val.length;
      let result_boolean = val.length > 0 ? false : true;
      this.btnDisabled = result_boolean;
      this.selectRows = val;
    },
    handleCopy(index, row) {
      row.performerName = "";
      row.samplingOrgName = "";
      row.qaOrgName = "";
      row.performerId = "";
      row.samplingOrgId = "";
      row.qaOrgId = "";
      this.grainBreeds[
        this.pointTaskTableForm.pointTask.length
      ] = this.productgrainBreeds[row.product];
      this.pointTaskTableForm.pointTask.push(row);
    },
    handleDtl(index) {
      this.pointTaskTableForm.pointTask.splice(index, 1);
      this.grainBreeds.splice(index, 1);
    },
    //获取计划的品种信息
    findGrainBreed() {
      if (!this.qasPlanId || this.qasPlanId == 0) {
        return false;
      }
    },
    pointLayOutTransSureData(data) {
      const $this = this;
      data.map(item => {
        $this.$set(item, "taskNum", 1);
        $this.pointTaskTableForm.pointTask.push(item);
      });
      this.dialog_task = false;
    },
    productChange(val, scopeRow, index) {
      this.grainBreeds[index] = this.productgrainBreeds[val];
      let obj = this.products.find(item => {
        return item.value === val;
      });
      this.$set(this.pointTaskTableForm.pointTask[index], "grainBreedId", "");
      this.$set(
        this.pointTaskTableForm.pointTask[index],
        "productName",
        obj && obj.text ? obj.text : ""
      ); //获取选中的text
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    }
    /* removeTask() {
      const $this = this;
      let areaTableArray = this.$refs.pointTaskTable.selection;
      if (areaTableArray) {
        let taskArray = $this.pointTaskTableForm.pointTask;
        let gradinBreedArray = $this.grainBreeds;

        for (let i = areaTableArray.length - 1; i >= 0; i--) {
          let selectObject = areaTableArray[i];
          if (!selectObject) {
            continue;
          }
          taskArray.splice(selectObject.index, 1);
          gradinBreedArray.splice(selectObject, 1);
        }
        $this.pointTaskTableForm.pointTask = taskArray;
        $this.grainBreeds = gradinBreedArray;
      }
    }*/
  },
  components: {
    sampler: sampler,
    checker: checker,
    createTask: createTask
  },
  created() {
    const $this = this;
    this.area_tableData = this.$store.getters.get_areaLevel;
    //获取粮油性质
    this.$Api.getDic("wms_store_grainproperty").then(data => {
      this.grainPropertys = data;
    });
    //获取选择的粮食品种
    this.$get({
      url: "/_data/task/sampleRequest/findProductAndGrainBreed",
      fnc: data => {
        data.map(function(arg) {
          $this.products.push({ value: arg.value, text: arg.label });
          $this.productgrainBreeds[arg.value] = arg.commonEntityList;
          if (arg.commonEntityList) {
            arg.commonEntityList.forEach(item => {
              $this.childGrainBreeds.push(item.value);
            });
          }
        });
      },
      param: { qasPlanId: this.qasPlanId }
    });
  },
  computed: {
    filtedData() {
      return this.pointTaskTableForm.pointTask.filter(item => {
        return !this.reg || item.districtName.indexOf(this.reg) > -1;
      });
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
