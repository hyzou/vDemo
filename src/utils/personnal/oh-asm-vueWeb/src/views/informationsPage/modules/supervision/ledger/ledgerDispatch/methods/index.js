export default {
  /**
   * 初始化table数据
   */
  initPageData(options) {
    this.searchFormGroupSettings.formGroupList.map(item => {
      if (item.name == "assessedOrgId") {
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
    formData.assessedOrgId = this.$store.getters["user/userInfos"].orgId;
    this.asmSchemeId = formData.asmSchemeId;
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
  },
  // 表格按钮
  handleTableRowButton(row, btn) {
    let rowData = JSON.parse(JSON.stringify(row));
    this.assedLeaderDepId =
      rowData.subManageOrg && rowData.subManageOrg.assessedOrgId
        ? rowData.subManageOrg.assessedOrgId
        : "";
    if (btn.type === "check") {
      this.standDialogFormSettings.dialogFormItems.formGroupList = this.fillStandDialogItems;
      this.standDialogFormSettings.dialogFormItems.formButtonList = this.fillStandDialogBtns;
      this.standDialogFormSettings.dialogFormTitle = "落实进展查看";
      this.standDialogFormSettings.dialogFormItems.formGroupList.map(item => {
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
      if (rowData.implProgressesStuff && rowData.implProgressesStuff[0]) {
        rowData = Object.assign(rowData, { ...rowData.implProgressesStuff[0] });
        rowData.implKpiVars = Object.assign(
          rowData.initKpiVars,
          rowData.implProgressesStuff[0].implKpiVars
        );
        this.progressIsInsert = false;
      } else {
        rowData.implKpiVars = rowData.initKpiVars;
        this.progressIsInsert = true;
      }
      rowData.implKpiVars.map($subItem => {
        if ($subItem.unit) {
          $subItem.name = `${$subItem.name}(${$subItem.unit})`;
        }
        return $subItem;
      });
      this.standDialogFormSettings.dialogFormItems.formGroupValues = rowData;
      this.standDialogFormSettings.dialogFormVisible = true;
    } else if (btn.type === "dispatch") {
      this.standDialogFormSettings.dialogFormTitle = "牵头部门分配";
      this.standDialogFormSettings.dialogFormItems.formGroupList = this.dispatchLeaderDialogItems;
      this.standDialogFormSettings.dialogFormItems.formButtonList = this.dispatchLeaderDialogBtns;
      this.standDialogFormSettings.dialogFormItems.formGroupList.map(item => {
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
      this.standDialogFormSettings.dialogFormItems.formGroupValues = rowData;
      this.standDialogFormSettings.dialogFormVisible = true;
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
   * 点击对话框底部按钮
   */
  handleStandDialogForm(btns, formData) {
    if (btns.flag == "saveLeader") {
      let postObj = {
        deleteAssignIds: formData.asmSchemeKpiAssignId.split(","),
        datas: []
      };
      if (formData.cityLeadDepartmentId) {
        postObj.datas.push({
          assessedOrgId: formData.cityLeadDepartmentId,
          asmSchemeId: this.asmSchemeId,
          type: this.$global.SCHEME_KPIASSIGN_TYPE_MD,
          asmSchemeKpiId: formData.asmSchemeKpiId,
          assessOrgId: this.$store.getters["user/userInfos"].orgId
        });
      }
      if (
        formData.cityCorpDepartmentId &&
        formData.cityCorpDepartmentId.length > 0
      ) {
        formData.cityCorpDepartmentId.map(corpItem => {
          postObj.datas.push({
            assessedOrgId: corpItem,
            asmSchemeId: this.asmSchemeId,
            type: this.$global.SCHEME_KPIASSIGN_TYPE_CD,
            asmSchemeKpiId: formData.asmSchemeKpiId,
            assessOrgId: this.$store.getters["user/userInfos"].orgId
          });
        });
      }
      this.$postData(this.$api[btns.postUrl], postObj, true).then(xhr => {
        if (xhr && xhr.success === true) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.initPageData();
        }
      });
      this.standDialogFormSettings.dialogFormVisible = false;
    }
  },
  /**
   * 格式化table数据
   */
  setTableList(data) {
    let list = [];
    if (data && data.rows && data.rows instanceof Array) {
      data.rows.forEach(item => {
        item.assessedOrgId__dsp = item.assessedOrgId__dsp.replace(
          /考核办/g,
          ""
        );
        item.finished__dsp =
          item.finished && item.finished == "Y" ? "已完成" : "未完成";
        item.asmSchemeKpiAssignId = [];
        item.assessedOrgKpiId = item.asmSchemeKpiId + "" + item.assessedOrgId;
        //TODO 从返回数据中解析出不同用户对应的
        if (item.manageOrg && item.manageOrg.assessedOrgId__dsp) {
          //省牵头部门
          item.provinceLeadDepartment = item.manageOrg.assessedOrgId__dsp;
        }
        if (item.subManageOrg && item.subManageOrg.assessedOrgId__dsp) {
          //牵头部门
          item.cityLeadDepartment__dsp = item.subManageOrg.assessedOrgId__dsp;
          item.cityLeadDepartmentId = item.subManageOrg.assessedOrgId;
          item.asmSchemeKpiAssignId.push(
            item.subManageOrg.asmSchemeKpiAssignId
          );
        }
        if (item.subCooprateOrgs && item.subCooprateOrgs.length > 0) {
          //配合部门
          let corpArr = [];
          item.subCooprateOrgs.map(coopItem => {
            corpArr.push(coopItem.assessedOrgId);
            item.asmSchemeKpiAssignId.push(coopItem.asmSchemeKpiAssignId);
          });
          item.cityCorpDepartmentId = corpArr;
        }
        item.asmSchemeKpiAssignId = item.asmSchemeKpiAssignId.join(",");
        if (item.offiManageOrg && item.offiManageOrg.assessedOrgId) {
          //责任处室
          item.officeDepartmentId = item.offiManageOrg.assessedOrgId;
        }
        // item.index = Math.random()
        item.option = [];
        item.option.push(
          // {
          //   type: "check",
          //   styleType: "text",
          //   text: "查看",
          //   class: "text-primary fontSize20 mr10",
          //   icon: "el-icon-edit-outline",
          //   isIcon: true
          // },
          {
            type: "dispatch",
            styleType: "text",
            text: "分配",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-edit-outline",
            isIcon: true
          }
        );
        item.implProgressesStuff = []; //保存为草稿的
        item.implProgressesSubmit = []; //已提交的
        if (item.implProgresses && item.implProgresses.length > 0) {
          item.implProgresses.forEach(subItem => {
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
  /**
   * 获取部门列表
   */
  getDepList() {
    return new Promise(resolve => {
      this.$getData(this.$api.dictList, {
        _refKey: "org",
        orgtypeid: "202",
        parentorgid: this.$store.getters["user/userInfos"].orgId,
        status: "1"
      }).then(res => {
        this.searchFormGroupSettings.formGroupList.map(item => {
          if (item.name == "manageOrgId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res,
              "text",
              "value"
            );
          }
        });
        this.dispatchLeaderDialogItems.map(item => {
          if (item.name == "assignLeadDep") {
            item.children.map(child => {
              if (
                child.name == "cityLeadDepartmentId" ||
                child.name == "cityCorpDepartmentId"
              ) {
                child.data = this.$globalFnc.arrayToFormDropdown(
                  res,
                  "text",
                  "value"
                );
              }
            });
          }
        });
        resolve();
      });
    });
  }
};
