const operateButtonsObj = {
  edit: [
    {
      flag: "checkout",
      size: "small",
      icon: "",
      label: "预览",
      // label: "预览及导出",
      styleType: "primary",
      postUrl: ""
    },
    {
      flag: "selfResultSubmit",
      size: "small",
      icon: "",
      label: "自评结果提交",
      styleType: "primary",
      postUrl: ""
    },
    {
      flag: "closeSearch",
      size: "small",
      icon: "",
      label: "隐藏查询",
      styleType: "primary",
      postUrl: ""
    }
  ],
  check: [
    // {
    //   flag: "checkout",
    //   size: "small",
    //   icon: "",
    //   label: "预览及导出",
    //   styleType: "primary",
    //   postUrl: ""
    // },
    {
      flag: "repeatCut",
      size: "small",
      icon: "",
      label: "查询重复扣分项",
      styleType: "primary",
      postUrl: ""
    },
    {
      flag: "departmentResultSubmit",
      size: "small",
      icon: "",
      label: "部门评审结果发布",
      styleType: "primary",
      postUrl: ""
    },
    {
      flag: "spotCheckResultSubmit",
      size: "small",
      icon: "",
      label: "抽查结果发布",
      styleType: "primary",
      postUrl: ""
    },
    {
      flag: "closeSearch",
      size: "small",
      icon: "",
      label: "隐藏查询",
      styleType: "primary",
      postUrl: ""
    }
  ]
};
const tableButtonObj = {
  edit: [
    {
      styleType: "primary",
      type: "assignKpi",
      text: "分配",
      class: "text-primary fontSize20 mr10",
      icon: "el-icon-set-up",
      isIcon: true
    },
    {
      styleType: "text",
      type: "preview",
      text: "查看",
      class: "text-primary fontSize20 mr10",
      icon: "el-icon-search",
      isIcon: true
    }
  ],
  check: [
    // {
    //   styleType: "text",
    //   type: "scoreCheck",
    //   text: "评分审核",
    //   class: "text-primary fontSize20 mr10",
    //   icon: "el-icon-takeaway-box",
    //   isIcon: true
    // },
    {
      styleType: "text",
      type: "preview",
      text: "查看",
      class: "text-primary fontSize20 mr10",
      icon: "el-icon-search",
      isIcon: true
    }
  ]
};
const submitButtonObj = {
  edit: [
    {
      flag: "submit",
      size: "small",
      icon: "",
      label: "提交",
      styleType: "primary",
      postUrl: ""
    }
  ],
  check: [
    {
      flag: "release",
      size: "small",
      icon: "",
      label: "发布",
      styleType: "primary",
      postUrl: ""
    }
  ]
};
export { operateButtonsObj, tableButtonObj, submitButtonObj };
