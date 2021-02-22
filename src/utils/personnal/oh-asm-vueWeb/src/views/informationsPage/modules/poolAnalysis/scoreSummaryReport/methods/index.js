const methods = {
  initPageData() {
    this.getOrgslist();
    this.getAllSchemeDropdownlistData().then(xhr => {
      let defaultSchemeId = xhr.length > 0 ? xhr[0].value : "";
      this.searchFormGroupSettings.formGroupValues.schemeId = defaultSchemeId;
      this.handleSearchFormBtn([], {
        schemeId: defaultSchemeId,
        assessedOrgId: ""
      });
    });
  },
  /**
   * 搜索栏按钮点击事件
   */
  handleSearchFormBtn(btns, formData) {
    if (!formData.schemeId) {
      this.$message.error("请选择一个考核方案进行查询");
      return false;
    }
    this.url =
      this.$store.getters["user/reportServerUrl"] +
      `?reportlet=scoreSummary.cpt&schemeId=${formData.schemeId ||
        ""}&assessedOrgId=${formData.assessedOrgId ||
        ""}&timeStamp=${new Date().getTime()}`;
  },
  getOrgslist() {
    return new Promise(reslove => {
      this.$getData(this.$api.getNextLevelOrgSelect, {
        orgid: this.$store.getters["user/userInfos"].orgId
      }).then(res => {
        // this.allOrgslist = res;
        if (res.length > 0) {
          this.searchFormItems.map(item => {
            if (item.name == "assessedOrgId") {
              item.data = this.$globalFnc.arrayToFormDropdown(
                res,
                "orgname",
                "orgid"
              );
            }
          });
        }
        reslove(res);
      });
    });
  },
  getAllSchemeDropdownlistData() {
    return new Promise(relsove => {
      this.$getData(this.$api.getAllScheme, {
        assessType: "1",
        assessOrgId: this.$store.getters["user/userInfos"].orgId
      }).then(res => {
        if (res.length > 0) {
          this.searchFormItems.map(item => {
            if (item.name == "schemeId") {
              item.data = this.$globalFnc.arrayToFormDropdown(
                res,
                "name",
                "businessKey"
              );
            }
          });
        }
        relsove(res);
      });
    });
  }
};
export default methods;
