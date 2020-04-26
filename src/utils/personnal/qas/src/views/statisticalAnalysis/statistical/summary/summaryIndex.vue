<template>
  <div class="common_table_container">
    <div class="contentLeftLayout">
      <settingMenu @returnData="returnData"></settingMenu>
    </div>
    <div class="contentRightLayout">
      <summaryDataGrid :menuData="searchData"></summaryDataGrid>
    </div>
  </div>
</template>

<script>
import settingMenu from "@/views/statisticalAnalysis/statistical/summarySetting/settingMenu";
import summaryDataGrid from "./summaryDataGrid";
export default {
  name: "summaryIndex",
  components: { settingMenu, summaryDataGrid },
  data() {
    return {
      searchData: {
        selectedLink: "",
        menuid: ""
      }
    };
  },
  methods: {
    returnData(data) {
      let returnData = {
        selectedLink: data.selectedLink,
        menuid: data.menuid
      };
      this.searchData = returnData;
    }
  },
  mounted() {},
  created() {
    //面包屑导航
    let breadcrumbNameArray = this.$dateUtl.getBreadcrumbNameArray(
      this.$route,
      ""
    );
    this.$emit(this.$constants.EMIT_TRANSFBREADCRUMB, breadcrumbNameArray);
  }
};
</script>
