<template>
  <div class="pr10 pl10 width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          ref="searchForm"
          :formGroupSettings="searchFormItems"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <div class="width100 fontSize24 textAlignCenter mb30">
      各市县{{ currentYear }}年度考核指标评分对照表
      <span class="fontSize16">(单位：分)</span>
    </div>
    <vChart
      class="width100"
      :options="barOptions"
      autoresize
      theme="light"
    ></vChart>
    <div class="width100 fontSize24 textAlignCenter mt30 mb20">
      各市县{{ currentYear }}年度考核指标评分排名表(按照评分从高到低排列)
      <span class="fontSize16">(单位：分)</span>
    </div>
    <tableList
      :tablelistSettings="tablelistSettingsCurrent"
      @handleTableItem="handleTableItem"
    />
    <!--预览-->
    <el-dialog
      title="预览"
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
import searchFormItemlist from "@/utils/formSettingsJson/poolAnalysis/distributeSuperviseSummary/search/searchItems.json";
import searchFormButtonlist from "@/utils/formSettingsJson/poolAnalysis/distributeSuperviseSummary/search/buttons.json";

export default {
  name: "distributeSuperviseSummary",
  data() {
    return {
      currentYear: "2020",
      // 搜索栏
      searchFormItems: {
        fullScreen: false,
        formGroupList: searchFormItemlist,
        formGroupValues: {
          year: "2020"
        },
        formButtonList: searchFormButtonlist
      },
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
    handleSearchFormBtn(button, data) {
      this.currentYear = data.year;
    },
    initTable() {
      let rowdata3 = { id: "2019" },
        sourcedata = this.$globalFnc.deepCopy(this.barOptions.dataset.source);
      sourcedata.shift();
      sourcedata.map((item, index) => {
        let header = {
          lable: item[0],
          prop: "item" + index,
          clickVarKey: "id",
          clickType: index,
          clickable: index >= 1
        };
        this.tablelistSettings.tableSettingOptions.headerOptions.push(header);
        rowdata3["item" + index] = item[1];
      });
      this.tablelistSettings.tableDatas.push(rowdata3);
      this.initSortTable(
        this.tablelistSettings.tableSettingOptions.headerOptions,
        this.tablelistSettings.tableDatas[0],
        "tablelistSettingsCurrent",
        "2019"
      );
    },
    initSortTable(header, tabledata, name, year) {
      let tHeader = this.$globalFnc.deepCopy(header),
        tdata = this.$globalFnc.deepCopy(tabledata);
      tHeader.map(headItem => {
        headItem.clickable = true;
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
      // this.dialogPreviewExportTitle = `${this.tablelistSettings.tableSettingOptions.headerOptions[type].lable}${id}年度落实粮食安全市县长责任制自查评分表`;
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
