const methods = {
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn(
      { postUrl: "getInspectCertifyList" },
      defaultdatas
    );
  },
  /**
   *  根据搜索条件获取列表信息
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

    // 时间格式转换
    if (formData.businessDate && formData.businessDate.length) {
      formData.businessDateStart = formData.businessDate[0];
      formData.businessDateEnd = formData.businessDate[1];
    }
    // 组织机构
    // 承储单位
    let storeOrg = {};
    if (formData.storeOrgId) {
      storeOrg.storeOrgId =
        typeof formData.storeOrgId === "object"
          ? formData.storeOrgId[formData.storeOrgId.length - 1]
          : formData.storeOrgId;
    }

    let params = Object.assign({}, baseForm, formData, storeOrg);
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setTableList(data);
    });
  },
  // 格式化table数据
  setTableList(data) {
    let inspectCertifyList = this.$globalFnc.deepCopy(data.rows);
    inspectCertifyList.map(item => {
      item.businessDate_dsp = this.$globalFnc.dateStampFormat(
        new Date(item.businessDate).getTime(),
        "ymd"
      );
      // 按钮
      item.operateBtns =
        item.status !== "99"
          ? [
              {
                text: "编辑",
                type: "edit",
                class: "text-primary fontSize20 mr10",
                isIcon: true
              },
              {
                text: "送审",
                type: "submit",
                class: "text-primary fontSize20 mr10",
                isIcon: true
              },
              {
                text: "删除",
                type: "delete",
                class: "text-danger fontSize20 mr10",
                isIcon: true
              }
            ]
          : [
              {
                text: "查看",
                type: "look",
                class: "text-primary fontSize20 mr10",
                isIcon: true
              }
            ];
    });
    this.tableSettings.tableDatas = inspectCertifyList;
    this.paginationSettings.totalNumbers = data.total;
  },
  // 表单值选定修改事件
  handleChangeSelect(linkName, data) {
    // 根据组织机构获取库点列表
    if (linkName === "changeOrg" || linkName === "changeDialogOrg") {
      if (data && data.length) {
        this.getStorePointList(data[data.length - 1]).then(res => {
          let list = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
          // 搜索
          if (linkName === "changeOrg") {
            this.setGroupFormValue(this.searchFormItems, "storepointId", list);
          } else {
            this.setGroupFormValue(this.contentItems, "storepointId", list);
          }
        });
      } else {
        if (linkName === "changeOrg") {
          this.setGroupFormValue(this.searchFormItems, "storepointId", []);
        } else {
          this.setGroupFormValue(this.contentItems, "storepointId", []);
        }
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
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "新增巡查单";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addButton;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        docNo: "系统自动生成",
        created: this.$globalFnc.dateStampFormat(new Date().getTime()),
        businessDate: this.$globalFnc.dateStampFormat(
          new Date().getTime(),
          "ymd"
        ),
        type: "1",
        storeOrgId: [this.$store.getters["user/userInfos"].orgId],
        storepointId: this.$store.getters["user/userInfos"].storePointId
          ? this.$store.getters["user/userInfos"].storePointId
          : ""
      };
      this.contentItems.map(dialogItem => {
        if (dialogItem.name !== "docNo" && dialogItem.name !== "created") {
          dialogItem.disabled = false;
        }
        if (dialogItem.name === "fbFile") {
          dialogItem.hideItem = false;
        }
        if (dialogItem.name === "files") {
          dialogItem.fileSettings.hidedelete = true;
        }
        if (
          dialogItem.name == "storepointId" &&
          !this.$store.getters["user/userInfos"].storePointId
        ) {
          dialogItem.data = [];
        }
      });
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
  //首页，分页切换
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  handleTableRowButton(row, btns) {
    if (btns.type === "delete") {
      // 删除
      this.$confirm("确定删除当前巡查单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.removeInspectCertify,
          {
            emmsImplInspectId: row.emmsImplInspectId
          },
          true
        ).then(() => {
          this.$message.success("您已成功删除该巡查单!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "submit") {
      this.$confirm("请核对巡查单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.inspectCertifyStatus,
          {
            emmsImplInspectId: row.emmsImplInspectId,
            status: "99"
          },
          true
        ).then(() => {
          this.$message.success("操作成功!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "修改巡查单";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editButton;
      this.contentItems.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
        if (item.name === "files") {
          item.fileSettings.hidedelete = false;
        }
        if (item.name === "fbFile") {
          item.hideItem = false;
        }
      });
    }
    if (btns.type === "look") {
      this.contentItems.forEach(item => {
        item.disabled = true;
        if (item.name === "files") {
          item.fileSettings.hidedelete = true;
        }
        if (item.name === "fbFile") {
          item.hideItem = true;
        }
      });
      this.dialogFormSettings.dialogFormTitle = "查看巡查单";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: ""
        }
      ];
    }
    this.$getData(this.$api.singleInspectCertifyData, {
      id: row.emmsImplInspectId
    }).then(xhr => {
      this.deleteFileList = [];
      this.getStorePointList(xhr.data.storeOrgId).then(res => {
        this.contentItems.map(dialogItem => {
          if (dialogItem.name == "storepointId") {
            dialogItem.data = res;
          }
        });
      });
      xhr.data.businessDate = this.$globalFnc.dateStampFormat(
        new Date(xhr.data.businessDate).getTime(),
        "ymd"
      );
      xhr.data.created = this.$globalFnc.dateStampFormat(
        new Date(xhr.data.created).getTime()
      );
      this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
    });
    this.dialogFormSettings.dialogFormVisible = true;
  },
  /**
   * 删除文件事件回调
   */
  handleRemoveFiles(file) {
    this.deleteFileList.push(file.fileId);
  },
  /**
   * 弹框确认按钮
   */
  handleDialogForm(button, formData, data) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    // 承储单位
    let storeOrgId =
      typeof data.storeOrgId === "object"
        ? data.storeOrgId[data.storeOrgId.length - 1]
        : data.storeOrgId;
    formData.set("storeOrgId", storeOrgId);
    // 文件需不需要替换
    formData.append("overwritten", false);
    // 删除的文件
    formData.append("deleteFileList", this.deleteFileList);

    // 送审改状态
    if (button.flag === "submit") {
      this.$confirm("请核对巡查单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        formData.set("status", "99");
        this.handleSaveData(button, formData);
      });
    } else {
      formData.set("status", "1");
      this.handleSaveData(button, formData);
    }
  },
  handleSaveData(button, formData) {
    // 保存
    this.$postData(button.postUrl, formData, true).then(() => {
      this.$message.success("操作成功!");
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.deleteFileList = [];
      this.initPageData();
    });
  },
  /**
   * 获取库点
   */
  getStorePointList(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.getStorePointList_common, {
        orgid: id ? id : this.$store.getters["user/userInfos"].orgId,
        districtFlag: false
      }).then(res => {
        let data = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
        reslove(data);
      });
    });
  }
};
export default methods;
