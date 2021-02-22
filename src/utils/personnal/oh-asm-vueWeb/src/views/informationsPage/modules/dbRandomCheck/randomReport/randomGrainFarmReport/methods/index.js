const methods = {
  /**
   * 初始化页面
   */
  initPageData(options) {
    this.url =
      this.$store.getters["user/reportServerUrl"] +
      `?reportlet=farmland.cpt&timeStamp=${new Date().getTime()}`;
  },
  /**
   * 搜索栏按钮点击事件
   */
  handleSearchFormBtn(btns, formData) {
    this.url =
      this.$store.getters["user/reportServerUrl"] +
      `?reportlet=farmland.cpt&name__dsp=${formData.name__dsp ||
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
        this.$global.fileDownloadUrl + "全省年永久基本农田划定情况.xlsx";
    } else {
      this.$postData(
        this.$api["importFarmlandDef_randomReports"],
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
