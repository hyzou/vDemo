<template>
  <div class="manage">
    <myheader
      :myheaderOption="headerOptionSettings"
      @myheaderRightFnc="handleMyheaderRightFnc"
    />
    <mt-field
      label="分机名"
      placeholder="请输入分机名"
      v-model="formdata.eqpName"
      readonly
    ></mt-field>
    <mt-field
      label="连接类型"
      placeholder="请输入连接类型"
      v-model="formdata.connectTpye_dsc"
      readonly
    ></mt-field>
    <template v-if="formdata.connectTpye != 'tcp'">
      <mt-field
        label="串口"
        placeholder="请输入串口"
        v-model="formdata.serialPort_dsc"
        readonly
      ></mt-field>
    </template>
    <template v-else>
      <mt-field
        label="IP地址"
        placeholder="请输入IP地址"
        v-model="formdata.eqpIp"
        readonly
      ></mt-field>
      <mt-field
        label="端口"
        placeholder="请输入端口"
        v-model="formdata.eqpPort"
        readonly
      ></mt-field>
    </template>
    <mt-field
      label="协议类型"
      placeholder="请输入协议类型"
      v-model="formdata.protocol_dsc"
      readonly
    ></mt-field>
    <mt-field
      label="Modbus地址"
      placeholder="请输入Modbus地址"
      v-model="formdata.ModbusAddress"
      readonly
    ></mt-field>
    <div v-if="equipmentList.length > 0">
      <mt-cell
        v-for="equipment in equipmentList"
        :key="equipment.id"
        :title="equipment.title"
        @click.native="handleRouterTo(equipment.id)"
        is-link
        :value="equipment.status"
      >
      </mt-cell>
    </div>
    <div v-else>
      <mt-cell title="还没有测试过设备！"></mt-cell>
      <div class="largeBtnContainer">
        <mt-button
          size="large"
          type="primary"
          @click.native="handleMyheaderRightFnc"
        >
          添加设备
        </mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "equipmentList",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      headerOptionSettings: {
        hideleft: false,
        title: "设备分机",
        routePath: "home",
        rightIcon: "tianjia"
      },
      formdata: this.$store.getters.eqpInfo[this.$route.query.eqpId],
      equipmentList: this.$store.getters.testInfo
    };
  },
  methods: {
    handleMyheaderRightFnc() {
      this.$router.push({
        path: "addEqpExt",
        query: { eqpId: this.$route.query.eqpId }
      });
    },
    handleRouterTo(id) {
      let routeQuery = this.$route.query;
      routeQuery.testEqpId = id;
      this.$router.push({ path: "addEqpExt", query: routeQuery });
    }
  }
};
</script>
