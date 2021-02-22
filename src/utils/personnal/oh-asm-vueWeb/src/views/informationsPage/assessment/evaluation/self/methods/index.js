const methods = {
  /**
   * 获取方案
   */
  getSchemeList() {
    return new Promise(reslove => {
      let schemeParams = {
        assessedOrgId: this.$store.getters["user/userInfos"].assess,
        assessType: this.pageType,
        running: true
      };
      this.$getData(this.$api.getSchemeSelect, schemeParams).then(res => {
        reslove(res);
      });
    });
  },
  /**
   * 搜索赋值
   */
  setSearchFormData() {
    this.searchSettings.formGroupList = this.$globalFnc.deepCopy(
      this.searchFormItems
    );
    // 方案下拉赋值
    this.getSchemeList().then(res => {
      if (res && res.length) {
        this.searchSettings.formGroupList.forEach(item => {
          if (item.name === "asmSchemeId") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res,
              "name",
              "asmSchemeId"
            );
          }
        });
        // 默认第一条方案
        this.searchSettings.formGroupValues.asmSchemeId = res[0].asmSchemeId;
        // 获取列表数据
        this.initPageData();
      }
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
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
    this.handleSearchFormBtn({ postUrl: "selfList" }, defaultdatas);
  },
  handleSearchFormBtn(btns, formData) {
    this.tableSettings.tableDatas = [];
    if (btns.flag === "search") {
      this.paginationSettings.currentPage = 1;
    }
    if (btns.flag === "clear") {
      this.paginationSettings.currentPage = 1;
      formData = {};
      this.searchSettings.formGroupValues = {};
    }
    if (!formData.asmSchemeId) {
      this.$message.error("需选择考核方案");
      return;
    }
    let options = {
      vm: this
    };
    let params = {
      page: this.paginationSettings.currentPage,
      row: this.$global.paginationOption.numberPerpage,
      code: this.pageType
    };
    Object.assign(formData, params);
    this.$searchformBtnAction(btns, formData, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let selfList = this.$globalFnc.deepCopy(data.rows);
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "查看",
          type: "lookDetail",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        }
      ]
    };
    this.formatData(selfList, propObject);
    this.tableSettings.tableDatas = selfList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      /**
       * 值修改
       */
      // 自评信息
      if (item["selfAssess"] && item["selfAssess"].shemeAssessKpi) {
        for (let key in item["selfAssess"].shemeAssessKpi) {
          item[key] = item["selfAssess"]["shemeAssessKpi"][key];
        }
      }
      // 被考核机构
      if (item.assessdOrg) {
        item.orgname = item.assessdOrg.orgname;
      }
      // 方案信息
      if (item["scheme"]) {
        item.issueNo = item["scheme"].issueNo;
        item.schemeName = item["scheme"].name;
      }
      // 方案指标信息
      if (item.schemeKpi) {
        item.asmSchemeKpiId = item["schemeKpi"].asmSchemeKpiId;
      }
      // 方案流程信息
      if (item.assess) {
        item.asmShemeAssessId = item["assess"].asmShemeAssessId;
      }
      if (item.kpi) {
        item["asmKpiId"] = item.kpi.asmKpiId;
        item["kpiName"] = item.kpi.name;
        item["criteria"] = item.kpi.criteria;
        item["kpiScore"] = item.kpi.score;
        item["asmKpiIndexId"] = item.kpi.asmKpiIndexId;
      }
      // 状态
      if (item.assess && item.assess["status"] == "1") {
        // 如果状态是1 说明是已经上报
        item["status"] = "reported";
      } else {
        if (item["selfAssess"] && item["selfAssess"].shemeAssessKpi) {
          // 有自评信息，说明已完成自评
          item["status"] = "complete";
        } else {
          item["status"] = "incomplete";
        }
      }
      //市牵头部门
      if (item.assessdManageAssign) {
        item.assessedCityMOrgId__dsp =
          item.assessdManageAssign.assessedOrgId__dsp;
        item.assessedCityMOrgId = item.assessdManageAssign.assessedOrgId;
      }
      //市配合部门
      if (item.assessdCooprateAssign) {
        let nameList = [];
        let valueList = [];
        item.assessdCooprateAssign.forEach(cooprate => {
          nameList.push(cooprate.assessedOrgId__dsp);
          valueList.push(cooprate.assessedOrgId);
        });

        item["assessedCityCOrgId__dsp"] = nameList.join();
        item["assessedCityCOrgId"] = valueList;
      }
      // 责任处室
      if (item.assessdMOassigns) {
        let nameList = [];
        let valueList = [];
        item.assessdMOassigns.forEach(cooprate => {
          nameList.push(cooprate.assessedOrgId__dsp);
          valueList.push(cooprate.assessedOrgId);
        });
        item["assessdMOassigns__dsp"] = nameList.join();
        item["assessdMOassignsId"] = valueList;
      }
      // 市县
      item["district"] = this.$store.getters["user/userInfos"].distrinct;
      /**
       * 按钮
       */
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 处室不分配
      // 评分状态为0 说明没有提交牵头部门
      if (!item.selfAssess || item["assess"].status == "0") {
        if (this.$store.getters["user/userInfos"].orgType !== "OFFICE") {
          item.operateBtns.unshift({
            text: "分配",
            type: "assign",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-set-up",
            isIcon: true
          });
        }
        item.operateBtns.unshift({
          styleType: "primary",
          type: "self",
          text: "自评",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-tickets",
          isIcon: true
        });
      }
    });
  },
  /**
   * 分页
   */
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  /**
   * 表格按钮点击事件
   */
  handleTableRowButton(row, btns) {
    let formGroupList, defaultValues;
    /**
     * 分配责任处室
     */
    if (btns.type === "assign") {
      this.dialogFormSettings.dialogFormTitle = "分配";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.assignKpiButton;
      formGroupList = this.schemeFormItem.concat(this.assignDepartmentManage);
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
      defaultValues = this.$globalFnc.deepCopy(row);
      if (row["assessdMOassigns"] && row["assessdMOassigns"].length) {
        // 保存一下编辑前的数据
        defaultValues.old_manageOrg_MO = row["assessdMOassigns"]
          .map(item => {
            return item.asmSchemeKpiAssignId;
          })
          .join(",");
        // 回显的数据
        defaultValues.manageOrg_MO = row["assessdMOassigns"].map(item => {
          return item.assessedOrgId;
        });
      } else {
        defaultValues.manageOrg_MO = [];
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
      this.dialogFormSettings.dialogFormVisible = true;
      return;
    }
    /**
     * 自评
     */
    if (btns.type === "self") {
      //  如果有配合部门， 但是没有填意见，不可以自评
      // if (
      //   row.assessdCooprateAssign.length &&
      //   (!row["assessComments"] || !row["assessComments"].length)
      // ) {
      //   this.$message.warning("配合部门未完成意见填写,无法自评!");
      //   return;
      // }
      this.dialogFormSettings.dialogFormTitle = "自评打分";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.selfAssessFormBtns;
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.selfAssessFormItems)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"],
        "edit"
      );
    }
    /**
     * 查看详情
     */
    if (btns.type === "lookDetail") {
      //  如果有配合部门， 但是没有填意见，不可以自评
      // if (
      //   row.assessdCooprateAssign.length &&
      //   (!row["assessComments"] || !row["assessComments"].length)
      // ) {
      //   this.$message.warning("配合部门未完成意见填写,无自评信息!");
      //   return;
      // }
      this.dialogFormSettings.dialogFormTitle = "查看";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancle",
          label: "关闭",
          styleType: ""
        }
      ];
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.selfAssessFormItems)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"],
        "look"
      );
    }
    /**
     * 自评表单默认值
     */
    this.deleteFileList = [];
    defaultValues = this.$globalFnc.deepCopy(row);
    // 默认满分
    defaultValues.score = defaultValues.score
      ? defaultValues.score
      : defaultValues.kpiScore;
    // 是否减分
    defaultValues["deducted"] = row["deducted"] ? row["deducted"] : "N";
    this.handleLinkSelect("deducted", defaultValues["deducted"]);
    // 是否引用日常监督文件
    defaultValues["quoteFiles"] = "N";
    if (row.fileIds) {
      defaultValues["quoteFiles"] = "Y";
    }
    this.handleLinkSelect("quoteFiles", defaultValues["quoteFiles"]);
    // 自评日期
    defaultValues.assessDt = row["assessDt"]
      ? row["assessDt"]
      : this.$globalFnc.changeDateFormat(new Date(), "ymd");
    // 自评单位
    defaultValues.mainOrgId = this.$store.getters["user/userInfos"]["orgId"];
    // 获取列表需要的id
    let params = {
      asmSchemeKpiId: row.asmSchemeKpiId,
      asmShemeAssessId: row.asmShemeAssessId
    };
    // 责任处室打分情况
    // 责任处室id
    params.mainOrgIds = row.assessdMOassignsId;
    // 责任处室打分时候 不需要查看处室意见 ，  没有责任处室的时候，也不需要查询
    if (
      this.$store.getters["user/userInfos"].orgType !== "OFFICE" &&
      row.assessdMOassignsId &&
      row.assessdMOassignsId.length
    ) {
      this.$getData(this.$api.listAssessKpi, params).then(res => {
        let departmentAssess = res.data;
        departmentAssess.forEach(item => {
          if (item.files && item.files.length) {
            item["fileName"] = item.files.join(",");
          } else {
            item["fileName"] = " ";
          }
        });
        this.$set(defaultValues, "departmentAssessTable", departmentAssess);
      });
    }
    //配合工作情况列表
    // 市配合部门id
    params.cooperateOrgIds = row.assessedCityCOrgId;
    params.cooperateEndDate = this.$globalFnc.dateStampFormat(
      row["selfAssess"]["phase"].cooperateEndDt,
      "ymd"
    );
    // 配合处室id
    if (row["assessdCOassigns"] && row["assessdCOassigns"].length) {
      row["assessdCOassigns"].forEach(item => {
        params.cooperateOrgIds.push(item["assessedOrgId"]);
      });
    }
    delete params.mainOrgIds;
    this.$getData(this.$api.listAssessComment, params).then(res => {
      let fileList = res.data;
      fileList.forEach(item => {
        if (item.files && item.files.length) {
          item["fileName"] = item.files.join(",");
        } else {
          item["fileName"] = " ";
        }
      });
      this.$set(defaultValues, "coordinationList", fileList);
    });
    //引用日常监督文件
    this.$getData(this.$api.getFileList, {
      asmSchemeKpiId: row["asmSchemeKpiId"]
    }).then(res => {
      let fileList = res.data;
      let dailyFilesList = [],
        selectedList = [];
      fileList.forEach(item => {
        if (item.fbFile && item.fbFile.length) {
          item.fbFile.forEach(fileItem => {
            //  所有数据
            dailyFilesList.push(fileItem);
            // 选中的数据
            // 如果有自评信息的话，是更新
            if (row["asmShemeAssessKpiId"]) {
              // 如果有引入文件
              if (row.fileIds) {
                let fileIds = row.fileIds.split(",");
                fileIds.forEach(fileId => {
                  if (fileItem.fileId === fileId) {
                    selectedList.push(fileItem);
                  }
                });
              } else {
                selectedList = [];
              }
            } else {
              // 新增默认全部选中
              selectedList.push(fileItem);
            }
          });
        }
      });
      this.$set(defaultValues, "selectedList", selectedList);
      this.$set(defaultValues, "dailyFilesList", dailyFilesList);
      this.dialogFormSettings.dialogFormVisible = true;
    });
    // 获取上传的文件
    if (row.asmShemeAssessKpiId) {
      this.$getData(this.$api.loadAssessKpi, {
        asmShemeAssessKpiId: row.asmShemeAssessKpiId
      }).then(res => {
        // 获取回显信息
        this.$set(defaultValues, "files", res.data.files);
      });
    }
    this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
  },
  /**
   * 字典表的值
   */
  setDictList(data, id, type) {
    data.forEach(item => {
      // 指标类目树
      if (item.name === "kpiIndextree") {
        this.$getData(this.$api.getKpiIndexTree, { asmKpiIndexId: id }).then(
          res => {
            item.treeSettings.treeData = res;
          }
        );
      }
      // 处室
      if (item.name === "manageOrg_MO") {
        this.$getData(this.$api.dictList, {
          _refKey: "org",
          orgtypeid: "203",
          parentorgid: this.$store.getters["user/userInfos"].orgId,
          status: "1"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 机构
      if (item.name === "mainOrgId") {
        this.$getData(this.$api.dictList, {
          _refKey: "org"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 市县
      if (item.name === "district") {
        this.$getData(this.$api.dictList, { _refKey: "district2" }).then(
          res => {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res,
              "text",
              "value"
            );
          }
        );
      }
      // 年度考核任务
      if (item.name === "asmSchemeId") {
        this.$getData(this.$api.getSchemeSelect, {
          schemeProcessStatus: "self-assess",
          assessedOrgId: this.$store.getters["user/userInfos"].orgId,
          assessType: this.pageType
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(
            res,
            "name",
            "asmSchemeId"
          );
        });
      }
      // 责任处室，不能查看责任处室打分情况
      if (
        this.$store.getters["user/userInfos"].orgType === "OFFICE" &&
        item.name === "departmentAssessMessage"
      ) {
        item.hideItem = true;
      }
      // 查看全部禁用
      if (type === "look") {
        item.disabled = true;
        // 查看展示列表，不需要上传文件
        if (item.name === "scoreBasis") {
          item.hideItem = true;
        }
        if (item.name === "files") {
          item.fileSettings.hidedelete = true;
        }
      }
      // 新增编辑需要删除文件
      if (type === "edit" && item.name === "files") {
        item.fileSettings.hidedelete = false;
      }
      if (item.children) {
        this.setDictList(item.children, id, type);
      }
    });
    return data;
  },
  /**
   * 表单切换
   */
  handleLinkSelect(linkName, data) {
    this.changeFormList(
      linkName,
      data,
      this.dialogFormSettings.dialogFormItems.formGroupList
    );
    // 分数变化
    if (linkName === "score") {
      this.handleLinkSelect("deductedRadio");
      let score = this.dialogFormSettings.dialogFormItems.formGroupValues[
          "score"
        ],
        kpiScore = this.dialogFormSettings.dialogFormItems.formGroupValues[
          "kpiScore"
        ];
      if (score < kpiScore) {
        this.dialogFormSettings.dialogFormItems.formGroupValues["deducted"] =
          "Y";
        this.handleLinkSelect("deducted", "Y");
      } else {
        this.dialogFormSettings.dialogFormItems.formGroupValues["deducted"] =
          "N";
        this.handleLinkSelect("deducted", "N");
        if (score > kpiScore) {
          this.dialogFormSettings.dialogFormItems.formGroupValues["score"] = "";
        }
      }
    }
  },
  changeFormList(linkName, data, formList) {
    formList.map(item => {
      // 是否减分
      if (linkName === "deductedRadio" && item.name === "deducted") {
        item.hideItem = false;
      }
      //  减分原因， 整改措施
      if (linkName === "deducted" && item.name === "deductionReason") {
        item.hideItem = data == "Y" ? false : true;
      }
      // 是否引用日常监督文件
      if (linkName === "quoteFiles" && item.name === "dailyFilesList") {
        item.hideItem = data == "Y" ? false : true;
      }
      if (item.children) {
        this.changeFormList(linkName, data, item.children);
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
   * 弹框确认
   */
  handleDialogForm(btns, formData, data) {
    if (btns.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    // 分配
    if (btns.flag === "assignKpiSave") {
      // 分配处室特殊处理
      this.dealAssignKpiData(btns, data);
    }
    if (btns.flag === "selfAssess") {
      // 有id说明填写过意见，是更新，没有是新增
      if (data["asmShemeAssessKpiId"]) {
        btns.postUrl = "_data/shemeAssess/kpi/updateAssessKpi";
      } else {
        btns.postUrl = "_data/shemeAssess/kpi/addAssessKpi";
      }
      // 自评保存
      this.dealSelfAssessData(btns.postUrl, formData, data);
    }
  },
  handleSubmitData(url, data) {
    this.$postData(url, data, true).then(() => {
      this.$message.success("保存成功！");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  },
  /**
   *  自评保存
   */
  dealSelfAssessData(url, formData) {
    // 引用日常监督的文件排序
    let allFormData = this.dialogFormSettings.dialogFormItems.formGroupValues;
    let selectedList = allFormData["selectedList"];
    let hasSortNumList = [],
      noSortNumList = [];
    selectedList.forEach(item => {
      if (item.sortNum) {
        hasSortNumList.push(item);
      } else {
        noSortNumList.push(item);
      }
    });
    let sortList = hasSortNumList.sort(function(a, b) {
      return a["sortNum"] - b["sortNum"];
    });
    let selectedListResult = sortList.concat(noSortNumList);
    let fileIdList = selectedListResult.map(item => {
      return item.fileId;
    });
    // 日常监督的文件
    formData.append("fileIdList", fileIdList);
    // 文件需不需要替换
    formData.append("overwritten", false);
    // 删除的文件
    formData.append("deleteFileList", this.deleteFileList);
    if (
      this.$store.getters["user/userInfos"].orgId ===
      formData.get("assessedCityMOrgId")
    ) {
      formData.append("manageDepart", "Y");
    }
    this.handleSubmitData(url, formData);
  },
  /**
   *  分配责任处室
   */
  dealAssignKpiData(btns, data) {
    let params = {},
      addDepartment = [],
      deleteDepartment = [];
    // 删除的责任处室
    if (data.old_manageOrg_MO) {
      deleteDepartment = data.old_manageOrg_MO.split(",");
    }
    // 新增的责任处室
    if (data.manageOrg_MO && data.manageOrg_MO.length) {
      data.manageOrg_MO.forEach(item => {
        let obj = {};
        obj.type = this.$global.SCHEME_KPIASSIGN_TYPE_MO;
        // 谁分配的
        obj.assessOrgId = this.$store.getters["user/userInfos"]["assess"];
        // 分配到哪里
        obj.assessedOrgId = item;
        // 哪个方案
        obj.asmSchemeKpiId = data.asmSchemeKpiId;
        addDepartment.push(obj);
      });
    }

    params.deleteAssignIds = deleteDepartment;
    params.datas = addDepartment;

    this.handleSubmitData(btns.postUrl, params);
  }
};
export default methods;
