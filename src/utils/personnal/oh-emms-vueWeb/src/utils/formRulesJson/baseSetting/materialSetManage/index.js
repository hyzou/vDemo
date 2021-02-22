export default {
  name: [{ required: true, message: "请输入物资名称", trigger: "blur" }],
  shortName: [{ required: true, message: "请输入物资简称", trigger: "blur" }],
  brand: [{ required: true, message: "请输入品牌", trigger: "blur" }],
  specs: [{ required: true, message: "请输入规格", trigger: "blur" }],
  mType: [{ required: true, message: "请输入型号", trigger: "blur" }],
  wDay: [{ required: true, message: "请输入预警提前期", trigger: "blur" }],
  manufacturer: [{ required: true, message: "请输入制造商", trigger: "blur" }],
  emmsBasUnitId: [
    { required: true, message: "请选择计量单位", trigger: "change" }
  ],
  isService: [{ required: true, message: "请选择是否保养", trigger: "change" }],
  isRecycleable: [
    { required: true, message: "请选择是否为回收物资", trigger: "change" }
  ]
};
