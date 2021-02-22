const methods = {
  handleTabChange(data) {
    this.searchFormItemSettings.formGroupValues.schemeId = "";
    this.initTable();
  },
  initTable() {
    this.getDropdownlistData().then(data => {
      this.searchFormItemSettings.formGroupValues.schemeId =
        data.length > 0 ? data[0].businessKey : "";
      this.handleSearchFormBtn(
        {
          flag: "save",
          postUrl: "getAllotTableData_poolAnalysis"
        },
        this.searchFormItemSettings.formGroupValues
      );
    });
  },
  handleSearchFormBtn(btns, formData) {
    let options = {
      vm: this
    };
    if (!formData.schemeId) {
      this.$message.error("请选择一个考核方案进行查询");
      return false;
    }
    this.$searchformBtnAction(btns, formData, options).then(xhr => {
      if (
        !xhr.data ||
        !xhr.data.assessedOrgAllotInfos ||
        xhr.data.assessedOrgAllotInfos.length < 1
      ) {
        this.showChart = false;
        return false;
      }
      this.showChart = true;
      this.tableCellSettings = xhr.data.assessedOrgs;
      this.tableData = [];
      let sortOrgsList = [];
      this.tableCellSettings.map(cell => {
        xhr.data.assessedOrgAllotInfos.map(orgInfo => {
          if (orgInfo.assessedOrgId == cell.value) {
            sortOrgsList.push(orgInfo);
          }
        });
      });
      xhr.data.vars.map(varItem => {
        let varInfoObj = {
            targetName: varItem.text
          },
          unitText = "";
        sortOrgsList.map(cityItem => {
          cityItem.assessedOrgAllotInfos.map(varInfo => {
            if (varItem.value == varInfo.asmKpiVarId) {
              unitText = "(单位:" + varInfo.asmKpiVarUnit + ")";
              varInfoObj[cityItem.assessedOrgId] = {
                plan: varInfo.targetValue || 0,
                complete: varInfo.achieveValue || 0,
                percent: varInfo.percent
                  ? (varInfo.percent * 100).toFixed(0)
                  : 0
              };
            }
          });
        });
        varInfoObj.targetName += unitText;
        this.tableData.push(varInfoObj);
      });
    });
  },
  getDropdownlistData() {
    return new Promise(relsove => {
      this.$getData(this.$api.getAllScheme, {
        assessType: this.tabSettings.activeName,
        assessOrgId: this.$store.getters["user/userInfos"].orgId
      }).then(res => {
        this.searchFormItems.map(item => {
          if (item.name == "schemeId") {
            item.data = [];
            if (res.length > 0) {
              item.data = this.$globalFnc.arrayToFormDropdown(
                res,
                "name",
                "businessKey"
              );
            }
          }
        });
        relsove(res);
      });
    });
  }
};

export default methods;
