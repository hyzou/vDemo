const operateButtons = [
    {
      flag: "add",
      size: "small",
      btnClassName: "searchButtons",
      icon: "iconfont iconplus text-primary",
      label: "新增",
      styleType: "",
      postUrl: "add_incomeCertify"
    },
    {
      flag: "closeSearch",
      size: "small",
      btnClassName: "searchButtons",
      icon: "iconfont iconminus1 text-primary",
      label: "隐藏查询",
      styleType: "",
      postUrl: ""
    }
  ],
  dialogOperateButtons = [
    {
      flag: "addDetail",
      size: "small",
      btnClassName: "searchButtons",
      icon: "iconfont iconplus text-primary",
      label: "添加",
      styleType: "",
      postUrl: ""
    },
    {
      flag: "removeDetail",
      size: "small",
      btnClassName: "searchButtons",
      icon: "iconfont iconminus1 text-primary",
      label: "删除",
      styleType: "",
      postUrl: ""
    }
  ],
  dialogOperateChildButtons = [
    {
      flag: "addMetrial",
      size: "small",
      btnClassName: "searchButtons",
      icon: "iconfont iconplus text-primary",
      label: "添加",
      styleType: "",
      postUrl: ""
    },
    {
      flag: "removeMetrial",
      size: "small",
      btnClassName: "searchButtons",
      icon: "iconfont iconminus1 text-primary",
      label: "删除",
      styleType: "",
      postUrl: ""
    }
  ],
  dialogOperateChildSaveButtons = [
    {
      flag: "saveChosedMetrial",
      size: "small",
      icon: "",
      label: "确定",
      styleType: "primary",
      postUrl: ""
    }
  ],
  dialogOperateChildReferSaveButtons = [
    {
      flag: "saveChosedReferMetrial",
      size: "small",
      icon: "",
      label: "确定",
      styleType: "primary",
      postUrl: ""
    }
  ];
export {
  operateButtons,
  dialogOperateButtons,
  dialogOperateChildButtons,
  dialogOperateChildSaveButtons,
  dialogOperateChildReferSaveButtons
};
