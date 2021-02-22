// 搜索
import {
  searchFormBtns,
  searchFormItems,
  detailSearchFormBtns,
  detailSearchFormItems
} from "@/utils/formSettingsJson/search/certifySetting/outCertify";
// table 上方按钮
import {
  operateButtons,
  dialogOperateButtons,
  dialogOperateChildSaveButtons,
  dialogOperateChildReferSaveButtons
} from "@/utils/formSettingsJson/operateButton/certifySetting/outCertify";
// table表头信息设置
import {
  tableHeader,
  detailTableHeader,
  detailRETableHeader,
  metarialTableHeader,
  referMetarialTableHeader
} from "@/utils/formSettingsJson/table/certifySetting/outCertify";
// 新建任务列表
import {
  addButton,
  editButton,
  contentItems
} from "@/utils/formSettingsJson/dialog/certifySetting/outCertify";
// 必填验证
import taskSetRule from "@/utils/formRulesJson/certifySetting/outCertify";

const data = function(vm) {
  let obj = {
    // 单据类型
    certifyType: "OUT",
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
    showSearchForm: true,
    // 详情页搜索栏
    detailSearchFormSettings: {
      fullScreen: false,
      formGroupList: detailSearchFormItems,
      formGroupValues: {},
      formButtonList: detailSearchFormBtns
    },
    // 待选table表格配置
    tableToBeChosedSettings: {
      tableDatas: [],
      tableSettingOptions: {
        ref: "toBechosedTalbe",
        isMultipleTable: true,
        rowKey: "emmsStockDtlId",
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
    dialogSaveMetrialSettings: {
      moduleName: "dialogSaveMetrial",
      buttonListData: dialogOperateChildSaveButtons
    },
    // 弹框内可输入表格设置
    detailTableHeader: detailTableHeader,
    detailRETableHeader: detailRETableHeader,
    dialogInputTableSettings: {
      selectedListName: "selMuti",
      selection: true,
      headers: detailTableHeader
    },
    dialogInputRETableSettings: {
      selectedListName: "selREMuti",
      selection: true,
      headers: detailRETableHeader,
      expand: true,
      expandContent: "storeHouseInfos",
      expandAddObject: {
        storehouseId: "",
        emmsStockDtlId: "",
        finishNum: "",
        emmsBasMaterialSpecId: "",
        noLockNum: ""
      },
      expandKeyValueArr: [
        {
          label: "仓房",
          value: "storehouseId",
          inputType: "select",
          data: [],
          disabled: true
        },
        {
          label: "货位",
          value: "emmsStockDtlId",
          inputType: "select",
          data: [],
          disabled: false
        },
        {
          label: "可出库数量",
          value: "noLockNum",
          inputType: "number",
          disabled: true,
          controls: "false",
          precision: 2,
          min: 0
        },
        {
          label: "出库数量",
          value: "finishNum",
          inputType: "number",
          disabled: false,
          controls: "false",
          precision: 2,
          min: 0
        },
        // {
        //   label: "备注",
        //   value: "note",
        //   inputType: "input",
        //   disabled: false
        // },
        {
          label: "操作",
          value: "operate",
          width: "80px"
        }
      ]
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
          storeOrgId: vm.$store.getters["user/userInfos"].orgId,
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
    toBechosedEmmsBasMaterial: [],
    // 已选中的物资待删除列表
    toBeRemoveEmmsBasMaterial: [],
    // 树配置
    treeSettings: {
      treeData: [],
      nodeKey: "id",
      defaultProps: {
        children: "children",
        label: "text"
      }
    },
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
    // 待选物资分页
    beChosedPaginationReferSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 弹框内表格上方头部设置
    dialogSaveMetrialReferSettings: {
      moduleName: "dialogSaveMetrial",
      buttonListData: dialogOperateChildReferSaveButtons
    },
    isReview: false
  };
  return obj;
};
export default data;
