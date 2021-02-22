import {
  workReportsSearchBtns,
  workReportsSearchItems,
  workReportsSearchItemsMy
} from "@/utils/formSettingsJson/search/infosManage/workReports/workReportsSearch";
import workReportsOperateBtns from "@/utils/formSettingsJson/operateButton/infosManage/workReports/workReportsOperateBtns";
import {
  workReportsTableHeader,
  workReportsTableHeaderMy,
  workReportsTableHeaderCheck
} from "@/utils/formSettingsJson/table/infosManage/workReports/workReportsTableHeaderOpts";
import {
  editInfoFormItems,
  editInfoFormBtns,
  addInfoFormBtns
} from "@/utils/formSettingsJson/dialog/infosManage/workReports/editInfoFormSetting";
// 配置校验规则
import infoFormRule from "@/utils/formRulesJson/infosManage/setNewInfo/newInfoFormRule";
import ueEditorToolbarSettings from "@/utils/formSettingsJson/dialog/infosManage/setNewInfo/ueEditorToolbarSettings";

const data = function(vm) {
  let obj = {
    ueEditorToolbarSettings: ueEditorToolbarSettings,
    workReportsSearchItems: workReportsSearchItems,
    workReportsSearchMyItems: workReportsSearchItemsMy,
    workReportsSearchBtns: workReportsSearchBtns,
    workReportsOperateBtns: workReportsOperateBtns,
    workReportsTableHeader: workReportsTableHeader,
    workReportsTableHeaderMy: workReportsTableHeaderMy,
    workReportsTableHeaderCheck: workReportsTableHeaderCheck,
    editInfoFormItems: editInfoFormItems,
    editInfoFormBtns: editInfoFormBtns,
    addInfoFormBtns: addInfoFormBtns,
    infoFormRule: infoFormRule,
    userId: vm.$store.getters["user/userInfos"].userId,
    // 搜索栏表单配置
    formGroupSettings: {
      formItemSpan: 12,
      formGroupList: JSON.parse(JSON.stringify(workReportsSearchItems)),
      formGroupValues: {},
      formButtonList: workReportsSearchBtns
    },
    dialogShowInfoDialogSettings: {
      title: "",
      dialogShowInfoVisible: false,
      showInfoData: {}
    },
    // 顶部搜索栏显示配置，默认显示
    showSearchForm: true,
    // dialog 内置form表单对话框基本数据配置
    dialogFormSettings: {
      dialogFormTitle: "编辑信息",
      dialogFormVisible: false,
      width: "70%",
      dialogFormItems: {
        //表明表单中有文件上传功能，点击按钮直接返回formdata
        formGroupTypeUpload: false,
        //做文件上传时，文件流的name值，一定要设置
        formGroupTypeUploadName: "fbFiles",
        formItemSpan: 12,
        formGroupList: editInfoFormItems,
        formGroupValues: {},
        formButtonList: [],
        // formGroupTypeUpload: "true",
        // formGroupTypeUploadName: "uploadName",
        rules: infoFormRule
      }
    },
    // 标题管理
    titles: {
      searchTitel: "查询条件",
      tableTitle: "通知公告"
    },
    titlesManage: {
      notification: "通知公告",
      dataDownload: "资料下载",
      dynamic: "工作动态",
      inspectionFile: "考核文件",
      indexInfosDistribution: "信息报送",
      infosDistribution: "信息报送",
      inspectionReport: "考核通报",
      myIssue: "我的发布",
      stuff: "草稿箱",
      myCheckout: "待我审核"
    },
    channelIdMap: {
      notification: "2",
      dataDownload: "3",
      dynamic: "4",
      inspectionFile: "5",
      indexInfosDistribution: "6",
      infosDistribution: "6",
      inspectionReport: "7"
    },
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: JSON.parse(JSON.stringify(workReportsOperateBtns))
    },
    // table 表格配置
    tablelistSettings: {
      tableDatas: [],
      tableSettingOptions: {
        tooltipEffect: "dark",
        rowKey: "id",
        border: true,
        headerOptions: JSON.parse(JSON.stringify(workReportsTableHeader))
      }
    },
    // pagination 分页器基本数据配置
    paginationSettings: {
      currentPage: 1,
      totalNumbers: 0
    },
    // 当前页面代码
    page: 1,
    defaultTabledatas: [],
    // 当前页面名称
    routeName: null,
    //栏目列表
    channelList: [],
    //发布级别列表
    levelList: [],
    deleteFileList: []
  };
  return obj;
};
export default data;
