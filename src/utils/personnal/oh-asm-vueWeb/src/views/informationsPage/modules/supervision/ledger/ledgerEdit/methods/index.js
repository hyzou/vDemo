export default {
  initPageData(options) {
    this.searchFormGroupSettings.formGroupList.map(item => {
      if (item.name == "assessedOrgId" || item.name == "manageOrgId") {
        item.hideItem = true;
      }
    });
    let defaultdatas = this.$globalFnc.deepCopy(
      this.searchFormGroupSettings.formGroupValues
    );
    if (options) {
      Object.assign(defaultdatas, options);
    }
    this.handleSearchButtons(
      { postUrl: "getAllStandList_supervision" },
      defaultdatas
    );
  },
  // 搜索
  handleSearchButtons(btns, formData) {
    let options = {
      vm: this
    };
    if (formData.reportDate) {
      formData.reportDate = formData.reportDate.join(" - ");
    }
    formData.page = this.paginationSettings.currentPage;
    formData.rows = this.$global.paginationOption.numberPerpage;
    formData.type = this.$global.SCHME_TYPE[this.kpiType];
    formData.manageOrgId = this.$store.getters["user/userInfos"].orgId;
    this.$searchformBtnAction(btns, formData, options).then(data => {
      this.asmSchemeId = formData.asmSchemeId;
      this.setTableList(data);
    });
  },
  handleStandDialogForm(btns, formData) {
    let _this = this;
    if (btns.flag === "saveSubmit") {
      this.$confirm("确认提交本条考核任务完成进展情况吗？", "提交", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (btns.flag === "saveSubmit" || btns.flag === "saveStuff") {
          formData.status = btns.flag === "saveSubmit" ? "1" : "0";
          if (formData.implKpiVars && formData.implKpiVars.length > 0) {
            formData.implKpiVars.map(varItem => {
              varItem.kpiVarDistrictImplDetails = [];
              formData.kpiVarDistrictImplDetails.map(detailItem => {
                this.orglist.map(org => {
                  if (org.orgid == detailItem.district) {
                    detailItem.district__dsp = org.orgname.replace(
                      /考核办/g,
                      ""
                    );
                  }
                });
                if (varItem.asmSchemeKpiAllotId == detailItem.implKpiVarId) {
                  varItem.kpiVarDistrictImplDetails.push(detailItem);
                }
              });
            });
          }
          let text = btns.flag === "saveSubmit" ? "提交成功" : "保存成功";
          let url = _this.progressIsInsert
            ? _this.$api.insertProgressInfo_supervision
            : _this.$api.updateProgressInfo_supervision;
          //新增
          if (_this.progressIsInsert) {
            _this.$postData(url, formData, true).then(xhr => {
              if (xhr && xhr.success === true && xhr.data) {
                if (formData.fbFiles.length === 0) {
                  _this.$message({
                    message: text,
                    type: "success"
                  });
                  _this.initPageData();
                  return;
                }
                formData.asmShemeImplKpiId = xhr.data.asmShemeImplKpiId;
                _this.uploadFiles(formData).then(() => {
                  _this.$message({
                    message: text,
                    type: "success"
                  });
                  _this.initPageData();
                });
              }
            });
          } else {
            //修改
            _this
              .$postData(url, formData, true)
              .then(xhr => {
                if (xhr && xhr.success === true && xhr.data) {
                  _this
                    .deleteFiles(_this.removeFileList)
                    .then(() => {
                      _this
                        .uploadFiles(formData)
                        .then(() => {
                          _this.$message({
                            message: text,
                            type: "success"
                          });
                          _this.initPageData();
                        })
                        .catch();
                    })
                    .catch();
                }
              })
              .catch();
          }
          _this.standDialogFormSettings.dialogFormVisible = false;
        }
      });
    }
  },
  uploadFiles(data) {
    let _this = this;
    return new Promise(resolve => {
      if (data.fbFiles && data.fbFiles.length > 0) {
        let uploadForm = new FormData();
        data.fbFiles.forEach(files => {
          uploadForm.append("fbFiles", files.raw);
        });
        uploadForm.append("asmShemeImplKpiId", data.asmShemeImplKpiId);
        _this
          .$postData(this.$api.uploadFile_supervision, uploadForm, true)
          .then(xhr => {
            if (xhr) {
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
      if (removeList && removeList.length > 0) {
        let formData = [];
        removeList.forEach(file => {
          formData.push(file.fileId);
        });
        _this
          .$postData(this.$api.removeFile_supervision, formData, true)
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
  handleRemoveFiles(fileId) {
    this.removeFileList.push(fileId);
  },
  handleDistributeDialogForm(btns, formData) {
    formData.type = this.$global.SCHEME_KPIASSIGN_TYPE_MO;
    formData.assessedOrgId = formData.officeDepartmentId;
    formData.deleteAssignIds = this.assedLeaderDepId.split(",");
    let url = formData.asmSchemeKpiAssignId
      ? this.$api.updateKpiDistribution_supervision
      : this.$api.kpiDistribution_supervision;
    this.$postData(url, formData).then(xhr => {
      if (xhr && xhr.success === true) {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.initPageData();
      }
    });
    this.distributeDialogFormSettings.dialogFormVisible = false;
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
  },
  // 表格按钮
  handleTableRowButton(row, btn) {
    this.removeFileList = [];
    let rowData = JSON.parse(JSON.stringify(row));
    this.assedLeaderDepId = rowData.officeDepartmentId
      ? rowData.officeDepartmentId
      : "";
    this.fillStandDialogItems.map(item => {
      if (item.name == "taskProgressDetail") {
        item.children.map(taskItem => {
          if (taskItem.name == "kpiVarDistrictImplDetails") {
            if (rowData.initKpiVars && rowData.initKpiVars.length > 0) {
              taskItem.hideItem = false;
              let droplist = this.$globalFnc.deepCopy(rowData.initKpiVars);
              taskItem.headers.map(hItem => {
                if (hItem.key == "implKpiVarId") {
                  hItem.data = this.$globalFnc.arrayToFormDropdown(
                    droplist,
                    "name",
                    "asmSchemeKpiAllotId",
                    true
                  );
                }
              });
            } else {
              taskItem.hideItem = true;
            }
          }
          if (taskItem.name == "implKpiVars") {
            if (rowData.initKpiVars && rowData.initKpiVars.length > 0) {
              taskItem.hideItem = false;
            } else {
              taskItem.hideItem = true;
            }
          }
        });
      }
    });
    if (btn.type === "edit") {
      this.fillStandDialogItems.map(item => {
        if (item.name === "spotCheckBase") {
          item.children.map(subItem => {
            if (subItem.name === "kpiIndextree") {
              subItem.treeSettings.treeData = [rowData.treeNode];
            }
            return subItem;
          });
        }
        return item;
      });
      //如果存在未提交的落实数据
      rowData.kpiVarDistrictImplDetails = []; //指标数据项明细
      if (rowData.implProgressesStuff && rowData.implProgressesStuff[0]) {
        rowData = Object.assign(rowData, { ...rowData.implProgressesStuff[0] });
        rowData.implKpiVars = Object.assign(
          rowData.initKpiVars,
          rowData.implProgressesStuff[0].implKpiVars
        );
        this.progressIsInsert = false;
      } else {
        // rowData.implKpiVars = rowData.initKpiVars;
        if (rowData.implProgresses && rowData.implProgresses.length > 0) {
          rowData.implProgresses.map(progItem => {
            if (progItem.currentImpl) {
              if (progItem.implKpiVars && progItem.implKpiVars.length > 0) {
                rowData.implKpiVars = progItem.implKpiVars;
                progItem.implKpiVars.map(kpiVar => {
                  if (
                    kpiVar.kpiVarDistrictImplDetails &&
                    kpiVar.kpiVarDistrictImplDetails.length > 0
                  ) {
                    kpiVar.kpiVarDistrictImplDetails.map(detailItem => {
                      detailItem.implKpiVarId = kpiVar.asmSchemeKpiAllotId;
                    });
                    rowData.kpiVarDistrictImplDetails = rowData.kpiVarDistrictImplDetails.concat(
                      kpiVar.kpiVarDistrictImplDetails
                    );
                  }
                });
              } else {
                rowData.implKpiVars = [];
              }
            }
          });
        } else {
          rowData.implKpiVars =
            rowData.initKpiVars && rowData.initKpiVars.length > 0
              ? rowData.initKpiVars
              : [];
        }
        this.progressIsInsert = true;
      }
      rowData.implKpiVars.map($subItem => {
        if ($subItem.unit) {
          $subItem.name = `${$subItem.name}(${$subItem.unit})`;
        }
        return $subItem;
      });
      rowData.type = this.$global.SCHME_TYPE[this.kpiType];
      rowData.asmSchemeId = this.asmSchemeId;
      this.standDialogFormSettings.dialogFormItems.formGroupValues = rowData;
      this.standDialogFormSettings.dialogFormVisible = true;
    } else if (btn.type === "distribute") {
      this.distributeDialogFormSettings.dialogFormItems.formGroupList.map(
        item => {
          if (item.name === "spotCheckBase") {
            item.children.map(subItem => {
              if (subItem.name === "kpiIndextree") {
                subItem.treeSettings.treeData = [rowData.treeNode];
              }
              return subItem;
            });
          }
          return item;
        }
      );
      this.distributeDialogFormSettings.dialogFormItems.formGroupList.map(
        item => {
          if (item.name === "spotCheckBase") {
            item.children.map(subItem => {
              if (subItem.name === "kpiIndextree") {
                subItem.treeSettings.treeData = [rowData.treeNode];
              }
              return subItem;
            });
          }
          return item;
        }
      );
      this.distributeDialogFormSettings.dialogFormItems.formGroupValues = rowData;
      this.distributeDialogFormSettings.dialogFormVisible = true;
    }
  },
  /**
   * 点击分页器页码
   */
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  /**
   * 获取方案列表
   */
  getSchemList() {
    return new Promise(resolve => {
      this.$getData(this.$api.getSchemDropdownlist_supervision, {
        assessType: this.$global.SCHME_TYPE[this.kpiType],
        running: true
      }).then(xhr => {
        this.searchFormGroupSettings.formGroupValues.asmSchemeId =
          xhr[0].businessKey || "";
        this.searchFormGroupSettings.formGroupList.map(searchItem => {
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
  },
  getOrgslist() {
    return new Promise(reslove => {
      this.$getData(this.$api.getNextLevelOrgSelect, {
        orgid: this.$store.getters["user/userInfos"].assess
      }).then(res => {
        let allOrglist = this.$globalFnc.deepCopy(res);
        if (allOrglist.length > 0) {
          this.fillStandDialogItems.map(item => {
            if (item.name == "taskProgressDetail") {
              item.children.map(taskItem => {
                if (taskItem.name == "kpiVarDistrictImplDetails") {
                  taskItem.headers.map(hItem => {
                    if (hItem.key == "district") {
                      hItem.data = this.$globalFnc.arrayToFormDropdown(
                        allOrglist,
                        "orgname",
                        "orgid"
                      );
                    }
                  });
                }
              });
            }
          });
        }
        reslove(allOrglist);
      });
    });
  },
  getDeplist() {
    this.$getData(this.$api.dictList, {
      _refKey: "org",
      orgtypeid: "203",
      parentorgid: this.$store.getters["user/userInfos"].orgId,
      status: "1"
    }).then(res => {
      this.dispatchLeaderOfficeDialogItems.map(item => {
        if (item.name === "assignLeadOffice") {
          item.children.map(subItem => {
            if (subItem.name === "officeDepartmentId") {
              subItem.data = this.$globalFnc.arrayToFormDropdown(
                res,
                "text",
                "value"
              );
            }
            return subItem;
          });
        }
        return item;
      });
    });
  },
  /**
   * 格式化数据
   */
  setTableList(data) {
    let list = [];
    if (data && data.rows && data.rows instanceof Array) {
      data.rows.forEach(item => {
        item.assessedOrgId__dsp = item.assessedOrgId__dsp.replace(
          /考核办/g,
          ""
        );
        //TODO 从返回数据中解析出不同用户对应的
        item.finished__dsp =
          item.finished && item.finished == "Y" ? "已完成" : "未完成";
        if (item.manageOrg && item.manageOrg.assessedOrgId__dsp) {
          //省牵头部门
          item.provinceLeadDepartment = item.manageOrg.assessedOrgId__dsp;
        }
        if (item.subManageOrg && item.subManageOrg.assessedOrgId__dsp) {
          //牵头部门
          item.cityLeadDepartment__dsp = item.subManageOrg.assessedOrgId__dsp;
          item.cityLeadDepartmentId = item.subManageOrg.assessedOrgId;
        }
        if (item.offiManageOrg && item.offiManageOrg.assessedOrgId) {
          item.asmSchemeKpiAssignId = item.offiManageOrg.asmSchemeKpiAssignId;
          //责任处室
          item.officeDepartmentId = item.offiManageOrg.assessedOrgId;
        }
        // item.index = Math.random()
        item.option = [];
        item.option.push({
          type: "edit",
          styleType: "text",
          text: "新增进度",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-edit-outline",
          isIcon: true
        });
        // TODO 需判断是否已分配过
        if (this.$store.getters["user/userInfos"].orgType !== "OFFICE") {
          item.option.push({
            type: "distribute",
            styleType: "text",
            text: "分配处室",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-set-up",
            isIcon: true
          });
        }
        item.implProgressesStuff = []; //保存为草稿的
        item.implProgressesSubmit = []; //已提交的
        if (item.implProgresses && item.implProgresses.length > 0) {
          item.implProgresses.forEach(subItem => {
            item.asmShemeImplKpiId = subItem.asmShemeImplKpiId
              ? subItem.asmShemeImplKpiId
              : "";
            //处理展开项数据
            subItem.finishedText =
              subItem.finished == "Y" ? "已完成" : "未完成"; //任务落实情况
            subItem.progressFiles =
              subItem.fbFile && subItem.fbFile.length > 0 ? subItem.fbFile : []; //任务落实依据
            subItem.progressDate = subItem.implDt; //任务落实时间
            subItem.implKpiVars.map($subItem => {
              if ($subItem.unit) {
                $subItem.targetName = `${$subItem.name}(${$subItem.unit})`;
              }
              return $subItem;
            });
            subItem.progressVars = subItem.implKpiVars; //任务落实数据项
            subItem.status == "1"
              ? item.implProgressesSubmit.push(subItem)
              : item.implProgressesStuff.push(subItem);
          });
        }
        list.push(item);
      });
    }
    this.tablelistSettings.tableDatas = list;
    this.paginationSettings.totalNumbers = data.total || 0;
    this.removeFileList = [];
  }
};
