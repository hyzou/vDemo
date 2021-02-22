const methods = {
  /**
   * 获取方案
   */
  getSchemeList() {
    return new Promise(reslove => {
      let schemeParams = {
        assessedOrgId: this.$store.getters["user/userInfos"].assess,
        assessType: this.pageType,
        running: true
        // schemeProcessStatus: "consulte"
      };
      this.$getData(this.$api.getSchemeSelect, schemeParams).then(res => {
        reslove(res);
      });
    });
  },
  /**
   * 设置搜索的值
   */
  setSearchFormData() {
    this.searchSettings.formGroupList = this.$globalFnc.deepCopy(
      this.searchFormItems
    );
    // 方案下拉赋值
    this.getSchemeList().then(res => {
      if (res && res.length) {
        this.searchSettings.formGroupList.forEach(item => {
          if (item.name === "asmSchemeId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res,
              "name",
              "asmSchemeId"
            );
          }
        });
        // 默认第一条方案
        this.searchSettings.formGroupValues.asmSchemeId = res[0].asmSchemeId;
        // 获取列表数据
        this.initPageData();
      }
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag == "closeSearch") {
      this.showSearchForm = !this.showSearchForm;
      if (this.showSearchForm) {
        data.label = "隐藏查询";
      } else {
        data.label = "显示查询";
      }
    }
  },
  /**
   * 获取列表数据
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "kpiConsultList" }, defaultdatas);
  },
  handleSearchFormBtn(btns, formData) {
    if (btns.flag === "clear") {
      this.paginationSettings.currentPage = 1;
      formData = {};
      this.searchSettings.formGroupValues = {};
    }
    if (btns.flag === "search") {
      this.paginationSettings.currentPage = 1;
    }
    let options = {
      vm: this
    };
    let params = {
      consulted: true,
      assessId: this.$store.getters["user/userInfos"].orgId,
      page: this.paginationSettings.currentPage,
      row: this.$global.paginationOption.numberPerpage,
      type: this.pageType
    };
    Object.assign(formData, params);
    this.$searchformBtnAction(btns, formData, options).then(data => {
      this.setTableList(data);
    });
  },
  // 设置表格数据
  setTableList(data) {
    let kpiConsultList = this.$globalFnc.deepCopy(data.rows);
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "意见分析",
          type: "analysis",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        }
      ]
    };
    this.formatData(kpiConsultList, propObject);
    this.tableSettings.tableDatas = kpiConsultList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
    });
  },
  // 分页
  handlePaginationPagenumber(num) {
    this.tableSettings.tableDatas = [];
    this.paginationSettings.currentPage = num;
    this.initPageData();
  },
  /**
   * 表格按钮点击事件
   */
  handleTableRowButton(row, btns) {
    let formGroupList;
    switch (btns.type) {
      case "analysis":
        /**
         * 意见分析
         */
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.suggestConsultationDialogFormBtns;
        formGroupList = this.$globalFnc.deepCopy(
          this.suggestConsultationDialogFormItems
        );
        formGroupList.forEach((item, index) => {
          if (item.name === "cityOpinion") {
            formGroupList.splice(index, 1);
          }
          if (item.name === "cityName") {
            item.hideItem = true;
          }
        });
        this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
          formGroupList,
          row["asmKpiIndexId"]
        );
        //获取回显数据
        this.$getData(this.$api.singleKpiConsultData, {
          schemeKpiId: row["asmSchemeKpiId"]
        }).then(res => {
          let defaultValue = this.$globalFnc.deepCopy(res.data);
          //意见
          if (defaultValue["latestKpiConsulte"]) {
            // 意见列表
            if (
              defaultValue["latestKpiConsulte"].feedBacks &&
              defaultValue["latestKpiConsulte"].feedBacks.length
            ) {
              defaultValue["latestKpiConsulte"].feedBacks.forEach(item => {
                if (!item.submitDt) {
                  item.opinion = "";
                }
              });
              defaultValue.coordinationList =
                defaultValue["latestKpiConsulte"].feedBacks;
            }
          }
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValue;
        });
        break;
      default:
        break;
    }
  },
  /**
   * 字典表的值
   */
  setDictList(data, id) {
    return data.map(item => {
      // 指标类目树
      if (item.name === "kpiIndextree") {
        this.$getData(this.$api.getKpiIndexTree, { asmKpiIndexId: id }).then(
          res => {
            item.treeSettings.treeData = res;
          }
        );
      }
      // 牵头部门， 配合部门
      if (item.name === "manageOrgId" || item.name === "cooprateOrgsId") {
        this.$getData(this.$api.dictList, {
          _refKey: "org",
          orgtypeid: "202",
          parentorgid: this.$store.getters["user/userInfos"].assess,
          status: "1"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      return item;
    });
  },
  /**
   * 弹框按钮
   */
  handleDialogForm() {},
  closeSearch() {
    this.showSearchForm = !this.showSearchForm;
  }
};
export default methods;
