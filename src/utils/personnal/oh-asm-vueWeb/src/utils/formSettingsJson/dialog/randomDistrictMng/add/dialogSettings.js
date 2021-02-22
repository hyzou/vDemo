const addRandomItemDialogBtns = [
  {
    flag: "save",
    label: "保存",
    styleType: "primary",
    postUrl: "addUserDistrict_randomDistrictMng"
  },
  {
    flag: "cancle",
    label: "取消",
    styleType: ""
  }
];
const addRandomItemDialogItems = [
  {
    type: "inputNumber",
    label: "地区编码",
    name: "code",
    span: 24,
    width: "150px"
  },
  {
    type: "input",
    label: "地区名称",
    name: "name",
    span: 24,
    width: "150px"
  },
  // {
  //   type: "input",
  //   label: "所属地区编码",
  //   name: "sysParentcode",
  //   span: 12,
  //   width: "150px"
  // },
  {
    type: "elTreeSelect",
    label: "所属地区",
    name: "sysParentcode",
    span: 24,
    data: [],
    props: {
      value: "id",
      label: "fullName",
      children: "children"
    },
    filterable: true,
    multiple: false,
    clearable: true,
    width: "150px"
  },
  {
    type: "select",
    label: "地区级别",
    name: "sysLevel",
    data: [],
    span: 12,
    width: "150px"
  }
];
export { addRandomItemDialogBtns, addRandomItemDialogItems };
