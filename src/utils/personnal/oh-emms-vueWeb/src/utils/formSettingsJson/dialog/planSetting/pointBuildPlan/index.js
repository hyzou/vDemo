let addPointBuildPlanButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/plan/pointbuild/insert"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/plan/pointbuild/insert"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  editPointBuildPlanButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/plan/pointbuild/updateData"
    },
    {
      flag: "submit",
      label: "送审",
      size: "small",
      icon: "",
      styleType: "primary",
      postUrl: "_data/plan/pointbuild/updateData"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  pointBuildPlanContentItem = [
    {
      type: "inputHidden",
      label: "计划id",
      name: "emmsPlanPointbuildId",
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "单号",
      name: "docNo",
      span: 8,
      width: "100px",
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
      width: "100px"
    },
    {
      type: "date",
      label: "开单时间",
      name: "created",
      span: 8,
      dateType: "datetime",
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "timestamp",
      width: "100px",
      disabled: true
    },
    {
      type: "input",
      label: "主题",
      name: "title",
      span: 24,
      width: "100px"
    },
    {
      type: "textarea",
      label: "备注",
      name: "note",
      rows: 3,
      span: 24,
      width: "100px"
    },
    {
      type: "inputTable",
      label: "计划明细",
      name: "planPointbuildDtls",
      span: 24,
      width: "100px",
      useType: "add",
      headers: [
        {
          key: "name",
          title: "仓储名称",
          inputType: "input"
        },
        {
          key: "address",
          title: "仓储位置",
          inputType: "input"
        },
        {
          key: "area",
          title: "规划面积（m²）",
          inputType: "input"
        },
        {
          key: "num",
          title: "规划仓房数量",
          inputType: "input"
        },
        {
          key: "buildingCode",
          title: "建筑标准",
          inputType: "input"
        },
        {
          key: "facilities",
          title: "设施设备说明",
          inputType: "input"
        }
      ],
      tableItems: {
        name: "",
        address: "",
        area: "",
        num: "",
        buildingCode: "",
        facilities: ""
      }
    }
  ];
export {
  addPointBuildPlanButton,
  editPointBuildPlanButton,
  pointBuildPlanContentItem
};
