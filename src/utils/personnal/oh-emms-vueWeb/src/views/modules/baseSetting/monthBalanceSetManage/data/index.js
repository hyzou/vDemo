// 搜索
import {
  monthBalanceFormBtns,
  monthBalanceFormItems
} from "@/utils/formSettingsJson/search/baseSetting/monthBalanceSetManage";
// table表头信息设置
import { tableHeader } from "@/utils/formSettingsJson/table/baseSetting/monthBalanceSetManage";
const data = function(vm) {
  let obj = {
    monthBalanceFormItems: monthBalanceFormItems,
    monthBalanceFormSettings: {
      fullScreen: false,
      formGroupList: monthBalanceFormItems,
      formGroupValues: {},
      formButtonList: monthBalanceFormBtns
    },
    url: "",
    // table表格配置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "docNo",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: tableHeader
      }
    },
    // 分页配置
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    }
  };
  return obj;
};
export default data;
