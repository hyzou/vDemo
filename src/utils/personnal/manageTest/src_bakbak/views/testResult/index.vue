<template>
  <div class="manage">
    <myheader :myheaderOption="headerOption" />
    <mt-field
      label="设备名"
      placeholder="请输入设备名"
      v-model="formdata.eqpName"
    ></mt-field>
    <mt-field
      label="设备类型"
      placeholder="请输入设备类型"
      v-model="formdata.eqpType_dsc"
    ></mt-field>
    <mt-field
      label="控制寄存器地址"
      placeholder="请输入控制寄存器地址"
      v-model="formdata.controlRegisterIp"
    ></mt-field>
    <div class="page-part">
      <mt-cell title="全关">
        <span style="margin-right: 5px;">0</span>
        <mt-badge type="success" size="small">测试成功</mt-badge>
      </mt-cell>
    </div>
    <mt-field
      label="状态寄存器地址"
      placeholder="请输入状态寄存器地址"
      v-model="formdata.stateRegisterIp"
    ></mt-field>
    <div class="page-part">
      <mt-cell title="关闭">
        <span style="margin-right: 5px;">0</span>
        <mt-badge type="error" size="small">测试失败</mt-badge>
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "testResult",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      headerOption: {
        hideleft: false,
        title: "测试结果",
        routePath: "/"
      },
      formdata: {
        eqpName: "",
        stateRegisterIp: "",
        eqpType_dsc: "",
        controlRegisterIp: ""
      }
    };
  }
};
</script>
