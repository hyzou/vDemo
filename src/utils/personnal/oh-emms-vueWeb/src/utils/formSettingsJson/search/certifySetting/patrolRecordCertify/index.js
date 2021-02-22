let searchFormBtns = [
    {
      flag: "search",
      size: "",
      icon: "",
      label: "查询",
      postUrl: "list_patrolRecordCertify",
      styleType: "primary"
    }
  ],
  searchFormItems = [
    {
      type: "input",
      label: "单号",
      name: "docNo",
      span: 8,
      width: "100px"
    },
    {
      type: "date",
      label: "巡查日期",
      name: "businessDate",
      span: 8,
      dateType: "daterange",
      dateRangeSeparator: "至",
      dateStartPlaceholder: "开始日期",
      dateEndPlaceholder: "结束日期",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      width: "100px"
    },
    {
      type: "select",
      label: "巡查类型",
      name: "sourceType",
      multiple: false,
      placeHolder: "请选择",
      filterable: false,
      data: [
        {
          label: "定期巡查",
          value: "1"
        },
        {
          label: "故障巡查",
          value: "2"
        },
        {
          label: "回收入库",
          value: "3"
        }
      ],
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "单据状态",
      name: "processinstStatus",
      multiple: false,
      placeHolder: "请选择",
      filterable: false,
      data: [
        {
          label: "制单",
          value: "1"
        },
        {
          label: "已完成",
          value: "2"
        }
      ],
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "库点",
      name: "storepointId",
      multiple: false,
      placeHolder: "请选择",
      filterable: false,
      data: [
        {
          label: "制单",
          value: "1"
        },
        {
          label: "已启动",
          value: "2"
        },
        {
          label: "已审核",
          value: "3"
        }
      ],
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "组织机构",
      name: "storeOrgId",
      multiple: false,
      placeHolder: "请选择",
      filterable: false,
      data: [
      ],
      span: 8,
      width: "100px"
    },
    {
      type: "select",
      label: "包含下级",
      name: "subordinate",
      multiple: false,
      placeHolder: "请选择",
      filterable: false,
      data: [
        {
          label: "是",
          value: "Y"
        },
        {
          label: "否",
          value: "N"
        }
      ],
      span: 8,
      width: "100px"
    }
  ];
export { searchFormBtns, searchFormItems };
