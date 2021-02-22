// 搜索
import {
  searchFormBtns,
  searchFormItems,
  materialSearchFormItems,
  materialSearchFormBtns
} from "@/utils/formSettingsJson/search/planSetting/reservePlan";
// table 上方按钮
import {
  operateButtons,
  planDetailOperateButtons
} from "@/utils/formSettingsJson/operateButton/planSetting/reservePlan";
// table表头信息设置
import {
  tableHeader,
  materialTableHeader
} from "@/utils/formSettingsJson/table/planSetting/reservePlan";
// 储备计划表单
import {
  addReservePlanButton,
  editReservePlanButton,
  reservePlanContentItem,
  addMaterialButton
} from "@/utils/formSettingsJson/dialog/planSetting/reservePlan";
// 必填验证
import reservePlanRule from "@/utils/formRulesJson/planSetting/reservePlan";

const data = function(vm) {
  let obj = {
    // 搜索栏
    searchFormSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {},
      formButtonList: searchFormBtns
    },
    showSearchForm: true,
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
    },
    // 分页配置
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 表格上方头部设置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    // 储备计划
    addReservePlanButton: addReservePlanButton,
    editReservePlanButton: editReservePlanButton,
    reservePlanContentItem: reservePlanContentItem,
    // 新增编辑 储备计划 form 表单组
    reservePlanFormSettings: {
      fullScreen: true,
      formGroupList: reservePlanContentItem,
      formGroupValues: {
        planReserveDtls: [],
        created: new Date().getTime(),
        docNo: "系统自动生成",
        year: new Date().getFullYear() + ""
      },
      formButtonList: [],
      rules: reservePlanRule
    },
    reservePlanDialog: {
      dialogVisible: false,
      dialogName: "",
      formButtonList: []
    },
    planDetailOperateButtons: planDetailOperateButtons,
    planDetailOperateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: planDetailOperateButtons
    },
    planDetailTableSettings: {
      type: "inputTable",
      label: "",
      name: "planReserveDtls",
      span: 24,
      width: "0px",
      useType: "look",
      selection: true,
      headers: [
        {
          key: "materialTypeName",
          title: "物资类别",
          inputType: "input",
          disabled: true
        },
        {
          key: "code",
          title: "物资编码",
          inputType: "input",
          disabled: true
        },
        {
          key: "name",
          title: "物资名称",
          inputType: "input",
          disabled: true
        },
        {
          key: "unitName",
          title: "计量单位",
          inputType: "input",
          disabled: true
        },
        {
          key: "balanceNum",
          title: "上年度结余",
          inputType: "input",
          disabled: true
        },
        {
          key: "num",
          title: "计划储备",
          inputType: "input"
        }
      ],
      tableItems: {
        materialTypeName: "",
        code: "",
        basMaterialName: "",
        unitName: "",
        balanceNum: "",
        wmsBasStackId: ""
      }
    },
    addMaterialButton: addMaterialButton,
    // 物资选择弹框
    materialDetailDialog: {
      dialogVisible: false,
      dialogName: "",
      formButtonList: []
    },
    // 选中的要删除的计划明细数据
    selectPlanDetailData: [],
    // 选中的物资数据
    selectMaterialData: [],
    materialDetailTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        isMultipleTable: true,
        ref: "materialDetail",
        rowKey: "code",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: materialTableHeader
      }
    },
    materialPaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    materialSearchFormItems: materialSearchFormItems,
    materialSearchFormSettings: {
      fullScreen: false,
      formGroupList: materialSearchFormItems,
      formGroupValues: {},
      formButtonList: materialSearchFormBtns
    }
  };
  return obj;
};
export default data;
