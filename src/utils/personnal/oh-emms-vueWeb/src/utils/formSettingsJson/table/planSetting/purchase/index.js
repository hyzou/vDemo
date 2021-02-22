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
      prop: "created_dsp",
      lable: "开单时间"
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
      prop: "storepointId__dsp",
      lable: "库点"
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
  materialDetailReservePlanTableHeader = [
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
      key: "stockNum",
      title: "当前库存",
      inputType: "input",
      width: "80px",
      placeHolder: " ",
      disabled: true
    },
    {
      key: "planNum",
      title: "计划储备总数（A）",
      inputType: "input",
      width: "140px",
      placeHolder: " ",
      disabled: true
    },
    {
      key: "distributableNum",
      title: "可分配数量",
      inputType: "input",
      width: "100px",
      placeHolder: " ",
      disabled: true
    },
    {
      key: "distributionNum",
      title: "分配数量",
      inputType: "input",
      width: "80px",
      placeHolder: " "
    },
    {
      key: "inNum",
      title: "已入库数量",
      inputType: "input",
      width: "100px",
      placeHolder: " ",
      disabled: true
    }
  ],
  materialDetailOtherTableHeader = [
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
      key: "distributionNum",
      title: "数量",
      inputType: "input",
      width: "80px",
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
  ],
  reservePlanMaterialTableHeader = [
    {
      prop: "docNo",
      lable: "单号"
    },
    {
      prop: "year",
      lable: "年份"
    },
    {
      prop: "emmsBasMaterialType",
      lable: "物资类别"
    },
    {
      prop: "emmsBasMaterialCode",
      lable: "物资编码"
    },
    {
      prop: "emmsBasMaterial",
      lable: "物资名称"
    },
    {
      prop: "emmsBasMaterialUnit",
      lable: "计量单位"
    },
    {
      prop: "emmsBasMaterialSpec",
      lable: "规格"
    },
    {
      prop: "mType",
      lable: "型号"
    },
    {
      prop: "stockNum",
      lable: "当前库存"
    },
    {
      prop: "planNum",
      lable: "计划储备总数"
    },
    {
      prop: "distributableNum",
      lable: "可分配数量"
    }
  ];
export {
  tableHeader,
  materialDetailReservePlanTableHeader,
  materialDetailOtherTableHeader,
  materialTableHeader,
  reservePlanMaterialTableHeader
};
