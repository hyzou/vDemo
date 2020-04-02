<template>
  <div class="modal-switch-group flex-box">
    <div class="switch-btn">
      <div
        class="left-switch"
        :class="{ 'switch-active': currentStatus.controlMode == 0 }"
      >
        程控
      </div>
      <div
        class="right-switch"
        :class="{ 'switch-active': currentStatus.controlMode == 1 }"
      >
        柜控
      </div>
    </div>
    <div class="switch-btn">
      <div
        class="left-switch"
        :class="{ 'switch-active': currentStatus.processStatus == 0 }"
      >
        通风模式
      </div>
      <div
        class="right-switch"
        :class="{ 'switch-active': currentStatus.processStatus == 1 }"
      >
        气调模式
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalSwitchGroup",
  props: {
    currentStatus: Object
  }
};
</script>
