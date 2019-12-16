<template>
  <div class="operate-buttons-group">
    <el-button
      v-for="operateBtn in operateButtonsSettings.buttonListData"
      :key="operateBtn.flag"
      :type="operateBtn.styleType"
      :size="operateBtn.size"
      :icon="operateBtn.icon"
      @click="handleOperate(operateBtn)"
    >
      {{ operateBtn.label }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: "operateButtonsGroup",
  props: {
    operateButtonsSettings: Object
  },
  methods: {
    handleOperate(operateBtn) {
      this.$emit(
        "handleOperateButton",
        operateBtn,
        this.operateButtonsSettings.moduleName
      );
    }
  }
};
</script>
