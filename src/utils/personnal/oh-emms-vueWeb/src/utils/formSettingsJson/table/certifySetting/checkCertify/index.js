let tableHeader = [
    {
      prop: "docNo",
      lable: "盘点单号"
    },
    {
      prop: "businessDate",
      lable: "单据日期"
    },
    {
      prop: "storepointId__dsp",
      lable: "库点"
    },
    {
      prop: "storehouseId__dsp",
      lable: "仓房"
    },
    {
      prop: "processinstStatus__dsp",
      lable: "单据状态"
    },
    {
      prop: "operateBtns",
      propType: "operateBtns",
      lable: "操作",
      width: "280px"
    }
  ],
  detailTableHeader = [
    {
      key: "wmsBasStackName",
      title: "货位",
      inputType: "input",
      disabled: true,
      width: "150px"
    },
    // {
    //   key: "materialTypeName",
    //   title: "物资类别",
    //   inputType: "input",
    //   disabled: true
    // },
    {
      key: "materialCode",
      title: "物资编码",
      inputType: "input",
      disabled: true,
      width: "150px"
    },
    {
      key: "name",
      title: "物资名称",
      inputType: "input",
      disabled: true,
      width: "150px"
    },
    {
      key: "unitName",
      title: "计量单位",
      inputType: "input",
      width: "80px",
      disabled: true
    },
    {
      key: "specs",
      title: "规格",
      inputType: "input",
      disabled: true,
      width: "150px"
    },
    {
      key: "mType",
      title: "型号",
      inputType: "input",
      disabled: true,
      width: "150px"
    },
    {
      key: "stockCode",
      title: "批次",
      inputType: "input",
      disabled: true,
      width: "250px"
    },
    {
      key: "stockNum",
      title: "账面数量",
      inputType: "input",
      disabled: true,
      width: "130px"
    },
    {
      key: "actualNum",
      title: "盘点数量",
      inputType: "input",
      placeHolder: " ",
      width: "130px"
    },
    {
      key: "differNum",
      title: "盈亏数量=盘点数量-帐面数量",
      inputType: "input",
      placeHolder: " ",
      disabled: true,
      width: "200px"
    },
    {
      key: "note",
      title: "备注",
      inputType: "textarea",
      placeHolder: " ",
      width: "200px"
    }
  ],
  materialDetailTableHeader = [
    // {
    //   prop: "storepointId__dsp",
    //   lable: "库点"
    // },
    {
      prop: "wmsBasStackName",
      lable: "货位"
    },
    {
      prop: "materialTypeName",
      lable: "物资类别"
    },
    {
      prop: "materialCode",
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
      prop: "specs",
      lable: "规格"
    },
    {
      prop: "mType",
      lable: "型号"
    },
    {
      prop: "num",
      lable: "账面数量"
    }
  ];
export { tableHeader, detailTableHeader, materialDetailTableHeader };
