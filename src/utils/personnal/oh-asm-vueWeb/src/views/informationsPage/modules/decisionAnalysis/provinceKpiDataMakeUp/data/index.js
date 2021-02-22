import getBar from "../echartSettings";

// import tableHeader from "@/utils/formSettingsJson/poolAnalysis/itemParamsSummary/table/tableHeader.json";

const data = function(vm) {
  let obj = {
    // 指标数据详情
    detailData: {},
    standardItemData: "",
    standardItemName: "",
    standardItemUnit: "",
    standardItemObject: {},
    // 标题
    itemParamsTitle: "",
    // 显示表格
    showChart: false,
    // 图形配置
    barOptions: getBar(),
    // table配置
    tablelistPlanSettings: {
      tableDatas: [],
      tableSettingOptions: {
        tooltipEffect: "dark",
        rowKey: "id",
        border: true,
        headerOptions: [
          { prop: "name", lable: "名称" },
          { prop: "value", lable: "数值" }
        ]
      }
    }
  };
  return obj;
};
export default data;
