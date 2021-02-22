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
      prop: "storepointId__dsp",
      lable: "调出库点"
    },
    {
      prop: "destination",
      lable: "送达地点"
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
      key: "materialTypeName",
      title: "物资类别",
      inputType: "input",
      disabled: true
    },
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
      key: "num",
      title: "调拨数量",
      inputType: "input",
      width: "120px",
      placeHolder: " "
    }
  ],
  materialDetailTableHeader = [
    {
      prop: "storepointId__dsp",
      lable: "库点"
    },
    // {
    //   prop: "storehouseId__dsp",
    //   lable: "仓房"
    // },
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
      prop: "noLockNum",
      lable: "可调拨数量"
    }
  ];
export { tableHeader, detailTableHeader, materialDetailTableHeader };
