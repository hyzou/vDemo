<template>
  <div class="flexContent">
    <div class="flexLeftLayout pl10 pr10 bgfff">
      <settingMenu @returnData="returnData" :menuType="ruleSet"></settingMenu>
    </div>
    <div class="flexRightLayout ml10 bgfff">
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
      ruleSet: "ruleSet",
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
