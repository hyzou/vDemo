let rule = {
  menuname: [{ required: true, message: "请填写菜单名称", trigger: "blur" }],
  menuid: [{ required: true, message: "请填写菜单主键", trigger: "blur" }],
  menuaction: [{ required: true, message: "请填写菜单活动", trigger: "blur" }],
  isleaf: [{ required: true, message: "请填写是否叶子结点", trigger: "blur" }],
  isaction: [{ required: true, message: "请填写菜单类型", trigger: "blur" }],
  displayorder: [{ required: true, message: "请填写菜单排序", trigger: "blur" }]
};

export default {
  rule
};
