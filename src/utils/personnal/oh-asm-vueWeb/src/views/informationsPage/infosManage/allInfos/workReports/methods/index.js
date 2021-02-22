const methods = {
  /**
   * 搜索栏数据筛选
   * @params:{}
   */
  handleSearchSubmit(btns, formData) {
    this.getTableData(btns, formData);
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
    if (data.flag == "newInfo") {
      this.dialogFormSettings.dialogFormTitle = "新建信息";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addInfoFormBtns;
      this.dialogFormSettings.dialogFormItems.formGroupList.map(item => {
        if (item.name === "cmsChannelId") {
          item.data = this.channelList;
        } else if (item.name === "level") {
          item.data = this.levelList;
        }
        return item;
      });
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.dialogFormSettings.dialogFormVisible = true;
    }
  },
  /**
   * 删除文件事件回调
   */
  handleRemoveFiles(file) {
    this.deleteFileList.push(file.fileId);
  },
  /**
   * 编辑信息对话框点击事件
   */
  handleDialogForm(btn, formData) {
    let _this = this;
    if (btn.flag === "saveEdit" || btn.flag === "savePublish") {
      //保存和发布
      btn.flag === "savePublish" ? (formData.status = "2") : void 0; //如果是送审按钮则需要修改该条记录的status状态
      let message = btn.flag === "savePublish" ? "送审成功" : "保存成功";
      _this
        .$postData(this.$api[btn.postUrl], formData)
        .then(xhr => {
          if (xhr && xhr.success === true && xhr.data) {
            formData.cmsContentId = xhr.data.cmsContentId;
            _this
              .deleteFiles(this.deleteFileList)
              .then(() => {
                _this
                  .uploadFiles(formData)
                  .then(() => {
                    _this.$message({
                      message: message,
                      type: "success"
                    });
                    this.getTableData();
                  })
                  .catch();
              })
              .catch();
          }
        })
        .catch();
    } else if (btn.flag === "saveAdd") {
      //保存草稿
      formData.status = 1;
      _this.$postData(this.$api[btn.postUrl], formData).then(xhr => {
        if (xhr && xhr.success === true && xhr.data) {
          if (formData.fbFiles.length === 0) {
            _this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getTableData();
            return;
          }
          formData.cmsContentId = xhr.data.cmsContentId;
          this.uploadFiles(formData).then(() => {
            _this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getTableData();
          });
        }
      });
    }
    this.dialogFormSettings.dialogFormVisible = false;
  },
  uploadFiles(data) {
    let _this = this;
    return new Promise(resolve => {
      if (data.fbFiles && data.fbFiles.length > 0) {
        let uploadForm = new FormData();
        data.fbFiles.forEach(files => {
          uploadForm.append("fbFiles", files.raw);
        });
        uploadForm.append("relationId", data.cmsContentId);
        uploadForm.append("overwritten", false);
        uploadForm.append("groupId", "CMS_CONTENT"); //门户信息这个字段确定
        _this
          .$postData(this.$api.fileUpload_infosManageApi, uploadForm, true)
          .then(xhr => {
            if (xhr && xhr instanceof Array) {
              resolve();
            }
          });
      } else {
        resolve();
      }
    });
  },
  deleteFiles(removeList) {
    let _this = this;
    return new Promise(resolve => {
      if (removeList.length > 0) {
        _this
          .$postData(this.$api.cmsContentRemoveFile_infosManageApi, {
            fileIds: removeList
          })
          .then(xhr => {
            if (xhr && xhr.success === true) {
              resolve();
            }
          });
      } else {
        resolve();
      }
    });
  },
  /**
   * table 标题栏点击事件
   */
  handleTableItem(id, type, row) {
    this.$router.push({
      path: "/informationsPage/infosManage/infosManageDetail",
      query: {
        cmsContentId: row.cmsContentId,
        fromPage: this.$route.fullPath
      }
    });
  },
  /**
   * table 按钮点击事件
   */
  handleTableRowButton(rowData, btn) {
    this.deleteFileList = [];
    if (btn.type == "delete") {
      this.$confirm("您确定要删除当前信息吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(confirm => {
          this.$postData(this.$api.cmsContentRemove_infosManageApi, {
            cmsContentId: rowData.cmsContentId
          }).then(xhr => {
            if (xhr && xhr.success === true) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getTableData();
            }
          });
        })
        .catch();
    } else if (btn.type == "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑信息";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editInfoFormBtns;
      let row = this.$globalFnc.deepCopy(rowData);
      row.newFiles = row.files;
      this.dialogFormSettings.dialogFormItems.formGroupList.map(item => {
        if (item.name === "cmsChannelId") {
          item.data = this.channelList;
        } else if (item.name === "level") {
          item.data = this.levelList;
        }
        return item;
      });
      this.dialogFormSettings.dialogFormItems.formGroupValues = row;
      this.dialogFormSettings.dialogFormVisible = true;
    } else if (btn.type === "checkOut") {
      this.$router.push({
        path: "/informationsPage/infosManage/infosManageDetail",
        query: {
          cmsContentId: rowData.cmsContentId,
          fromPage: this.$route.fullPath,
          checkout: true
        }
      });
    }
  },
  /**
   * 点击分页器页码
   */
  handlePaginationPagenumber(num) {
    this.tablelistSettings.tableDatas = [];
    this.page = num;
    this.getTableData();
  },
  /**
   * 切换地址触发回调
   */
  getRouteName(name) {
    return new Promise(relsove => {
      if (name === "myIssue" || name === "myCheckout") {
        this.formGroupSettings.formGroupList = this.$globalFnc.deepCopy(
          this.workReportsSearchMyItems
        );
        if (name === "myIssue") {
          this.tablelistSettings.tableSettingOptions.headerOptions = this.$globalFnc.deepCopy(
            this.workReportsTableHeaderMy
          );
        } else if (name === "myCheckout") {
          this.tablelistSettings.tableSettingOptions.headerOptions = this.$globalFnc.deepCopy(
            this.workReportsTableHeaderCheck
          );
        }
        this.formGroupSettings.formGroupList.map(item => {
          if (item.name == "cmsChannelId") {
            item.hideItem = false;
          }
        });
        this.tablelistSettings.tableSettingOptions.headerOptions.push({
          prop: "operateBtns",
          lable: "操作",
          sortForbid: true,
          propType: "operateBtns",
          width: "200"
        });
        if (name == "myIssue") {
          this.operateButtonsSettings.buttonListData.unshift({
            flag: "newInfo",
            size: "small",
            icon: "",
            label: "新建信息",
            styleType: "primary",
            postUrl: ""
          });
        }
      } else {
        this.formGroupSettings.formGroupList.map(item => {
          if (item.name == "cmsChannelId") {
            //栏目下拉选项
            item.hideItem = true;
          }
          return item;
        });
      }
      this.titles.tableTitle = this.titlesManage[name];
      relsove(name);
    });
  },
  getChannelAndLevelList() {
    this.$getData(this.$api.cmsChannelList_infosManageApi, {
      disabled: "N"
    }).then(list => {
      if (list && list.data instanceof Array) {
        this.channelList = list.data.map(item => {
          return {
            value: item.cmsChannelId,
            label: item.name
          };
        });
      }
      this.formGroupSettings.formGroupList.map(item => {
        if (item.name === "cmsChannelId") {
          item.data = this.channelList;
        }
        return item;
      });
    });
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "cms_content_level"
    })
      .then(list => {
        if (list && list instanceof Array) {
          this.levelList = list.map(item => {
            return {
              value: item.value,
              label: item.text
            };
          });
        }
        this.formGroupSettings.formGroupList.map(item => {
          if (item.name === "level") {
            item.data = this.levelList;
          }
          return item;
        });
      })
      .catch();
  },
  setTableList(data) {
    let list = [];
    let name = this.routeName;
    if (data && data.rows && data.rows instanceof Array) {
      let statusMap = {
        "1": "草稿",
        "2": "已送审",
        "3": "未通过",
        "6": "已发布",
        "9": "归档"
      };
      data.rows.forEach(item => {
        item.statusText = statusMap[item.status];
        item.operateBtns = [];
        if (name === "stuff" || name === "myIssue") {
          if (item.status == "1" || item.status == "3") {
            item.operateBtns.push({
              text: "编辑",
              type: "edit",
              class: "text-primary fontSize20 mr10",
              icon: "el-icon-edit-outline",
              isIcon: true
            });
          }
          item.operateBtns.push({
            text: "删除",
            type: "delete",
            class: "text-primary fontSize20",
            icon: "el-icon-delete",
            isIcon: true
          });
        }
        if (name === "myCheckout") {
          item.operateBtns.push({
            text: "审核",
            type: "checkOut",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-finished",
            isIcon: true
          });
        }
        list.push(item);
      });
    }
    this.tablelistSettings.tableDatas = list;
    this.paginationSettings.totalNumbers = data.total || 0;
  },
  getTableData(btns, formData) {
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.page,
      rows: this.$global.paginationOption.numberPerpage,
      sort: "updated",
      order: "desc"
    };
    let btnsObj = btns || {
      postUrl: "getContentList_infosManageApi"
    };
    let formDataObj = Object.assign(baseForm, formData);
    let filterRules = [];
    if (formData) {
      if (formData.title) {
        filterRules.push({ field: "title", op: "*=", value: formData.title });
        delete formData.title;
      }
      if (formData.level) {
        filterRules.push({ field: "level", op: "=", value: formData.level });
        delete formData.level;
      }
      if (formData.publishDt) {
        filterRules.push({
          field: "updated",
          op: ">=",
          value: formData.publishDt[0]
        });
        filterRules.push({
          field: "updated",
          op: "<=",
          value: formData.publishDt[1]
        });
        delete formData.publishDt;
      }
      if (formData.cmsChannelId) {
        filterRules.push({
          field: "cmsChannelId",
          op: "=",
          value: formData.cmsChannelId + ""
        });
        delete formData.cmsChannelId;
      }
      if (formData.publishByName) {
        filterRules.push({
          field: "publishByName",
          op: "*=",
          value: formData.publishByName
        });
        delete formData.publishByName;
      }
    }
    if (this.routeName === "stuff") {
      //草稿箱
      options.status = "1";
      filterRules.push({ field: "status", op: "=", value: "1" });
    } else if (this.routeName === "myCheckout") {
      //待我审核
      options.status = "2";
      filterRules.push({ field: "status", op: "=", value: "2" });
    } else if (this.routeName === "myIssue") {
      //我的信息
      let userId = this.userId;
      options.createdBy = userId;
      filterRules.push({ field: "createdBy", op: "=", value: userId });
    } else {
      options.cmsChannelId = this.channelIdMap[this.routeName];
      if (options.cmsChannelId) {
        filterRules.push({
          field: "cmsChannelId",
          op: "=",
          value: this.channelIdMap[this.routeName]
        });
      }
      options.status = "6"; //代表已发布
      filterRules.push({ field: "status", op: "=", value: "6" });
    }
    formDataObj.filterRules = JSON.stringify(filterRules);
    if (formDataObj.publishDt) {
      delete formDataObj.publishDt;
    }
    this.tablelistSettings.tableDatas = [];
    this.$searchformBtnAction(btnsObj, formDataObj, options).then(data => {
      this.setTableList(data, options);
    });
  }
};
export default methods;
