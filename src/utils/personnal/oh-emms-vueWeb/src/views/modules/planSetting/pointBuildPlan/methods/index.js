const methods = {
  getMaterialTypeTree() {
    return new Promise(reslove => {
      this.$getData(this.$api.getMaterialTypeTree).then(res => {
        reslove(res);
      });
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    // 首页新增
    if (data.flag === "add") {
      this.pointBuildPlanContentItem.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
        if (item.name === "planPointbuildDtls") {
          item.useType = "add";
          item.headers.forEach(childrenItem => {
            childrenItem.disabled = false;
          });
        }
      });
      this.dialogFormSettings.dialogFormTitle = "添加仓储建设规划";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addPointBuildPlanButton;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        planPointbuildDtls: [],
        created: new Date().getTime(),
        docNo: "系统自动生成",
        year: new Date().getFullYear() + ""
      };
    }

    if (data.flag === "closeSearch") {
      this.showSearchForm = !this.showSearchForm;
      if (this.showSearchForm) {
        data.label = "隐藏查询";
      } else {
        data.label = "显示查询";
      }
    }
  },
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.searchFormSettings.formGroupValues
    );
    this.handleSearchFormBtn(
      { postUrl: "getPointBuildPlanList" },
      defaultdatas
    );
  },
  handleSearchFormBtn(btns, formData) {
    if (btns.flag === "search") {
      this.paginationSettings.currentPage = 1;
    }
    if (btns.flag === "clear") {
      this.paginationSettings.currentPage = 1;
      this.searchFormSettings.formGroupValues = {};
      formData = {};
    }
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage
    };
    let params = Object.assign({}, baseForm, formData);
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "编辑",
          type: "edit",
          class: "text-primary fontSize20 mr10",
          isIcon: true
        },
        {
          text: "送审",
          type: "submit",
          class: "text-primary fontSize20 mr10",
          isIcon: true
        },
        {
          text: "删除",
          type: "delete",
          class: "text-danger fontSize20 mr10",
          isIcon: true
        }
      ]
    };
    let reservePlanList = this.$globalFnc.deepCopy(data.rows);
    this.formatData(reservePlanList, propObject);
    this.tableSettings.tableDatas = reservePlanList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      // 开单时间
      item.created_dsp = this.$globalFnc.changeDateFormat(item.created);
      // 按钮
      item[prop.name] = [];
      // 制单状态可以 编辑 删除
      if (item.processinstStatus === "1") {
        item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      } else {
        item[prop.name].push({
          text: "查看",
          type: "look",
          class: "text-primary fontSize20 mr10",
          isIcon: true
        });
      }
    });
  },
  //首页，分页切换
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  handleTableRowButton(row, btns) {
    let defaultValue;
    if (btns.type === "delete") {
      this.$confirm("确认删除该仓储建设规划？", "确认框", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.deletePointBuildPlan,
          {
            emmsPlanPointbuildId: row.emmsPlanPointbuildId
          },
          true
        ).then(() => {
          this.$message.success("成功删除该仓储建设规划!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "submit") {
      this.$confirm("请核对仓储建设规划信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.pointBuildPlanStatus,
          {
            emmsPlanPointbuildId: row.emmsPlanPointbuildId,
            processinstStatus: "99"
          },
          true
        ).then(() => {
          this.$message.success("操作成功!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "edit") {
      this.pointBuildPlanContentItem.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
        if (item.name === "planPointbuildDtls") {
          item.useType = "add";
          item.headers.forEach(childrenItem => {
            childrenItem.disabled = false;
          });
        }
      });
      this.dialogFormSettings.dialogFormTitle = "修改仓储建设规划";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editPointBuildPlanButton;
    }
    if (btns.type === "look") {
      this.pointBuildPlanContentItem.forEach(item => {
        item.disabled = true;
        if (item.name === "planPointbuildDtls") {
          item.useType = "look";
          item.headers.forEach(childrenItem => {
            childrenItem.disabled = true;
          });
        }
      });
      this.dialogFormSettings.dialogFormTitle = "查看仓储建设规划";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: ""
        }
      ];
    }
    this.dialogFormSettings.dialogFormVisible = true;
    this.$getData(this.$api.singlePointBuildPlan, {
      id: row.emmsPlanPointbuildId
    }).then(res => {
      defaultValue = res.data;
      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValue;
    });
  },
  handleInputGroupButton(clickName) {
    if (clickName === "cronExpression") {
      this.cronDetailDialog.dialogVisible = true;
    }
  },
  /**
   * 弹框确认按钮
   */
  handleDialogForm(button, formData) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    // 送审改状态
    if (button.flag === "submit") {
      this.$confirm("请核对仓储建设规划信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        formData.processinstStatus = "99";
        this.handleSaveData(button, formData);
      });
    } else {
      this.handleSaveData(button, formData);
    }
  },
  handleSaveData(button, formData) {
    // 保存
    this.$postData(button.postUrl, formData, true).then(() => {
      this.$message.success("操作成功!");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  }
};
export default methods;
