const methods = {
  /**
   * 初始化页面
   */
  initPageData(options) {
    this.getChannelAndLevelList().then(() => {
      this.searchFormGroupSettings.formGroupValues.cmsChannelId = 6;
      this.url =
        this.$store.getters["user/reportServerUrl"] +
        `?reportlet=cms/cmsContentPublishNum.cpt&timeStamp=${new Date().getTime()}&contextpath=${location.host +
          "/" +
          location.pathname.split("/")[1]}&publishYear=${this
          .searchFormGroupSettings.formGroupValues.publishYear ||
          new Date().getFullYear()}&cmsChannelId=${this.searchFormGroupSettings
          .formGroupValues.cmsChannelId || ""}&_jwt=${sessionStorage.getItem(
          "jwt"
        )}`;
    });
  },
  /**
   * 搜索栏按钮点击事件
   */
  handleSearchFormBtn(btns, formData) {
    this.url =
      this.$store.getters["user/reportServerUrl"] +
      `?reportlet=cms/cmsContentPublishNum.cpt&timeStamp=${new Date().getTime()}&contextpath=${location.host +
        "/" +
        location.pathname.split("/")[1]}&publishYear=${formData.publishYear ||
        new Date().getFullYear()}&cmsChannelId=${formData.cmsChannelId ||
        ""}&_jwt=${sessionStorage.getItem("jwt")}`;
  },
  getChannelAndLevelList() {
    return new Promise(res => {
      this.$getData(this.$api.cmsChannelList_infosManageApi, {
        disabled: "N"
      }).then(list => {
        this.infoStaticSearchItems.map(item => {
          if (item.name === "cmsChannelId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              list.data,
              "name",
              "cmsChannelId",
              true
            );
          }
        });
      });
      res();
    });
  }
};
export default methods;
