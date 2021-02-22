const methods = {
  initPageData(options) {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    if (options) {
      Object.assign(defaultdatas, options);
    }
    this.handleSearchFormBtn(
      { postUrl: "PageDistrictEnable_randomDistrictMng" },
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
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.addRandomItemDialogItems;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    }
    if (data.flag == "downloadPath") {
      // let url =
      //   this.$global.mainPrefix +
      //   "/" +
      //   this.$api["downloadPath_randomDistrictMng"];
      // window.location.href = url;
      // window.open(url);
      // this.$getData(this.$api["downloadPath_randomDistrictMng"], {}, true).then(
      //   res => {
      //     this.downloadFile(res);
      //   }
      // );
      this.$message.warning(
        "开始为您下载文件系统，可能需要耗费一些时间，请稍等!"
      );
      this.$postData(this.$api["createPath_randomDistrictMng"], {}, true).then(
        xhr => {
          this.$message.success("文件系统下载成功!");
        }
      );
    }
  },
  // 文件流转blob对象下载
  downloadFile(data) {
    let blob = new Blob([data]);
    let downloadElement = document.createElement("a");
    let href = window.URL.createObjectURL(blob);
    downloadElement.href = href;
    downloadElement.download = "fileName.zip";
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    window.URL.revokeObjectURL(href);
  },
  // 列表
  setTableList(data) {
    data.rows.map(item => {
      item.reportDateTime = this.$globalFnc.dateStampFormat(item.created);
      if (item.sysLevel == 2) {
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
      } else {
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
            postUrl: "removeUserDistrict_randomDistrictMng"
          }
        ];
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
      if (data.code == "330000000000") {
        data.sysParentcode = "";
      }
      if (data.sysLevel) {
        data.sysLevel += "";
      }
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
        this.$confirm("确定删除当前地区信息吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$postData(
            this.$api[btn.postUrl] + "?code=" + data.code,
            {},
            true
          ).then(() => {
            this.$message.success("操作成功！");
            this.initPageData();
          });
        });
      } else {
        this.$postData(this.$api[btn.postUrl], [data.code], true).then(() => {
          this.$message.success("操作成功！");
          this.initPageData();
        });
      }
    }
  },
  //底部分页回调函数
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  // 获取字典表
  getReflists() {
    // 地区级别下拉数据
    this.$getData(this.$api.levelSelects_randomDistrictMng, {}).then(res => {
      this.searchFormItems.map(item => {
        if (item.name == "sysLevel") {
          item.data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "text",
            "value"
          );
        }
      });
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "sysLevel") {
          item.data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "text",
            "value"
          );
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "sysLevel") {
          item.data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "text",
            "value"
          );
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "sysLevel") {
          item.data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "text",
            "value"
          );
        }
      });
    });
    // 所属地区编码下拉数据
    this.$getData(this.$api.TreeDistrictEnable_randomDistrictMng, {}).then(
      res => {
        // this.searchFormItems.map(item => {
        //   if (item.name == "sysParentcode") {
        //     item.data = res;
        //   }
        // });
        this.addRandomItemDialogItems.map(item => {
          if (item.name == "sysParentcode") {
            item.data = res;
          }
        });
        this.updateRandomItemDialogItems.map(item => {
          if (item.name == "sysParentcode") {
            item.data = res;
          }
        });
        this.checkRandomItemDialogItems.map(item => {
          if (item.name == "sysParentcode") {
            item.data = res;
          }
        });
      }
    );
  }
};
export default methods;
