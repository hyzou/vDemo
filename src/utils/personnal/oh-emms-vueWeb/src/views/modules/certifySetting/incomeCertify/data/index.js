// 搜索
import {
  searchFormBtns,
  searchFormItems,
  detailSearchFormBtns,
  detailSearchFormItems
} from "@/utils/formSettingsJson/search/certifySetting/incomeCertify";
// table 上方按钮
import {
  operateButtons,
  dialogOperateButtons,
  dialogOperateChildButtons,
  dialogOperateChildSaveButtons,
  dialogOperateChildReferSaveButtons
} from "@/utils/formSettingsJson/operateButton/certifySetting/incomeCertify";
// table表头信息设置
import {
  tableHeader,
  detailTableHeader,
  metarialTableHeader,
  referMetarialTableHeader
} from "@/utils/formSettingsJson/table/certifySetting/incomeCertify";
// 新建任务列表
import {
  addButton,
  editButton,
  contentItems
} from "@/utils/formSettingsJson/dialog/certifySetting/incomeCertify";
// 必填验证
import taskSetRule from "@/utils/formRulesJson/certifySetting/incomeCertify";

const data = function(vm) {
  let obj = {
    // 单据类型
    certifyType: "IN",
    // 搜索栏
    searchFormSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {
        storeOrgId: [vm.$store.getters["user/userInfos"].orgId],
        storepointId: vm.$store.getters["user/userInfos"].storePointId
          ? vm.$store.getters["user/userInfos"].storePointId
          : ""
      },
      formButtonList: searchFormBtns
    },
    // 详情页搜索栏
    detailSearchFormSettings: {
      fullScreen: false,
      formGroupList: detailSearchFormItems,
      formGroupValues: {},
      formButtonList: detailSearchFormBtns
    },
    showSearchForm: true,
    // 待选table表格配置
    tableToBeChosedReferSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "toBechosedTalbe",
        height: "260",
        isMultipleTable: true,
        rowKey: "id",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: referMetarialTableHeader
      }
    },
    tableToBeChosedSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "toBechosedTalbe",
        height: "260",
        highlightCurrent: true,
        rowKey: "emmsBasMaterialId",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: metarialTableHeader
      }
    },
    // 已选table表格配置
    tableChosedSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "chosedTable",
        height: "260",
        highlightCurrent: true,
        rowKey: "emmsBasMaterialId",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: metarialTableHeader
      }
    },
    // table表格配置
    tableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "demo",
        rowKey: "id",
        tooltipEffect: "dark",
        height: "0",
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
    // 待选物资分页
    beChosedPaginationReferSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    beChosedPaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 表格上方头部设置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: operateButtons
    },
    // 弹框内表格上方头部设置
    dialogOperateButtonsSettings: {
      moduleName: "dialogOperate",
      buttonListData: dialogOperateButtons
    },
    // 弹框内表格上方头部设置
    dialogChoseMetrialSettings: {
      moduleName: "dialogChoseMetrial",
      buttonListData: dialogOperateChildButtons
    },
    // 弹框内表格上方头部设置
    dialogSaveMetrialReferSettings: {
      moduleName: "dialogSaveMetrial",
      buttonListData: dialogOperateChildReferSaveButtons
    },
    dialogSaveMetrialSettings: {
      moduleName: "dialogSaveMetrial",
      buttonListData: dialogOperateChildSaveButtons
    },
    // 弹框内可输入表格设置
    detailTableHeader: detailTableHeader,
    dialogInputTableSettings: {
      selectedListName: "selMuti",
      selection: true,
      headers: detailTableHeader
    },
    // 弹框内可输入表格默认数据
    dialogInputTableDatas: [],
    // 弹框内可输入表格值
    dialogInputTableValue: [],
    // 新增列表
    contentItems: contentItems,
    addButton: addButton,
    editButton: editButton,
    //新增修改弹窗
    dialogFormSettings: {
      width: "90%",
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "详情",
      dialogFormItems: {
        formGroupValues: {
          docNo: "系统自动生成",
          created: vm.$globalFnc.dateStampFormat(new Date().getTime()),
          storeOrgId: [vm.$store.getters["user/userInfos"].orgId],
          storepointId: vm.$store.getters["user/userInfos"].storePointId
            ? vm.$store.getters["user/userInfos"].storePointId
            : ""
        },
        formGroupList: contentItems,
        formButtonList: [],
        rules: taskSetRule
      }
    },
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
    // 选中的物资类别id
    chosedEmmsBasMaterialTypeId: "",
    // 选中的物资待添加到已选列表
    toBechosedEmmsBasMaterial: {},
    toBechosedEmmsBasMaterialRefer: [],
    // 已选中的物资待删除列表
    toBeRemoveEmmsBasMaterial: {},
    toBeRemoveEmmsBasMaterialRefer: [],
    // 已选中的物资明细待删除列表
    toBeRemoveDetaillist: [],
    // 非直接入库单号列表
    ordersList: [],
    // 树配置
    treeSettings: {
      treeData: [],
      nodeKey: "id",
      defaultProps: {
        children: "children",
        label: "text"
      }
    }
  };
  return obj;
};
export default data;
