<template>
  <div>
    <div class="tool-bar bgfff">
      <el-dropdown class="mg_right" @command="batchAction">
        <el-button>
          批量操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="disabledBatchBtn" command="tosampler"
            >指定扦样单位/人
          </el-dropdown-item>
          <el-dropdown-item :disabled="disabledBatchBtn" command="tochecker"
            >指定检测单位
          </el-dropdown-item>
          <el-dropdown-item :disabled="disabledBatchBtn" command="delete"
            >删除
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--<el-button type="primary" class="s-tool-btn"
            >复制计划新增样品信息</el-button>-->
      <el-button
        type="primary"
        class="s-tool-btn"
        @click="diaLog_creatMonitor = true"
        >添加监测对象</el-button
      >
    </div>
    <!--表格-->
    <template>
      <el-form
        label-width="110px"
        :inline="true"
        :model="pointTaskTableForm"
        ref="pointTaskTableForm"
      >
        <el-table
          tooltip-effect="dark"
          :data="tableShowData"
          :span-method="tableSpanMethod"
          style="width: 100%"
          max-height="400px"
          :border="true"
          stripe
          @selection-change="selectionRowsChange"
        >
          <el-table-column
            type="selection"
            :selectable="setRowSelectable"
          ></el-table-column>
          <el-table-column prop="city__dsp" label="市"></el-table-column>
          <!--<el-table-column prop="" label="监测环节" width="150"></el-table-column>-->
          <el-table-column
            prop="targetType__dsp"
            label="对象类型"
          ></el-table-column>
          <el-table-column prop="perform__dsp" label="扦样单位/人" width="150">
          </el-table-column>
          <el-table-column label="质检单位" prop="qaOrgName"></el-table-column>
          <el-table-column label="抽样批次">
            <el-table-column prop="numSum" label="合计"></el-table-column>
            <template>
              <el-table-column
                v-for="grainbreed in planGrainBreedTypes"
                :key="grainbreed.id"
                :label="grainbreed.name"
                :prop="grainbreed.id"
                width="150"
              >
                <template slot-scope="scope">
                  <el-form-item v-if="!scope.row.isCalRow">
                    <el-input-number
                      v-model="
                        pointTaskTableForm.pointTaskTableData[
                          scope.row.relationRowIndex
                        ].grainBreedNums[scope.column.property].num
                      "
                      :min="1"
                      :max="10"
                      size="mini"
                    ></el-input-number>
                  </el-form-item>
                  <span v-if="scope.row.isCalRow">{{
                    scope.row.grainBreedNums[scope.column.property]
                  }}</span>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
          <el-table-column label="地区" width="200">
            <template slot-scope="scope" v-if="!scope.row.isCalRow">
              <el-form-item
                :prop="
                  'pointTaskTableData.' +
                    scope.row.relationRowIndex +
                    '.districtArray'
                "
                :rules="{
                  required: true,
                  message: '请选择地区',
                  trigger: 'change'
                }"
              >
                <el-cascader
                  :ref="'cascaderAddr' + scope.row.relationRowIndex"
                  :options="generateTableDistrictOptions(scope.row.city)"
                  v-model="
                    pointTaskTableForm.pointTaskTableData[
                      scope.row.relationRowIndex
                    ].districtArray
                  "
                  :props="{
                    expandTrigger: 'hover',
                    label: 'text',
                    value: 'id',
                    checkStrictly: true
                  }"
                  @change="
                    checkValue => {
                      districtChange(checkValue, scope.row.relationRowIndex);
                    }
                  "
                  clearable
                ></el-cascader>
                <!--@blur="(e,form,thsAreaCode) => {handleAddressFun(e,form,thsAreaCode,scope.row.relationRowIndex)}"-->
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="product"
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope" v-if="!scope.row.isCalRow">
              <el-button
                type="text"
                size="small"
                @click="copy_row(scope.$index, scope.row)"
                >复制
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="delete_row(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </template>
    <!-- 新建监测对象窗口-->
    <el-dialog
      title="新增监测对象"
      :visible.sync="diaLog_creatMonitor"
      v-if="diaLog_creatMonitor"
      :append-to-body="true"
      :top="mg_top"
    >
      <createMarketMonitorLink
        ref="createMarketMonitorLink"
      ></createMarketMonitorLink>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveMarketMontor">确认</el-button>
        <el-button @click="diaLog_creatMonitor = false">关闭 </el-button>
      </div>
    </el-dialog>
    <!-- 选择扦样单位窗口-->
    <el-dialog
      title="选择执行单位/人"
      :visible.sync="dialog_chose_sampler"
      v-if="dialog_chose_sampler"
      :append-to-body="true"
      :top="mg_top"
    >
      <sampler ref="sampler" @transfToSampler="batchUpdatePerform"></sampler>
    </el-dialog>
    <!-- 选择质检单位窗口-->
    <el-dialog
      title="选择质检单位"
      :visible.sync="dialog_chose_checker"
      v-if="dialog_chose_checker"
      :append-to-body="true"
      :top="mg_top"
    >
      <checker ref="checker" @transfToChecker="batchUpdateCheck"></checker>
    </el-dialog>
  </div>
</template>

<script>
import createMarketMonitorLink from "./createMarketMonitorLink";
import checker from "../../common/checker";
import sampler from "../../common/sampler";

export default {
  name: "createMarketTask",
  components: {
    createMarketMonitorLink: createMarketMonitorLink,
    sampler: sampler,
    checker: checker
  },
  data() {
    return {
      mg_top: this.$constants.dialog_margin_top,
      targetTypeSelectOptions: [],
      defaultMonitorDatas: [],
      pointTaskTableForm: {
        pointTaskTableData: [
          /*{
            city: "360100",
            city__dsp: "南昌市",
            district: "360100",
            district__dsp: "南昌市",
            districtArray: "360100",
            targetType: "1",
            targetType__dsp: "粮食批发市场",
            perform__dsp: "安源区粮食局",
            samplingOrgName: "安源区粮食局",
            samplingOrgId: "1035",
            qaOrgId: "91",
            qaOrgName: "江西省粮油产品质量检测站",
            taskNum: 1,
            numSum: 2,
            grainBreedNums: {
              "85": {
                id: "85",
                name: "早籼谷",
                productName: "稻谷",
                productId: "1",
                requestId: "2182",
                num: 1
              },
              "90": {
                id: "90",
                name: "玉米",
                productName: "玉米",
                productId: "4",
                requestId: "2183",
                num: 1
              }
            }
          },
          {
            city: "360100",
            city__dsp: "南昌市",
            district: "360100",
            district__dsp: "南昌市",
            districtArray: "360100",
            targetType: "1",
            targetType__dsp: "粮食批发市场",
            perform__dsp: "安源区粮食局",
            samplingOrgName: "安源区粮食局",
            samplingOrgId: "1035",
            qaOrgId: "91",
            qaOrgName: "江西省粮油产品质量检测站",
            taskNum: 1,
            numSum: 2,
            grainBreedNums: {
              "85": {
                id: "85",
                name: "早籼谷",
                productName: "稻谷",
                productId: "1",
                requestId: "2182",
                num: 1
              },
              "90": {
                id: "90",
                name: "玉米",
                productName: "玉米",
                productId: "4",
                requestId: "2183",
                num: 1
              }
            }
          },
          {
            city: "360100",
            city__dsp: "南昌市",
            district: "360100",
            district__dsp: "南昌市",
            districtArray: "360100",
            targetType: "3",
            targetType__dsp: "军粮供应企业",
            perform__dsp: "安源区粮食局",
            samplingOrgName: "安源区粮食局",
            samplingOrgId: "1035",
            qaOrgId: "91",
            qaOrgName: "江西省粮油产品质量检测站",
            taskNum: 1,
            numSum: 2,
            grainBreedNums: {
              "85": {
                id: "85",
                name: "早籼谷",
                productName: "稻谷",
                productId: "1",
                requestId: "2182",
                num: 1
              },
              "90": {
                id: "90",
                name: "玉米",
                productName: "玉米",
                productId: "4",
                requestId: "2183",
                num: 1
              }
            }
          },
          {
            city: "360200",
            city__dsp: "景德镇市",
            district: "360200",
            district__dsp: "景德镇市",
            districtArray: "360200",
            targetType: "1",
            targetType__dsp: "粮食批发市场",
            perform__dsp: "安源区粮食局",
            samplingOrgName: "安源区粮食局",
            samplingOrgId: "1035",
            qaOrgId: "91",
            qaOrgName: "江西省粮油产品质量质检站",
            taskNum: 1,
            numSum: 2,
            grainBreedNums: {
              "85": {
                id: "85",
                name: "早籼谷",
                productName: "稻谷",
                productId: "1",
                requestId: "2182",
                num: 1
              },
              "90": {
                id: "90",
                name: "玉米",
                productName: "玉米",
                productId: "4",
                requestId: "2183",
                num: 1
              }
            }
          }*/
        ]
      },
      area_tableData: [],
      disabledBatchBtn: true,
      selectedTasks: [], //当前选中的表格行数据
      planGrainBreedTypes: [], // [{ id: "", name: "" ,productName:"",requestId:}]
      grainBreedInfos: {}, //{id:{ id: "", name: "" ,productName:"",requestId:}}
      diaLog_creatMonitor: false,
      dialog_chose_sampler: false,
      dialog_chose_checker: false
    };
  },
  props: {
    qasPlanId: {
      required: true
    }
  },
  methods: {
    setDefaultValue(qasPlanId) {
      this.setTableDistrictOptions();
      // 获取监测对象可选值
      this.$Api.getDic("qas_market_target_type").then(data => {
        if (data && data.length > 0) {
          this.targetTypeSelectOptions = data;
        } else {
          this.targetTypeSelectOptions = [];
        }
        // 获取计划中的所有品种
        if (qasPlanId) {
          this.$Api
            .getPlanGrainBreedType({ qasPlanId: qasPlanId })
            .then(data => {
              if (data) {
                let breedNameTypes = []; //{ id: "", name: "" ,productName:""，productId}
                let grainBreedInfos = {};
                for (let index in data) {
                  let product = data[index];
                  let breeds = product.commonEntityList;
                  if (breeds) {
                    for (let i in breeds) {
                      let item = breeds[i];
                      let pair = {
                        id: item.value,
                        name: item.label,
                        productName: product.label,
                        productId: product.value,
                        requestId: item.value3
                      };
                      //debugger;
                      ///if (breedNameTypes.indexOf(pair) == -1) { // 万一出现错误业务数据(同一个品种对应了多条质检样品要求表数据)，会出现统计数据错误(大于实际数量)
                      if (!grainBreedInfos.hasOwnProperty(pair.id)) {
                        breedNameTypes.push(pair);
                        grainBreedInfos[pair.id] = pair;
                      }
                    }
                  }
                }
                this.planGrainBreedTypes = breedNameTypes;
                this.grainBreedInfos = grainBreedInfos;
                // 设置默认创建的任务 必须在请求返回之后 需要用到之前获取的数据
                this.setDefaultMontorData();
                this.generateDefaultTask();
              }
            });
        }
      });
    },
    tableSpanMethod({ row, columnIndex }) {
      // row, column, rowIndex, columnIndex
      if (columnIndex === 1) {
        //debugger;
        let param = {
          rowspan: 0,
          colspan: 0
        };
        if (row.cityRowNum) {
          param.rowspan = row.cityRowNum;
          param.colspan = 1;
        }
        //console.log("rowIndex:" + rowIndex + "," + JSON.stringify(param) + ";");
        return param;
      }
    },
    saveMarketMontor() {
      const monitor = this.$refs.createMarketMonitorLink;
      monitor.$refs["pointTaskTableForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        let newValue = monitor.taskForm;
        this.addMarketMontorToTable(newValue);
        this.diaLog_creatMonitor = false;
      });
    },
    addMarketMontorToTable(montorData) {
      if (montorData) {
        let row = this.changeMonitorToTableValue(montorData);
        let tableData = this.pointTaskTableForm.pointTaskTableData;
        if (tableData.length <= 0) {
          tableData.push(row);
        } else {
          let length = tableData.length;
          let flag = true;
          for (let i = length - 1; i >= 0; i--) {
            let exits = tableData[i];
            let group = exits.city == row.city;
            if (group) {
              flag = false;
              tableData.splice(i + 1, 0, row);
              break;
            }
          }
          if (flag) {
            tableData.push(row);
          }
        }
      }
    },
    setDefaultMontorData() {
      // 传入的城市信息为市级
      let datas = [];
      let user = this.$store.getters.get_userInfo;
      if (user) {
        let city = user.distrinct;
        //let city = "360100";
        let city__dsp = this.$Api.getDistrictDspByCode(
          city,
          this.area_tableData
        );
        if (
          city.length === 6 &&
          city.substr(2, 2) != "00" &&
          city.substr(4) === "00"
        ) {
          let cityArray = [city];
          this.targetTypeSelectOptions.forEach(item => {
            // item, index, array
            let temp = {
              city: { value: city, text: city__dsp },
              cityArray: cityArray, //从市开始的值数组
              targetType: { value: item.value, text: item.text },
              performOrg: { value: user.orgId, text: user.orgName },
              performPeople: { value: "", text: "" },
              qaOrg: { value: user.orgId, text: user.orgName },
              performCal: user.orgName //最终的执行单位/人显示值
            };
            datas.push(temp);
          });
        }
      }
      this.defaultMonitorDatas = datas;
    },
    generateDefaultTask() {
      if (this.defaultMonitorDatas && this.defaultMonitorDatas.length > 0) {
        this.defaultMonitorDatas.forEach(item => {
          this.addMarketMontorToTable(item);
        });
      }
    },
    changeMonitorToTableValue(monitorValue) {
      let row = {};
      row.city = monitorValue.city.value;
      row.city__dsp = monitorValue.city.text;
      row.district = row.city;
      row.district__dsp = row.city__dsp;
      row.districtArray = monitorValue.cityArray;
      if (monitorValue.cityArray.length > 1) {
        row.districtArray =
          monitorValue.cityArray[monitorValue.cityArray.length - 1];
      }
      row.targetType = monitorValue.targetType.value;
      row.targetType__dsp = monitorValue.targetType.text;
      row.perform__dsp = "";
      row.samplingOrgName = "";
      if (monitorValue.performOrg) {
        row.samplingOrgId = monitorValue.performOrg.value;
        row.samplingOrgName = monitorValue.performOrg.text;
      }
      if (monitorValue.performPeople && monitorValue.performPeople.value) {
        row.performerId = monitorValue.performPeople.value;
        row.performerId__dsp = monitorValue.performPeople.text;
        row.perform__dsp = row.performerId__dsp;
      } else {
        row.perform__dsp = row.samplingOrgName;
      }

      if (monitorValue.qaOrg) {
        row.qaOrgId = monitorValue.qaOrg.value;
        row.qaOrgName = monitorValue.qaOrg.text;
      }
      row.taskNum = 1;
      let breeds = {};
      for (let index in this.planGrainBreedTypes) {
        let breed = this.planGrainBreedTypes[index];
        breed = JSON.parse(JSON.stringify(breed));
        breed.num = 1;
        breeds[breed.id] = breed;
      }
      row.numSum = this.planGrainBreedTypes.length;
      row.grainBreedNums = breeds;
      return row;
    },
    genereTaskByTableDate(tableData) {
      let tasks = [];
      if (tableData) {
        for (let index in tableData) {
          let item = tableData[index];
          let temp = JSON.parse(JSON.stringify(item));
          let district = temp.districtArray;
          if (district && district instanceof Array) {
            if (district.length > 0) {
              temp.district = district[district.length - 1];
            } else {
              delete temp.district;
              delete temp.district__dsp;
            }
          }
          let grainBreedNums = temp.grainBreedNums;
          delete temp.grainBreedNums;
          for (let i in grainBreedNums) {
            let breed = grainBreedNums[i];
            let task = JSON.parse(JSON.stringify(temp));
            task.grainbreedId = breed.id;
            task.grainbreedName = breed.name;
            task.sampleCopyNum = 1;
            task.taskNum = breed.num;
            let breedStaticInfo = this.grainBreedInfos[task.grainbreedId];
            //debugger;
            task.productName = breedStaticInfo.productName;
            task.qasPlanId = this.qasPlanId;
            task.qasPlanSampleRequestId = breedStaticInfo.requestId;
            tasks.push(task);
          }
        }
      }
      return tasks;
    },
    setTableDistrictOptions() {
      this.area_tableData = this.$store.getters.get_areaLevel;
    },
    generateTableDistrictOptions(city) {
      //debugger;
      if (!city) {
        return this.area_tableData;
      }
      let tree = this.$Api.getDistrictTreeByNode(city, this.area_tableData);
      return tree;
    },
    generateTableShowDate(tableData) {
      let showData = [];
      if (tableData && tableData.length > 0) {
        // 生成表格视图数据
        for (let index in tableData) {
          let temp = tableData[index];
          let grainBreedNums = temp.grainBreedNums;
          let sum = 0;
          for (let i in grainBreedNums) {
            let breed = grainBreedNums[i];
            sum += breed.num;
          }
          let row = {
            isCalRow: false,
            city: temp.city,
            city__dsp: temp.city__dsp,
            targetType: temp.targetType,
            targetType__dsp: temp.targetType__dsp,
            perform__dsp: temp.perform__dsp,
            qaOrgName: temp.qaOrgName,
            numSum: sum,
            relationRowIndex: index,
            cityRowNum: 0
          };
          showData.push(row);
        }
        let insertCalRow = this.getInsertCalRowData(tableData);
        // 合并市
        let citySpans = {}; //{cityid:{num:行数；position:原始数据下标}}
        for (let i in insertCalRow) {
          let elem = insertCalRow[i];
          let position = parseInt(elem.point);
          let cityId = elem.row.city;
          let rowNum = parseInt(elem.row.cityRowNum);
          if (!citySpans[cityId]) {
            citySpans[cityId] = { num: rowNum + 1, position: position };
          } else {
            citySpans[cityId].num += rowNum + 1;
          }
        }
        if (insertCalRow) {
          let length = insertCalRow.length;
          for (let i = length - 1; i >= 0; i--) {
            let data = insertCalRow[i];
            let insertIndex = parseInt(data.point);
            let insertRow = data.row;
            let city = insertRow.city;
            //let spanRowNum = parseInt(insertRow.cityRowNum); // 同类型条数
            insertRow.cityRowNum = 0;
            // 设置统计行的城市合并行数
            if (citySpans[city] && citySpans[city].position == insertIndex) {
              insertRow.cityRowNum = citySpans[city].num;
            }
            // 插入统计行
            showData.splice(insertIndex, 0, insertRow);
            // 设置行合并参数
            //let spanRowIndex = insertIndex + spanRowNum;
            //showData[insertIndex].cityRowNum = spanRowNum + 1;
          }
        }
      }
      return showData;
    },
    /**
     * 获取插入的统计行数据
     * @param {Array} tableData 生成表格视图的源数据
     * @return {Array} 返回插入的统计数据，数组类型 每个元素为一个对象{point:插入位置的数组下标，row:{插入的行数据}}，插入位置从小到大排列
     * */
    getInsertCalRowData(tableData) {
      // 统计行模板
      let grainBreedNums = {}; //{grainid1:0,grianid2:0}
      for (let i in this.planGrainBreedTypes) {
        // [{ id: "", name: "" ,productName:"",requestId:}]
        grainBreedNums[this.planGrainBreedTypes[i].id] = 0;
      }
      let sumRow = {
        isCalRow: true,
        city: "",
        city__dsp: "",
        targetType: "",
        perform__dsp: "小计",
        numSum: 0,
        grainBreedNums: grainBreedNums,
        cityRowNum: 0 // 同组数据个数，不包含插入的统计行
      };
      let insetRow = {
        point: "",
        row: sumRow
      };
      // 统计行
      let insetRows = []; //[{point:插入位置的数组下标，row:{插入的行数据},....] 下标从大往小排列 避免后续下标值变化导致的错误
      let currentCalRow = JSON.parse(JSON.stringify(insetRow));
      currentCalRow.point = 0;
      currentCalRow.row.city = tableData[0].city;
      currentCalRow.row.city__dsp = tableData[0].city__dsp;
      currentCalRow.row.targetType = tableData[0].targetType;
      currentCalRow.row.cityRowNum = 0;
      insetRows.push(currentCalRow);
      for (let i in tableData) {
        let row = tableData[i];
        let city = row.city;
        let targetType = row.targetType;
        let breeds = row.grainBreedNums;
        let sameType =
          city == currentCalRow.row.city &&
          targetType == currentCalRow.row.targetType;
        if (!sameType) {
          // 非当前组
          currentCalRow = JSON.parse(JSON.stringify(insetRow));
          currentCalRow.point = i;
          currentCalRow.row.city = city;
          currentCalRow.row.city__dsp = row.city__dsp;
          currentCalRow.row.targetType = targetType;
          currentCalRow.row.cityRowNum = 0;
          insetRows.push(currentCalRow);
        }
        // 必须放在数据重置后面
        let sum = 0;
        for (let i in this.planGrainBreedTypes) {
          let breedId = this.planGrainBreedTypes[i].id;
          let num = parseInt(breeds[breedId].num);
          if (num) {
            currentCalRow.row.grainBreedNums[breedId] += num;
            sum += num;
          }
        }
        currentCalRow.row.numSum += sum;
        //统计表格合并数据
        currentCalRow.row.cityRowNum++;
      }
      return insetRows;
    },
    selectionRowsChange(val) {
      this.disabledBatchBtn = val.length > 0 ? false : true;
      this.selectedTasks = [];
      val.forEach(item => {
        if (!item.isCalRow) {
          //用item操作每一条数据。
          this.selectedTasks.push({ position: item.relationRowIndex }); //position参数为表格源数据对应的下标位置
        }
      });
    },
    copy_row(rowindex, rowData) {
      let dataIndex = rowData.relationRowIndex;
      let insertRow = this.pointTaskTableForm.pointTaskTableData[dataIndex];
      insertRow = JSON.parse(JSON.stringify(insertRow));
      if (dataIndex == this.pointTaskTableForm.pointTaskTableData.length - 1) {
        this.pointTaskTableForm.pointTaskTableData.push(insertRow);
      } else {
        this.pointTaskTableForm.pointTaskTableData.splice(
          dataIndex + 1,
          0,
          insertRow
        );
      }
    },
    delete_row(rowindex, rowData) {
      let dataIndex = rowData.relationRowIndex;
      this.pointTaskTableForm.pointTaskTableData.splice(dataIndex, 1);
    },
    batchUpdatePerform(performInfo) {
      let selectRow = this.selectedTasks;
      let sourceData = this.pointTaskTableForm.pointTaskTableData;
      let length = selectRow.length;
      for (let i = length - 1; i >= 0; i--) {
        let dataPosition = selectRow[i].position;
        let row = sourceData[dataPosition];
        row.perform__dsp = "";
        row.samplingOrgId = "";
        row.samplingOrgName = "";
        row.performerId = "";
        row.performerId__dsp = "";
        if (performInfo.samplingOrgId) {
          row.samplingOrgId = performInfo.samplingOrgId;
          row.samplingOrgName = performInfo.samplingOrgName;
        }
        if (performInfo.performerId) {
          row.performerId = performInfo.performerId;
          row.performerId__dsp = performInfo.performerName;
          row.perform__dsp = row.performerId__dsp;
        } else {
          row.perform__dsp = row.samplingOrgName;
        }
      }
      this.dialog_chose_sampler = false;
    },
    batchUpdateCheck(checkInfo) {
      let selectRow = this.selectedTasks;
      let sourceData = this.pointTaskTableForm.pointTaskTableData;
      let length = selectRow.length;
      for (let i = length - 1; i >= 0; i--) {
        let dataPosition = selectRow[i].position;
        let row = sourceData[dataPosition];
        if (checkInfo.qaOrgId) {
          row.qaOrgId = checkInfo.qaOrgId;
          row.qaOrgName = checkInfo.qaOrgName;
        }
      }
      this.dialog_chose_checker = false;
    },
    batchAction(commond) {
      let selectRow = this.selectedTasks;
      let sourceData = this.pointTaskTableForm.pointTaskTableData;
      let length = selectRow.length;
      switch (commond) {
        case "delete":
          for (let i = length - 1; i >= 0; i--) {
            let dataPosition = selectRow[i].position;
            sourceData.splice(dataPosition, 1);
          }
          break;
        case "tosampler": //分配执行人
          this.dialog_chose_sampler = true;
          break;
        case "tochecker": //分配质检人
          this.dialog_chose_checker = true;
          break;
        default:
          break;
      }
    },
    districtChange(checkValue, sourceDataIndex) {
      //debugger;
      let vm = this.$refs["cascaderAddr" + sourceDataIndex];
      if (!vm) {
        console.error("绑定地区描述时获取不到下拉框实例");
        return;
      }
      if (this.pointTaskTableForm.pointTaskTableData[sourceDataIndex]) {
        let lable = this.computePresentText(checkValue, vm);
        this.pointTaskTableForm.pointTaskTableData[
          sourceDataIndex
        ].district__dsp = lable;
      } else {
        console.error("绑定地区描述字段时根据下标获取不到对应的数据");
      }
    },
    computePresentText(checkedValue, CascaderVm) {
      let value = CascaderVm.checkedValue;
      let config = CascaderVm.config;
      if (!this.isEmpty(value)) {
        const node = CascaderVm.panel.getNodeByValue(value);
        if (node && (config.checkStrictly || node.isLeaf)) {
          return node.getText(CascaderVm.showAllLevels, CascaderVm.separator);
        }
      }
      return "";
    },
    isEmpty(val) {
      // null or undefined
      if (val == null) return true;

      if (typeof val === "boolean") return false;

      if (typeof val === "number") return !val;

      if (val instanceof Error) return val.message === "";

      switch (Object.prototype.toString.call(val)) {
        // String or Array
        case "[object String]":
        case "[object Array]":
          return !val.length;

        // Map or Set or File
        case "[object File]":
        case "[object Map]":
        case "[object Set]": {
          return !val.size;
        }
        // Plain Object
        case "[object Object]": {
          return !Object.keys(val).length;
        }
      }

      return false;
    },
    setRowSelectable(row) {
      if (row.isCalRow) {
        return false;
      }
      return true;
    }
  },
  watch: {
    /*qasPlanId: {
      handler(newValue) {
        this.setDefaultValue(newValue);
      },
      immediate: true
    }*/
  },
  computed: {
    pointTask: function() {
      let tableData = this.pointTaskTableForm.pointTaskTableData;
      return this.genereTaskByTableDate(tableData);
    },
    tableShowData() {
      let tableData = this.pointTaskTableForm.pointTaskTableData;
      return this.generateTableShowDate(tableData);
    }
  },
  mounted: function() {
    this.setDefaultValue(this.qasPlanId);
  }
};
</script>
