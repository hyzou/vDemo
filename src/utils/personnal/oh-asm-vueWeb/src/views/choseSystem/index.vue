<template>
  <div class="choseSystem positionFix positionFullScreenWrap">
    <div class="positionAbs positionCenterWrap">
      <div class="choseSystem-title positionAbs">
        <el-image
          :src="choseSystemTitle"
          :style="{ width: '1200px' }"
        ></el-image>
      </div>
      <div class="displayFlex">
        <div
          v-if="
            $store.getters['user/userInfos'].districtLevel == 'PROVINCE' ||
              $store.getters['user/userInfos'].districtLevel == 'COUNTRY'
          "
          class="choseSystem-sysItem choseSystem-sysItem-province textAlignCenter"
          @click="handleChoseSystem('oh-asm-province')"
        >
          <el-image
            class="mt70"
            :src="provinceSysPic"
            :style="{ width: '100px' }"
          ></el-image>
          <p class="mt40 fontSize34 text-white">省长责任制考核系统</p>
        </div>
        <div
          v-if="$store.getters['user/userInfos'].districtLevel !== 'COUNTY'"
          class="choseSystem-sysItem ml60 mr60 choseSystem-sysItem-city textAlignCenter"
          @click="handleChoseSystem('oh-asm-city')"
        >
          <el-image
            class="mt70"
            :src="citySysPic"
            :style="{ width: '100px' }"
          ></el-image>
          <p class="mt40 fontSize34 text-white">市长责任制考核系统</p>
        </div>
        <div
          class="choseSystem-sysItem choseSystem-sysItem-country textAlignCenter"
          @click="handleChoseSystem('oh-asm-district')"
        >
          <el-image
            class="mt70"
            :src="countrySysPic"
            :style="{ width: '100px' }"
          ></el-image>
          <p class="mt40 fontSize34 text-white">县长责任制考核系统</p>
        </div>
      </div>
    </div>
    <div class="choseSystem-copyRight positionAbs fontSize16 text-white">
      技术支持：杭州安鸿科技股份有限公司
    </div>
    <div class="positionAbs choseSystem-logout" @click="handleLogout">
      <el-button type="primary">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import choseSystemTitle from "@/assets/choseSystem/titlePic.png";
import provinceSysPic from "@/assets/choseSystem/provinceSysPic.png";
import citySysPic from "@/assets/choseSystem/citySysPic.png";
import countrySysPic from "@/assets/choseSystem/countrySysPic.png";
export default {
  name: "choseSystem",
  data() {
    return {
      choseSystemTitle: choseSystemTitle,
      provinceSysPic: provinceSysPic,
      citySysPic: citySysPic,
      countrySysPic: countrySysPic
    };
  },
  methods: {
    handleChoseSystem(type) {
      sessionStorage.setItem("sysType", type);
      this.$store
        .dispatch("user/commitMenuTree", type)
        .then(() => {
          this.$router.push({ name: "informationsPage" });
        })
        .catch(() => {
          this.$message.error("您选择的系统尚未配置菜单");
        });
    },
    handleLogout() {
      this.$confirm("确定退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        location.href = this.$global.logout;
      });
    }
  },
  mounted() {
    if (this.$route.params.isReload) {
      location.reload();
    }
    if (this.$store.getters["user/userInfos"].districtLevel == "COUNTY") {
      this.handleChoseSystem("oh-asm-district");
    }
  }
};
</script>
