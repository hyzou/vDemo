const methods = {
  /**
   * 搜索赋值
   */
  setSearchFormData() {
    this.setDictList(this.searchFormItems);
    this.searchSettings.formGroupList = this.searchFormItems;
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    let formGroupList;
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "申请加分";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.rewardFormBtns;
      formGroupList = this.$globalFnc.deepCopy(this.rewardFormItems);
      this.setDictList(formGroupList);
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      for (let key in this.dialogFormSettings.dialogFormItems.formGroupValues) {
        this.dialogFormSettings.dialogFormItems.formGroupValues[key] = "";
      }
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
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "getRewardApplyList" }, defaultdatas);
  },
  handleSearchFormBtn(btns, formData) {
    if (btns.flag === "search") {
      this.paginationSettings.currentPage = 1;
    }
    if (btns.flag === "clear") {
      this.paginationSettings.currentPage = 1;
      formData = {};
      this.searchSettings.formGroupValues = {};
    }
    let options = {
      vm: this
    };
    let params = {
      page: this.paginationSettings.currentPage,
      row: this.$global.paginationOption.numberPerpage
    };
    Object.assign(formData, params);
    this.$searchformBtnAction(btns, formData, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let rewardList = this.$globalFnc.deepCopy(data.rows);
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
    this.formatData(rewardList, propObject);
    this.tableSettings.tableDatas = rewardList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      /**
       * 值修改
       */
      // 方案信息
      if (item.scheme) {
        item.issueNo = item.scheme.issueNo;
        item.schemeName = item.scheme.name;
      }
      // 表彰项信息
      if (item.rewardInfo) {
        item.rewardName = item.rewardInfo.name;
      }
      /**
       * 按钮
       */
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 状态是0 时，还在申请填写阶段，可以编辑删除
      if (item.status === "0") {
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
          class: "text-danger fontSize20",
          icon: "el-icon-delete",
          isIcon: true
        });
      }
      if (
        item.schemeInfo.assessOrgId ===
          this.$store.getters["user/userInfos"].orgId &&
        item.status === "1"
      ) {
        item[prop.name].unshift({
          text: "审批",
          type: "approval",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        });
      }
    });
  },
  /**
   * 表格按钮点击事件
   */
  handleTableRowButton(row, btns) {
    let formGroupList, defaultValues;
    /**
     * 分配处室
     */
    if (btns.type === "delete") {
      this.$confirm("确定删除？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.removeRewardApply,
          { asmSchemeAssessRewardId: row["asmSchemeAssessRewardId"] },
          true
        ).then(() => {
          this.$message.success("删除成功!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "approval") {
      this.dialogFormSettings.dialogFormTitle = "审批";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.rewardFormApprovalBtns;
      formGroupList = this.$globalFnc.deepCopy(this.rewardFormItems);
      formGroupList.forEach(item => {
        item.disabled = true;
        if (item.name === "files") {
          item.hideItem = true;
        }
        if (item.name === "rewardFileList") {
          item.fileSettings.hidedelete = true;
        }
      });
      this.setDictList(formGroupList);
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
    }
    /**
     * 编辑
     */
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.rewardFormBtns;
      formGroupList = this.$globalFnc.deepCopy(this.rewardFormItems);
      this.setDictList(formGroupList);
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      this.dialogFormSettings.dialogFormVisible = true;
    }
    /**
     * 查看
     */
    if (btns.type === "look") {
      this.dialogFormSettings.dialogFormTitle = "查看";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancle",
          label: "关闭",
          styleType: ""
        }
      ];
      formGroupList = this.$globalFnc.deepCopy(this.rewardFormItems);
      formGroupList.forEach(item => {
        item.disabled = true;
        if (item.name === "files") {
          item.hideItem = true;
        }
        if (item.name === "rewardFileList") {
          item.fileSettings.hidedelete = true;
        }
      });
      this.setDictList(formGroupList);
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
    }
    /**
     * 查看意见和填写意见的默认值
     */
    this.deleteFileList = [];
    if (row.asmSchemeAssessRewardId) {
      this.$getData(this.$api.loadRewardApplyData, {
        id: row.asmSchemeAssessRewardId
      }).then(res => {
        // 获取回显信息
        defaultValues = res.data;
        // 方案
        defaultValues.asmSchemeId = res.data.assessedInfo.asmSchemeId;
        // 被考核市县
        defaultValues.assessedOrgId = res.data.assessedInfo.assessedOrgId;
        // 表彰项
        defaultValues.asmSchemeRewardId = res.data.rewardInfo.asmSchemeRewardId;
        // 上传文件
        defaultValues.rewardFileList = res.data.relationFiles;
        this.handleLinkSelect("scheme", defaultValues.asmSchemeId);
        this.handleLinkSelect("assessedOrg", defaultValues.assessedOrgId);
        this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;

        setTimeout(() => {
          this.dialogFormSettings.dialogFormVisible = true;
        }, 300);
      });
    }
  },
  /**
   * 弹框内容赋值
   */
  // 方案
  getSchemeList() {
    return new Promise(reslove => {
      let params = {
        running: true,
        assessType: this.$global.SCHME_TYPE_YEAR
      };
      this.$getData(this.$api.getSchemeSelect, params).then(res => {
        reslove(res);
      });
    });
  },
  // 被考核市县
  getAssessedOrg(id) {
    return new Promise(resolve => {
      this.$getData(this.$api.getSchemeAssessedRef, {
        asmSchemeId: id
      }).then(result => {
        resolve(result);
      });
    });
  },
  // 表彰单位
  getRewardOrg(id) {
    return new Promise(resolve => {
      this.$getData(this.$api.dictList, {
        _refKey: "org",
        orgtypeid: "202",
        parentorgid: id,
        status: "1"
      }).then(res => {
        resolve(res);
      });
    });
  },
  // 表彰项
  getRewardSelect(id) {
    return new Promise(resolve => {
      this.$getData(this.$api.getRewardSelect, {
        asmSchemeId: id
      }).then(result => {
        resolve(result);
      });
    });
  },
  setDictList(data) {
    // 获取到方案
    this.getSchemeList().then(scheme => {
      // 把数据塞进 数组里
      this.setFormListData(
        data,
        "asmSchemeId",
        this.$globalFnc.arrayToFormDropdown(scheme, "name", "asmSchemeId", true)
      );
    });
  },
  handleLinkSelect(linkName, data) {
    let formGroupList;
    /**
     *  弹框的方案 和 搜索区域的方案
     */
    if (linkName === "scheme") {
      formGroupList = this.dialogFormSettings.dialogFormItems.formGroupList;
      // 切换方案时， 清空选择的 被考核市县 ， 表彰单位， 表彰项
      for (let key in this.dialogFormSettings.dialogFormItems.formGroupValues) {
        if (
          key === "assessedOrgId" ||
          key === "mainOrgId" ||
          key === "asmSchemeRewardId"
        ) {
          this.dialogFormSettings.dialogFormItems.formGroupValues[key] = "";
        }
      }
    }
    if (linkName === "searchScheme") {
      formGroupList = this.searchSettings.formGroupList;
      // 切换方案时， 清空选择的 被考核市县 ， 表彰单位， 表彰项
      for (let key in this.searchSettings.formGroupValues) {
        if (
          key === "assessedOrgId" ||
          key === "mainOrgId" ||
          key === "asmSchemeRewardId"
        ) {
          this.searchSettings.formGroupValues[key] = "";
        }
      }
    }
    if (linkName === "scheme" || linkName === "searchScheme") {
      // 被考核市县
      this.getAssessedOrg(data).then(assessdOrg => {
        this.assessdOrgList = assessdOrg.data;
        this.setFormListData(
          formGroupList,
          "assessedOrgId",
          this.$globalFnc.arrayToFormDropdown(
            assessdOrg.data,
            "assessedOrgId__dsp",
            "assessedOrgId"
          )
        );
      });
      // 表彰项
      this.getRewardSelect(data).then(reward => {
        this.setFormListData(
          formGroupList,
          "asmSchemeRewardId",
          this.$globalFnc.arrayToFormDropdown(
            reward.data,
            "name",
            "asmSchemeRewardId",
            true
          )
        );
      });
    }

    /**
     *  弹框的被考核市县 和 搜索区域的被考核市县
     */
    if (linkName === "assessedOrg") {
      formGroupList = this.dialogFormSettings.dialogFormItems.formGroupList;
      this.dialogFormSettings.dialogFormItems.formGroupValues.mainOrgId = "";
    }
    if (linkName === "searchAssessdOrg") {
      formGroupList = this.searchSettings.formGroupList;
      this.searchSettings.formGroupValues.mainOrgId = "";
    }
    if (linkName === "assessedOrg" || linkName === "searchAssessdOrg") {
      // 切换被考核市县， 清空选择的表彰单位
      this.getRewardOrg(data).then(rewardOrg => {
        this.setFormListData(
          formGroupList,
          "mainOrgId",
          this.$globalFnc.arrayToFormDropdown(rewardOrg, "text", "value", true)
        );
      });
    }
  },
  setFormListData(array, name, value) {
    array.forEach(item => {
      if (item.name === name) {
        item.data = value;
      }
    });
  },
  /**
   * 删除文件事件回调
   */
  handleRemoveFiles(file) {
    this.deleteFileList.push(file.fileId);
  },
  /**
   * 弹框 按钮
   */
  handleDialogForm(btns, formData) {
    if (btns.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    if (
      btns.flag === "save" ||
      btns.flag === "submit" ||
      btns.flag === "agree" ||
      btns.flag === "disagree"
    ) {
      // 有id说明填写过申请，是更新，没有是新增
      if (formData.get("asmSchemeAssessRewardId")) {
        btns.postUrl = "_data/schemeAssess/reward/update";
      } else {
        btns.postUrl = "_data/schemeAssess/reward/insert";
      }
    }
    // 文件需不需要替换
    formData.append("overwritten", false);
    // 删除的文件
    formData.append("deleteFileIds", this.deleteFileList);
    // 被考核市县
    this.assessdOrgList.forEach(item => {
      if (item.assessedOrgId === formData.get("assessedOrgId")) {
        formData.append("asmSchemeAssessedId", item.asmSchemeAssessedId);
      }
    });
    // 同意状态
    switch (btns.flag) {
      case "agree":
        this.$confirm("请仔细核对内容，提交后不能再做任何修改", "确认通过", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            formData.set("status", "2");
            this.handleSubmitData(btns.postUrl, formData);
          })
          .catch(() => {});
        break;
      case "disagree":
        this.$confirm("请仔细核对内容，提交后不能再做任何修改", "确认不通过", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            formData.set("status", "3");
            this.handleSubmitData(btns.postUrl, formData);
          })
          .catch(() => {});
        break;
      case "submit":
        // 提交
        this.$confirm("请仔细核对内容，提交后不能再做任何修改", "提交", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            formData.set("status", "1");
            this.handleSubmitData(btns.postUrl, formData);
          })
          .catch(() => {});
        break;
      default:
        this.handleSubmitData(btns.postUrl, formData);
        break;
    }
  },
  handleSubmitData(url, data) {
    this.$postData(url, data, true).then(() => {
      this.$message.success("保存成功！");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  }
};
export default methods;
