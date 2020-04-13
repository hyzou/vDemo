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
    handleBackToApp() {
      alert("backToApp");
    },
    handleMyheaderRightFnc() {
      this.$emit("myheaderRightFnc");
    }
  }
};
</script>
