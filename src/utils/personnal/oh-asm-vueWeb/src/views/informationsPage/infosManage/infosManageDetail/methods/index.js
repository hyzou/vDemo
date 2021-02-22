const methods = {
  getInfoMessage() {
    let cmsContentId = this.$route.query.cmsContentId;
    let fromPage = this.$route.query.fromPage;
    this.checkOut = this.$route.query.checkout;
    if (!fromPage) {
      this.$router.push({ path: "/informationsPage/homePage" });
    } else if (fromPage && !cmsContentId) {
      this.$router.push({ path: fromPage });
    }
    this.prevPath = fromPage;
    this.$getData(this.$api.getContentInfo_infosManageApi, {
      cmsContentId
    }).then(xhr => {
      if (xhr && xhr.data) {
        this.infoMessage = xhr.data;
        if (xhr.data.status == 6) {
          this.updateViewCount(cmsContentId);
        }
      }
    });
  },
  updateViewCount(cmsContentId) {
    this.$postData(this.$api.getContentInfo_updateViewCount, {
      cmsContentId
    });
  },
  handleDownloadFile(fileItem) {
    // tableItem.viewfiles = this.$globalFnc.fileFormat(
    //   tableItem.files,
    //   "officeViewUrl"
    // );
    this.$globalFnc.readFileOnline(fileItem);
    // window.open(this.$global.commonDownloadUrl + fileId);
  },
  handleCheckoutMessage(action) {
    if (this.infoMessage && action) {
      let info = {
        cmsChannelId: this.infoMessage.cmsChannelId,
        level: this.infoMessage.level,
        contentText: this.infoMessage.contentText,
        title: this.infoMessage.title,
        cmsContentId: this.infoMessage.cmsContentId,
        status: action
      };
      this.$postData(this.$api.cmsContentUpdate_infosManageApi, info).then(
        xhr => {
          if (xhr && xhr.success === true && xhr.data) {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.pageBack();
          }
        }
      );
    } else {
      this.pageBack();
    }
  },
  pageBack() {
    this.$router.push({ path: this.prevPath });
  }
};
export default methods;
