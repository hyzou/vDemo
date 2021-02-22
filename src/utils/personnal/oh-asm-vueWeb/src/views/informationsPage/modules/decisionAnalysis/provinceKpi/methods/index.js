const methods = {
  /**
   * 初始化数据
   */
  initPageData() {
    // this.getDropdownlistData().then(data => {
    //   this.searchSettings.formGroupValues.asmSchemeId = this.$route.query
    //     .asmSchemeId
    //     ? this.$route.query.asmSchemeId
    //     : data.length > 0
    //     ? data[0].businessKey
    //     : "";
    this.handleSearchFormBtn(
      {
        postUrl: "distributeSuperviseList"
      },
      this.searchSettings.formGroupValues
    );
    // });
  },
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  /**
   * 搜索栏事件
   */
  handleSearchFormBtn(btns, formData) {
    let options = {
      vm: this
    };
    formData.assessObject = "edit";
    formData.assessPhase = "self-assess";
    formData.code = "1";
    formData.page = this.paginationSettings.currentPage;
    formData.rows = this.$global.paginationOption.numberPerpage;
    this.$searchformBtnAction(btns, formData, options).then(xhr => {
      this.setTableList(xhr);
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    // let decideArrs = this.$globalFnc.deepCopy(this.defaultdatas.data.list);
    // let deArr = [];
    // if (data.flag === "decision") {
    //   deArr = decideArrs.filter(item => {
    //     return item.isDeduction == "true";
    //   });
    // } else if (data.flag === "allScore") {
    //   deArr = decideArrs;
    // }
    // this.operateButtons.map(btn => {
    //   if (btn.flag == data.flag) {
    //     btn.showFlag = "false";
    //   } else {
    //     btn.showFlag = "true";
    //   }
    // });
    // this.setTableList(deArr);
    if (data.flag === "closeSearch") {
      this.showSearchForm = !this.showSearchForm;
      if (this.showSearchForm) {
        data.label = "隐藏查询";
      } else {
        data.label = "显示查询";
      }
    }
  },
  setTableList(data) {
    let tableDataList = this.$globalFnc.deepCopy(data.rows);
    tableDataList.map(item => {
      item.assessmentTarget = item.kpi.name;
      item.scoreStandard = item.kpi.criteria;
      item.provinceLeadDepartment = item.assessdManageAssign.assessedOrgId__dsp;
      item.provinceCoordinationDepartment = "";
      if (item.assessdCooprateAssign && item.assessdCooprateAssign.length > 0) {
        item.assessdCooprateAssign.map(coop => {
          item.provinceCoordinationDepartment += coop.assessedOrgId__dsp;
        });
      }
      item.targetScore = item.kpi.score;
      item.selfScore = item.selfAssess.shemeAssessKpi.score;
      item.reason = item.selfAssess.shemeAssessKpi.deductionReason;
      let analysistext = "";
      if (item.targetScore !== item.selfScore) {
        item.status = "incomplete";
        analysistext = "失分分析";
      } else {
        item.status = "complete";
        analysistext = "数据详情";
      }
      item.operateBtns = [
        {
          styleType: "primary",
          text: "查看",
          type: "check",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        },
        {
          styleType: "primary",
          text: analysistext,
          type: "scoreAnalysis",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-edit-outline",
          isIcon: true
        }
      ];
    });
    this.tableSettings.tableDatas = tableDataList;
    this.paginationSettings.totalNumbers = data.total;
  },
  /**
   * 表格按钮点击事件
   */
  handleTableRowButton(row, btns) {
    if (btns.type == "check") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = row;
    } else {
      sessionStorage.setItem("provinceKpiInfo", JSON.stringify(row));
      this.$router.push({
        path: "provinceKpiDataOverview",
        query: {
          asmSchemeKpiId: row.schemeKpi.asmSchemeKpiId,
          asmSchemeId: this.searchSettings.formGroupValues.asmSchemeId
        }
      });
    }
  },
  getDropdownlistData() {
    return new Promise(relsove => {
      this.$getData(this.$api.getAllScheme, {
        assessType: "1"
        // assessOrgId: this.$store.getters["user/userInfos"].orgId
      }).then(res => {
        this.searchFormItems.map(item => {
          if (item.name == "asmSchemeId") {
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
  }
};
export default methods;
