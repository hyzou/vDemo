// table表头信息设置
import tableHeader from "@/utils/formSettingsJson/systemSetting/clearCacheSet/table/tableHeader.json";

const data = function(vm) {
  let obj = {
    // table表格配置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: tableHeader
      }
    }
    // 分页配置
    // paginationSettings: {
    //   currentPage: 1,
    //   totalNumbers: 0
    // }
  };
  return obj;
};
export default data;
