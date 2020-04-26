<template>
  <div
    class="main-top-logo"
    :style="{
      background: headInfos.style.backgroundColor,
      color: headInfos.style.textColor,
      'font-weight': headInfos.style.fontWeight,
      height: headInfos.style.height,
      'line-height': headInfos.style.height,
      'font-size': headInfos.style.fontSize
    }"
  >
    <el-col :span="24">
      <el-col class="main-top-logo-leftPic mo_fullWidth mo_logoText" :span="16">
        {{ headInfos.title }}
      </el-col>

      <el-col
        class="headerToolbar textAlignRight"
        :span="8"
        v-if="headInfos.operate"
      >
        <span class="headerToolbar-icon el-icon-s-custom currentUser"></span>
        <span class="currentUserName">{{ $store.getters.userInfo.name }}</span>
        <span
          class="headerToolbar-icon el-icon-message-solid cursor positionRel"
          @click="skipMsg"
        >
          <span class="noticeTips" v-show="$store.getters.unreadNotice > 0">
            {{ $store.getters.unreadNotice }}
          </span>
        </span>
        <!-- <span class="headerToolbar-icon el-icon-s-home"></span> -->
        <a
          class="headerToolbar-icon el-icon-switch-button"
          :href="$global.logout"
        ></a>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "mainTopLogo",
  props: {
    headInfos: Object
  },
  data() {
    return {
      loginName: ""
    };
  },
  methods: {
    skipMsg() {
      let centername =
        this.$store.getters.userInfo.type == "1"
          ? "infoCenter"
          : "memMsgCenter";
      this.$router.push({ name: centername });
    }
  },
  mounted() {
    this.loginName = this.$store.getters.userInfo.name;
  }
};
</script>
