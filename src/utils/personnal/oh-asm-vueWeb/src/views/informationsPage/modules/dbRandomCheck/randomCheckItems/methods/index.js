const methods = {
  initPageData(options) {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    if (options) {
      Object.assign(defaultdatas, options);
    }
    this.handleSearchFormBtn(
      { postUrl: "queryInspectionItem_randomCheckItems" },
      defaultdatas
    );
  },
  /**
   * 搜索栏按钮点击事件
   */
  handleSearchFormBtn(btns, formData) {
    let options = {
      vm: this
    };
    let postdata = {
      filterRules: [],
      page: this.paginationSettings.currentPage,
      limit: this.$global.paginationOption.numberPerpage
    };
    for (let key in formData) {
      let obj = {
        field: key,
        value: formData[key],
        op: "contains"
      };
      postdata.filterRules.push(obj);
    }
    postdata.filterRules = JSON.stringify(postdata.filterRules);
    this.$searchformBtnAction(btns, postdata, options).then(data => {
      this.setTableList(data);
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
    if (data.flag == "new") {
      this.dialogFormSettings.dialogFormItems.formGroupList = this.addRandomItemDialogItems;
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addRandomItemDialogBtns;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.dialogFormSettings.dialogFormVisible = true;
    }
  },
  // 列表
  setTableList(data) {
    data.rows.map(item => {
      item.reportDateTime = this.$globalFnc.dateStampFormat(item.created);
      item.option = [
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
          text: "修改",
          type: "update",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-edit-outline",
          isIcon: true
        },
        {
          styleType: "primary",
          text: "删除",
          type: "delete",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-delete",
          isIcon: true,
          postUrl: "deleteInspectionItem_randomCheckItems"
        }
      ];
      if (item.disabled == "N") {
        item.option.push({
          styleType: "primary",
          text: "禁用",
          type: "disable",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-turn-off",
          isIcon: true,
          postUrl: "disableInspectionItem_randomCheckItems"
        });
      } else {
        item.option.push({
          styleType: "primary",
          text: "启用",
          type: "enable",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-open",
          isIcon: true,
          postUrl: "enableInspectionItem_randomCheckItems"
        });
      }
    });
    this.tableSettings.tableDatas = data.rows;
    this.paginationSettings.totalNumbers = data.total;
  },
  // 保存
  handleDialogForm(button, data) {
    if (button.flag == "save") {
      this.$postData(this.$api[button.postUrl], data, true).then(res => {
        this.$message.success("保存成功!");
        this.initPageData();
        this.dialogFormSettings.dialogFormVisible = false;
        this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      });
    }
    if (button.flag == "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    }
  },
  // 表格按钮
  handleTableRowButton(data, btn) {
    if (btn.type === "check" || btn.type === "update") {
      if (btn.type === "check") {
        this.dialogFormSettings.dialogFormItems.formGroupList = this.checkRandomItemDialogItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.checkRandomItemDialogBtns;
      } else {
        this.dialogFormSettings.dialogFormItems.formGroupList = this.updateRandomItemDialogItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.updateRandomItemDialogBtns;
      }
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = data;
    } else {
      if (btn.type === "delete") {
        this.$confirm("确定删除当前事项信息吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$postData(
            this.$api[btn.postUrl],
            [data.chkDefItemId],
            true
          ).then(() => {
            this.$message.success("操作成功！");
            this.initPageData();
          });
        });
      } else {
        this.$postData(this.$api[btn.postUrl], [data.chkDefItemId], true).then(
          () => {
            this.$message.success("操作成功！");
            this.initPageData();
          }
        );
      }
    }
  },
  //底部分页回调函数
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  }
};
export default methods;
