const checkRandomItemDialogBtns = [];
const checkRandomItemDialogItems = [
  {
    type: "input",
    label: "地区编码",
    name: "code",
    disabled: true,
    span: 24,
    width: "150px"
  },
  {
    type: "input",
    label: "地区名称",
    disabled: true,
    name: "name",
    span: 24,
    width: "150px"
  },
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
    disabled: true,
    clearable: true,
    width: "150px"
  },
  {
    type: "select",
    label: "地区级别",
    disabled: true,
    name: "sysLevel",
    data: [],
    span: 12,
    width: "150px"
  }
];
export { checkRandomItemDialogBtns, checkRandomItemDialogItems };
