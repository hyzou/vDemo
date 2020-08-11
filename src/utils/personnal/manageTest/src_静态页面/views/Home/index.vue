<template>
  <div class="home bgfff">
    <myheader :myheaderOption="headerOptionSettings" />
    <div v-if="equipmentList.length > 0">
      <mt-cell
        v-for="equipment in equipmentList"
        :key="equipment.id"
        :title="equipment.title"
        is-link
        :value="equipment.status"
        @click.native="
          handleRouterTo({
            path: 'addEquipment',
            query: { eqpId: equipment.id }
          })
        "
      >
      </mt-cell>
    </div>
    <div v-else>
      <mt-cell title="还没有添加测试分机！"></mt-cell>
    </div>
    <div>
      <div class="testTypeRadioGroup">
        <div
          class="eqpTypeBtn"
          v-for="type in testTypeList"
          :key="type.testEquipment"
          :class="{ 'eqpTypeBtn-active': testType == type.value }"
          @click="handleChoseCurrentType(type.value)"
        >
          {{ type.label }}
        </div>
      </div>
      <div class="largeBtnContainer">
        <mt-button size="large" type="primary" @click.native="handleAddEqp">
          添加分机
        </mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      // 顶部操作栏配置
      headerOptionSettings: {
        hideleft: false,
        title: "设备分机",
        routePath: "backToApp"
        // rightIcon: "tianjia"
      },
      // 已选的添加的分机类型
      testType: "testEquipment",
      // 分机类型列表
      testTypeList: this.$store.getters.testTypeDatas,
      // 已添加的分机列表
      equipmentList: this.$store.getters.eqpInfo
    };
  },
  methods: {
    // 添加分机按钮
    handleAddEqp() {
      this.$router.push({
        path: "addEquipment",
        query: { testType: this.testType }
      });
    },
    // 点击分机列表，跳转分机内容
    handleRouterTo(obj) {
      this.$router.push(obj);
    },
    // 点击分机标签按钮并赋值
    handleChoseCurrentType(data) {
      this.testType = data;
    }
  },
  mounted() {
    // this.$postData(this.$api.getControllerList, {}).then(xhr => {
    //   console.log(xhr);
    // });
    // this.$getData(this.$api.getControllerList, {}).then(xhr => {
    //   console.log(xhr);
    // });
  }
};
</script>
