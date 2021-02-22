const methods = {
  initPageData(options) {
    this.url =
      this.$store.getters["user/reportServerUrl"] +
      `?reportlet=stock_divide.cpt&timeStamp=${new Date().getTime()}`;
  },
  /**
   * 搜索栏按钮点击事件
   */
  handleSearchFormBtn(btns, formData) {
    this.url =
      this.$store.getters["user/reportServerUrl"] +
      `?reportlet=stock_divide.cpt&spDisrtictName=${formData.name__dsp ||
        ""}&timeStamp=${new Date().getTime()}`;
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
    if (data.flag == "upload") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    }
  },
  /**
   * 上传报表
   */
  handleDialogForm(button, data) {
    if (button.flag == "download") {
      window.location.href =
        this.$global.fileDownloadUrl + "粮食库存分解登统表.xlsx";
    } else {
      this.$postData(
        this.$api["importStoreDivideDef_randomReports"],
        data,
        true
      ).then(xhr => {
        if (xhr.success) {
          this.$message.success("保存成功!");
          this.dialogFormSettings.dialogFormVisible = false;
          this.initPageData();
        } else {
          this.$message.error("请核对模板格式并正确填写表格数据!");
        }
      });
    }
  }
};
export default methods;
