let rule = {
  name: [{ required: true, message: "请填写名称", trigger: "blur" }],
  dataType: [{ required: true, message: "请填写数据类型", trigger: "change" }],
  busintypeid: [
    { required: true, message: "请填写关联字典表", trigger: "change" }
  ],
  munit: [{ required: true, message: "请填写计量单位", trigger: "blur" }],
  sortNo: [{ required: true, message: "请填写排序", trigger: "blur" }],
  disable: [{ required: true, message: "请填写是否禁用", trigger: "change" }],
  qasBasItemTypeId: [
    { required: true, message: "请填写所属检测项", trigger: "change" }
  ]
};

export default {
  rule
};
