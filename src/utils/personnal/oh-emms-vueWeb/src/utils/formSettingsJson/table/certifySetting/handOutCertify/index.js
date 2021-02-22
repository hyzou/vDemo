let tableHeader = [
    {
      prop: "docNo",
      lable: "单号"
    },
    {
      prop: "startDate_dsp",
      lable: "开单日期"
    },
    {
      prop: "storepointId__dsp",
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
  materialDetailTableHeader = [
    {
      key: "materialTypeName",
      title: "物资类别",
      inputType: "input",
      disabled: true,
      width: "150px"
    },
    {
      key: "code",
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
      width: "80px"
    },
    {
      key: "mType",
      title: "型号",
      inputType: "input",
      disabled: true,
      width: "80px"
    },
    {
      key: "num",
      title: "发放数量",
      inputType: "input",
      width: "120px",
      placeHolder: " "
    },
    {
      key: "receiver",
      title: "领取人",
      inputType: "input",
      width: "100px",
      placeHolder: " "
    },
    {
      key: "receiveDate",
      title: "领取时间",
      inputType: "date",
      width: "150px",
      placeHolder: " "
    },
    {
      key: "note",
      title: "备注",
      inputType: "textarea",
      placeHolder: " "
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
  ];
export { tableHeader, materialDetailTableHeader, materialTableHeader };
