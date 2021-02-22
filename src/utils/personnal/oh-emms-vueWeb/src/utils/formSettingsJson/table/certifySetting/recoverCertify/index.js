let tableHeader = [
    {
      prop: "docNo",
      lable: "单号"
    },
    {
      prop: "created",
      lable: "单据日期"
    },
    {
      prop: "storepointName",
      lable: "库点"
    },
    {
      prop: "inoutDocNo",
      lable: "出库单号"
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
      key: "storehouseName",
      title: "仓房",
      inputType: "input",
      disabled: true
    },
    {
      key: "storeStackName",
      title: "货位",
      inputType: "input",
      disabled: true
    },
    // {
    //   key: "materialTypeName",
    //   title: "物资类别",
    //   inputType: "input",
    //   disabled: true
    // },
    {
      key: "code",
      title: "物资编码",
      inputType: "input",
      disabled: true
    },
    {
      key: "name",
      title: "物资名称",
      inputType: "input",
      disabled: true
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
      disabled: true
    },
    {
      key: "mType",
      title: "型号",
      inputType: "input",
      disabled: true
    },
    {
      key: "planNum",
      title: "可回收数量",
      inputType: "input",
      width: "100px",
      disabled: true
    },
    {
      key: "actualNum",
      title: "回收数量",
      width: "120px",
      placeHolder: " ",
      inputType: "number",
      controls: "false",
      min: 0
    },
    {
      key: "note",
      title: "备注",
      inputType: "textarea",
      placeHolder: " "
    }
  ],
  materialDetailTableHeader = [
    // {
    //   prop: "storepointName",
    //   lable: "库点"
    // },
    {
      prop: "storehouseName",
      lable: "仓房"
    },
    {
      prop: "storeStackName",
      lable: "货位"
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
      prop: "returnableNum",
      lable: "可回收数量"
    },
    {
      prop: "batchNo",
      lable: "批次号"
    },
    {
      prop: "businessDate",
      lable: "开单时间"
    }
  ];
export { tableHeader, detailTableHeader, materialDetailTableHeader };
