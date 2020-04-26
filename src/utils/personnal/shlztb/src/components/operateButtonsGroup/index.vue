<template>
  <div class="operate-buttons-group">
    <el-button
      v-for="operateBtn in operateButtonsSettings.buttonListData"
      :key="operateBtn.keyWords"
      :type="operateBtn.type"
      :size="operateBtn.size"
      :icon="operateBtn.icon"
      @click="handleOperate(operateBtn)"
    >
      {{ operateBtn.name }}
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
