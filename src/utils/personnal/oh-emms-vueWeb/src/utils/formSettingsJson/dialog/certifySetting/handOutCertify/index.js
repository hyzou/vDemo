let addButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/impl/handout/insertData"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/impl/handout/insertData"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  editButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/impl/handout/updateData"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/impl/handout/updateData"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  contentItems = [
    {
      type: "inputHidden",
      label: "id",
      name: "emmsImplHandoutId",
      span: 12,
      width: "100px"
    },
    {
      type: "input",
      label: "单号",
      name: "docNo",
      span: 12,
      width: "100px",
      disabled: true
    },
    {
      type: "date",
      label: "开单时间",
      name: "created",
      span: 12,
      dateType: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      width: "100px",
      disabled: true
    },
    {
      type: "date",
      label: "开始日期",
      name: "startDate",
      span: 12,
      dateType: "datetime",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: "100px"
    },
    {
      type: "date",
      label: "结束日期",
      name: "endDate",
      span: 12,
      dateType: "datetime",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: "100px"
    },
    {
      type: "cascader",
      label: "承储单位",
      name: "storeOrgId",
      linkName: "changeDialogOrg",
      data: [],
      props: {
        children: "children",
        disabled: "disabled",
        checkStrictly: true,
        label: "text",
        value: "id",
        multiple: false
      },
      showAllLevels: false,
      filterable: true,
      disabled: false,
      clearable: true,
      debounce: 300,
      span: 12,
      width: "100px"
    },
    {
      type: "select",
      label: "库点",
      name: "storepointId",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 12,
      width: "100px"
    },
    {
      type: "textarea",
      label: "备注",
      name: "note",
      rows: 3,
      span: 24,
      width: "100px",
      placeholder: ""
    },
    {
      type: "upload",
      label: "附件",
      name: "fbFile",
      span: 24,
      width: "100px",
      choseBtn: "上传文件"
    },
    {
      type: "fileshowList",
      label: "附件列表",
      name: "files",
      span: 24,
      width: "100px",
      fileSettings: {
        hidedelete: true,
        hideFileSize: true,
        hideFileTime: true
      }
    }
  ];
export { addButton, editButton, contentItems };
