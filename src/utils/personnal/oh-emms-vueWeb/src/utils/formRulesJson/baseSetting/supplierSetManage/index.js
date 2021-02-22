import { phone, email } from "../../validator";
export default {
  name: [{ required: true, message: "请输入供应商名称", trigger: "blur" }],
  supplierType: [
    { required: true, message: "请选择供应商类型", trigger: "change" }
  ],
  email: [{ validator: email, trigger: "blur" }],
  telephone: [{ validator: phone, trigger: "blur" }]
};
