let rule = {
  price: [
    { required: true, message: "请填写我的应价", trigger: "blur" }
    // { type: 'number', message: '请填写数字', trigger: 'blur' }
  ]
};
export default {
  rule
};
