// 搜索
import {
  searchFormBtns,
  searchFormItems,
  materialSearchFormBtns,
  materialSearchFormItems
} from "@/utils/formSettingsJson/search/planSetting/purchase";
// table 上方按钮
import {
  operateButtons,
  materialDetailOperateButtons,
  dialogOperateChildButtons,
  dialogOperateChildSaveButtons
} from "@/utils/formSettingsJson/operateButton/planSetting/purchase";
// table表头信息设置
import {
  tableHeader,
  materialDetailReservePlanTableHeader,
  materialDetailOtherTableHeader,
  materialTableHeader,
  reservePlanMaterialTableHeader
} from "@/utils/formSettingsJson/table/planSetting/purchase";
// 储备计划表单
import {
  addPurchaseButton,
  editPurchaseButton,
  purchaseContentItem
} from "@/utils/formSettingsJson/dialog/planSetting/purchase";

// 物资选择页 按钮，  和储备计划模块用的一个
import { addMaterialButton } from "@/utils/formSettingsJson/dialog/planSetting/reservePlan";
// 必填验证
import puchaseRule from "@/utils/formRulesJson/planSetting/puchase";

const data = function(vm) {
  let obj = {
    // 搜索栏
    searchFormItems: searchFormItems,
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
    addPurchaseButton: addPurchaseButton,
    editPurchaseButton: editPurchaseButton,
    purchaseContentItem: purchaseContentItem,
    // 购置 详情弹框
    dialogFormSettings: {
      width: "80%",
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogFormItems: {
        formGroupValues: {},
        formGroupList: purchaseContentItem,
        formButtonList: [],
        rules: puchaseRule
      }
    },
    // 选中要删除的物资明细
    chosedMaterialDetail: [],
    // 购置详情页弹框表格上方按钮组
    materialDetailOperateButtons: materialDetailOperateButtons,
    dialogOperateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: materialDetailOperateButtons
    },
    // 储备购置 物资明细表头
    materialDetailReservePlanTableHeader: materialDetailReservePlanTableHeader,
    materialDetailOtherTableHeader: materialDetailOtherTableHeader,
    // 购置详情页弹框 物资明细列表
    dialogInputTableSettings: {
      name: "planPurchaseDtls",
      selectedListName: "selMuti",
      selection: true,
      headers: materialDetailReservePlanTableHeader
    },
    // 购置详情页弹框 可输入表格值
    dialogInputTableValue: [],
    // 应急以及补充采购物资选择页
    dialogTableSettings: {
      dialogFormVisible: false,
      dialogFormTitle: "选择明细",
      tableName: "tableClass",
      dialogType: "other",
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
    // 应急以及补充采购物资选择页 添加删除按钮组
    dialogChoseMetrialSettings: {
      moduleName: "dialogChoseMetrial",
      buttonListData: dialogOperateChildButtons
    },
    // 应急以及补充采购物资选择页  保存按钮组
    dialogSaveMetrialSettings: {
      moduleName: "dialogSaveMetrial",
      buttonListData: dialogOperateChildSaveButtons
    },
    // 应急以及补充采购物资选择页 待选table表格配置
    tableToBeChosedSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "toBechosedTalbe",
        highlightCurrent: true,
        rowKey: "emmsBasMaterialId",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: materialTableHeader
      }
    },
    // 应急以及补充采购物资选择页 待选table表格分页配置
    toBeChosedPaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 选中的物资类别id
    chosedMaterialTypeId: "",
    // 应急以及补充采购物资选择页 已选table表格配置
    tableChosedSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "chosedTable",
        highlightCurrent: true,
        rowKey: "emmsBasMaterialId",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: materialTableHeader
      }
    },
    // 应急以及补充采购物资选择页 待选 选择的内容
    toBechosedMaterial: {},
    // 应急以及补充采购物资选择页 移除选择的内容
    toBeRemoveMaterial: {},
    // 物资类别树
    treeSettings: {
      treeData: [],
      nodeKey: "id",
      defaultProps: {
        children: "children",
        label: "text"
      }
    },
    // 物资选择页 弹框
    materialDetailDialog: {
      dialogVisible: false,
      dialogName: "",
      formButtonList: []
    },
    // 物资选择页按钮
    addMaterialButton: addMaterialButton,
    //物资选择页  选中的储备计划物资数据
    chosedReservePlanMaterialData: [],
    // 物资选择页  物资列表
    materialDetailTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        isMultipleTable: true,
        ref: "materialDetail",
        rowKey: "code",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: reservePlanMaterialTableHeader
      }
    },
    // 物资选择页  分页
    materialPaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 物资选择页 搜索
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
