const methods = {
  initTable() {
    this.standardItemName = this.$store.getters[
      "assessment/chosedItemDetaillist"
    ].name;
    this.standardItemUnit = this.$store.getters[
      "assessment/chosedItemDetaillist"
    ].unit;
    this.fomateData(this.$store.getters["assessment/chosedItemDetaillist"]);
  },
  handleBack() {
    this.$router.push({
      path: "provinceKpiDataOverview",
      query: {
        asmSchemeKpiId: this.$route.query.asmSchemeKpiId,
        query: this.$route.query.asmSchemeId
      }
    });
  },
  fomateData(data) {
    if (data.kpiVarDistrictImplDetails.length > 0) {
      this.barOptions.series[0].data = [];
      data.kpiVarDistrictImplDetails.map(item => {
        item.name = item.district__dsp;
        this.barOptions.series[0].data.push(item);
      });
      this.tablelistPlanSettings.tableDatas = data.kpiVarDistrictImplDetails;
      this.showChart = true;
    }
  }
};

export default methods;
