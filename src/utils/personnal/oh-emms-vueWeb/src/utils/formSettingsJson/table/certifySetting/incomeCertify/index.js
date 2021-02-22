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
      prop: "sourceType__dsp",
      lable: "开单依据"
    },
    {
      prop: "sourceDocNo",
      lable: "依据单号",
      isHide: false
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
      key: "storehouseId",
      title: "仓房",
      inputType: "select",
      linkName: "storehouseChange",
      data: [],
      width: "200px"
    },
    {
      key: "wmsBasStackId",
      title: "货位",
      inputType: "select",
      data: [],
      width: "200px"
    },
    {
      key: "reserveType",
      title: "储备性质",
      inputType: "select",
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
      width: "200px"
    },
    {
      key: "num",
      title: "计划入库数量",
      inputType: "input",
      precision: 2,
      disabled: true,
      width: "100px"
    },
    {
      key: "finishNum",
      title: "入库数量",
      inputType: "number",
      controls: "false",
      precision: 2,
      min: 0,
      width: "100px"
    },
    {
      key: "price",
      title: "单价",
      inputType: "number",
      min: 0,
      controls: "false",
      precision: 2,
      width: "100px"
    },
    {
      key: "expiredDate",
      title: "有效期",
      inputType: "date",
      dateType: "datetime",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      format: "yyyy-MM-dd HH:mm:ss",
      width: "200px"
    }
  ],
  metarialTableHeader = [
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
      prop: "brand",
      lable: "品牌"
    },
    {
      prop: "manufacturer",
      lable: "制造商"
    }
  ],
  referMetarialTableHeader = [
    {
      prop: "sourceType",
      lable: "来源类别",
      width: "100px"
    },
    {
      prop: "sourceId",
      lable: "来源单号",
      width: "260px"
    },
    {
      prop: "storepointName",
      lable: "库点",
      width: "220px"
    },
    {
      prop: "materialTypeName",
      lable: "物资类别",
      width: "220px"
    },
    {
      prop: "code",
      lable: "物资编码",
      width: "220px"
    },
    {
      prop: "name",
      lable: "物资名称",
      width: "220px"
    },
    {
      prop: "unitName",
      lable: "计量单位",
      width: "100px"
    },
    {
      prop: "specs",
      lable: "规格",
      width: "220px"
    },
    {
      prop: "mType",
      lable: "型号",
      width: "220px"
    },
    {
      prop: "planNum",
      lable: "计划数量",
      width: "100px"
    },
    {
      prop: "storableNum",
      lable: "可入库数量",
      width: "100px"
    },
    {
      prop: "created",
      lable: "开单时间",
      width: "220px"
    }
  ];
export {
  tableHeader,
  detailTableHeader,
  metarialTableHeader,
  referMetarialTableHeader
};
