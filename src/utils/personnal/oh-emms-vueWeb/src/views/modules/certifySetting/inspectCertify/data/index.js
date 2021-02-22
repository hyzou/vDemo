// 搜索
import {
  searchFormBtns,
  searchFormItems
} from "@/utils/formSettingsJson/search/certifySetting/inspectCertify";
// table 上方按钮
import { operateButtons } from "@/utils/formSettingsJson/operateButton/certifySetting/inspectCertify";
// table表头信息设置
import { tableHeader } from "@/utils/formSettingsJson/table/certifySetting/inspectCertify";
// 新建任务列表
import {
  addButton,
  editButton,
  contentItems
} from "@/utils/formSettingsJson/dialog/certifySetting/inspectCertify";
// 必填验证
import inspectCertifyRule from "@/utils/formRulesJson/certifySetting/inspectCertify";

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
          businessDate: vm.$globalFnc.dateStampFormat(
            new Date().getTime(),
            "ymd"
          ),
          type: "1"
        },
        formGroupList: contentItems,
        formButtonList: [],
        rules: inspectCertifyRule
      }
    }
  };
  return obj;
};
export default data;
