const methods = {
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
  /**
   * 搜索
   */
  handleSearchFormBtn(btns, formData) {
    this.initCityTabData(formData, btns);
  },
  /**
   * tab
   */
  initCityTabData(formData, btns) {
    if (formData.asmSchemeId) {
      this.$getData(this.$api.getAssessedOrgBySchemeId, {
        asmSchemeId: formData.asmSchemeId
      }).then(res => {
        this.cityTabData = res.data;
        this.tabSettings.tabCardData = res.data.map(item => {
          item.id = item.assessedOrgId;
          item.label = item.districtname;
          return item;
        });
        // 默认值
        this.tabSettings.activeName = res.data[0].assessedOrgId;
        // 重点事项，注意事项
        this.attention = res.data[0].attention;
        this.focus = res.data[0].focus;

        // 获取表格用的组织id
        formData.orgId = res.data[0].assessedOrgId;
        this.getPageData(formData, btns);
      });
    }
  },
  /**
   * tab 切换
   */
  handleTabChange(data) {
    this.cityTabData.forEach(item => {
      if (data.tabId === item.assessedOrgId) {
        this.attention = item.attention;
        this.focus = item.focus;
      }
    });
    this.initPageData();
  },
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    defaultdatas.orgId = this.tabSettings.activeName;
    this.getPageData(defaultdatas);
  },
  getPageData(formData, btns) {
    let options = {
      vm: this
    };
    let params = {
      page: this.paginationSettings.currentPage,
      row: this.$global.paginationOption.numberPerpage,
      code: this.pageType
    };
    Object.assign(formData, params);
    let url = btns || { postUrl: "spotCheckEvaluationList" };
    this.$searchformBtnAction(url, formData, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let spotCheckList = this.$globalFnc.deepCopy(data.rows);
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
    this.formatData(spotCheckList, propObject);
    this.tableSettings.tableDatas = spotCheckList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      /**
       * 值修改
       */
      /**
       * 自评信息
       */
      if (item["selfAssess"] && item["selfAssess"]["shemeAssessKpi"]) {
        for (let key in item["selfAssess"]["shemeAssessKpi"]) {
          item["self_" + key] = item["selfAssess"]["shemeAssessKpi"][key];
        }
      }
      /**
       * 部门打分信息
       */
      if (item["higherAssess"] && item["higherAssess"]["shemeAssessKpi"]) {
        for (let key in item["higherAssess"]["shemeAssessKpi"]) {
          item["department_" + key] =
            item["higherAssess"]["shemeAssessKpi"][key];
        }
      }
      /**
       * 抽查打分信息
       */
      if (item["randomAssess"] && item["randomAssess"]["shemeAssessKpi"]) {
        for (let key in item["randomAssess"]["shemeAssessKpi"]) {
          item["spotCheck_" + key] =
            item["randomAssess"]["shemeAssessKpi"][key];
        }
      }
      // 被考核机构
      if (item.assessdOrg) {
        item["assessdOrgName"] = item.assessdOrg.orgname;
        // 市县
        item["district"] = item.assessdOrg.district;
      }
      // 方案信息
      if (item["scheme"]) {
        item["issueNo"] = item["scheme"].issueNo;
      }
      // 方案指标信息
      if (item["schemeKpi"]) {
        item["asmSchemeKpiId"] = item["schemeKpi"].asmSchemeKpiId;
      }
      // 方案流程信息
      if (item["assess"]) {
        item["asmShemeAssessId"] = item["assess"]["asmShemeAssessId"];
      }
      if (item.kpi) {
        item["asmKpiId"] = item.kpi.asmKpiId;
        item["kpiName"] = item.kpi.name;
        item["criteria"] = item.kpi.criteria;
        item["kpiScore"] = item.kpi.score;
        item["asmKpiIndexId"] = item.kpi.asmKpiIndexId;
      }
      //市牵头部门
      if (item.assessdManageAssign) {
        item["assessedCityMOrgId__dsp"] =
          item.assessdManageAssign.assessedOrgId__dsp;
        item["assessedCityMOrgId"] = item.assessdManageAssign.assessedOrgId;
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
      if (item.assessMOassigns) {
        let nameList = [];
        item.assessMOassigns.forEach(cooprate => {
          nameList.push(cooprate.assessedOrgId__dsp);
        });
        item["assessMOassigns__dsp"] = nameList.join();
      }
      /**
       * 按钮
       */
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 评分状态为0 说明没有提交牵头部门
      item.operateBtns.unshift({
        styleType: "primary",
        type: "evaluation",
        text: "评分",
        class: "text-primary fontSize20 mr10",
        icon: "el-icon-document-checked",
        isIcon: true
      });
    });
  },
  /**
   * 表格按钮点击事件
   */
  handleTableRowButton(row, btns) {
    let formGroupList, defaultValues;
    /**
     * 评分
     */
    if (btns.type === "evaluation") {
      this.dialogFormSettings.dialogFormTitle = "抽查打分";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.spotCheckAssessFormBtns;
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.spotCheckAssessFormItems)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
    }
    /**
     * 查看详情
     */
    if (btns.type === "lookDetail") {
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
        this.schemeFormItem.concat(this.spotCheckAssessFormItems)
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
    defaultValues = this.$globalFnc.deepCopy(row);
    // 是否减分
    defaultValues["department_deducted"] = row["department_deducted"]
      ? row["department_deducted"]
      : "N";
    this.handleLinkSelect("deducted", defaultValues["department_deducted"]);
    // // 是否引用日常监督文件
    // defaultValues["quoteFiles"] = "N";
    // if (row.fileIds) {
    //   defaultValues["quoteFiles"] = "Y";
    // }
    // this.handleLinkSelect("quoteFiles", defaultValues["quoteFiles"]);
    // 评分日期
    defaultValues.spotCheck_assessDt = row["spotCheck_assessDt"]
      ? row["spotCheck_assessDt"]
      : this.$globalFnc.changeDateFormat(new Date(), "ymd");
    // 评分单位
    defaultValues.mainOrgId = this.$store.getters["user/userInfos"]["orgId"];
    // // 责任处室打分情况
    // // 责任处室id
    // params.mainOrgIds = row["assessdMOassignsId"];
    // if (this.$store.getters["user/userInfos"].orgType !== "OFFICE") {
    //   this.$getData(this.$api.listAssessKpi, params).then(res => {
    //     this.$set(defaultValues, "departmentAssessTable", res.data);
    //   });
    // }
    //配合工作情况列表
    // 获取列表需要的id
    let params = {
      asmSchemeKpiId: row["asmSchemeKpiId"],
      asmShemeAssessId: row["self_asmShemeAssessId"]
    };
    // 市配合部门id
    params.cooperateOrgIds = row["assessedCityCOrgId"];
    // 配合处室id
    if (row["assessdCOassigns"] && row["assessdCOassigns"].length) {
      row["assessdCOassigns"].forEach(item => {
        params.cooperateOrgIds.push(item["assessedOrgId"]);
      });
    }
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
    this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
    this.dialogFormSettings.dialogFormVisible = true;
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
          schemeProcessStatus: "random-assess",
          assessedOrgId: this.$store.getters["user/userInfos"].orgId
        }).then(res => {
          this.schemeList = res;
          item.data = this.$globalFnc.arrayToFormDropdown(
            this.schemeList,
            "name",
            "asmSchemeId"
          );
          if (this.schemeList && this.schemeList.length) {
            // 默认选择第一条
            this.searchSettings.formGroupValues = {
              asmSchemeId: this.schemeList[0].asmSchemeId
            };
          }
        });
      }
      // 查看全部禁用
      if (type === "look") {
        item.disabled = true;
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
  handleLinkSelect(linkName) {
    // this.changeFormList(
    //   linkName,
    //   data,
    //   this.dialogFormSettings.dialogFormItems.formGroupList
    // );
    // 分数变化
    if (linkName === "score") {
      let score = this.dialogFormSettings.dialogFormItems.formGroupValues[
          "spotCheck_score"
        ],
        kpiScore = this.dialogFormSettings.dialogFormItems.formGroupValues[
          "kpiScore"
        ];
      if (score < kpiScore) {
        this.dialogFormSettings.dialogFormItems.formGroupValues[
          "spotCheck_deducted"
        ] = "Y";
        // this.handleLinkSelect("departmentDeducted", "Y");
      } else {
        this.dialogFormSettings.dialogFormItems.formGroupValues[
          "spotCheck_deducted"
        ] = "N";
        // this.handleLinkSelect("departmentDeducted", "N");
        if (score > kpiScore) {
          this.dialogFormSettings.dialogFormItems.formGroupValues[
            "spotCheck_score"
          ] = "";
        }
      }
    }
  },
  // changeFormList(linkName, data, formList) {
  //   formList.map(item => {
  //     是否减分 减分原因， 整改措施
  //     if (
  //       linkName === "departmentDeducted"
  //       // (item.name === "deductionReason" || item.name === "rectifyDesc")
  //     ) {
  //       item.hideItem = data == "Y" ? false : true;
  //     }
  //     是否引用日常监督文件
  //     if (linkName === "quoteFiles" && item.name === "dailyFilesList") {
  //       item.hideItem = data == "Y" ? false : true;
  //     }
  //     if (item.children) {
  //       this.changeFormList(linkName, data, item.children);
  //     }
  //   });
  // },
  /**
   * 弹框确认
   */
  handleDialogForm(btns, data) {
    if (btns.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    let submitData = this.$globalFnc.deepCopy(data);
    if (btns.flag === "departmentAssess") {
      // 自评保存
      submitData = this.dealSpotCheckAssessData(submitData);
      // 有id说明填写过意见，是更新，没有是新增
      if (submitData["spotCheck_asmShemeAssessKpiId"]) {
        btns.postUrl = "_data/shemeAssess/kpi/updateAssessKpi";
      } else {
        btns.postUrl = "_data/shemeAssess/kpi/addAssessKpi";
      }
    }
    this.$postData(btns.postUrl, submitData).then(() => {
      this.$message.success("保存成功！");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  },
  /**
   *  评分保存
   */
  dealSpotCheckAssessData(data) {
    // 自评日期
    let params = this.$globalFnc.deepCopy(data);
    for (let key in params) {
      if (key.indexOf("spotCheck_") !== -1) {
        params[key.split("_")[1]] = params[key];
      }
    }
    console.log(params);
    return params;
  }
};
export default methods;
