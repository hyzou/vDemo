const methods = {
  /**
   * operateButtons点击事件
   */
  // 获取计量单位
  getUnitList() {
    return new Promise(reslove => {
      this.$getData(this.$api.getUnitSelect).then(res => {
        reslove(res);
      });
    });
  },
  handleOperateButton(data) {
    let formGroupList;
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "新增物资";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addMaterialButton;
      formGroupList = this.$globalFnc.deepCopy(this.materialContentItems);
      // 新增计量单位没有编码
      formGroupList.forEach(item => {
        if (item.name === "code") {
          item.hideItem = true;
        }
        if (item.name === "emmsBasUnitId") {
          this.getUnitList().then(res => {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res.data,
              "name",
              "emmsBasUnitId"
            );
          });
        }
      });
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        materialTypeName: this.chosedMaterialType
          ? this.chosedMaterialType.text
          : "",
        disabled: "N",
        isService: "Y",
        isRecycleable: "Y",
        emmsBasMaterialTypeId: this.chosedMaterialType
          ? this.chosedMaterialType.id
          : ""
      };
    }
    if (data.flag === "delete") {
      if (!this.chosedMaterialData.length) {
        this.$message.warning("请选择需删除的物资!");
        return;
      }
      let materialId = this.chosedMaterialData.map(item => {
        return item.emmsBasMaterialId;
      });
      this.$confirm("您确定要删除选中的物资？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.removeMaterial,
          {
            ids: materialId
          },
          true
        ).then(() => {
          this.$message.success("删除成功!");
          this.chosedMaterialData = [];
          this.initPageData();
        });
      });
    }
    if (data.flag === "open") {
      if (!this.chosedMaterialData.length) {
        this.$message.warning("请选择需启用的物资!");
        return;
      }
      let status = this.chosedMaterialData.map(item => {
        return item.disabled;
      });
      if ([...new Set(status)].length > 1) {
        this.$message.warning("请选择相同状态的物资!");
        return;
      }
      let materialId = this.chosedMaterialData.map(item => {
        return item.emmsBasMaterialId;
      });
      this.$postData(
        this.$api.updateMaterialStatus,
        {
          ids: materialId,
          disabled: "N"
        },
        true
      ).then(() => {
        this.$message.success("启用成功!");
        this.chosedMaterialData = [];
        this.initPageData();
      });
    }
    if (data.flag === "closed") {
      if (!this.chosedMaterialData.length) {
        this.$message.warning("请选择需禁用的物资!");
        return;
      }
      let status = this.chosedMaterialData.map(item => {
        return item.disabled;
      });
      if ([...new Set(status)].length > 1) {
        this.$message.warning("请选择相同状态的物资!");
        return;
      }
      let materialId = this.chosedMaterialData.map(item => {
        return item.emmsBasMaterialId;
      });
      this.$postData(
        this.$api.updateMaterialStatus,
        {
          ids: materialId,
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
    this.chosedMaterialData = [];
    if (data && data.length) {
      this.chosedMaterialData = data;
    }
  },
  /**
   * 树切换事件
   */
  handleTreeNodeClick(node) {
    // 第三级禁用
    if (node.treeLevel == "3") {
      this.operateButtonsSettings.buttonListData = this.operateButtons;
    } else {
      this.operateButtonsSettings.buttonListData = [];
    }
    this.chosedMaterialType = node;
    this.initPageData();
  },
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "getMaterialList" }, defaultdatas);
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
      rows: this.$global.paginationOption.numberPerpage,
      isHasChild: "Y",
      emmsBasMaterialTypeId: this.chosedMaterialType
        ? this.chosedMaterialType.id
        : ""
    };
    let params = Object.assign({}, baseForm, formData);
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let materialList = data.rows,
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
    this.formatData(materialList, propObject);
    this.tableSettings.tableDatas = materialList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      // 单位
      item.unitName = item.basUnit ? item.basUnit.name : "";
      //类别
      item.materialTypeName = item.basMaterialType
        ? item.basMaterialType.name
        : "";

      item[prop.name] = [];

      if (
        this.chosedMaterialType &&
        this.chosedMaterialType.treeLevel === "3"
      ) {
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
    let formGroupList, formGroupValues;
    // 启用
    if (btns.type === "open") {
      this.$postData(
        this.$api.updateMaterialStatus,
        {
          ids: [row.emmsBasMaterialId],
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
      this.$confirm("您确定要禁用该物资类别？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.updateMaterialStatus,
          {
            ids: [row.emmsBasMaterialId],
            disabled: "Y"
          },
          true
        ).then(() => {
          this.$message.success("禁用成功!");
          this.initPageData();
        });
      });
    }
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑物资类别";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editMaterialButton;
      formGroupList = this.$globalFnc.deepCopy(this.materialContentItems);
      formGroupList.forEach(item => {
        if (item.name === "emmsBasUnitId") {
          this.getUnitList().then(res => {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res.data,
              "name",
              "emmsBasUnitId"
            );
          });
        }
      });
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      this.dialogFormSettings.dialogFormVisible = true;
      this.$getData(this.$api.singleMaterialData, {
        id: row.emmsBasMaterialId
      }).then(res => {
        formGroupValues = this.$globalFnc.deepCopy(res.data);

        if (formGroupValues.basMaterialType) {
          formGroupValues.materialTypeName =
            formGroupValues.basMaterialType.name;
        }

        if (
          formGroupValues.basMaterialSpecs &&
          formGroupValues.basMaterialSpecs.length
        ) {
          formGroupValues.basMaterialSpecs.forEach(item => {
            for (let key in item) {
              formGroupValues[key] = item[key];
            }
          });
        }

        this.dialogFormSettings.dialogFormItems.formGroupValues = formGroupValues;
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
    // 处理物资保存信息格式
    let submitData = this.dealMaterialData(data);
    this.$postData(button.postUrl, submitData, true).then(() => {
      this.$message.success("保存成功!");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  },
  dealMaterialData(data) {
    let params = this.$globalFnc.deepCopy(data),
      basMaterialSpecsObj = {};

    basMaterialSpecsObj.brand = params.brand ? params.brand : "";
    basMaterialSpecsObj.mType = params.mType ? params.mType : "";
    basMaterialSpecsObj.specs = params.specs ? params.specs : "";
    basMaterialSpecsObj.manufacturer = params.manufacturer
      ? params.manufacturer
      : "";
    basMaterialSpecsObj.emmsBasMaterialSpecId = params.emmsBasMaterialSpecId
      ? params.emmsBasMaterialSpecId
      : "";
    params.basMaterialSpecs = [];
    params.basMaterialSpecs.push(basMaterialSpecsObj);

    return params;
  }
};
export default methods;
