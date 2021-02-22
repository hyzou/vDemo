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
      this.reservePlanContentItem.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
      });
      this.planDetailOperateButtonsSettings.buttonListData = this.planDetailOperateButtons;
      this.planDetailTableSettings.headers.forEach(item => {
        if (item.key === "num") {
          item.disabled = false;
        }
      });
      this.reservePlanDialog.dialogName = "添加储备计划";
      // 加载表单组
      this.reservePlanDialog.formButtonList = this.addReservePlanButton;
      this.reservePlanDialog.dialogVisible = true;
      this.reservePlanFormSettings.formGroupValues = {
        planReserveDtls: [],
        created: new Date().getTime(),
        docNo: "系统自动生成",
        year: new Date().getFullYear() + ""
      };
    }
    // 添加计划里面 新增物资
    if (data.flag === "planDetailAdd") {
      let formGroupValue = this.reservePlanFormSettings.formGroupValues;
      if (!formGroupValue.year) {
        this.$message.warning("需要先选择年份");
        return;
      }
      this.materialDetailDialog.dialogName = "物资选择";
      // 加载表单组
      this.materialDetailDialog.formButtonList = this.addMaterialButton;
      this.materialDetailDialog.dialogVisible = true;
      this.setMaterialSearchForm();
      this.initMaterialPage();
    }
    // 添加计划里面 删除物资
    if (data.flag === "planDetailDelete") {
      if (!this.selectPlanDetailData.length) {
        this.$message.warning("请选择需删除的计划明细");
        return;
      }

      this.selectMaterialData.forEach((materialItem, materialIndex) => {
        this.selectPlanDetailData.forEach(planItem => {
          if (materialItem.code == planItem.code) {
            this.selectMaterialData.splice(materialIndex, 1);
          }
        });
      });

      this.reservePlanFormSettings.formGroupValues.planReserveDtls = this.selectMaterialData;
      this.selectPlanDetailData = [];
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
    this.handleSearchFormBtn({ postUrl: "getReservePlanList" }, defaultdatas);
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
  /**
   *  初始化物资列表
   */
  setMaterialSearchForm() {
    this.materialSearchFormItems.forEach(item => {
      if (item.name === "basMaterialTypeId") {
        this.getMaterialTypeTree().then(res => {
          item.data = res.data;
        });
      }
    });
    this.materialSearchFormSettings.formGroupList = this.materialSearchFormItems;
    this.materialSearchFormSettings.formGroupValues.year =
      this.reservePlanFormSettings.formGroupValues.year - 1;
  },
  initMaterialPage() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.materialSearchFormSettings.formGroupValues
    );
    this.handleMaterialSearchFormBtn(
      { postUrl: "getMaterialDetailList" },
      defaultdatas
    );
  },
  handleMaterialSearchFormBtn(btns, formData) {
    if (btns.flag === "search") {
      this.materialPaginationSettings.currentPage = 1;
    }
    if (btns.flag === "clear") {
      this.materialPaginationSettings.currentPage = 1;
      this.materialSearchFormSettings.formGroupValues = {};
      formData = {};
    }
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.materialPaginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage
    };
    let params = Object.assign({}, baseForm, formData);
    this.materialDetailTableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setMaterialTableList(data);
    });
  },
  setMaterialTableList(data) {
    let materialList = this.$globalFnc.deepCopy(data.rows);
    this.formatMaterialData(materialList);
    this.materialDetailTableSettings.tableDatas = materialList;
    this.materialPaginationSettings.totalNumbers = data.total;
  },
  formatMaterialData(data) {
    data.map(item => {
      // 计量单位
      if (item.basUnit) {
        item.unitName = item.basUnit.name;
      }
      if (item.basMaterialType) {
        item.materialTypeName = item.basMaterialType.name;
      }
    });
  },
  handleMaterialPaginationPagenumber(val) {
    this.materialPaginationSettings.currentPage = val;
    this.initMaterialPage();
  },
  handleTableRowButton(row, btns) {
    let defaultValue;
    if (btns.type === "delete") {
      this.$confirm("确认删除该储备计划？", "确认框", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.deleteReservePlan,
          {
            emmsPlanReserveId: row.emmsPlanReserveId
          },
          true
        ).then(() => {
          this.$message.success("成功删除该储备计划!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "submit") {
      this.$confirm("请核对储备计划信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.reservePlanStatus,
          {
            emmsPlanReserveId: row.emmsPlanReserveId,
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
      this.reservePlanContentItem.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
      });
      this.planDetailOperateButtonsSettings.buttonListData = this.planDetailOperateButtons;
      this.planDetailTableSettings.headers.forEach(item => {
        if (item.key === "num") {
          item.disabled = false;
        }
      });
      this.reservePlanDialog.dialogName = "编辑储备计划";
      // 加载表单组
      this.reservePlanDialog.formButtonList = this.editReservePlanButton;
    }
    if (btns.type === "look") {
      this.reservePlanContentItem.forEach(item => {
        item.disabled = true;
      });
      this.planDetailOperateButtonsSettings.buttonListData = [];
      this.planDetailTableSettings.headers.forEach(item => {
        item.disabled = true;
      });
      this.reservePlanDialog.dialogName = "查看储备计划";
      // 加载表单组
      this.reservePlanDialog.formButtonList = [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: ""
        }
      ];
    }
    this.$getData(this.$api.singleReservePlan, {
      id: row.emmsPlanReserveId
    }).then(res => {
      defaultValue = res.data;
      if (
        defaultValue &&
        defaultValue.planReserveDtls &&
        defaultValue.planReserveDtls.length
      ) {
        defaultValue.planReserveDtls.forEach(item => {
          if (item.basMaterial) {
            // 物资类别
            if (item.basMaterial.basMaterialType) {
              item.materialTypeName = item.basMaterial.basMaterialType.name;
            }
            // 物资编码
            item.code = item.basMaterial.code;
            //物资名称
            item.name = item.basMaterial.name;
            // 计量单位
            if (item.basMaterial.basUnit) {
              item.unitName = item.basMaterial.basUnit.name;
            }
          }
        });
      }
      // 选择物资的时候，变成选中状态
      this.selectMaterialData = defaultValue.planReserveDtls;
      this.reservePlanFormSettings.formGroupValues = defaultValue;
    });
    this.reservePlanDialog.dialogVisible = true;
  },
  handleInputGroupButton(clickName) {
    if (clickName === "cronExpression") {
      this.cronDetailDialog.dialogVisible = true;
    }
  },

  // 选中的计划明细
  handlePlanDetailTableMutiChecked(data) {
    this.selectPlanDetailData = [];
    if (data && data.length) {
      this.selectPlanDetailData = data;
    }
  },
  /**
   * 物资选择页面点击事件
   */
  handleMaterialTableMutiChecked(data) {
    this.selectMaterialData = [];
    if (data && data.length) {
      this.selectMaterialData = data;
    }
  },
  handleMaterialDetailDialog(flag) {
    // 物资选择导入
    if (flag === "import") {
      this.materialDetailDialog.dialogVisible = false;

      let planReserveDtls = this.reservePlanFormSettings.formGroupValues
        .planReserveDtls;
      if (planReserveDtls && planReserveDtls.length) {
        this.selectMaterialData.forEach(item => {
          planReserveDtls.forEach(planItem => {
            if (item.code === planItem.code) {
              item.num = planItem.num;
            }
          });
        });
      }
      this.reservePlanFormSettings.formGroupValues.planReserveDtls = this.selectMaterialData;
    }
    if (flag === "cancel") {
      this.selectMaterialData = [];
      this.materialDetailDialog.dialogVisible = false;
    }
  },
  /**
   * 添加储备计划
   */
  handlePlanDialog(button) {
    if (button.flag === "cancel") {
      this.reservePlanDialog.dialogVisible = false;
      this.reservePlanFormSettings.formGroupValues = {};
      // 选中的物资
      this.selectMaterialData = [];
      // 计划明细的选择
      this.selectPlanDetailData = [];
      return;
    }

    let formData;
    this.$refs.planDetail.$refs["formItems"].validate(valid => {
      if (valid) {
        formData = this.reservePlanFormSettings.formGroupValues;
      }
    });
    if (!formData) {
      return;
    }
    // 送审改状态
    if (button.flag === "submit") {
      this.$confirm("请核对储备计划信息，操作后不能再做任何修改", "提示", {
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
      this.reservePlanDialog.dialogVisible = false;
      this.reservePlanFormSettings.formGroupValues = {};
      // 选中的物资
      this.selectMaterialData = [];
      // 计划明细的选择
      this.selectPlanDetailData = [];
    });
  }
};
export default methods;
