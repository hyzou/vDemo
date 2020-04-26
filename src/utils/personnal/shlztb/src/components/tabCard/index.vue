<template>
  <el-tabs
    v-model="tabSettings.tabCardActiveName"
    :type="tabSettings.tabCardType"
    @tab-click="handleClick"
  >
    <el-tab-pane
      v-for="tab in tabSettings.tabCardData"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name"
    >
      <!-- {{ tab.label }} -->
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "tabCard",
  props: {
    tabSettings: Object
  },
  data() {
    return {
      activeName: this.tabSettings.tabCardData[0].name
    };
  },
  methods: {
    handleClick(tab) {
      this.$emit("handleTabChange", tab.name);
    }
  }
};
</script>
