<template>
  <div class="common_table_container">
    <!--<div class="contentLeftLayout">
      <approvalPlanData_grid
        @qualityResultEnterSampleSearch="findSample"
      ></approvalPlanData_grid>
    </div>
    <div class="contentRightLayout">-->
      <approvalSampleData></approvalSampleData>
    <!--</div>-->
  </div>
</template>

<script>
import approvalSampleData from "./approvalSampleData";
export default {
  name: "resultEnterData_grid",
  data() {
    return {
      qasPlanObj: null
    };
  },
  components: {
    approvalSampleData: approvalSampleData
  },
  methods: {
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
