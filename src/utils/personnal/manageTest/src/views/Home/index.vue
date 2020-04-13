<template>
  <div class="home">
    <myheader
      :myheaderOption="headerOptionSettings"
      @myheaderRightFnc="handleMyheaderRightFnc"
    />
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
      <div class="positionAbs centerFixed width100 textAlignCenter">
        <img src="@/assets/noOperation.png" width="150" />
        <p class="text-info">
          您还没有添加测试分机！
          <span class="text-success textUnderline" @click="handleAddEqp"
            >去添加</span
          >
        </p>
      </div>

      <!-- <mt-cell title="还没有添加测试分机！"></mt-cell>
      <div class="largeBtnContainer">
        <mt-button size="large" type="primary" @click.native="handleAddEqp">
          添加分机
        </mt-button>
      </div> -->
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
      headerOptionSettings: {
        hideleft: false,
        title: "设备分机",
        routePath: "backToApp",
        rightIcon: "tianjia"
      },
      equipmentList: this.$store.getters.eqpInfo
    };
  },
  methods: {
    handleMyheaderRightFnc() {
      this.$router.push("addEquipment");
    },
    handleAddEqp() {
      this.$router.push("addEquipment");
    },
    handleRouterTo(obj) {
      this.$router.push(obj);
    }
  },
  mounted() {
    this.$postData(this.$api.getControllerList, {}).then(xhr => {
      console.log(xhr);
    });
  }
};
</script>
