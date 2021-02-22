let addButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/impl/inspect/insertData"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/impl/inspect/insertData"
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
      postUrl: "_data/impl/inspect/updateData"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/impl/inspect/updateData"
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
      name: "emmsImplInspectId",
      span: 12,
      width: "100px"
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
      type: "input",
      label: "单号",
      name: "docNo",
      span: 12,
      width: "100px",
      disabled: true
    },
    {
      type: "date",
      label: "巡查日期",
      name: "businessDate",
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
      type: "select",
      label: "巡查类型",
      name: "type",
      placeHolder: "请选择",
      data: [
        { label: "定期巡查", value: "1" },
        { label: "故障巡查", value: "2" }
      ],
      span: 12,
      width: "100px"
    },
    {
      type: "textarea",
      label: "巡查工作",
      name: "inspectWork",
      rows: 3,
      span: 24,
      width: "100px",
      placeholder: ""
    },
    {
      type: "textarea",
      label: "处理情况",
      name: "disposal",
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
