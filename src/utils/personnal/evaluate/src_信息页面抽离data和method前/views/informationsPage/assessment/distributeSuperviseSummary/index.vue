<template>
  <div class="pt10 pr10 pl10 width100">
    <div class="width100 fontSize24 textAlignCenter mb30">
      各市县近三年年度考核指标评分对照表
    </div>
    <vChart
      class="width100"
      :options="barOptions"
      autoresize
      theme="light"
    ></vChart>
    <div class="width100 fontSize24 textAlignCenter mt30 mb20">
      各市县2019年度考核指标评分排名表(按照评分从高到低排列)
    </div>
    <tableList :tablelistSettings="tablelistSettingsCurrent" />
    <div class="width100 fontSize24 textAlignCenter mt30 mb20">
      各市县2018年度考核指标评分排名表(按照评分从高到低排列)
    </div>
    <tableList :tablelistSettings="tablelistSettingsPrew" />
    <div class="width100 fontSize24 textAlignCenter mt30 mb20">
      各市县2017年度考核指标评分排名表(按照评分从高到低排列)
    </div>
    <tableList :tablelistSettings="tablelistSettingsReprew" />
    <div class="width100 fontSize24 textAlignCenter mt30 mb20">
      各市县近三年年度考核指标评分表
    </div>
    <tableList
      class="mt30"
      :tablelistSettings="tablelistSettings"
      @handleTableItem="handleTableItem"
    />
    <!--预览及导出-->
    <el-dialog
      title="预览及导出"
      :visible.sync="dialogPreviewExportVisible"
      width="70%"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <el-row class="mb10">
        <el-col :span="22" class="textAlignCenter" style="font-size: 24px;">
          {{ dialogPreviewExportTitle }}
        </el-col>
        <el-col :span="2" class="textAlignRight">
          <el-button type="primary">导出</el-button>
        </el-col>
      </el-row>
      <tableList :tablelistSettings="previewTableSettings" />
    </el-dialog>
  </div>
</template>

<script>
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/dataset";

import getBar from "./echartSettings";

import previewTableHeader from "@/utils/formSettingsJson/informationsPage/assessment/distributeSuperisePreviewTableHeader.json";

export default {
  name: "distributeSuperviseSummary",
  data() {
    return {
      dialogPreviewExportTitle:
        "杭州市2019年度落实粮食安全市县长责任制自查评分表",
      dialogPreviewExportVisible: false,
      barOptions: getBar(),
      // table 表格配置
      tablelistSettingsCurrent: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          headerOptions: []
        }
      },
      // table 表格配置
      tablelistSettingsPrew: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          headerOptions: []
        }
      },
      // table 表格配置
      tablelistSettingsReprew: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          headerOptions: []
        }
      },
      // table 表格配置
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          headerOptions: []
        }
      },
      previewTableSettings: {
        dialogFormClassName: "min",
        tableDatas: [],
        tableSettingOptions: {
          ref: "target",
          tooltipEffect: "dark",
          rowKey: "assessmentId",
          border: true,
          headerOptions: previewTableHeader,
          isShowIndex: false
        }
      }
    };
  },
  methods: {
    initTable() {
      let rowdata1 = { id: "2017" },
        rowdata2 = { id: "2018" },
        rowdata3 = { id: "2019" };
      this.barOptions.dataset.source.map((item, index) => {
        let header = {
          lable: item[0],
          prop: "item" + index,
          clickVarKey: "id",
          clickType: index,
          clickable: index >= 1
        };
        this.tablelistSettings.tableSettingOptions.headerOptions.push(header);
        rowdata1["item" + index] = item[3];
        rowdata2["item" + index] = item[2];
        rowdata3["item" + index] = item[1];
      });
      this.tablelistSettings.tableDatas.push(rowdata3, rowdata2, rowdata1);
      this.initSortTable(
        this.tablelistSettings.tableSettingOptions.headerOptions,
        this.tablelistSettings.tableDatas[0],
        "tablelistSettingsCurrent",
        "2019"
      );
      this.initSortTable(
        this.tablelistSettings.tableSettingOptions.headerOptions,
        this.tablelistSettings.tableDatas[1],
        "tablelistSettingsPrew",
        "2018"
      );
      this.initSortTable(
        this.tablelistSettings.tableSettingOptions.headerOptions,
        this.tablelistSettings.tableDatas[2],
        "tablelistSettingsReprew",
        "2017"
      );
    },
    initSortTable(header, tabledata, name, year) {
      let tHeader = this.$globalFnc.deepCopy(header),
        tdata = this.$globalFnc.deepCopy(tabledata);
      tHeader.map(headItem => {
        headItem.clickable = false;
        headItem.value = tdata[headItem.prop];
      });
      tHeader.sort(this.sortObjAttrFromBigToSmall("value"));
      let dataObj = { id: year };
      tHeader.map(item => {
        dataObj[item.prop] = item.value;
      });
      this[name].tableDatas.push(dataObj);
      this[name].tableSettingOptions.headerOptions = tHeader;
    },
    sortObjAttrFromBigToSmall(keyName) {
      return function(objectN, objectM) {
        var valueN = objectN[keyName];
        var valueM = objectM[keyName];
        if (valueN < valueM) return 1;
        else if (valueN > valueM) return -1;
        else return 0;
      };
    },
    handleTableItem(id, type, row, coldata) {
      console.log(id, type, row, coldata);
      this.dialogPreviewExportTitle = `${this.tablelistSettings.tableSettingOptions.headerOptions[type].lable}${id}年度落实粮食安全市县长责任制自查评分表`;
      this.dialogPreviewExportVisible = true;
    },
    setTableList() {
      this.totalScore = 0;
      this.totalSelfScore = 0;
      let assessmentResult = this.$store.getters[
        "assessment/getAssessmentResult"
      ];
      let list = this.$store.getters["assessment/getAssessmentList"];
      list.map(item => {
        this.totalScore += parseFloat(item.targetScore, 2);
        this.totalSelfScore += parseFloat(
          item.selfScore ? item.selfScore : 0,
          2
        );
        item.operateBtns = [];
        if (
          assessmentResult[item.assessmentId] &&
          assessmentResult[item.assessmentId]["citySelf"]
        ) {
          item.selfName =
            assessmentResult[item.assessmentId]["citySelf"].selfName;
          item.checkName =
            assessmentResult[item.assessmentId]["citySelf"].checkName;
          item.status = "complete";
        }
        if (
          assessmentResult[item.assessmentId] &&
          assessmentResult[item.assessmentId]["cityOpinion"]
        ) {
          item.opinion =
            assessmentResult[item.assessmentId]["cityOpinion"].opinion;
          item.material =
            assessmentResult[item.assessmentId]["cityOpinion"].material;
        }
        // if (!item.cityLeadDepartmentId && item.status !== "reported") {
        //   item.operateBtns.push({
        //     styleType: "primary",
        //     type: "distribute",
        //     text: "分配"
        //   });
        // }
        // item.operateBtns.push({
        //   styleType: "text",
        //   type: "preview",
        //   text: "查看"
        // });
        return item;
      });
      this.previewTableSettings.tableDatas = [];
      this.previewTableSettings.tableDatas = list;
    }
  },
  mounted() {
    this.initTable();
    this.setTableList();
  }
};
</script>

<style scoped></style>
