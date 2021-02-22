const searchFormBtns = [
  {
    flag: "save",
    size: "",
    icon: "",
    label: "查询",
    styleType: "primary",
    postUrl: "distributeSuperviseList"
  }
];
const searchFormItems = [
  {
    type: "select",
    label: "方案名称",
    name: "asmSchemeId",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    data: [],
    span: 8,
    width: "100px"
  },
  {
    type: "select",
    label: "是否失分项",
    name: "cut",
    multiple: false,
    placeHolder: "请选择",
    filterable: true,
    data: [
      {
        label: "只看失分项",
        value: "Y"
      },
      {
        label: "查看所有",
        value: "N"
      }
    ],
    span: 8,
    width: "100px"
  }
];
export { searchFormBtns, searchFormItems };
