let tableHeader = [
    {
      prop: "docNo",
      lable: "单号"
    },
    {
      prop: "year",
      lable: "年份"
    },
    {
      prop: "title",
      lable: "主题"
    },
    {
      prop: "created_dsp",
      lable: "开单时间"
    },
    {
      prop: "processinstStatus__dsp",
      lable: "流程状态"
    },
    {
      prop: "operateBtns",
      propType: "operateBtns",
      lable: "操作",
      width: "280px"
    }
  ],
  materialTableHeader = [
    {
      prop: "materialTypeName",
      lable: "物资类别"
    },
    {
      prop: "code",
      lable: "物资编码"
    },
    {
      prop: "name",
      lable: "物资名称"
    },
    {
      prop: "unitName",
      lable: "计量单位"
    },
    {
      prop: "balanceNum",
      lable: "上年度结余"
    }
  ];
export { tableHeader, materialTableHeader };
