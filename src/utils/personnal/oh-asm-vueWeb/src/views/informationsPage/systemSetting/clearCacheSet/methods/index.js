const methods = {
  /**
   *  初始化页面
   */
  initPageData() {
    this.$searchformBtnAction(
      { postUrl: "getCacheList" },
      {},
      { vm: this }
    ).then(data => {
      this.setTableList(data);
    });
  },
  /**
   * 表格
   */
  setTableList(data) {
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "清除",
          type: "clear",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-delete",
          isIcon: true
        }
      ]
    };
    let cacheList = this.$globalFnc.deepCopy(data);
    this.formatData(cacheList, propObject);
    this.tableSettings.tableDatas = cacheList;
    // this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
    });
  },
  //底部分页回调函数
  // handlePaginationPagenumber(val) {
  //   this.paginationSettings.currentPage = val;
  //   this.initPageData();
  // },
  /**
   * 表格操作按钮
   */
  handleTableRowButton(row, btns) {
    if (btns.type === "clear") {
      this.$getData(this.$api.refreshCache, {
        cacheName: row.text
      }).then(() => {
        this.$message.success("清除缓存操作成功!");
        this.initPageData();
      });
    }
  }
};
export default methods;
