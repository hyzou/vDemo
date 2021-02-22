const methods = {
  sortObjAttrFromBigToSmall(keyName) {
    return function(objectN, objectM) {
      var valueN = objectN[keyName];
      var valueM = objectM[keyName];
      if (valueN < valueM) return 1;
      else if (valueN > valueM) return -1;
      else return 0;
    };
  },
  initTable() {
    this.getDropdownlistData().then(data => {
      this.searchFormItemSettings.formGroupValues.schemeId =
        data[0].businessKey;
      this.handleSearchFormBtn(
        {
          flag: "save",
          postUrl: "getLostKpiInfo_poolAnalysis"
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
      this.$message.error("请选择一个方案进行查询");
      return false;
    }
    this.$searchformBtnAction(btns, formData, options).then(xhr => {
      if (!xhr.data || xhr.data.length < 1) {
        this.showChart = false;
        return false;
      }
      this.fomateData(xhr.data)
        .then(() => {
          this.showChart = true;
          return xhr.data;
        })
        .then(res => {
          let sourcedata = this.$globalFnc.deepCopy(
            this.barOptions.series[0].data
          );
          sourcedata.sort(this.sortObjAttrFromBigToSmall("value"));
          this.tablelistSettingsCurrent.tableDatas = sourcedata;
        });
    });
  },
  getDropdownlistData() {
    return new Promise(relsove => {
      this.$getData(this.$api.getAllScheme, {
        assessType: "1",
        assessOrgId: this.$store.getters["user/userInfos"].orgId
      }).then(res => {
        this.searchFormItems.map(item => {
          if (item.name == "schemeId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res,
              "name",
              "businessKey"
            );
          }
        });
        relsove(res);
      });
    });
  },
  fomateData(dataSource) {
    return new Promise(rel => {
      this.showChart = false;
      this.barOptions.series[0].data = [];
      dataSource.map(item => {
        let dataObj = {
          value: item.number || "0",
          name: item.assessedOrgDistrict__dsp,
          id: item.assessedOrgId,
          infolist: []
        };
        for (let key in item.assessKpisMap) {
          // dataObj.infolist.concat(item.assessKpisMap[key]);
          item.assessKpisMap[key].map(kpiMap => {
            dataObj.infolist.push(kpiMap);
          });
        }
        dataObj.value = dataObj.infolist.length;
        this.barOptions.series[0].data.push(dataObj);
        rel();
      });
    });
  }
};

export default methods;
