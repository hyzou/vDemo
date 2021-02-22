export default {
  name: [{ required: true, message: "地区名称不能为空", trigger: "blur" }],
  code: [
    {
      required: true,
      message: "地区编码只能填写数字且不能为空",
      trigger: "blur"
    }
  ],
  sysParentcode: [
    { required: true, message: "所属地区不能为空", trigger: "blur" }
  ],
  sysLevel: [{ required: true, message: "地区级别不能为空", trigger: "change" }]
};
