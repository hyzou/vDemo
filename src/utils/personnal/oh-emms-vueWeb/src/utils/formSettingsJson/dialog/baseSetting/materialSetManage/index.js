let addMaterialButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/base/material/addMaterial"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  editMaterialButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/base/material/updateMaterial"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  materialContentItems = [
    {
      type: "inputHidden",
      label: "物资类别编号",
      name: "emmsBasMaterialTypeId",
      span: 12,
      width: "120px"
    },
    {
      type: "inputHidden",
      label: "物资id",
      name: "emmsBasMaterialId",
      span: 12,
      width: "120px"
    },
    {
      type: "inputHidden",
      label: "规格id",
      name: "emmsBasMaterialSpecId",
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "物资小类",
      name: "materialTypeName",
      span: 24,
      width: "120px",
      disabled: true
    },
    {
      type: "input",
      label: "编码",
      name: "code",
      span: 12,
      width: "120px",
      disabled: true
    },
    {
      type: "input",
      label: "名称",
      name: "name",
      span: 12,
      width: "120px"
    },
    {
      type: "select",
      label: "计量单位",
      name: "emmsBasUnitId",
      placeHolder: "请选择",
      data: [],
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "简称",
      name: "shortName",
      span: 12,
      width: "120px"
    },
    {
      type: "select",
      label: "回收物资",
      name: "isRecycleable",
      placeHolder: "请选择",
      data: [
        {
          label: "是",
          value: "Y"
        },
        {
          label: "否",
          value: "N"
        }
      ],
      span: 12,
      width: "120px"
    },
    {
      type: "select",
      label: "维护保养",
      name: "isService",
      placeHolder: "请选择",
      data: [
        {
          label: "是",
          value: "Y"
        },
        {
          label: "否",
          value: "N"
        }
      ],
      span: 12,
      width: "120px"
    },
    {
      type: "inputNumber",
      label: "预警提前期(天)",
      name: "wDay",
      span: 12,
      width: "120px"
    },
    {
      type: "select",
      label: "状态",
      name: "disabled",
      placeHolder: "请选择",
      data: [
        {
          label: "启用",
          value: "N"
        },
        {
          label: "禁用",
          value: "Y"
        }
      ],
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "品牌",
      name: "brand",
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "规格",
      name: "specs",
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "型号",
      name: "mType",
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "制造商",
      name: "manufacturer",
      span: 12,
      width: "120px"
    },
    {
      type: "input",
      label: "系统对接编号",
      name: "apiCode",
      span: 12,
      width: "120px"
    }
  ];
export { addMaterialButton, editMaterialButton, materialContentItems };
