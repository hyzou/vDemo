let addButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "add_incomeCertify"
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
      postUrl: "_data/frame/task/update"
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
      name: "emmsDocInoutId",
      span: 12,
      width: "150px"
    },
    {
      type: "date",
      label: "单据日期",
      name: "businessDate",
      span: 12,
      dateType: "date",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: "150px"
    },
    {
      type: "input",
      label: "供应商/捐赠人",
      name: "emmsBasSupplierId",
      span: 12,
      width: "150px"
    },
    {
      type: "input",
      label: "来源ID",
      name: "sourceId",
      span: 12,
      width: "150px"
    },
    {
      type: "select",
      label: "来源类型",
      name: "sourceType",
      placeHolder: "请选择",
      data: [
        {
          label: "启用",
          value: "1"
        },
        {
          label: "禁用",
          value: "0"
        }
      ],
      span: 12,
      width: "150px"
    },
    {
      type: "select",
      label: "机构ID",
      name: "storeOrgId",
      linkName: "expressionType",
      placeHolder: "请选择",
      data: [
        {
          label: "cron表达式",
          value: "0"
        },
        {
          label: "简单表达式",
          value: "1"
        }
      ],
      span: 12,
      width: "150px"
    },
    {
      type: "select",
      label: "库点ID",
      name: "storepointId",
      placeHolder: "请选择",
      data: [
        {
          label: "立即启动",
          value: "0"
        },
        {
          label: "选择时间",
          value: "1"
        }
      ],
      span: 12,
      width: "150px"
    },
    {
      type: "select",
      label: "单据类型",
      name: "type",
      placeHolder: "请选择",
      data: [
        {
          label: "毫秒",
          value: "1"
        },
        {
          label: "秒",
          value: "1000"
        },
        {
          label: "分",
          value: "60000"
        },
        {
          label: "小时",
          value: "3600000"
        },
        {
          label: "天",
          value: "86400000"
        },
        {
          label: "周",
          value: "604800000"
        }
      ],
      span: 12,
      width: "150px"
    },
    {
      type: "textarea",
      label: "备注",
      name: "note",
      rows: 3,
      span: 24,
      width: "150px",
      placeholder: ""
    },
    {
      type: "inputTable",
      label: "出入库执行单明细",
      name: "emmsDocInoutDtls",
      span: 24,
      width: "150px",
      useType: "add",
      headers: [
        {
          key: "emmsBasMaterialId",
          title: "物资ID",
          inputType: "input"
        },
        {
          key: "emmsBasMaterialSpecId",
          title: "物资规格ID",
          inputType: "input"
        },
        {
          key: "num",
          title: "入库数量",
          inputType: "input"
        },
        {
          key: "pbc",
          title: "生产批次代码",
          inputType: "input"
        },
        {
          key: "price",
          title: "入库价格",
          inputType: "input"
        },
        {
          key: "reserveType",
          title: "储备性质",
          inputType: "input"
        },
        {
          key: "storehouseId",
          title: "仓房ID",
          inputType: "input"
        },
        {
          key: "wmsBasStackId",
          title: "货位ID",
          inputType: "input"
        }
      ],
      tableItems: {
        emmsBasMaterialId: "",
        emmsBasMaterialSpecId: "",
        num: "",
        pbc: "",
        price: "",
        reserveType: "",
        storehouseId: "",
        wmsBasStackId: ""
      }
    }
  ];
export { addButton, editButton, contentItems };
