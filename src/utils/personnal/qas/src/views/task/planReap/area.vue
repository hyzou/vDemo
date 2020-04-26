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
      <el-button type="primary" class="search_btn" @click="dialog_area = true"
        >选择地区新增任务</el-button
      >
      <el-button
        type="primary"
        class="search_btn"
        :disabled="btnDisabled"
        @click="dialog_samp = true"
        >批量指定扦样人</el-button
      >
      <el-button
        type="primary"
        class="search_btn"
        :disabled="btnDisabled"
        @click="dialog_checker = true"
        >批量指定质检人
      </el-button>
      <!--<el-button type="primary" class="search_btn" @click="dialog_copy_task=true">复制计划新增任务</el-button>-->
      <el-button
        type="primary"
        class="search_btn"
        :disabled="btnDisabled"
        @click="dialog_changeArea = true"
        >批量修改地区
      </el-button>
    </div>
    <template>
      <el-table
        ref="areaTable"
        :data="filtedData"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="550"
        @selection-change="handleSampleDtlSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="districtName" label="扦样区域" width="250">
        </el-table-column>
        <el-table-column label="扦样单位/人" width="250">
          <template slot-scope="scope">
            {{ scope.row.performerName || scope.row.samplingOrgName }}
          </template>
        </el-table-column>
        <el-table-column prop="qaOrgName" label="检测单位/人" width="250">
        </el-table-column>
        <el-table-column prop="taskNum" label="扦样个数">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.taskNum"
              :min="1"
              size="mini"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="regionNum" label="扦样乡个数">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.regionNum"
              :min="1"
              size="mini"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
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
    </template>
    <template>
      <div style="margin-top: 5px">
        <span>已选择{{ selectNum }}条</span>
      </div>
    </template>
    <!--区域选择弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="选择地区区域"
      :visible.sync="dialog_area"
      class="dialog_area"
      :top="mg_top"
      :width="dilogWith"
      v-if="dialog_area"
      :append-to-body="true"
    >
      <div class="dialog_area_container">
        <el-table
          ref="areaSelectedTable"
          :data="area_tableData"
          row-key="id"
          border
          max-height="550px"
          :expand-row-keys="areaexpandRowKeys"
          :tree-props="{ hasChildren: 'hasChildren', children: 'children' }"
          reserve-selection="true"
          @selection-change="handleAreaSelectionChange"
          @select-all="selectAllArea"
          @select="selectArea"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="text" label="区域"> </el-table-column>
          <el-table-column prop="name" label="类型">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.parentId === '0'
                    ? 'primary'
                    : scope.row.children
                    ? 'success'
                    : 'danger'
                "
                disable-transitions
                >{{
                  scope.row.parentId === "0"
                    ? "省"
                    : scope.row.children
                    ? "市"
                    : "区/县"
                }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          plain
          :disabled="showAreaBtn"
          @click="doSelectedArea('3')"
          >带回选择区域下所有县区</el-button
        >
        <el-button
          type="primary"
          plain
          :disabled="showAreaBtn"
          @click="doSelectedArea('2')"
          >带回选择区域的所有下级区域</el-button
        >
        <el-button
          type="primary"
          plain
          :disabled="showAreaBtn"
          @click="doSelectedArea('1')"
          >确认勾选</el-button
        >
      </div>
    </el-dialog>
    <!--批量指定扦样人弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="批量指定扦样人"
      :visible.sync="dialog_samp"
      class="dialog_area"
      v-if="dialog_samp"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <sampler @transfSampler="getSampler" :sourceD="sourceD"></sampler>
    </el-dialog>
    <!--批量指定质检人弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="批量指定质检人"
      :visible.sync="dialog_checker"
      class="dialog_area"
      v-if="dialog_checker"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <checker @transfChecker="getChecker" :sourceD="sourceD"></checker>
    </el-dialog>
    <!--复制计划新增任务弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="复制计划新增任务"
      :visible.sync="dialog_copy_task"
      class="dialog_area"
      v-if="dialog_copy_task"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <copyTask :link="link" @transfDistrict="getTaskDistrict"></copyTask>
    </el-dialog>
    <!--批量修改地区弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="批量修改地区"
      :visible.sync="dialog_changeArea"
      class="dialog_area"
      width="30%"
      v-if="dialog_changeArea"
      :append-to-body="true"
    >
      <div class="block">
        <el-cascader
          v-model="area_changed"
          :options="area_tableData"
          :props="{
            expandTrigger: 'hover',
            label: 'text',
            value: 'id',
            checkStrictly: true
          }"
          clearable
          ref="bathUpdateArea"
          @change="bathUpdateAreaChange"
        ></el-cascader>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doBathUpdateArea">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sampler from "../../common/sampler";
import checker from "../../common/checker";
import copyTask from "./copyTask";

export default {
  data() {
    return {
      reg: "",
      mg_top: "4%",
      dilogWith: "70%",
      regions: [],
      tableData: [],
      area_tableData: [],
      area_changed: "",
      area_changedMame: "",
      area_changes: [],
      btnDisabled: true, //true,
      selectNum: 0,
      dialog_area: false,
      dialog_samp: false,
      dialog_checker: false,
      dialog_changeArea: false,
      dialog_copy_task: false,
      showAreaBtn: true,
      areaexpandRowKeys: [],
      selectedAreaArray: [],
      sourceD: "sourceD",
      totalAreaNum: 0 //区域选择总共有多少区域数量
    };
  },
  methods: {
    handleSampleDtlSelectionChange(val) {
      this.btnDisabled = val.length > 0 ? false : true;
      this.selectNum = val.length;
    },
    handleAreaSelectionChange(val) {
      this.showAreaBtn = val.length > 0 ? false : true;
      this.selectedAreaArray = val;
    },
    selectAllArea(val) {
      if (val && val.length != this.totalAreaNum) {
        this.$refs.areaSelectedTable.toggleRowSelection(
          this.area_tableData[0],
          true
        );
        this.area_tableData[0].children.forEach(row => {
          this.$refs.areaSelectedTable.toggleRowSelection(row, true);
          if (row.children) {
            row.children.forEach(row => {
              this.$refs.areaSelectedTable.toggleRowSelection(row, true);
            });
          }
        });
      } else {
        this.$refs.areaSelectedTable.clearSelection();
      }
    },
    selectArea() {},
    showArea() {
      const $this = this;
      //获取地区数据
      $this.$get({
        url: "/_data/basic/district2/treeByUser",
        fnc: data => {
          $this.area_tableData = data[0].children;
          if ($this.area_tableData[0].id) {
            $this.areaexpandRowKeys.push($this.area_tableData[0].id);
          }

          this.area_tableData.forEach(row => {
            this.totalAreaNum += 1;
            if (row.children) {
              row.children.forEach(row => {
                this.totalAreaNum += 1;
                if (row.children) {
                  row.children.forEach(() => {
                    this.totalAreaNum += 1;
                  });
                }
              });
            }
          });
          this.totalAreaNum = this.totalAreaNum > 1 ? this.totalAreaNum - 1 : 0;
        }
      });
    },
    doSelectedArea(commoned) {
      //1 == 当前级别 2==所有下级区域（包括本级）  3==所有下级区/县
      if (!this.selectedAreaArray || !commoned) {
        return false;
      }
      //获取最后的数据源赋值给列表 并关闭当前选择框
      if ("1" === commoned) {
        //当前级别
        for (let areaParamIndex in this.selectedAreaArray) {
          let areaParam = {
            district: this.selectedAreaArray[areaParamIndex].id,
            districtName: this.findAllName(
              this.selectedAreaArray[areaParamIndex].id
            ),
            taskNum: 1,
            regionNum: 1,
            performerName: "",
            performerId: "",
            samplingOrgName: "",
            samplingOrgId: "",
            qaOrgName: "",
            qaOrgId: ""
          };
          this.tableData.push(areaParam);
        }
      } else if ("2" === commoned) {
        //所有下级（包括本级）
        for (let areaParamIndex in this.selectedAreaArray) {
          let param = this.selectedAreaArray[areaParamIndex];
          let areaParam = {
            district: param.id,
            districtName: this.findAllName(param.id),
            taskNum: 1,
            regionNum: 1,
            performerName: "",
            performerId: "",
            samplingOrgName: "",
            samplingOrgId: "",
            qaOrgName: "",
            qaOrgId: ""
          };
          this.tableData.push(areaParam);
          this.foreachAddTableData(param);
        }
      } else if ("3" === commoned) {
        //所有下级区/县 最后一级 没有子数据
        for (let areaParamIndex in this.selectedAreaArray) {
          let param = this.selectedAreaArray[areaParamIndex];
          this.foreachChildrenAddTableData(param);
        }
      }
      this.$message({
        type: "success",
        message: "操作成功"
      });
      this.dialog_area = false;
      this.showAreaBtn = true;
      this.selectedAreaArray = [];
    },
    foreachAddTableData(area) {
      if (area && area.children) {
        for (let cindex in area.children) {
          let cobject = area.children[cindex];
          let areaParam = {
            district: cobject.id,
            districtName: this.findAllName(cobject.id),
            taskNum: 1,
            regionNum: 1,
            performerName: "",
            performerId: "",
            samplingOrgName: "",
            samplingOrgId: "",
            qaOrgName: "",
            qaOrgId: ""
          };
          this.tableData.push(areaParam);
          this.foreachAddTableData(cobject);
        }
      }
    },
    foreachChildrenAddTableData(area) {
      if (area) {
        if (area.children) {
          for (let cindex in area.children) {
            let cobject = area.children[cindex];
            this.foreachChildrenAddTableData(cobject);
          }
        } else {
          let areaParam = {
            district: area.id,
            districtName: this.findAllName(area.id),
            taskNum: 1,
            regionNum: 1,
            performerName: "",
            performerId: "",
            samplingOrgName: "",
            samplingOrgId: "",
            qaOrgName: "",
            qaOrgId: ""
          };
          this.tableData.push(areaParam);
        }
      }
    },
    //获取全名
    findAllName(selectedId) {
      let selectedName = "";
      for (let index1 in this.area_tableData) {
        //省
        let sheng = this.area_tableData[index1];
        let sheng_name = sheng.text;
        if (selectedId == sheng.id) {
          selectedName = sheng_name;
          break;
        }
        //没有子级
        if (!sheng.children) {
          continue;
        }
        //市
        for (let index2 in sheng.children) {
          let city = sheng.children[index2];
          let city_name = city.text;
          if (selectedId == city.id) {
            selectedName = sheng_name + city_name;
            break;
          }
          if (!city.children) {
            continue;
          }
          //区县
          for (let index3 in city.children) {
            let quxian = city.children[index3];
            let quxian_name = quxian.text;
            if (selectedId == quxian.id) {
              selectedName = sheng_name + city_name + quxian_name;
              break;
            }
          }
        }
      }
      return selectedName;
    },
    handleCopy(index, row) {
      let areaParam = {
        district: row.district,
        districtName: row.districtName,
        taskNum: row.taskNum,
        regionNum: row.regionNum,
        performerName: row.performerName,
        performerId: row.performerId,
        samplingOrgName: row.samplingOrgName,
        samplingOrgId: row.samplingOrgId,
        qaOrgName: row.qaOrgName,
        qaOrgId: row.qaOrgId
      };
      this.tableData.push(areaParam);
    },
    handleDtl(index) {
      this.tableData.splice(index, 1);
    },
    bathUpdateAreaChange() {
      let areas = this.$refs["bathUpdateArea"].getCheckedNodes();
      this.area_changed = areas[0] && areas[0].value ? areas[0].value : "";
      let nameArray =
        areas[0] && areas[0].pathLabels ? areas[0].pathLabels : [];
      let areaName = "";
      for (let index in nameArray) {
        areaName += nameArray[index];
      }
      this.area_changedMame = areaName;
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
    doBathUpdateArea() {
      //this.$refs.areaTable.selection
      let areaTableArray = this.$refs.areaTable.selection;
      if (areaTableArray) {
        areaTableArray.forEach(item => {
          item.district = this.area_changed;
          item.districtName = this.area_changedMame;
        });
      }
      this.area_changed = "";
      this.area_changedMame = "";
      this.dialog_changeArea = false;
    },
    getSampler(samplerParam) {
      //指定扦样单位/人
      let areaTableArray = this.$refs.areaTable.selection;
      if (areaTableArray) {
        areaTableArray.forEach(item => {
          if (samplerParam.activeName === "first") {
            //扦样单位
            item.samplingOrgName = samplerParam.samplingOrgName;
            item.samplingOrgId = samplerParam.samplingOrgId;
            item.performerName = "";
            item.performerId = "";
          } else {
            item.samplingOrgName = "";
            item.samplingOrgId = "";
            item.performerName = samplerParam.performerName;
            item.performerId = samplerParam.performerId;
          }
        });
      }
      this.dialog_samp = false;
    },
    getChecker(checlerParam) {
      let areaTableArray = this.$refs.areaTable.selection;
      if (areaTableArray) {
        areaTableArray.forEach(item => {
          item.qaOrgName = checlerParam.qaOrgName;
          item.qaOrgId = checlerParam.qaOrgId;
        });
      }
      this.dialog_checker = false;
    },
    getTaskDistrict(obj) {
      this.dialog_copy_task = false;
      let areaParam = {
        district: obj.value,
        districtName: obj.label,
        taskNum: 1,
        regionNum: 1,
        performerName: "",
        performerId: "",
        samplingOrgName: "",
        samplingOrgId: "",
        qaOrgName: "",
        qaOrgId: ""
      };
      this.tableData.push(areaParam);
    }
  },
  components: {
    sampler,
    checker,
    copyTask
  },
  created() {
    this.showArea();
  },
  props: {
    link: {
      type: String,
      default: ""
    }
  },
  computed: {
    filtedData() {
      return this.tableData.filter(item => {
        return !this.reg || item.districtName.indexOf(this.reg) > -1;
      });
    }
  }
};
</script>
