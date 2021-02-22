let addButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/main/quality/insertData"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/main/quality/insertData"
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
      postUrl: "_data/main/quality/updateData"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/main/quality/updateData"
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
      name: "emmsQualityId",
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
      linkName: "changeDialogStorePoint",
      multiple: false,
      placeHolder: "请选择",
      filterable: true,
      data: [],
      span: 12,
      width: "100px"
    },
    {
      type: "inputHidden",
      label: "物资id",
      name: "emmsBasMaterialId",
      span: 12,
      width: "100px"
    },
    {
      type: "inputHidden",
      label: "物资规格id",
      name: "emmsBasMaterialSpecId",
      span: 12,
      width: "100px"
    },
    {
      type: "inputHidden",
      label: "库存明细id",
      name: "emmsStockDtlId",
      span: 12,
      width: "100px"
    },
    {
      type: "inputGroup",
      label: "物资",
      name: "materialName",
      span: 12,
      width: "100px",
      disabled: true,
      buttonGroup: [
        {
          disabled: false,
          clickName: "choiceMaterial",
          buttonContent: "选择"
        }
      ]
    },
    {
      type: "date",
      label: "检测日期",
      name: "checkDate",
      span: 12,
      dateType: "datetime",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: "100px"
    },
    {
      type: "input",
      label: "品牌",
      name: "brand",
      span: 12,
      width: "100px",
      disabled: true
    },
    {
      type: "input",
      label: "规格",
      name: "specs",
      span: 12,
      width: "100px",
      disabled: true
    },
    {
      type: "input",
      label: "型号",
      name: "mType",
      span: 12,
      width: "100px",
      disabled: true
    },
    {
      type: "input",
      label: "检测机构",
      name: "qaOrg",
      span: 12,
      width: "100px"
    },
    {
      type: "input",
      label: "检测人",
      name: "checker",
      span: 12,
      width: "100px"
    },
    {
      type: "textarea",
      label: "检测结果",
      name: "result",
      rows: 3,
      span: 24,
      width: "100px",
      placeholder: ""
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
export { addButton, editButton, contentItems, addMaterialButton };
