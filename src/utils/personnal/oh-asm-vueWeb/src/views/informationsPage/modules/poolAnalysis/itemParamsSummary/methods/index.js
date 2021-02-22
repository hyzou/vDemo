const methods = {
  initTable() {
    this.getAllSchemeDropdownlistData().then(xhr => {
      this.searchFormItemSettings.formGroupValues.schemeId = xhr[0].businessKey;
      this.getSpotSchemeVarsDropdownlistData(xhr[0].businessKey).then(
        xhrdata => {
          // this.itemParamsTitle = xhrdata[0].name;
          this.searchFormItemSettings.formGroupValues.varId =
            xhrdata[0].asmKpiVarId;
          this.handleSearchFormBtn(
            {
              flag: "save",
              postUrl: "getAllotData_poolAnalysis"
            },
            this.searchFormItemSettings.formGroupValues
          );
        }
      );
    });
  },
  handleSelect(linkname, data) {
    if (!data) {
      return false;
    }
    this.getSpotSchemeVarsDropdownlistData(data).then(xhrdata => {
      if (xhrdata.length > 0) {
        this.searchFormItemSettings.formGroupValues.varId =
          xhrdata[0].asmKpiVarId;
      }
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
    if (formData.varId) {
      this.itemParamslist.map(item => {
        if (item.value == formData.varId) {
          this.itemParamsTitle = item.label;
          this.itemParamsUnit = item.unit;
          this.barOptions.series[0].name = item.label;
        }
      });
    } else {
      this.$message.error("请选择一项数据项进行查询");
      return false;
    }
    this.$searchformBtnAction(btns, formData, options).then(xhr => {
      if (!xhr.data.vars || xhr.data.vars.length < 1) {
        this.showChart = false;
        return false;
      }
      this.fomateData(xhr.data.allotInfos)
        .then(() => {
          this.showChart = true;
          return xhr.data;
        })
        .then(res => {
          this.tablelistPlanSettings.tableSettingOptions.headerOptions = [];
          this.tablelistPlanSettings.tableDatas = [];
          let tableHeaderArr = [
            { prop: "cityName", lable: "城市", width: "180px" }
          ];
          res.assessedOrgs.map(orgItem => {
            let headItem = {
              lable: orgItem.text,
              prop: orgItem.value
            };
            tableHeaderArr.push(headItem);
          });
          let planObj = { cityName: "规划完成数量" },
            finished = { cityName: "目前已完成数量" },
            finishPercent = { cityName: "目前已完成比例(%)" };
          tableHeaderArr.map(head => {
            res.allotInfos.map(infoItem => {
              if (head.prop == infoItem.assessedOrgId) {
                planObj[head.prop] = infoItem.targetValue
                  ? infoItem.targetValue
                  : 0;
                finished[head.prop] = infoItem.achieveValue
                  ? infoItem.achieveValue
                  : 0;
                finishPercent[head.prop] = infoItem.percent
                  ? (infoItem.percent * 100).toFixed(0)
                  : 0;
              }
            });
          });
          this.tablelistPlanSettings.tableSettingOptions.headerOptions = tableHeaderArr;
          this.tablelistPlanSettings.tableDatas.push(
            planObj,
            finished,
            finishPercent
          );
          let rowdata = {},
            arr = [];
          this.tablelistSettingsCurrent.tableSettingOptions.headerOptions = [];
          this.barOptions.series[0].data.map((item, index) => {
            let header = {
              lable: item.name,
              prop: "item" + index
            };
            this.tablelistSettingsCurrent.tableSettingOptions.headerOptions.push(
              header
            );
            rowdata["item" + index] = item.value;
          });
          arr.push(rowdata);
          // this.tablelistSettingsCurrent.tableDatas.push(rowdata);
          this.initSortTable(
            this.tablelistSettingsCurrent.tableSettingOptions.headerOptions,
            arr,
            "tablelistSettingsCurrent",
            "2019"
          );
        });
    });
  },
  getAllSchemeDropdownlistData() {
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
  getSpotSchemeVarsDropdownlistData(id) {
    return new Promise(relsove => {
      this.$getData(this.$api.getSpotSchemeVars_poolAnalysis, {
        asmSchemeId: id
      }).then(res => {
        this.itemParamslist = this.$globalFnc.arrayToFormDropdown(
          res.data,
          "name",
          "asmKpiVarId"
        );
        this.searchFormItems.map(item => {
          if (item.name == "varId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res.data,
              "name",
              "asmKpiVarId"
            );
          }
        });
        relsove(res.data);
      });
    });
  },
  initSortTable(header, tabledata, name, year) {
    let tHeader = this.$globalFnc.deepCopy(header),
      tdata = this.$globalFnc.deepCopy(tabledata);
    tHeader.map(headItem => {
      headItem.clickable = false;
      headItem.value = tdata[0][headItem.prop];
    });
    tHeader.sort(this.sortObjAttrFromBigToSmall("value"));
    let dataObj = {};
    tHeader.map(item => {
      dataObj[item.prop] = item.value;
    });
    this[name].tableDatas = [];
    this[name].tableDatas.push(dataObj);
    this[name].tableSettingOptions.headerOptions = tHeader;
  },
  sortObjAttrFromBigToSmall(keyName) {
    return function(objectN, objectM) {
      var valueN = objectN[keyName];
      var valueM = objectM[keyName];
      if (valueN < valueM) return 1;
      else if (valueN > valueM) return -1;
      else return 0;
    };
  },
  fomateData(allotInfos) {
    return new Promise(rel => {
      this.showChart = false;
      this.barOptions.series[0].data = [];
      allotInfos.map(item => {
        let dataObj = {
          value: item.targetValue || 0,
          name: item.assessedOrgDistrict__dsp,
          id: item.assessedOrgId
        };
        this.barOptions.series[0].data.push(dataObj);
        rel();
      });
    });
  }
};

export default methods;
