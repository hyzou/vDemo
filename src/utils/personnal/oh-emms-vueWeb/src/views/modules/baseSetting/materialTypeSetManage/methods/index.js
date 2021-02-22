const methods = {
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    let formGroupList;
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "新增物资类别";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addMaterialTypeButton;
      formGroupList = this.$globalFnc.deepCopy(this.materialTypeContentItems);
      // 新增计量单位没有编码
      formGroupList.forEach(item => {
        if (item.name === "code") {
          item.hideItem = true;
        }
      });
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        disabled: "N",
        parentId: this.chosedMaterialType.id,
        treeLevel: Number(this.chosedMaterialType.treeLevel) + 1 + ""
      };
    }
    if (data.flag === "delete") {
      if (!this.chosedMaterialTypeData.length) {
        this.$message.warning("请选择需删除的物资类别!");
        return;
      }
      let materialTypeId = this.chosedMaterialTypeData.map(item => {
        return item.emmsBasMaterialTypeId;
      });
      this.$confirm("您确定要删除选中的物资类别？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.removeMaterialType,
          {
            ids: materialTypeId
          },
          true
        ).then(() => {
          this.$message.success("删除成功!");
          this.chosedMaterialTypeData = [];
          this.initTree();
          this.$store.dispatch("user/commitBaseInfos");
        });
      });
    }
    if (data.flag === "open") {
      if (!this.chosedMaterialTypeData.length) {
        this.$message.warning("请选择需启用的物资类别!");
        return;
      }
      let status = this.chosedMaterialTypeData.map(item => {
        return item.disabled;
      });
      if ([...new Set(status)].length > 1) {
        this.$message.warning("请选择相同状态的物资类别!");
        return;
      }
      let materialTypeId = this.chosedMaterialTypeData.map(item => {
        return item.emmsBasMaterialTypeId;
      });
      this.$postData(
        this.$api.updateMaterialTypeStatus,
        {
          ids: materialTypeId,
          disabled: "N"
        },
        true
      ).then(() => {
        this.$message.success("启用成功!");
        this.chosedMaterialTypeData = [];
        this.$store.dispatch("user/commitBaseInfos");
        this.initPageData();
      });
    }
    if (data.flag === "closed") {
      if (!this.chosedMaterialTypeData.length) {
        this.$message.warning("请选择需禁用的物资类别!");
        return;
      }
      let status = this.chosedMaterialTypeData.map(item => {
        return item.disabled;
      });
      if ([...new Set(status)].length > 1) {
        this.$message.warning("请选择相同状态的物资类别!");
        return;
      }
      let materialTypeId = this.chosedMaterialTypeData.map(item => {
        return item.emmsBasMaterialTypeId;
      });
      this.$postData(
        this.$api.updateMaterialTypeStatus,
        {
          ids: materialTypeId,
          disabled: "Y"
        },
        true
      ).then(() => {
        this.$message.success("禁用成功!");
        this.chosedMaterialTypeData = [];
        this.$store.dispatch("user/commitBaseInfos");
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
    this.chosedMaterialTypeData = [];
    if (data && data.length) {
      this.chosedMaterialTypeData = data;
    }
  },
  /**
   * 初始化树
   */
  initTree() {
    this.$getData(this.$api.getMaterialTypeTree).then(materialTypeList => {
      let materialTypeRootList = [
        {
          children: materialTypeList.data,
          disabled: "N",
          id: "0",
          parentId: null,
          state: "open",
          text: "物资类别",
          treeLevel: 0
        }
      ];
      this.treeSettings.treeData = materialTypeRootList;

      // 没有数据的时候，说明是第一次进来，需要默认选中第一个
      if (!this.chosedMaterialType) {
        this.chosedMaterialType = materialTypeRootList[0];
      }
      this.$nextTick(() => {
        this.$refs.materialTypeTree.$children[0].setCurrentKey(
          this.chosedMaterialType.id
        );
      });

      this.initPageData();
    });
  },
  /**
   * 树切换事件
   */
  handleTreeNodeClick(node) {
    if (node.treeLevel === "3") {
      this.operateButtonsSettings.buttonListData = [];
    } else {
      this.operateButtonsSettings.buttonListData = this.operateButtons;
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
    this.handleSearchFormBtn({ postUrl: "getMaterialTypeList" }, defaultdatas);
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
      parentId: this.chosedMaterialType ? this.chosedMaterialType.id : ""
    };
    let params = Object.assign({}, baseForm, formData);
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let materialTypeList = data.rows,
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
    this.formatData(materialTypeList, propObject);
    this.tableSettings.tableDatas = materialTypeList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
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
    let formGroupList;
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑物资类别";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editMaterialTypeButton;
      formGroupList = this.$globalFnc.deepCopy(this.materialTypeContentItems);
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = row;
    }
    // 启用
    if (btns.type === "open") {
      this.$postData(
        this.$api.updateMaterialTypeStatus,
        {
          ids: [row.emmsBasMaterialTypeId],
          disabled: "N"
        },
        true
      ).then(() => {
        this.$message.success("启用成功!");
        this.$store.dispatch("user/commitBaseInfos");
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
          this.$api.updateMaterialTypeStatus,
          {
            ids: [row.emmsBasMaterialTypeId],
            disabled: "Y"
          },
          true
        ).then(() => {
          this.$message.success("禁用成功!");
          this.$store.dispatch("user/commitBaseInfos");
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
      this.initTree();
      this.$store.dispatch("user/commitBaseInfos");
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  }
};
export default methods;
