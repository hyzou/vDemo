export default {
  /**
   * 初始化table数据
   */
  initPageData(options) {
    this.searchFormGroupSettings.formGroupList.map(item => {
      if (item.name == "manageOrgId") {
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
    } else if (data.flag === "export") {
      let obj = {
        issueNo: "1", //年度
        type: "2", //年度考核;专项考核
        code: "3", //指标的code
        assessedOrgId: "4", //市县（考核办）Id
        addtime1: "5", //落实开始日期（格式 2020-09-22）
        addtime2: "6" //落实结束日期（格式 2020-09-22）
      };
      let params = "";
      for (let key in obj) {
        params += `&${key}=${obj[key]}`;
      }
      // window.open(this.$api[btns.postUrl] + params);
      window.open(
        this.$store.getters["user/reportServerUrl"] +
          `?reportlet=AsmShemeImpl.cpt` +
          params
      );
    }
  },
  // 表格按钮
  handleTableRowButton(row, btn) {
    this.removeFileList = [];
    let rowData = JSON.parse(JSON.stringify(row));
    if (btn.type === "check") {
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
        }
        if (item.offiManageOrg && item.offiManageOrg.assessedOrgId) {
          //责任处室
          item.officeDepartmentId = item.offiManageOrg.assessedOrgId;
        }
        // item.index = Math.random()
        item.option = [];
        // item.option.push({
        //   type: "check",
        //   styleType: "text",
        //   text: "查看",
        //   class: "text-primary fontSize20 mr10",
        //   icon: "el-icon-edit-outline",
        //   isIcon: true
        // });
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
  getOrgslist() {
    return new Promise(reslove => {
      this.$getData(this.$api.dictList, {
        _refKey: "org",
        orgtypeid: "200",
        status: "1"
      }).then(res => {
        this.searchFormGroupSettings.formGroupList.map(item => {
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
  /**
   * 获取方案列表
   */
  getSchemList() {
    return new Promise(resolve => {
      this.$getData(this.$api.getSchemDropdownlist_supervision, {
        assessType: this.$global.SCHME_TYPE[this.kpiType],
        running: true
      }).then(xhr => {
        this.searchFormGroupSettings.formGroupList.map(searchItem => {
          if (searchItem.name == "asmSchemeId") {
            searchItem.data = this.$globalFnc.arrayToFormDropdown(
              xhr,
              "name",
              "businessKey"
            );
          }
        });
        setTimeout(() => {
          this.searchFormGroupSettings.formGroupValues.asmSchemeId =
            xhr[0].businessKey || "";
          resolve();
        }, 300);
      });
    });
  }
};
