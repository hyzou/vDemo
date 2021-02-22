// 搜索
import {
  searchFormBtns,
  searchFormItems,
  materialSearchFormItems,
  materialSearchFormBtns
} from "@/utils/formSettingsJson/search/certifySetting/maintenanceCertify";
// table 上方按钮
import { operateButtons } from "@/utils/formSettingsJson/operateButton/certifySetting/maintenanceCertify";
// table表头信息设置
import {
  tableHeader,
  materialDetailTableHeader
} from "@/utils/formSettingsJson/table/certifySetting/maintenanceCertify";
import {
  addButton,
  editButton,
  contentItems,
  addMaterialButton
} from "@/utils/formSettingsJson/dialog/certifySetting/maintenanceCertify";
// 必填验证
import maintenanceCertifyRule from "@/utils/formRulesJson/certifySetting/maintenanceCertify";

const data = function(vm) {
  let obj = {
    // 搜索栏
    searchFormItems: searchFormItems,
    searchFormSettings: {
      fullScreen: false,
      formGroupList: searchFormItems,
      formGroupValues: {
        storeOrgId: [vm.$store.getters["user/userInfos"].orgId],
        storePointId: vm.$store.getters["user/userInfos"].storePointId
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
    // 删除的文件
    deleteFileList: [],
    //新增修改弹窗
    dialogFormSettings: {
      fullScreen: false,
      dialogFormVisible: false,
      dialogFormTitle: "详情",
      dialogFormItems: {
        //表明表单中有文件上传功能，点击按钮直接返回formdata
        formGroupTypeUpload: true,
        formGroupTypeUploadName: "fbFile",
        formGroupValues: {
          docNo: "系统自动生成",
          created: vm.$globalFnc.dateStampFormat(new Date().getTime()),
          checkDate: vm.$globalFnc.dateStampFormat(new Date().getTime(), "ymd"),
          emmsBasMaterialId: "",
          emmsBasMaterialSpecId: "",
          materialName: "",
          brand: "",
          specs: "",
          mType: "",
          storepointId: "",
          emmsStockDtlId: ""
        },
        formGroupList: contentItems,
        formButtonList: [],
        rules: maintenanceCertifyRule
      }
    },
    // 维修保养明细添加页  弹框
    materialDetailDialog: {
      dialogVisible: false,
      dialogName: "",
      formButtonList: []
    },
    // 维修保养明细添加页
    addMaterialButton: addMaterialButton,
    //维修保养明细添加页  选中的物资数据
    chosedMaterialData: [],
    // 维修保养明细添加页  物资列表
    materialDetailTableSettings: {
      tableDatas: [],
      tableSettingOptions: {
        isMultipleTable: true,
        ref: "materialDetail",
        rowKey: "emmsStockDtlId",
        tooltipEffect: "dark",
        border: true,
        defaultExpandAll: true,
        headerOptions: materialDetailTableHeader
      }
    },
    // 维修保养明细添加页  分页
    materialPaginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 维修保养明细添加页 搜索
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
