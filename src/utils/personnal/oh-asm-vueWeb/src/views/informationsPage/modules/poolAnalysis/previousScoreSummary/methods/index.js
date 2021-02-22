const methods = {
  initTable() {
    // this.searchFormItemSettings.formGroupValues.yearsNumber = 10;
    this.handleSearchFormBtn(
      {
        flag: "save",
        postUrl: "getScoreHistory_poolAnalysis"
      },
      this.searchFormItemSettings.formGroupValues
    );
  },
  handleSelectLegends(params) {
    console.log(params);
  },
  handleSearchFormBtn(btns, formData) {
    let options = {
      vm: this
    };
    if (!formData.assessOrgId) {
      this.$message.error("请选择一个考核机构进行查询");
      return false;
    }
    if (!formData.yearsNumber) {
      this.$message.error("请填写历年个数进行查询");
      return false;
    }
    if (formData && formData.yearsNumber) {
      let yearArr = [];
      for (
        let yearNumber = formData.yearsNumber;
        yearNumber > 0;
        yearNumber--
      ) {
        yearArr.push(new Date().getFullYear() - yearNumber + 1);
      }
      formData.years = yearArr.join(",");
      // delete formData.yearsNumber;
    }
    if (!formData.assessOrgId) {
      formData.assessOrgId = this.$store.getters["user/userInfos"].orgId;
    }
    this.$searchformBtnAction(btns, formData, options).then(xhr => {
      if (!xhr.data.districtInfos || xhr.data.districtInfos.length < 1) {
        this.showChart = false;
        return false;
      }
      this.fomateData(xhr.data.districtInfos, xhr.data.years)
        .then(() => {
          this.showChart = true;
          return xhr.data;
        })
        .then(res => {
          this.tablelistSettings.tableSettingOptions.headerOptions = [];
          this.tablelistSettings.tableDatas = [];
          let itemArr = [];
          res.years.map(yItem => {
            itemArr.push({ id: yItem });
          });
          this.barOptions.dataset.source.map((item, index) => {
            let header = {
              lable: item[0],
              prop: "item" + index
              // clickVarKey: "id",
              // clickType: index,
              // clickable: index >= 1
            };
            this.tablelistSettings.tableSettingOptions.headerOptions.push(
              header
            );
          });
          itemArr.map((it, idx) => {
            this.barOptions.dataset.source.map((item, index) => {
              it["item" + index] = item[idx + 1];
            });
          });
          this.tablelistSettings.tableDatas = itemArr;
        });
    });
  },
  handleTableItem(id, type, row, coldata) {
    this.dialogPreviewExportTitle = `${this.tablelistSettings.tableSettingOptions.headerOptions[type].lable}${id}年度落实粮食安全市县长责任制自查评分表`;
    this.dialogPreviewExportVisible = true;
  },
  getOrgslist() {
    return new Promise(rel => {
      this.$getData(this.$api.getNextLevelOrgSelect, {
        orgid: this.$store.getters["user/userInfos"].orgId
      }).then(res => {
        res.push({
          orgname: this.$store.getters["user/userInfos"].orgname,
          orgid: this.$store.getters["user/userInfos"].orgId
        });
        if (res.length > 0) {
          this.searchFormItems.map(item => {
            if (item.name == "assessOrgId") {
              item.data = this.$globalFnc.arrayToFormDropdown(
                res,
                "orgname",
                "orgid",
                true
              );
            }
          });
        }
        rel(res);
      });
    });
  },
  fomateData(sourceData, yearsArray) {
    return new Promise(rel => {
      this.showChart = false;
      let data = this.$globalFnc.deepCopy(sourceData),
        yearlist = this.$globalFnc.deepCopy(yearsArray),
        arrlist = [];
      let copyYear = this.$globalFnc.deepCopy(yearlist);
      copyYear.unshift("年度");
      arrlist.push(copyYear);
      data.map(daItem => {
        let newArr = [];
        newArr.push(daItem.assessedOrgDistrictCode__dsp);
        yearlist.map(yearItem => {
          if (daItem.yearScores[yearItem]) {
            newArr.push(daItem.yearScores[yearItem]);
          } else {
            newArr.push(0);
          }
        });
        arrlist.push(newArr);
      });
      this.barOptions.dataset.source = arrlist;
      this.barOptions.series = [];
      for (let i = 0; i < yearsArray.length; i++) {
        this.barOptions.series.push({ type: "bar" });
      }
      rel();
    });
  }
};

export default methods;
