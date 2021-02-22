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
      prop: "outStorepointName",
      lable: "移出库点"
    },
    {
      prop: "outStorehouseName",
      lable: "移出仓房"
    },
    {
      prop: "inStorepointName",
      lable: "移入库点"
    },
    {
      prop: "inStorehouseName",
      lable: "移入仓房"
    },
    {
      prop: "status__dsp",
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
      key: "outStorehouseName",
      title: "移出仓房",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "inStorehouseId",
      title: "移入仓房",
      inputType: "select",
      linkName: "storehouseChange",
      data: [],
      width: "200px"
    },
    {
      key: "outStackName",
      title: "移出货位",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "inStackId",
      title: "移入货位",
      inputType: "select",
      linkName: "inStackIdChange",
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
      key: "materialSpec",
      title: "规格",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "materialMType",
      title: "型号",
      inputType: "input",
      disabled: true,
      width: "200px"
    },
    {
      key: "num",
      title: "可移出数量",
      inputType: "input",
      disabled: true,
      precision: 2,
      width: "100px"
    },
    {
      key: "finishInNum",
      title: "移出数量",
      inputType: "number",
      controls: "false",
      min: 0,
      precision: 2,
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
  ];

export { tableHeader, detailTableHeader, metarialTableHeader };
