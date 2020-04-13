<template>
  <div class="top-controller-group">
    <span
      class="top-controller-button"
      v-for="(btn, index) in topButtonsArray"
      :key="btn.key"
      :class="{ 'top-controller-button-active': btn.isActive }"
      :data-id="btn.key"
      @click="menuTap(index, btn.key)"
    >
      {{ btn.value }}
    </span>
  </div>
</template>

<script>
export default {
  name: "topControllerGroup",
  props: {
    topButtonsArray: Array
  },
  methods: {
    menuTap(index, key) {
      this.$emit("topNavTap", index, key);
    }
  }
};
</script>
