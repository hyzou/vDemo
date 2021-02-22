let addReservePlanButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/plan/reserve/insert"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/plan/reserve/insert"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  editReservePlanButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/plan/reserve/updateData"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/plan/reserve/updateData"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  reservePlanContentItem = [
    {
      type: "inputHidden",
      label: "计划id",
      name: "emmsPlanReserveId",
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "单号",
      name: "docNo",
      span: 8,
      width: "120px",
      disabled: true
    },
    {
      type: "date",
      label: "年份",
      name: "year",
      span: 8,
      dateType: "year",
      format: "yyyy",
      valueFormat: "yyyy",
      width: "120px"
    },
    {
      type: "date",
      label: "开单时间",
      name: "created",
      span: 8,
      dateType: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "timestamp",
      width: "120px",
      disabled: true
    },
    {
      type: "input",
      label: "主题",
      name: "title",
      span: 24,
      width: "120px"
    },
    {
      type: "textarea",
      label: "备注",
      name: "note",
      rows: 3,
      span: 24,
      width: "120px"
    }
  ],
  addMaterialButton = [
    {
      flag: "import",
      size: "",
      icon: "",
      label: "导入",
      styleType: "primary",
      postUrl: ""
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ];
export {
  addReservePlanButton,
  editReservePlanButton,
  reservePlanContentItem,
  addMaterialButton
};
