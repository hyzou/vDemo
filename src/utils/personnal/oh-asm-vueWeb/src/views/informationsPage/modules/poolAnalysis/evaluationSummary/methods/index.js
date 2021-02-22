const methods = {
  handleTabChange() {
    this.setSearchFormData();
    this.searchFormItems.forEach(item => {
      item.data = [];
    });
  },
  /**
   * 搜索
   */
  setSearchFormData() {
    // 恢复初始值
    this.searchSettings.formGroupValues = {};
    this.tableSettings.tableDatas = [];
    // 搜索赋值
    this.setDictList(this.searchFormItems);
  },
  /**
   * operateButtons点击事件
   */
  // handleOperateButton(data) {
  //   if (data.flag === "closeSearch") {
  //     this.showSearchForm = !this.showSearchForm;
  //     if (this.showSearchForm) {
  //       data.label = "隐藏查询";
  //     } else {
  //       data.label = "显示查询";
  //     }
  //   }
  // },
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn(
      { postUrl: "getSchemeAssessedSummary" },
      defaultdatas
    );
  },
  handleSearchFormBtn(btns, formData) {
    let options = {
      vm: this
    };
    if (!formData.asmSchemeId) {
      this.$message.error("请选择一个考核方案进行查询");
      return false;
    }
    // let params = {
    // asmSchemeId: asmSchemeId
    // page: this.paginationSettings.currentPage,
    // row: this.$global.paginationOption.numberPerpage,
    // code: this.pageType
    // };
    // Object.assign(formData, params);
    this.$searchformBtnAction(btns, formData, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let evaluationSummaryList = this.$globalFnc.deepCopy(data.data);
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "设置重复分",
          type: "edit",
          class: "text-primary fontSize20 mr10"
        }
      ]
    };
    this.formatData(evaluationSummaryList, propObject);
    this.tableSettings.tableDatas = evaluationSummaryList;
    // this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      item.assessedOrgId__dsp = item.assessedOrgId__dsp.replace(/考核办/g, "");
      /**
       * 按钮
       */
      item[prop.name] = [];
      if (item.kpiScore) {
        item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      }
    });
  },
  /**
   * 表单切换
   */
  handleLinkSelect(linkName, data) {
    this.$set(this.searchSettings.formGroupValues, "assessedOrgId", "");
    if (data) {
      this.getAssessedOrg(data).then(assessedOrg => {
        this.$set(
          this.searchSettings.formGroupList[1],
          "data",
          this.$globalFnc.arrayToFormDropdown(
            assessedOrg.data,
            "assessedOrgId__dsp",
            "assessedOrgId"
          )
        );
      });
    } else {
      this.$set(this.searchSettings.formGroupList[1], "data", []);
    }
  },
  /**
   * 字典表的值
   */
  getSchemeList() {
    return new Promise(reslove => {
      let params = {
        assessType: this.tabSettings.activeName
      };
      this.$getData(this.$api.getAllScheme, params).then(res => {
        reslove(res);
      });
    });
  },
  getAssessedOrg(id) {
    return new Promise(resolve => {
      this.$getData(this.$api.getSchemeAssessedRef, {
        asmSchemeId: id
      }).then(result => {
        //  this.searchSettings.formGroupList[1] 是被考核市县
        resolve(result);
      });
    });
  },
  setDictList(data) {
    this.getSchemeList().then(scheme => {
      if (!scheme || !scheme.length) {
        return;
      }
      // 搜索默认选中第一个
      this.$set(
        this.searchSettings.formGroupValues,
        "asmSchemeId",
        scheme[0].asmSchemeId
      );
      // 获取列表数据
      this.initPageData();
      this.getAssessedOrg(scheme[0].asmSchemeId).then(assessedOrg => {
        data.map(item => {
          //  赋值方案
          if (item.name === "asmSchemeId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              scheme,
              "name",
              "asmSchemeId"
            );
          }
          if (item.name === "assessedOrgId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              assessedOrg.data,
              "assessedOrgId__dsp",
              "assessedOrgId"
            );
          }
        });
      });
    });
  },
  // handlePaginationPagenumber(val) {
  //   this.paginationSettings.currentPage = val;
  //   this.initPageData();
  // },
  /**
   * 表格按钮点击事件
   */
  handleTableRowButton(row, btns) {
    let defaultValues;
    /**
     * 查看意见
     */
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formButtonList = this.repeatCutScoreFormBtns;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.repeatCutScoreFormItems;

      defaultValues = this.$globalFnc.deepCopy(row);
      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
      this.dialogFormSettings.dialogFormVisible = true;
    }
  },
  /**
   * 弹框 操作
   */
  handleDialogForm(btns, data) {
    if (btns.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    this.$postData(btns.postUrl, data).then(() => {
      this.$message.success("保存成功！");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  }
};
export default methods;
