// table上方操作按钮
import operateButtonsObj from "@/utils/formSettingsJson/operateButton/targetManage/testCheckTargetMng/operateButtonSettings.js";
// table表头信息设置
import {
  schemeTableHeader,
  quoteSchemeTableHeader,
  quoteSchemeDetailTableHeader,
  schemeDetailTableHeader
} from "@/utils/formSettingsJson/table/targetManage/checkTargetMng/tableHeaderSettings.js";

// 搜索栏
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/targetManage/checkTargetMng/searchSettings.js";
// 弹框设置
import {
  schemeContentItems,
  addSchemeContentButton,
  editSchemeContentButton,
  kpiContentItems,
  addKpiItemButton,
  dataSetContentItems,
  dataSetContentButton,
  consultDateContentItems,
  consultDateContentButton,
  // evaluationContentItems,
  evaluationContentButton
} from "@/utils/formSettingsJson/dialog/targetManage/checkTargetMng/dialogSettings.js";
import {
  schemeFormItem,
  assignCityItem,
  assignKpiButton
} from "@/utils/formSettingsJson/dialog/common/dialogSettings.js";
// 校验规则
import schemeSetRule from "@/utils/formRulesJson/targetSetManage/targetSetRule";
const data = function(vm) {
  let routeArr = vm.$route.fullPath.split("/"),
    pageType = routeArr[routeArr.length - 1];
  let obj = {
    // 页面类型
    pageType: pageType,
    // table上方操作按钮
    operateButtons: operateButtonsObj,
    // 搜索栏
    searchFormItemsData: searchFormItems,
    searchFormBtns: searchFormBtns,
    // 数据项设定
    dataSetContentButton: dataSetContentButton,
    dataSetContentItems: dataSetContentItems,
    // 特殊项数据保存
    specialSettingValue: null,
    // 搜索栏
    searchFormItems: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {
        issueNo: (new Date().getFullYear() + 1).toString()
      },
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtonsObj[pageType]
    },
    /**
     *  考核方案
     */
    // 添加考核方案的类型， 分新增和引用
    addSchemeType: "add",
    schemeContentItems: schemeContentItems,
    addSchemeContentButton: addSchemeContentButton,
    editSchemeContentButton: editSchemeContentButton,
    // 新增考核方案弹框
    schemeOperateDialog: {
      dialogVisible: false,
      dialogName: "新增考核方案",
      formButtonList: []
    },
    schemeFormOperateSettings: {
      fullScreen: true,
      formGroupList: schemeContentItems,
      formGroupValues: {},
      formButtonList: [],
      rules: schemeSetRule
    },
    schemeTreeOperateSettings: {
      // 菜单树 设置
      treeData: [],
      expandAll: false,
      nodeKey: "id",
      nodeExpand: false,
      defaultProps: {
        children: "children",
        label: "text"
      },
      treeWithCheckbox: true,
      checkedTreeData: [],
      treeButtons: []
    },
    /**
     * 新增 编辑指标的配置项
     */
    // 当前方案的机构id
    assessOrgId: "",
    kpiContentItems: kpiContentItems,
    addKpiItemButton: addKpiItemButton,
    // 分配
    schemeFormItem: schemeFormItem,
    assignCityItem: assignCityItem,
    assignKpiButton: assignKpiButton,
    // 开始征询时间设置
    consultDateContentItems: consultDateContentItems,
    consultDateContentButton: consultDateContentButton,
    // 开启自评
    // evaluationContentItems: evaluationContentItems,
    evaluationContentButton: evaluationContentButton,
    //  公用弹框
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "考核内容",
      dialogType: "formBlocks",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: [],
        formButtonList: [],
        rules: schemeSetRule
      }
    },
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: schemeTableHeader,
        treeProps: {
          children: "children",
          hasChildren: "hasChildren"
        }
      }
    },
    // 表格
    quoteSchemeTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        isMultipleTable: true,
        headerOptions: quoteSchemeTableHeader
      }
    },
    // 选中方案的id
    selectSchemeId: [],
    quoteSchemePaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 引用方案详情弹框
    quoteSchemeDetailDialog: {
      dialogVisible: false,
      dialogName: "详情",
      formButtonList: [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: "",
          postUrl: ""
        }
      ]
    },
    // 方案详情表格
    quoteSchemeDetailTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: quoteSchemeDetailTableHeader
      }
    },
    /**
     *  考核方案详情弹框
     */
    schemeDetailDialog: {
      dialogVisible: false,
      dialogName: "方案详情",
      formButtonList: [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: "",
          postUrl: ""
        }
      ]
    },
    schemeDetailFormSettings: {
      fullScreen: true,
      formGroupList: [],
      formGroupValues: {},
      formButtonList: []
    },
    schemeDetailTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        headerOptions: schemeDetailTableHeader
      }
    }
  };
  return obj;
};
export default data;
