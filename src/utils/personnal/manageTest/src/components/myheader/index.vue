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
          :to="{ path: myheaderOption.routePath }"
          slot="left"
        >
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </template>
      <mt-button
        v-if="myheaderOption.rightIcon"
        slot="right"
        @click.native="handleMyheaderRightFnc"
      >
        <iconSvg
          style="font-size:1.5em;"
          slot="icon"
          :iconClass="myheaderOption.rightIcon"
        />
      </mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: "myheader",
  components: {
    iconSvg: () => import("@/components/iconFontSvg")
  },
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
      let u = navigator.userAgent,
        postMFlag = false,
        reactNaPostMFlag = false;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
        isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      try {
        window.postMessage("goBack");
      } catch (error) {
        postMFlag = true;
      }
      try {
        window.ReactNativeWebView.postMessage("goBack");
      } catch (error) {
        reactNaPostMFlag = true;
      }
      if (isiOS != true && isAndroid == true) {
        // window.Android.postMessage("goBack");
        window.LabInterface.back();
      }
      if (postMFlag && reactNaPostMFlag) {
        this.$router.push("/");
      }

      /*ios返回*/
      // if (isAndroid != true && isiOS == true) {
      //   window.webkit.messageHandlers.AppModel.postMessage({
      //     id: "goBack"
      //   });
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
