<template>
  <div class="common_table_container">
    <!--<div class="contentLeftLayout">
      <planData_grid
        @qualityResultEnterSampleSearch="findSample"
      ></planData_grid>
    </div>
    <div class="contentRightLayout">-->
    <sampleData></sampleData>
    <!--</div>-->
  </div>
</template>

<script>
/*import planData_grid from "./planData_grid";*/
import sampleData from "./sampleData";
export default {
  name: "resultEnterData_grid",
  data() {
    return {
      qasPlanObj: null
    };
  },
  components: {
    /*planData_grid: planData_grid,*/
    sampleData: sampleData
  },
  methods: {
    /*findSample(obj) {
      this.qasPlanObj = obj;
    }*/
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
