export default {
  name: [{ required: true, message: "事项名称不能为空", trigger: "blur" }],
  seq: [
    {
      required: true,
      message: "事项编号只能输入数字且不能为空",
      trigger: "blur"
    }
  ],
  freq: [
    {
      required: true,
      message: "检查频次只能输入数字且不能为空",
      trigger: "blur"
    }
  ],
  type: [
    { required: true, message: "检查事项类型不能为空", trigger: "change" }
  ],
  sponsor: [{ required: true, message: "检查主体不能为空", trigger: "blur" }],
  mode: [{ required: true, message: "检查方式不能为空", trigger: "blur" }],
  basis: [{ required: true, message: "检查依据不能为空", trigger: "blur" }],
  content: [
    { required: true, message: "检查内容及要求不能为空", trigger: "blur" }
  ]
};
