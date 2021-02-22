const methods = {
  initTable() {
    this.handleSearchFormBtn(
      {
        flag: "save",
        postUrl: "getRankHistory_poolAnalysis"
      },
      this.searchFormItemSettings.formGroupValues
    );
  },
  handleSearchFormBtn(btns, formData) {
    let options = {
      vm: this
    };
    let yearArr = [];
    if (!formData.yearsNumber) {
      this.$message.error("请填写历年个数进行查询");
      return false;
    }
    if (formData && formData.yearsNumber) {
      for (
        let yearNumber = formData.yearsNumber;
        yearNumber > 0;
        yearNumber--
      ) {
        yearArr.push(new Date().getFullYear() - yearNumber + 1);
      }
      formData.years = yearArr.join(",");
    }
    if (!formData.assessOrgId) {
      formData.assessOrgId = this.$store.getters["user/userInfos"].orgId;
    }
    this.$searchformBtnAction(btns, formData, options).then(xhr => {
      this.tablelistSettings.tableDatas = [];
      this.tablelistSettings.tableSettingOptions.headerOptions = [];
      this.barOptions.series = [];
      this.mainRankData = this.$globalFnc.deepCopy(xhr.data);
      this.fomateData(xhr.data)
        .then(() => {
          this.showChart = true;
          return xhr.data;
        })
        .then(res => {
          this.tablelistSettings.tableSettingOptions.headerOptions.push({
            lable: "市县",
            prop: "distract",
            sortForbid: true
          });
          for (let prop in res) {
            let header = {
              lable: prop,
              prop: "assessedOrgSort" + prop
            };
            this.tablelistSettings.tableSettingOptions.headerOptions.push(
              header
            );
          }
          this.allOrgslist.map(city => {
            let rowdata = {
              distract: city.basDistrict.name
            };
            for (let key in res) {
              if (res[key].length > 0) {
                res[key].map(rate => {
                  if (rate.assessedOrgId == city.orgid) {
                    rowdata["assessedOrgSort" + key] =
                      rate.assessedOrgSort || "0";
                  }
                });
              } else {
                rowdata["assessedOrgSort" + key] = "0";
              }
            }
            this.tablelistSettings.tableDatas.push(rowdata);
          });
        });
    });
  },
  getOrgslist() {
    return new Promise(reslove => {
      this.$getData(this.$api.getNextLevelOrgSelect, {
        orgid: this.$store.getters["user/userInfos"].orgId
      }).then(res => {
        let allOrglist = this.$globalFnc.deepCopy(res);
        allOrglist.unshift({
          orgname: this.$store.getters["user/userInfos"].orgname,
          orgid: this.$store.getters["user/userInfos"].orgId
        });
        this.allOrgslist = res;
        if (res.length > 0) {
          this.searchFormItems.map(item => {
            if (item.name == "assessOrgId") {
              item.data = this.$globalFnc.arrayToFormDropdown(
                allOrglist,
                "orgname",
                "orgid",
                true
              );
            }
          });
        }
        reslove(allOrglist);
      });
    });
  },
  fomateData(yearRanksObj) {
    return new Promise(rel => {
      this.showChart = false;
      this.allOrgslist.map(city => {
        let cityRateObj = {
          name: "",
          type: "line",
          data: [],
          smooth: true
        };
        for (let key in yearRanksObj) {
          if (yearRanksObj[key].length > 0) {
            yearRanksObj[key].map(rate => {
              if (rate.assessedOrgId == city.orgid) {
                cityRateObj.name = rate.assessedOrgDistrictCode__dsp;
                cityRateObj.data.push([key, rate.assessedOrgSort || "0"]);
              }
            });
          } else {
            cityRateObj.name = city.basDistrict.name;
            cityRateObj.data.push([key, "0"]);
          }
        }
        this.barOptions.series.push(cityRateObj);
      });
      rel();
    });
  }
};

export default methods;
