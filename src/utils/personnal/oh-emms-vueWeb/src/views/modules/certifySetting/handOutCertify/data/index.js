// 搜索
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/certifySetting/handOutCertify";
// table 上方按钮
import {
  operateButtons,
  materialDetailOperateButtons
} from "@/utils/formSettingsJson/operateButton/certifySetting/handOutCertify";
// 和购置计划模块共用。
import {
  dialogOperateChildButtons,
  dialogOperateChildSaveButtons
} from "@/utils/formSettingsJson/operateButton/planSetting/purchase";
// table表头信息设置
import {
  tableHeader,
  materialDetailTableHeader,
  materialTableHeader
} from "@/utils/formSettingsJson/table/certifySetting/handOutCertify";

import {
  addButton,
  editButton,
  contentItems
} from "@/utils/formSettingsJson/dialog/certifySetting/handOutCertify";
// 必填验证
import handOutCertifyRule from "@/utils/formRulesJson/certifySetting/handOutCertify";

const data = function(vm) {
  let obj = {
    // 搜索栏
    searchFormItems: searchFormItems,
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
    // 新增列表
    contentItems: contentItems,
    addButton: addButton,
    editButton: editButton,
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "",
      dialogFormItems: {
        //表明表单中有文件上传功能，点击按钮直接返回formdata
        formGroupTypeUpload: true,
        formGroupTypeUploadName: "fbFile",
        formGroupValues: {
          created: vm.$globalFnc.dateStampFormat(new Date().getTime()),
          docNo: "系统自动生成",
          startDate: vm.$globalFnc.dateStampFormat(new Date().getTime(), "ymd")
        },
        formGroupList: contentItems,
        formButtonList: [],
        rules: handOutCertifyRule
      }
    },
    deleteFileList: [],
    // 发放详情页 表格上方按钮
    materialDetailOperateButtons: materialDetailOperateButtons,
    dialogOperateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: materialDetailOperateButtons
    },
    // 发放详情页 表格选择数据
    chosedMaterialDetail: [],
    // 发放详情页 物资明细列表
    materialDetailTableHeader: materialDetailTableHeader,
    dialogInputTableSettings: {
      name: "handoutDtlsJsonStr",
      selectedListName: "selMuti",
      selection: true,
      headers: materialDetailTableHeader,
      rules: handOutCertifyRule
    },
    // 发放登记明细添加页
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
    // 物资类别树
    treeSettings: {
      treeData: [],
      nodeKey: "id",
      defaultProps: {
        children: "children",
        label: "text"
      }
    },
    // 发放登记明细添加页 待选table表格配置
    tableToBeChosedSettings: {
      tableDatas: [],
      tableSettingOptions: {
        height: "260",
        ref: "toBechosedTalbe",
        highlightCurrent: true,
        rowKey: "emmsBasMaterialId",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: materialTableHeader
      }
    },
    // 发放登记明细添加页 待选table表格分页配置
    toBeChosedPaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 发放登记明细添加页 已选table表格配置
    tableChosedSettings: {
      tableDatas: [],
      tableSettingOptions: {
        height: "260",
        ref: "chosedTable",
        highlightCurrent: true,
        rowKey: "emmsBasMaterialId",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: materialTableHeader
      }
    },
    // 发放登记明细添加页 添加删除按钮组
    dialogChoseMetrialSettings: {
      moduleName: "dialogChoseMetrial",
      buttonListData: dialogOperateChildButtons
    },
    // 发放登记明细添加页  保存按钮组
    dialogSaveMetrialSettings: {
      moduleName: "dialogSaveMetrial",
      buttonListData: dialogOperateChildSaveButtons
    }
  };
  return obj;
};
export default data;
