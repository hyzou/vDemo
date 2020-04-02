<template>
  <i :class="['svg-icon','iconfont',iconName]" :style="iconStyle" aria-hidden="true">
    <!-- <use :xlink:href="iconName"></use> -->
  </i>
</template>

<script>
export default {
  name: 'iconSvg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconStyle :{
      type: Object
    }
  },
  computed: {
    iconName() {
      return `icon-${this.iconClass}`
    }
  }
}
</script>

<style>
.svg-icon {
  font-size: 1em;
}
</style>