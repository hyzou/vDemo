let addSupplierButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/base/supplier/insert"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  editSupplierButton = [
    {
      flag: "save",
      size: "",
      icon: "",
      label: "保存",
      styleType: "primary",
      postUrl: "_data/base/supplier/update"
    },
    {
      flag: "cancel",
      size: "",
      icon: "",
      label: "退出",
      styleType: ""
    }
  ],
  supplierContentItems = [
    {
      type: "input",
      label: "供应商编号",
      name: "code",
      span: 12,
      width: "130px",
      disabled: true
    },
    {
      type: "input",
      label: "供应商名称",
      name: "name",
      span: 12,
      width: "130px"
    },
    {
      type: "select",
      label: "类型",
      name: "supplierType",
      multiple: false,
      placeHolder: "请选择",
      filterable: false,
      data: [
        {
          label: "供应商",
          value: "1"
        },
        {
          label: "捐赠人",
          value: "2"
        }
      ],
      span: 12,
      width: "130px"
    },
    {
      type: "elTreeSelect",
      label: "组织机构",
      name: "organizationCode",
      filterable: true,
      span: 12,
      width: "130px",
      props: {
        value: "id",
        label: "text",
        children: "children"
      },
      data: []
    },
    {
      type: "input",
      label: "联系人",
      name: "contact",
      span: 12,
      width: "130px"
    },
    {
      type: "input",
      label: "EMAIL",
      name: "email",
      span: 12,
      width: "130px"
    },
    {
      type: "inputNumber",
      label: "联系电话",
      name: "telephone",
      span: 12,
      width: "130px"
    },
    {
      type: "select",
      label: "状态",
      name: "disabled",
      multiple: false,
      placeHolder: "请选择",
      filterable: false,
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
      width: "130px"
    },
    {
      type: "input",
      label: "地址",
      name: "address",
      span: 24,
      width: "130px"
    },
    {
      type: "textarea",
      label: "备注",
      name: "note",
      rows: 3,
      span: 24,
      width: "130px"
    }
  ];
export { addSupplierButton, editSupplierButton, supplierContentItems };
