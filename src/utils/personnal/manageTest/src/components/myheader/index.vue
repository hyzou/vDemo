<template>
  <div class="ah-header-group">
    <mt-header :title="myheaderOption.title">
      <template v-if="!myheaderOption.hideleft">
        <mt-button
          slot="left"
          v-if="myheaderOption.routePath == 'backToApp'"
          icon="back"
          @click.native="handleBackToApp"
        >
          返回
        </mt-button>
        <mt-button
          slot="left"
          v-else-if="myheaderOption.routePath == 'backToHome'"
          icon="back"
          @click.native="handleBackToHome"
        >
          返回
        </mt-button>
        <router-link
          v-else
          :to="{ path: myheaderOption.routePath, query: $route.query }"
          slot="left"
        >
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </template>
      <mt-button
        v-if="myheaderOption.rightIcon"
        :icon="myheaderOption.rightIcon"
        slot="right"
        @click.native="handleMyheaderRightFnc"
      ></mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "myheader",
  props: {
    myheaderOption: {
      type: Object,
      default() {
        return {
          title: "标题",
          routePath: "/",
          rightIcon: "tianjia"
        };
      }
    }
  },
  methods: {
    // 头部左侧按钮点击事件--首页，点击与app交互
    handleBackToApp() {
      alert("backToApp");
      // var u = navigator.userAgent;
      // var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      // console.log(isAndroid, isiOS);
      // if (isiOS != true && isAndroid == true) {
      //   // window.Android.postMessage("goBack");
      //   window.LabInterface.back();
      // } else {
      //   try {
      //     window.postMessage("goBack");
      //   } catch (error) {
      //     this.$router.push("/");
      //   }
      // }
    },
    // 头部左侧按钮点击事件-返回按钮执行前处理逻辑
    handleBackToHome() {
      this.$emit("myheaderLeftFnc");
    },
    // 头部右侧按钮点击事件
    handleMyheaderRightFnc() {
      this.$emit("myheaderRightFnc");
    }
  }
};
</script>
