const methods = {
  initTable() {
    if (!this.$route.query.asmSchemeKpiId) {
      this.$message.error("未查询到指标数据，请返回前页重试");
    }
    this.$getData(this.$api.getAllStandList_supervision, {
      asmSchemeKpiId: this.$route.query.asmSchemeKpiId,
      assessedOrgId: this.$store.getters["user/userInfos"].orgId
    }).then(data => {
      this.detailData = this.$globalFnc.deepCopy(data.rows[0]);
      if (
        this.detailData.implProgresses &&
        this.detailData.implProgresses.length > 0
      ) {
        this.detailData.implProgresses.map(progress => {
          if (progress.currentImpl) {
            this.standardItemData = progress.implKpiVars[0].asmSchemeKpiAllotId;
            this.standardItemName = progress.implKpiVars[0].name;
            this.standardItemUnit = progress.implKpiVars[0].unit;
            this.standardItemObject = progress.implKpiVars[0];
            this.fomateData(progress.implKpiVars[0]);
          }
        });
      }
    });
  },
  handleBack() {
    this.$router.push({
      path: "provinceKpi",
      query: { asmSchemeId: this.$route.query.asmSchemeId }
    });
  },
  handleChangeItem(val) {
    var obj = {};
    obj = this.detailData.targetDataList.find(function(item) {
      return item.id === val;
    });
    this.detailData.implProgresses.map(progress => {
      if (progress.currentImpl) {
        obj = progress.implKpiVars.find(function(item) {
          return item.asmSchemeKpiAllotId === val;
        });
      }
    });
    this.standardItemData = obj.asmSchemeKpiAllotId;
    this.standardItemName = obj.name;
    this.standardItemUnit = obj.unit;
    this.standardItemObject = obj;
    this.fomateData(obj);
  },
  handleChart(params) {
    this.$store.dispatch("assessment/commitChosedItemDetaillist", params.data);
    this.$router.push({
      path: "provinceKpiDataMakeUp",
      query: {
        asmSchemeKpiId: this.$route.query.asmSchemeKpiId
      }
    });
  },
  fomateData(data) {
    this.barOptions.series[0].data = [];
    this.barOptions.series[0].data.push(data);
    data.completePercent = (
      (parseFloat(data.value) * 100) /
      parseFloat(data.targetValue)
    ).toFixed(2);
    this.tablelistPlanSettings.tableDatas = [];
    this.tablelistPlanSettings.tableDatas.push(data);
    this.showChart = true;
  }
};

export default methods;
