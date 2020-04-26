<template>
  <div class="common_table_container">
    <!--<div class="contentLeftLayout">
      <receivePlanDataGrid
        @receiveSamplePlanObject="receiveSamplePlanObject"
      ></receivePlanDataGrid>
    </div>
    <div class="contentRightLayout">-->
      <receiveSampleData></receiveSampleData>
    <!--</div>-->
  </div>
</template>
<script>
/*import receivePlanDataGrid from "./receivePlanDataGrid";*/
import receiveSampleData from "./receiveSampleData";
export default {
  name: "gridData",
  data() {
    return {
      qasPlanObj: null
    };
  },
  components: {
   /* receivePlanDataGrid: receivePlanDataGrid,*/
    receiveSampleData: receiveSampleData
  },
  methods: {
    /*receiveSamplePlanObject(obj) {
      this.qasPlanObj = obj;
    }*/
  }
};
</script>

<style scoped></style>
