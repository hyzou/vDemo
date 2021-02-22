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
      lable: "依据单号"
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
      hideItem: false,
      disabled: true,
      width: "200px"
    },
    {
      key: "wmsBasStackName",
      title: "货位",
      inputType: "input",
      hideItem: false,
      disabled: true,
      width: "200px"
    },
    {
      key: "materialCode",
      title: "物资编码",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "emmsBasMaterialName",
      title: "物资名称",
      inputType: "input",
      disabled: true
      // width: "200px"
    },
    {
      key: "unitName",
      title: "计量单位",
      inputType: "input",
      disabled: true,
      width: "100px"
    },
    {
      key: "materialSpec",
      title: "规格",
      inputType: "input",
      disabled: true
      // width: "200px"
    },
    {
      key: "materialMType",
      title: "型号",
      inputType: "input",
      disabled: true
      // width: "200px"
    },
    // {
    //   key: "pbc",
    //   title: "生产批次",
    //   inputType: "input",
    //   disabled: true,
    //   width: "200px"
    // },
    {
      key: "num",
      title: "可出库数量",
      inputType: "number",
      controls: "false",
      disabled: true,
      precision: 2,
      width: "100px"
    },
    {
      key: "finishNum",
      title: "出库数量",
      inputType: "number",
      controls: "false",
      min: 0,
      precision: 2,
      width: "100px"
    }
    // {
    //   key: "note",
    //   title: "备注",
    //   inputType: "input",
    //   width: "200px"
    // }
  ],
  detailRETableHeader = [
    // {
    //   key: "storehouseName",
    //   title: "仓房",
    //   inputType: "input",
    //   hideItem: true,
    //   disabled: true,
    //   width: "200px"
    // },
    // {
    //   key: "storehouseId",
    //   title: "仓房",
    //   inputType: "select",
    //   hideItem: true,
    //   linkName: "storehouseChange",
    //   data: [],
    //   width: "200px"
    // },
    // {
    //   key: "wmsBasStackName",
    //   title: "货位",
    //   inputType: "input",
    //   hideItem: true,
    //   disabled: true,
    //   width: "200px"
    // },
    // {
    //   key: "wmsBasStackId",
    //   title: "货位",
    //   inputType: "select",
    //   hideItem: true,
    //   data: [],
    //   width: "200px"
    // },
    {
      key: "materialCode",
      title: "物资编码",
      inputType: "input",
      disabled: true
      // width: "200px"
    },
    {
      key: "emmsBasMaterialName",
      title: "物资名称",
      inputType: "input",
      disabled: true
      // width: "200px"
    },
    {
      key: "unitName",
      title: "计量单位",
      inputType: "input",
      disabled: true
      // width: "100px"
    },
    {
      key: "materialSpec",
      title: "规格",
      inputType: "input",
      disabled: true
      // width: "200px"
    },
    {
      key: "materialMType",
      title: "型号",
      inputType: "input",
      disabled: true
      // width: "200px"
    },
    // {
    //   key: "pbc",
    //   title: "生产批次",
    //   inputType: "input",
    //   disabled: true
    //   // width: "200px"
    // },
    {
      key: "num",
      title: "申请出库数量",
      inputType: "number",
      controls: "false",
      disabled: true,
      precision: 2
      // width: "100px"
    }
    // {
    //   key: "finishNum",
    //   title: "出库数量",
    //   inputType: "number",
    //   controls: "false",
    //   min: 0,
    //   precision: 2,
    //   width: "100px"
    // },
    // {
    //   key: "note",
    //   title: "备注",
    //   inputType: "input"
    //   // width: "200px"
    // }
  ],
  metarialTableHeader = [
    {
      prop: "storepointName",
      lable: "库点"
    },
    {
      prop: "storehouseName",
      lable: "仓房"
    },
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
      prop: "emmsBasMaterialName",
      lable: "物资名称"
    },
    {
      prop: "unitName",
      lable: "计量单位"
    },
    {
      prop: "materialSpec",
      lable: "规格"
    },
    {
      prop: "materialMType",
      lable: "型号"
    },
    {
      prop: "allnum",
      lable: "库存数量"
    },
    {
      prop: "operableNum",
      lable: "可出库数量"
    },
    {
      prop: "pbc",
      lable: "批次号"
    },
    {
      prop: "inDate",
      lable: "有效期"
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
      prop: "materialCode",
      lable: "物资编码",
      width: "220px"
    },
    {
      prop: "emmsBasMaterialName",
      lable: "物资名称",
      width: "220px"
    },
    {
      prop: "unitName",
      lable: "计量单位",
      width: "100px"
    },
    {
      prop: "materialSpec",
      lable: "规格",
      width: "220px"
    },
    {
      prop: "materialMType",
      lable: "型号",
      width: "220px"
    },
    {
      prop: "planNum",
      lable: "申请单数量",
      width: "100px"
    }
  ];
export {
  tableHeader,
  detailTableHeader,
  detailRETableHeader,
  metarialTableHeader,
  referMetarialTableHeader
};
