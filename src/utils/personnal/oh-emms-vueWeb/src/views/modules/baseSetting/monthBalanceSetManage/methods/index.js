const methods = {
  handleMonthBalanceFormBtn(btns, formData) {
    let submitData = this.$globalFnc.deepCopy(formData);
    if (formData.storeOrgId) {
      submitData.storeOrgId =
        typeof formData.storeOrgId === "object"
          ? formData.storeOrgId[formData.storeOrgId.length - 1]
          : formData.storeOrgId;
    }
    this.$postData(this.$api.monthBalanceOperation, submitData).then(() => {
      this.$message.success("操作成功");
      this.paginationSettings.currentPage = 1;
      this.initPageData();
    });
  },
  initPageData() {
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage
    };
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(
      { postUrl: "monthBalanceList" },
      baseForm,
      options
    ).then(data => {
      this.setTableList(data);
    });
  },
  // 格式化table数据
  setTableList(data) {
    let monthBalanceList = this.$globalFnc.deepCopy(data.rows);
    monthBalanceList.map(item => {
      // 物资信息
      if (item.basMaterial) {
        item.materialName = item.basMaterial.name;
      }
    });
    this.tableSettings.tableDatas = monthBalanceList;
    this.paginationSettings.totalNumbers = data.total;
  },
  //首页，分页切换
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  // 表单值选定修改事件
  handleChangeSelect(linkName, data) {
    // 搜索和表单 组织切换共用方法
    if (linkName === "changeOrg") {
      if (data && data.length) {
        this.getStorePointList(data[data.length - 1]).then(res => {
          let list = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
          this.setGroupFormValue(
            this.monthBalanceFormItems,
            "storepointId",
            list
          );
        });
      } else {
        this.setGroupFormValue(this.monthBalanceFormItems, "storepointId", []);
      }
    }
  },
  // 赋值
  setGroupFormValue(array, name, data) {
    array.forEach(item => {
      if (item.name === name) {
        item.data = data;
      }
    });
  },
  /**
   * 获取库点
   */
  getStorePointList(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.getStorePointList_common, {
        orgid: id,
        districtFlag: false
      }).then(res => {
        let data = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
        reslove(data);
      });
    });
  }
};
export default methods;
