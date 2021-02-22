const methods = {
  /**
   *  所有方案
   */
  getSchemeList() {
    return new Promise(reslove => {
      let params = {
        assessType: this.$global.SCHME_TYPE_YEAR
      };
      this.$getData(this.$api.getAllScheme, params).then(res => {
        reslove(res);
      });
    });
  },
  setSearchFormData() {
    this.getSchemeList().then(scheme => {
      this.searchFormSettings.formGroupList.forEach(item => {
        if (item.name === "asmSchemeId") {
          item.data = this.$globalFnc.arrayToFormDropdown(
            scheme,
            "name",
            "asmSchemeId"
          );
        }
      });
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "新增表彰项";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addRewardContentButton;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        this.$globalFnc.deepCopy(this.rewardContentItems)
      );
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.dialogFormSettings.dialogFormVisible = true;
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
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "getRewardList" }, defaultdatas);
  },
  /**
   *  搜索
   */
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
      rows: this.$global.paginationOption.numberPerpage
    };
    let btnsObj = btns || {
      postUrl: "getRewardList"
    };
    let formDataObj = Object.assign(baseForm, formData);
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btnsObj, formDataObj, options).then(data => {
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
          text: "查看",
          type: "look",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        }
      ]
    };
    let rewardList = this.$globalFnc.deepCopy(data.rows);
    this.formatData(rewardList, propObject);
    this.tableSettings.tableDatas = rewardList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      // 字段转换
      // 方案名称
      item.schemeName = item.schemeInfo.name;

      // 按钮
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      if (item.schemeInfo && item.schemeInfo.processinstStatus !== "end") {
        item[prop.name].unshift({
          text: "编辑",
          type: "edit",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-edit-outline",
          isIcon: true
        });
        item[prop.name].push({
          text: "删除",
          type: "delete",
          class: "text-danger fontSize20 mr10",
          icon: "el-icon-delete",
          isIcon: true
        });
      }
    });
  },
  //底部分页回调函数
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  /**
   * 表单change 事件
   */
  handleLinkSelect(linkName, data) {
    if (linkName === "fbFile") {
      let fileList = this.$globalFnc.deepCopy(data);
      let fileNameArr = fileList.map(fileItem => {
        let fileNameArr = fileItem.name.split(".");
        fileNameArr.splice(fileNameArr.length - 1, 1);
        return fileNameArr;
      });
      let fileName = fileNameArr.join(",");
      this.$set(
        this.dialogFormSettings.dialogFormItems.formGroupValues,
        "terms",
        fileName
      );
    }
  },
  /**
   * 表格操作按钮
   */
  handleTableRowButton(row, btns) {
    let defaultValue;
    if (btns.type === "delete") {
      // 删除
      this.$confirm("确定删除？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.deleteReward,
          [row["asmSchemeRewardId"]],
          true
        ).then(() => {
          this.$message.success("删除成功!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑表彰项";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editRewardContentButton;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        this.$globalFnc.deepCopy(this.rewardContentItems),
        "edit"
      );
    }
    if (btns.type === "look") {
      this.dialogFormSettings.dialogFormTitle = "编辑表彰项";
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancel",
          label: "关闭"
        }
      ];
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        this.$globalFnc.deepCopy(this.rewardContentItems),
        "look"
      );
    }
    this.deleteFileIds = [];
    this.$getData(this.$api.singleReward, {
      asmSchemeRewardId: row.asmSchemeRewardId
    }).then(res => {
      defaultValue = res.data;
      defaultValue.rewardFileList = defaultValue.relationFiles;
      if (defaultValue.schemeInfo) {
        defaultValue.schemeName = defaultValue.schemeInfo.name;
      }
      // 编辑赋值
      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValue;
      this.dialogFormSettings.dialogFormVisible = true;
    });
  },
  /**
   *  下拉列表赋值
   */
  setDictList(data, type) {
    return data.map(item => {
      // 赋值机构类型
      if (item.name === "asmSchemeId") {
        this.$getData(this.$api.getSchemeSelect, {
          assessType: "1",
          assessOrgId: this.$store.getters["user/userInfos"].orgId
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(
            res,
            "name",
            "asmSchemeId"
          );
        });
        // 不可以编辑方案
        if (type === "edit") {
          item.disabled = true;
        }
      }
      if (type === "look") {
        item.disabled = true;
        if (item.name === "rewardFile") {
          item.hideItem = true;
        }
        if (item.name === "rewardFileList") {
          item.fileSettings.hidedelete = true;
        }
        if (item.name === "schemeName") {
          item.hideItem = false;
        }
      }
      return item;
    });
  },
  /**
   * 删除文件事件回调
   */
  handleRemoveFiles(file) {
    this.deleteFileIds.push(file.fileId);
  },
  /**
   * 新增编辑表单组确认取消事件
   */
  handleDialogForm(button, formData) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    formData.append("deleteFileIds", this.deleteFileIds);
    this.$postData(button.postUrl, formData, true).then(() => {
      this.$message.success("保存成功!");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  }
};
export default methods;
