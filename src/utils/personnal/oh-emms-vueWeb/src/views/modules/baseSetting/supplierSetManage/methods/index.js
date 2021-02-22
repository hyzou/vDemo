const methods = {
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "新增供应商";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addSupplierButton;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        disabled: "N",
        supplierType: "1",
        code: "系统自动生成"
      };
    }
    if (data.flag === "delete") {
      if (!this.chosedSupplierData.length) {
        this.$message.warning("请选择需删除的供应商!");
        return;
      }
      let supplierId = this.chosedSupplierData.map(item => {
        return item.emmsBasSupplierId;
      });
      this.$confirm("您确定要删除选中的供应商？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.removeSupplier,
          {
            ids: supplierId
          },
          true
        ).then(() => {
          this.$message.success("删除成功!");
          this.chosedSupplierData = [];
          this.initPageData();
        });
      });
    }
    if (data.flag === "open") {
      if (!this.chosedSupplierData.length) {
        this.$message.warning("请选择需启用的供应商!");
        return;
      }
      let status = this.chosedSupplierData.map(item => {
        return item.disabled;
      });
      if ([...new Set(status)].length > 1) {
        this.$message.warning("请选择相同状态的供应商!");
        return;
      }
      let supplierId = this.chosedSupplierData.map(item => {
        return item.emmsBasSupplierId;
      });
      this.$postData(
        this.$api.updateSupplierStatus,
        {
          ids: supplierId,
          disabled: "N"
        },
        true
      ).then(() => {
        this.$message.success("启用成功!");
        this.chosedSupplierData = [];
        this.initPageData();
      });
    }

    if (data.flag === "closed") {
      if (!this.chosedSupplierData.length) {
        this.$message.warning("请选择需禁用的供应商!");
        return;
      }
      let status = this.chosedSupplierData.map(item => {
        return item.disabled;
      });
      if ([...new Set(status)].length > 1) {
        this.$message.warning("请选择相同状态的供应商!");
        return;
      }
      let supplierId = this.chosedSupplierData.map(item => {
        return item.emmsBasSupplierId;
      });
      this.$postData(
        this.$api.updateSupplierStatus,
        {
          ids: supplierId,
          disabled: "Y"
        },
        true
      ).then(() => {
        this.$message.success("禁用成功!");
        this.initPageData();
      });
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
   * 表格选择事件
   */
  handleTableMutiChecked(data) {
    this.chosedSupplierData = [];
    if (data && data.length) {
      this.chosedSupplierData = data;
    }
  },
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "getSupplierList" }, defaultdatas);
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
    this.paginationSettings.totalNumbers = data.total;
    let supplierSetManage = data.rows,
      propObject = {
        name: "operateBtns",
        porpvalue: [
          {
            text: "编辑",
            type: "edit",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-edit-outline",
            isIcon: true
          }
        ]
      };
    if (!supplierSetManage || !supplierSetManage.length) {
      return;
    }
    this.formatData(supplierSetManage, propObject);
    this.tableSettings.tableDatas = supplierSetManage;
  },
  formatData(data, prop) {
    data.map(item => {
      // 字段转换
      switch (item.supplierType) {
        case "1":
          item.supplierType_dsp = "供应商";
          break;
        case "2":
          item.supplierType_dsp = "捐赠人";
          break;
        default:
          item.supplierType_dsp = "";
          break;
      }
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 如果这个数据是禁用状态，添加启用按钮
      if (item.disabled == "Y") {
        item[prop.name].push({
          text: "启用",
          type: "open",
          class: "text-plainInfo fontSize16 mr10",
          icon: "iconfont iconkaiguan-guan",
          isIcon: true
        });
      }
      // 如果这个数据是启用状态，添加禁用按钮
      if (item.disabled == "N") {
        item[prop.name].push({
          text: "禁用",
          type: "closed",
          class: "text-success fontSize16 mr10",
          icon: "iconfont iconkaiguan-kai",
          isIcon: true
        });
      }
    });
  },
  /**
   *  分页
   */
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  /**
   *  行点击事件
   */
  handleTableRowButton(row, btns) {
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑供应商信息";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editSupplierButton;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = row;
    }
    // 启用
    if (btns.type === "open") {
      this.$postData(
        this.$api.updateSupplierStatus,
        {
          ids: [row.emmsBasSupplierId],
          disabled: "N"
        },
        true
      ).then(() => {
        this.$message.success("启用成功!");
        this.initPageData();
      });
    }
    // 禁用
    if (btns.type === "closed") {
      this.$confirm("您确定要禁用该供应商？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.updateSupplierStatus,
          {
            ids: [row.emmsBasSupplierId],
            disabled: "Y"
          },
          true
        ).then(() => {
          this.$message.success("禁用成功!");
          this.initPageData();
        });
      });
    }
  },
  /**
   * 弹框确认按钮
   */
  handleDialogForm(button, data) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    // 编码不可以修改，所以不传给后台
    if (data.code) {
      delete data.code;
    }
    this.$postData(button.postUrl, data, true).then(() => {
      this.$message.success("保存成功!");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  }
};
export default methods;
