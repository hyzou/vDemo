<template>
  <div class="common_table_container">
    <div class="contentLeftLayout">
      <settingMenu @returnData="returnData"></settingMenu>
    </div>
    <div class="contentRightLayout">
      <settingDataGrid :defaultSearchData="searchData"></settingDataGrid>
    </div>
  </div>
</template>

<script>
import settingMenu from "./settingMenu";
import settingDataGrid from "./settingDataGrid";
export default {
  name: "settingIndex",
  components: {
    settingMenu,
    settingDataGrid
  },
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
