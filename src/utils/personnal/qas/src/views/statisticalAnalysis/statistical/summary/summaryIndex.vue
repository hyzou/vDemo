<template>
  <div class="flexContent">
    <div class="flexLeftLayout pl10 pr10 bgfff">
      <settingMenu @returnData="returnData"></settingMenu>
    </div>
    <div class="flexRightLayout ml10 bgfff">
      <summaryDataGrid :defaultSearchData="searchData"></summaryDataGrid>
    </div>
  </div>
</template>

<script>
import settingMenu from "../summarySetting/settingMenu";
import summaryDataGrid from "./summaryDataGrid";
export default {
  name: "summaryIndex",
  components: { summaryDataGrid, settingMenu },
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
