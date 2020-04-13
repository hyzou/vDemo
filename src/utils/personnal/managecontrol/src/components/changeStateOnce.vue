<template>
  <div class="bottom-controller-group">
    <div class="detail-operate" @click="switchControlTap">一键切换</div>
  </div>
</template>

<script>
export default {
  name: "changeStateOnce",
  props: {},
  methods: {
    switchControlTap() {
      this.$emit("onceChangeStatus");
    }
  }
};
</script>
