let tableHeader = [
    {
      prop: "docNo",
      lable: "单号"
    },
    {
      prop: "businessDate",
      lable: "单据日期"
    },
    {
      prop: "storepointName",
      lable: "库点"
    },
    {
      prop: "sourceDocNo",
      lable: "出库单号"
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
      key: "storehouseName",
      title: "仓房",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "storeStackName",
      title: "货位",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "reserveType",
      title: "储备性质",
      inputType: "select",
      disabled: true,
      data: [],
      width: "200px"
    },
    {
      key: "materialTypeName",
      title: "物资类别",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "code",
      title: "物资编码",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "name",
      title: "物资名称",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "unitName",
      title: "计量单位",
      inputType: "input",
      disabled: true,
      width: "100px"
    },
    {
      key: "specs",
      title: "规格",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "mType",
      title: "型号",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "pbc",
      title: "生产批次",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "num",
      title: "出库数量",
      inputType: "input",
      disabled: true,
      precision: 2,
      width: "100px"
    },
    {
      key: "finishNum",
      title: "退货数量",
      inputType: "number",
      controls: "false",
      precision: 2,
      min: 0,
      width: "100px"
    },
    {
      key: "note",
      title: "备注",
      inputType: "input",
      width: "200px"
    }
  ],
  metarialTableHeader = [
    // {
    //   prop: "docNo",
    //   lable: "入库单号"
    // },
    {
      prop: "storePointName",
      lable: "库点"
    },
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
      prop: "specs",
      lable: "规格"
    },
    {
      prop: "mType",
      lable: "型号"
    },
    {
      prop: "finishNum",
      lable: "出库数量"
    },
    {
      prop: "num",
      lable: "可退货数量"
    },
    {
      prop: "pbc",
      lable: "批次号"
    },
    {
      prop: "expiredDate",
      lable: "单据日期"
    }
  ];
export { tableHeader, detailTableHeader, metarialTableHeader };
