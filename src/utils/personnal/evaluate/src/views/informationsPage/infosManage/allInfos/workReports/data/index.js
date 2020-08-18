import workReportsSearchItems from "@/utils/formSettingsJson/infosManage/workReports/workReportsSearchItems";
import workReportsSearchBtns from "@/utils/formSettingsJson/infosManage/workReports/workReportsSearchBtns.json";
import workReportsOperateBtns from "@/utils/formSettingsJson/infosManage/workReports/workReportsOperateBtns.json";
import workReportsTableHeaderOpts from "@/utils/formSettingsJson/infosManage/workReports/workReportsTableHeaderOpts.json";
import editInfoFormItems from "@/utils/formSettingsJson/infosManage/setNewInfo/newInfoFormItems.json";
import editInfoFormBtns from "@/utils/formSettingsJson/infosManage/workReports/dialogSettings/EditInfoFormBtns.json";
// 配置校验规则
import editInfoFormRule from "@/utils/formRulesJson/infosManage/setNewInfo/newInfoFormRule";
import ueEditorToolbarSettings from "@/utils/formSettingsJson/infosManage/setNewInfo/ueEditorToolbarSettings.js";
const data = function(vm) {
  let obj = {
    ueEditorToolbarSettings: ueEditorToolbarSettings,
    workReportsSearchItems: workReportsSearchItems,
    workReportsSearchBtns: workReportsSearchBtns,
    workReportsOperateBtns: workReportsOperateBtns,
    workReportsTableHeaderOpts: workReportsTableHeaderOpts,
    editInfoFormItems: editInfoFormItems,
    editInfoFormBtns: editInfoFormBtns,
    editInfoFormRule: editInfoFormRule,
    userId: vm.$store.getters["user/userInfos"].userId,
    // 搜索栏表单配置
    formGroupSettings: {
      formItemSpan: 12,
      formGroupList: workReportsSearchItems,
      formGroupValues: {},
      formButtonList: workReportsSearchBtns
    },
    testMsg: "123",
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
        formItemSpan: 12,
        formGroupList: editInfoFormItems,
        formGroupValues: {},
        formButtonList: editInfoFormBtns,
        // formGroupTypeUpload: "true",
        // formGroupTypeUploadName: "uploadName",
        rules: editInfoFormRule.rule
      }
    },
    // 标题管理
    titles: {
      searchTitel: "查询条件",
      tableTitle: "工作简报"
    },
    titlesManage: {
      workReports: "工作简报",
      notification: "通知公告",
      dataDownload: "资料下载",
      dynamic: "各地动态",
      inspectionFile: "考核文件",
      indexInfosDistribution: "信息报送",
      infosDistribution: "信息报送",
      inspectionReport: "考核通报",
      essenceInfo: "精华信息",
      hangzhou: "杭州",
      myIssue: "我的发布",
      stuff: "草稿箱"
    },
    // operateButtons 按钮组配置
    operateButtonsSettings: {
      moduleName: "tableList",
      buttonListData: workReportsOperateBtns
    },
    // table 表格配置
    tablelistSettings: {
      tableDatas: [],
      tableSettingOptions: {
        tooltipEffect: "dark",
        rowKey: "id",
        border: true,
        headerOptions: workReportsTableHeaderOpts
      }
    },
    // pagination 分页器基本数据配置
    paginationSettings: {
      currentPage: 1,
      layout: "total, prev, pager, next, jumper",
      totalNumbers: 0
    },
    // 当前页面代码
    page: 1,
    defaultTabledatas: []
  };
  return obj;
};
export default data;
