// 表格的头部
import { tableHeaderSettings } from "@/utils/formSettingsJson/table/randomSupervisionCheck/tableSettings.js";
// 对话框配置
import {
  addRandomItemDialogBtns,
  addRandomItemDialogItems
} from "@/utils/formSettingsJson/dialog/randomSupervisionCheck/add/dialogSettings.js";
import {
  updateRandomItemDialogBtns,
  updateRandomItemDialogItems
} from "@/utils/formSettingsJson/dialog/randomSupervisionCheck/update/dialogSettings.js";
import {
  checkRandomItemDialogBtns,
  checkRandomItemDialogItems
} from "@/utils/formSettingsJson/dialog/randomSupervisionCheck/check/dialogSettings.js";
// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/randomSupervisionCheck/searchSettings.js";
// 按钮组
import { operateBtns } from "@/utils/formSettingsJson/operateButton/randomSupervisionCheck/buttonSettings.js";
// 校验规则
import dialogSetRule from "@/utils/formRulesJson/dbRandomCheck/randomSupervisionCheck/dialog";

const data = function(vm) {
  let obj = {
    dialogSetRule: dialogSetRule,
    addRandomItemDialogBtns: addRandomItemDialogBtns,
    addRandomItemDialogItems: addRandomItemDialogItems,
    updateRandomItemDialogBtns: updateRandomItemDialogBtns,
    updateRandomItemDialogItems: updateRandomItemDialogItems,
    checkRandomItemDialogBtns: checkRandomItemDialogBtns,
    checkRandomItemDialogItems: checkRandomItemDialogItems,
    // 抽查范围下拉选项列表
    checkDistrictScope: [],
    // 抽查人员列表
    checkUserlist: [],
    // 抽查事项列表
    checkItems: [],
    // 弹框设置
    dialogFormSettings: {
      width: "70%",
      dialogFormVisible: false, //弹窗是否可见（开或关）
      dialogFormTitle: "检查方案", //弹窗标题
      dialogType: "form", //弹窗类型
      dialogFormItems: {
        formGroupList: addRandomItemDialogItems,
        formGroupValues: {
          orgId: vm.$store.getters["user/userInfos"].orgId
        },
        formButtonList: addRandomItemDialogBtns,
        rules: dialogSetRule
      }
    },
    // 搜索栏
    searchFormGroupSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateBtns
    },
    // 表格设置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "reviewProgressTable",
        tooltipEffect: "dark",
        rowKey: "id",
        border: true,
        headerOptions: tableHeaderSettings
      }
    },
    // 分页
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    nextText: "区/县",
    // 抽查循环函数
    randomFnc: null,
    // 抽查页面显示状态
    dialogVisible: false,
    // 抽查地区滚动状态
    scrollRun: false,
    // 抽查地区结果状态
    scrollResult: false,
    // 待抽取地区展示个数，最大值为3
    dataShowNumber: 3,
    // 待抽取地区列表
    datalist: [],
    // 抽取
    randomListData: [],
    // 查看当前行数据
    randomRowData: {},
    // 提交给接口：待抽查区域父级列表
    randomScopelist: [],
    // 抽查结果id列表
    randomResultIdlist: [],
    // 抽查结果全部信息列表
    randomResultlist: [],
    // 需要替换的地区id列表
    reRandomIdList: [],
    // 需要替换的地区全部信息列表
    reRandomList: [],
    // 当前抽查阶段
    stepNum: 1,
    // 抽查阶段对应的抽查数字映射
    stepLevel: {
      1: "cityNum",
      2: "countyNum",
      3: "townNum",
      4: "villageNum"
    },
    // 抽查总阶段数
    totalStepNumber: 1,
    // 报表服务器url
    reportServerUrl: "",
    // 显示报表服务器
    reportSeverShow: false
  };
  return obj;
};
export default data;
