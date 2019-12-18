<template>
  <div class="main-top-logo" :style="headInfos.style">
    <el-col :span="24" style="height:100%">
      <el-col class="main-top-logo-leftPic" :span="16" style="height:100%">
        <span v-if="!headInfos.logoStyle || !headInfos.logoStyle.showImg">{{
          headInfos.title
        }}</span>
        <el-image
          v-else
          :style="headInfos.logoStyle.style ? headInfos.logoStyle.style : ''"
          :src="headInfos.logoStyle.imgSrc"
          :alt="headInfos.logoStyle.imgTitle || ''"
          :title="headInfos.logoStyle.imgTitle || ''"
          :fit="headInfos.logoStyle.fit || 'fit'"
        >
        </el-image>
      </el-col>

      <el-col
        class="headerToolbar textAlignRight"
        :span="8"
        v-if="headInfos.operate"
      >
        <span class="headerToolbar-icon el-icon-s-custom currentUser"></span>
        <span class="mr20">{{ $store.getters.userInfo.name }}</span>
        <!-- <span
          class="headerToolbar-icon el-icon-message-solid cursor positionRel"
          @click="skipMsg"
        >
          <span class="noticeTips" v-show="$store.getters.unreadNotice > 0">
            {{ $store.getters.unreadNotice }}
          </span>
        </span> -->
        <el-badge
          :value="$store.getters.unreadNotice || 0"
          :max="99"
          class="mr20"
        >
          <span
            class=" mr0 headerToolbar-icon el-icon-message-solid cursor positionRel"
            @click="skipMsg"
          >
          </span>
        </el-badge>
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
  name: "headerBar",
  props: {
    headInfos: Object
  },
  methods: {
    skipMsg() {
      console.log("skip to msg center");
    }
  }
};
</script>
