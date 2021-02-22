let tableHeader = [
    {
      prop: "docNo",
      lable: "单号"
    },
    {
      prop: "businessDate",
      lable: "申请日期"
    },
    {
      prop: "storepointName",
      lable: "库点"
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
      disabled: true,
      width: "150px"
    },
    {
      key: "wmsBasStackName",
      title: "货位",
      inputType: "input",
      disabled: true,
      width: "150px"
    },
    {
      key: "materialCode",
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
      key: "qty",
      title: "报废数量",
      inputType: "input",
      width: "120px",
      placeHolder: " "
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
      prop: "operableNum",
      lable: "可报废数量"
    },
    {
      prop: "code",
      lable: "批次"
    },
    {
      prop: "expiredDate",
      lable: "有效期"
    }
  ];
export { tableHeader, detailTableHeader, materialDetailTableHeader };
