const methods = {
  initPageData(options) {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.reviewProgressSearchFormGroupSettings.formGroupValues
    );
    if (options) {
      Object.assign(defaultdatas, options);
    }
    this.handleSearchFormBtn(
      { postUrl: "getProgressList_supervision" },
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
    if (formData.reportDate) {
      formData.reportDate = formData.reportDate.join(" - ");
    }
    formData.page = this.paginationSettings.currentPage;
    formData.rows = this.$global.paginationOption.numberPerpage;
    if (this.pageType == "edit") {
      formData.status = "0";
    } else {
      formData.status = "1";
    }
    this.$searchformBtnAction(btns, formData, options).then(data => {
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
    if (data.flag == "addProgress") {
      this.handleAddWorkProgress();
    }
  },
  // 获取考核工作进展情况列表
  setTableList(data) {
    data.rows.map(item => {
      item.reportDateTime = this.$globalFnc.dateStampFormat(item.created);
      if (item.status == "0") {
        item.option = [
          {
            type: "edit",
            styleType: "primary",
            text: "编辑",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-edit-outline",
            isIcon: true
          },
          {
            type: "delete",
            styleType: "danger",
            text: "删除",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-delete",
            isIcon: true
          }
        ];
      } else {
        item.option = [
          {
            styleType: "primary",
            text: "查看",
            type: "check",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-search",
            isIcon: true
          }
        ];
      }
    });
    this.reviewProgressTableSettings.tableDatas = data.rows;
    this.paginationSettings.totalNumbers = data.total;
  },
  // 表格按钮
  handleTableRowButton(data, type) {
    let that = this,
      postdata = {};
    if (type.type === "edit" || type.type === "check") {
      postdata = {
        asmShemeReportId: data.asmShemeReportId
      };
      that
        .$postData(that.$api["getSingleProgressFileList_supervision"], postdata)
        .then(xhr => {
          data.reportFiles = xhr.rows;
          if (type.type === "edit") {
            this.standDialogFormSettings.dialogFormItems.formGroupList = this.updateProgressDialogItems;
            this.standDialogFormSettings.dialogFormItems.formButtonList = this.updateProgressDialogBtns;
          } else {
            this.standDialogFormSettings.dialogFormItems.formGroupList = this.checkProgressDialogItems;
            this.standDialogFormSettings.dialogFormItems.formButtonList = this.checkProgressDialogBtns;
          }
          this.standDialogFormSettings.dialogFormItems.formGroupValues = data;
          this.standDialogFormSettings.dialogFormVisible = true;
        });
    }
    if (type.type === "delete") {
      this.$confirm("您确定要删除当前信息吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        postdata = {
          asmShemeReportIds: []
        };
        postdata.asmShemeReportIds.push(data.asmShemeReportId);
        that
          .$postData(that.$api["removeProgress_supervision"], postdata)
          .then(xhr => {
            that.initPageData();
          });
      });
    }
  },
  // 新增工作进度
  handleAddWorkProgress() {
    this.standDialogFormSettings.dialogFormItems.formGroupList = this.newProgressDialogItems;
    this.standDialogFormSettings.dialogFormItems.formButtonList = this.newProgressDialogBtns;
    this.standDialogFormSettings.dialogFormItems.formGroupValues = {};
    this.standDialogFormSettings.dialogFormVisible = true;
  },
  //底部分页回调函数
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  // 从已传文件中删除文件
  handleRemoveFiles(filedata) {
    console.log(filedata);
    let data = {
      fileId: filedata.fileId
    };
    this.$postData(
      this.$api["removeSingleProgressFile_supervision"],
      data
    ).then(xhr => {
      console.log(xhr);
    });
  },
  // 保存数据
  handleDialogForm(btn, data) {
    let that = this,
      postUrl = btn.update
        ? "updateProgress_supervision"
        : "addProgress_supervision";
    if (btn.flag == "save" || btn.flag == "updateSave") {
      this.$confirm("您确定要将本条工作进展提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        data.append("status", "1");
        data.append(
          "asmSchemeId",
          this.reviewProgressSearchFormGroupSettings.formGroupValues.asmSchemeId
        );
        that.$postData(that.$api[postUrl], data, true).then(xhr => {
          that.standDialogFormSettings.dialogFormVisible = false;
          that.initPageData();
        });
      });
    } else if (btn.flag == "saveStuff" || btn.flag == "updateStuff") {
      data.append("status", "0");
      data.append(
        "asmSchemeId",
        this.reviewProgressSearchFormGroupSettings.formGroupValues.asmSchemeId
      );
      that.$postData(that.$api[postUrl], data, true).then(xhr => {
        that.standDialogFormSettings.dialogFormVisible = false;
        that.initPageData();
      });
    }
  },
  getOrgslist() {
    return new Promise(reslove => {
      this.$getData(this.$api.dictList, {
        _refKey: "org",
        orgtypeid: "200",
        status: "1"
      }).then(res => {
        this.searchFormItems.map(item => {
          if (item.name == "assessedOrgId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res,
              "text",
              "value"
            );
            reslove(res);
          }
        });
      });
    });
  },
  getSchemList() {
    return new Promise(resolve => {
      this.$getData(this.$api.getSchemDropdownlist_supervision, {
        assessType: this.$global.SCHME_TYPE_YEAR,
        assessedOrgId: this.$store.getters["user/userInfos"].orgId,
        running: true
      }).then(xhr => {
        this.reviewProgressSearchFormGroupSettings.formGroupValues.asmSchemeId =
          xhr[0].businessKey || "";
        this.searchFormItems.map(searchItem => {
          if (searchItem.name == "asmSchemeId") {
            searchItem.data = this.$globalFnc.arrayToFormDropdown(
              xhr,
              "name",
              "businessKey"
            );
          }
        });
        this.newProgressDialogItems[0].children.map(searchItem => {
          if (searchItem.name == "asmSchemeId") {
            searchItem.data = this.$globalFnc.arrayToFormDropdown(
              xhr,
              "name",
              "businessKey"
            );
          }
        });
        this.updateProgressDialogItems[1].children.map(searchItem => {
          if (searchItem.name == "asmSchemeId") {
            searchItem.data = this.$globalFnc.arrayToFormDropdown(
              xhr,
              "name",
              "businessKey"
            );
          }
        });
        this.checkProgressDialogItems[1].children.map(searchItem => {
          if (searchItem.name == "asmSchemeId") {
            searchItem.data = this.$globalFnc.arrayToFormDropdown(
              xhr,
              "name",
              "businessKey"
            );
          }
        });
        resolve();
      });
    });
  }
};
export default methods;
