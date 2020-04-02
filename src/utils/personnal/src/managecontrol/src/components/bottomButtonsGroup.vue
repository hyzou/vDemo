<template>
  <div class="bottom-controller-group flex-box">
    <div
      class="detail-operate"
      :class="{ 'detail-operate-disable': bottomBtn.isDisabled }"
      v-for="bottomBtn in bottomButtonsArray"
      :key="bottomBtn.type"
      :data-type="bottomBtn.type"
      @click="actionMethodsTap(bottomBtn)"
    >
      {{ bottomBtn.value }}
    </div>
  </div>
</template>

<script>
export default {
  name: "bottomButtonsGroup",
  props: {
    bottomButtonsArray: Array
  },
  methods: {
    actionMethodsTap(bottomBtn) {
      this.$emit("bottomBtnOperate", bottomBtn);
    }
  }
};
</script>