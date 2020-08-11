<template>
  <i
    :class="['svg-icon', 'iconfont', iconName]"
    :style="iconStyle"
    aria-hidden="true"
  >
    <!-- <use :xlink:href="iconName"></use> -->
  </i>
</template>

<script>
// import "../../public/iconfont/iconfont.js";
// import "../../public/iconfont/iconfont.css";

export default {
  name: "iconSvg",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconStyle: {
      type: Object
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    iconName() {
      return `${this.iconClass}`;
    }
  }
};
</script>

<style>
.svg-icon {
  font-size: 1em;
}
</style>
