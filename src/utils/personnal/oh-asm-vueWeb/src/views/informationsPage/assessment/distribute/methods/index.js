const methods = {
  /**
   * 获取方案
   */
  getSchemeList() {
    return new Promise(reslove => {
      let schemeParams = {
        assessedOrgId: this.$store.getters["user/userInfos"].orgId,
        assessType: this.pageType,
        running: true
      };
      this.$getData(this.$api.getSchemeSelect, schemeParams).then(res => {
        reslove(res);
      });
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(btns) {
    if (btns.flag === "flow") {
      // asmSchemeAssessedId  记录id
      // asmSchemeId 方案id
      // processinstId 流程id
      // taskId 任务节点id
      // userAction 操作
      // assessedOrgId 被考核办id
      // processinstStatus 流程状态
      let params = {
        asmSchemeId: this.childrenPhaseData["asmSchemeId"],
        asmSchemeAssessedId: this.childrenPhaseData["asmSchemeAssessedId"],
        processinstId: this.childrenPhaseData["processinstId"],
        userAction: btns.value,
        taskId: this.childrenPhaseData["userActiveTasks"][0].id,
        name: btns.label,
        assessedOrgId: this.childrenPhaseData["assessedOrgId"],
        processinstStatus: this.childrenPhaseData.processinstStatus
      };
      /**
       * 开启自评
       */
      // 如果流程在 指标分配，那流程流转是自评
      if (this.childrenPhaseData.processinstStatus === "kpi-assign") {
        this.$postData(this.$api.startSelfPhase, params).then(() => {
          this.$message.success("操作成功！");
          this.initPageData();
        });
      }
      /**
       * 自评提交
       */
      // 如果流程在自评阶段， 那流程流转是 自评提交，开始评审
      if (this.childrenPhaseData.processinstStatus === "self-assess") {
        this.$confirm("请核对工作情况，操作后不能再做修改", "提示", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$postData(this.$api.submitEvaluation, params).then(res => {
            if (res.data && res.data.msg) {
              // data有值说明是业务错
              // 自评直接提示错误，
              this.$message.warning("当前方案有未完成工作，不可以提交！");
              return;
            }
            this.$message.success("操作成功！");
            this.initPageData();
          });
        });
      }
    }
    /**
     * 关闭搜索
     */
    if (btns.flag === "closeSearch") {
      this.showSearchForm = !this.showSearchForm;
      if (this.showSearchForm) {
        btns.label = "隐藏查询";
      } else {
        btns.label = "显示查询";
      }
    }
  },
  /**
   * 搜索
   */
  setSearchFormData() {
    this.searchSettings.formGroupList = this.$globalFnc.deepCopy(
      this.distributeFormItems[this.pageType]
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
        this.schemeName = res[0].name;
        // 获取列表数据
        this.initPageData();
      }
    });
  },
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn(
      { postUrl: "distributeSuperviseList" },
      defaultdatas
    );
  },
  handleSearchFormBtn(btns, formData) {
    this.tableSettings.tableDatas = [];
    this.operateButtonsSettings.buttonListData = [];
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
    // 设置按钮组
    this.setOperateButton();

    let options = {
      vm: this
    };
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      assessObject: this.pageOperateType,
      code: this.pageType
    };
    let formDataObj = Object.assign(baseForm, formData);
    this.$searchformBtnAction(btns, formDataObj, options).then(data => {
      this.setTableList(data);
    });
  },
  /**
   * 设置按钮组
   */
  setOperateButton() {
    // 验证当前方案有没有开启自评
    let params = {
      asmSchemeId: this.searchSettings.formGroupValues.asmSchemeId,
      assessedOrgid: this.$store.getters["user/userInfos"].orgId
    };
    this.$getData(this.$api.startSelfBtn, params).then(res => {
      if (res.data && res.data.processinstStatus) {
        this.searchSettings.formGroupValues.assessPhase =
          res.data.processinstStatus;
        this.processinstStatus = res.data.processinstStatus;
      }
      let buttonArray = [
        {
          flag: "closeSearch",
          size: "small",
          icon: "",
          label: "隐藏查询",
          styleType: "primary",
          postUrl: ""
        }
      ];
      // 当前方案在指标分配 或者 是自评阶段的时候添加按钮  userActiveTasks 是流程数组
      this.childrenPhaseData = res.data;
      if (
        res &&
        res.data &&
        (res.data.processinstStatus === "kpi-assign" ||
          res.data.processinstStatus === "self-assess") &&
        res.data.userActiveTasks &&
        res.data.userActiveTasks.length
      ) {
        // 用户操作按钮
        let userTaskActions = res.data.userActiveTasks[0].userTaskActions;
        if (userTaskActions && userTaskActions.length) {
          userTaskActions.forEach((actionItem, actionIndex) => {
            buttonArray.unshift({
              label: actionItem.text,
              value: actionItem.value,
              type: "flow" + actionIndex,
              flag: "flow",
              styleType: "primary",
              size: "small"
            });
          });
        }
      }
      this.operateButtonsSettings.buttonListData = buttonArray;
    });
  },
  /**
   * 表格
   */
  setTableList(data) {
    let distributeList = this.$globalFnc.deepCopy(data.rows);
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "查看",
          type: "preview",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        }
      ]
    };
    this.formatData(distributeList, propObject);
    this.tableSettings.tableDatas = distributeList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      // 按钮
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 流程节点处于分配阶段， 才有分配按钮
      if (item.assessed && item.assessed.processinstStatus === "kpi-assign") {
        item[prop.name].unshift({
          styleType: "primary",
          type: "assignKpi",
          text: "分配",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-set-up",
          isIcon: true
        });
      }
      // 被考核机构
      if (item.assessdOrg) {
        item.orgname = item.assessdOrg.orgname.replace(/考核办/g, "");
      }
      // 方案信息
      if (item.scheme) {
        item.issueNo = item["scheme"].issueNo;
        item.schemeName = item["scheme"].name;
        // item.processStatus_dsp = item.scheme.processStatus.text;

        // 当前方案名字和环节
        this.schemeName = item.scheme.name;
      }
      if (item.assessed) {
        // 当前环节
        this.processStatus = item.assessed.processStatus.text;
      }
      // 方案指标信息
      if (item.schemeKpi) {
        item.asmSchemeKpiId = item["schemeKpi"].asmSchemeKpiId;
      }
      if (item.kpi) {
        item.asmKpiId = item.kpi.asmKpiId;
        item.kpiName = item.kpi.name;
        item.criteria = item.kpi.criteria;
        item.kpiScore = item.kpi.score;
        item.asmKpiIndexId = item.kpi.asmKpiIndexId;
      }
      // 市县
      item.district = this.$store.getters["user/userInfos"]["distrinct"];
      //省牵头部门
      if (item.assessManageAssign) {
        item.assessedProvinceMOrgId__dsp =
          item.assessManageAssign.assessedOrgId__dsp;
        item.assessedProvinceMOrgId = item.assessManageAssign.assessedOrgId;
      }
      //省配合部门
      if (item.assessCooprateAssign) {
        let nameList = [];
        let valueList = [];
        item.assessCooprateAssign.forEach(cooprate => {
          nameList.push(cooprate.assessedOrgId__dsp);
          valueList.push(cooprate.assessedOrgId);
        });

        item.assessedProvinceCOrgId__dsp = nameList.join();
        item.assessedProvinceCOrgId = valueList;
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

        item.assessedCityCOrgId__dsp = nameList.join();
        item.assessedCityCOrgId = valueList;
      }

      // 分配 页面记录指标分配 和自评状态
      if (item.assessed && item.assessed.processinstStatus === "kpi-assign") {
        // 指标分配阶段
        // 有牵头部门说明已完成，没有是未完成
        if (
          item.assessdManageAssign &&
          item.assessdManageAssign.assessedOrgId
        ) {
          item.status = "complete";
        } else {
          item.status = "incomplete";
        }
      } else {
        // 有自评信息
        if (item.selfAssess) {
          // 如果状态是1 说明是已经上报
          if (
            item.selfAssess.assess &&
            item.selfAssess.assess["status"] == "1"
          ) {
            item["status"] = "reported";
          } else {
            // 状态不是1 ，填写了自评信息状态是 “完成”
            if (item.selfAssess.shemeAssessKpi) {
              item["status"] = "complete";
            } else {
              // 状态不是1 ，没填写了自评信息状态是 “未完成”
              item["status"] = "incomplete";
            }
          }
        } else {
          // 没有自评信息 状态 ”未完成“
          item["status"] = "incomplete";
        }
      }

      // 自评信息
      if (item.selfAssess && item.selfAssess.shemeAssessKpi) {
        for (let key in item.selfAssess.shemeAssessKpi) {
          item["self_" + key] = item.selfAssess.shemeAssessKpi[key];
        }
      }
      //部门得分--上级领导打分
      if (item.higherAssess && item.higherAssess.shemeAssessKpi) {
        for (let key in item.higherAssess.shemeAssessKpi) {
          item["department_" + key] = item.higherAssess.shemeAssessKpi[key];
        }
      }
      //抽查得分
      if (item.randomAssess && item.randomAssess.shemeAssessKpi) {
        for (let key in item.randomAssess.shemeAssessKpi) {
          item["spotCheck_" + key] = item.randomAssess.shemeAssessKpi[key];
        }
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
   * 自评结果提交
   */
  handleSubmitEvaluation() {
    this.dialogNormalFormSettings.dialogFormTitle = "提交";
    this.dialogNormalFormSettings.dialogFormItems.formButtonList = this.submitConfirmBtn;
    this.dialogNormalFormSettings.dialogFormItems.formGroupList = this.setDictList(
      this.submitKpiFormItems
    );
    this.dialogNormalFormSettings.dialogFormVisible = true;
  },
  /**
   *  部门评审，抽查结果发布
   */
  handleReleaseEvaluation(schemeList) {
    this.dialogNormalFormSettings.dialogFormTitle = "发布";
    this.dialogNormalFormSettings.dialogFormItems.formButtonList = this.submitConfirmBtn;
    this.dialogNormalFormSettings.dialogFormItems.formGroupValues = {
      assessedOrgids: []
    };
    let formGroupList = this.$globalFnc
      .deepCopy(this.releaseKpiFormItems[this.pageType][this.assessPhase])
      .map(item => {
        if (item.name === "asmSchemeId" && item.data) {
          item.data = this.$globalFnc.arrayToFormDropdown(
            schemeList,
            "name",
            "asmSchemeId"
          );
        }
        return item;
      });
    this.dialogNormalFormSettings.dialogFormItems.formGroupList = formGroupList;
    // 年度考核只有一个方案，不需要选择方案
    if (this.pageType === this.$global.SCHME_TYPE_YEAR) {
      this.$set(
        this.dialogNormalFormSettings.dialogFormItems.formGroupValues,
        "asmSchemeId",
        schemeList[0].asmSchemeId
      );
      // 部门评审
      if (this.assessPhase === "higher-assess") {
        this.handleLinkSelect("submitScheme", schemeList[0].asmSchemeId);
      }
      // 抽查
      if (this.assessPhase === "random-assess") {
        this.handleLinkSelect(
          "spotCheckSubmitScheme",
          schemeList[0].asmSchemeId
        );
      }
    }
    this.dialogNormalFormSettings.dialogFormVisible = true;
  },
  /**
   * 部门评分提交列表
   */
  handleSubmitDepartmentEvaluationList() {
    this.kpiSearchFormSetting.formGroupValues = {};
    this.submitKpiFormSetting.formGroupValues = {};
    this.kpiTableSettings.tableDatas = [];
    // this.titleMessage = "发布信息";
    // 提交按钮
    this.submitButtonsSettings.buttonListData = this.submitButtonObj[
      this.pageOperateType
    ];
    this.evaluationSubmitDialog.dialogName = "部门评审结果";
    // 发布按钮
    // this.evaluationSubmitDialog.formButtonList = this.evaluationSubmitBtn;
    // 搜索form 赋值
    this.kpiSearchFormSetting.formGroupList = this.setDictList(
      this.releaseKpiSearchFormItems[this.assessPhase]
    );
    // 表格表头
    this.kpiTableSettings.tableSettingOptions.headerOptions = this.departmentKpiTableHeader;
    setTimeout(() => {
      this.initKpiPageData();
    }, 200);
    this.evaluationSubmitDialog.dialogVisible = true;
  },
  /**
   * 抽查提交列表
   */
  handleSubmitSpotCheckEvaluationList() {
    this.kpiSearchFormSetting.formGroupValues = {};
    this.submitKpiFormSetting.formGroupValues = {};
    this.kpiTableSettings.tableDatas = [];
    // this.titleMessage = "发布信息";
    // 发布按钮
    this.submitButtonsSettings.buttonListData = this.submitButtonObj[
      this.pageOperateType
    ];
    this.evaluationSubmitDialog.dialogName = "抽查结果";
    // 弹框按钮
    // this.evaluationSubmitDialog.formButtonList = this.evaluationSubmitBtn;
    // 搜索form 赋值
    this.kpiSearchFormSetting.formGroupList = this.setOrgList(
      this.releaseKpiSearchFormItems[this.assessPhase]
    );
    // 表格表头
    this.kpiTableSettings.tableSettingOptions.headerOptions = this.spotCheckKpiTableHeader;
    setTimeout(() => {
      this.initKpiPageData();
    }, 200);
    this.evaluationSubmitDialog.dialogVisible = true;
  },
  initKpiPageData() {
    let defaultdatas = this.kpiSearchFormSetting.formGroupValues;
    this.handleKpiSearchFormBtn(
      { postUrl: "schemeKpiBySchemeId" },
      defaultdatas
    );
  },
  handleKpiSearchFormBtn(btns, formData) {
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.kpiPaginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      assessPhase: this.assessPhase
    };
    let btnsObj = btns || {
      postUrl: "schemeKpiBySchemeId"
    };
    let formDataObj = Object.assign(baseForm, formData);
    this.kpiTableSettings.tableDatas = [];
    this.$searchformBtnAction(btnsObj, formDataObj, options).then(data => {
      this.setKpiTableList(data);
    });
  },
  setKpiTableList(data) {
    let kpiList = this.$globalFnc.deepCopy(data.rows);
    this.kpiPaginationSettings.totalNumbers = 0;
    if (kpiList && kpiList.length) {
      this.kpiPaginationSettings.totalNumbers = data.total;
      kpiList.forEach(item => {
        // 指标信息
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
          // 部门
          if (this.assessPhase === "higher-assess") {
            if (item.higherAssess && item.higherAssess.shemeAssessKpi) {
              item["status"] = "complete";
            } else {
              item["status"] = "incomplete";
            }
          }
          // 自评
          if (this.assessPhase === "self-assess") {
            // 有自评信息，说明已完成自评
            if (item.selfAssess && item.selfAssess.shemeAssessKpi) {
              item["status"] = "complete";
            } else {
              item["status"] = "incomplete";
            }
          }
          // 抽查
          if (this.assessPhase === "random-assess") {
            if (item.randomAssess && item["randomAssess"].shemeAssessKpi) {
              item["status"] = "complete";
            } else {
              item["status"] = "incomplete";
            }
          }
        }
        // 自评信息
        if (item.selfAssess && item.selfAssess.shemeAssessKpi) {
          for (let key in item.selfAssess.shemeAssessKpi) {
            item["self_" + key] = item.selfAssess.shemeAssessKpi[key];
          }
        }
        // 部门评分
        if (item.higherAssess && item.higherAssess.shemeAssessKpi) {
          for (let key in item.higherAssess.shemeAssessKpi) {
            item["department_" + key] = item.higherAssess.shemeAssessKpi[key];
          }
        }
        /**
         * 抽查打分信息
         */
        if (item.randomAssess && item["randomAssess"].shemeAssessKpi) {
          for (let key in item["randomAssess"].shemeAssessKpi) {
            item["spotCheck_" + key] = item.randomAssess.shemeAssessKpi[key];
          }
        }
        // 被考核机构
        if (item.assessdOrg) {
          item["assessdOrgName"] = item.assessdOrg.orgname;
        }
        // 方案信息
        if (item.scheme) {
          item.schemeName = item.scheme.name;
        }
      });
    }
    this.kpiTableSettings.tableDatas = kpiList;
  },
  /**
   * 结果上报 下拉选择事件
   */
  handleLinkSelect(linkName, data) {
    let formGroupList;
    if (linkName === "scheme" && this.assessPhase !== "self-assess") {
      formGroupList = this.kpiSearchFormSetting.formGroupList;
    }
    // 部门提交时选择的方案
    if (linkName === "submitScheme") {
      formGroupList = this.dialogNormalFormSettings.dialogFormItems
        .formGroupList;
    }
    // 抽查提交时选择的方案
    if (linkName === "spotCheckSubmitScheme") {
      if (data) {
        this.$getData(this.$api.getRandomAssessedOrgIdsBySchemeId, {
          asmSchemeId: data
        }).then(res => {
          this.$set(
            this.dialogNormalFormSettings.dialogFormItems.formGroupList[1],
            "data",
            this.$globalFnc.arrayToFormDropdown(res.data, "text", "value")
          );
        });
      } else {
        this.$set(
          this.dialogNormalFormSettings.dialogFormItems.formGroupList[1],
          "data",
          []
        );
      }
    }
    // 首页搜索区域的方案
    if (linkName === "searchScheme") {
      formGroupList = this.searchSettings.formGroupList;
      this.$set(this.searchSettings.formGroupValues, "assessedOrgId", "");
    }
    if (!formGroupList) {
      return;
    }
    if (data) {
      this.$getData(this.$api.getSchemeAssessedRef, {
        asmSchemeId: data
      }).then(res => {
        formGroupList.forEach(item => {
          if (item.name === "assessedOrgId" || item.name === "assessedOrgids") {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res.data,
              "assessedOrgId__dsp",
              "assessedOrgId"
            );
          }
        });
      });
    } else {
      formGroupList.forEach(item => {
        if (item.name === "assessedOrgId" || item.name === "assessedOrgids") {
          item.data = [];
        }
      });
    }
  },
  // 分页
  handleKpiPaginationPagenumber(val) {
    this.kpiPaginationSettings.currentPage = val;
    this.initKpiPageData();
  },
  /**
   * 提交，发布弹框 按钮事件
   */
  handleSubmitEvaluationList(button) {
    if (button.flag === "cancel") {
      this.evaluationSubmitDialog.dialogVisible = false;
      this.kpiSearchFormSetting.formGroupValues = {};
    }
  },
  /**
   * 表格按钮事件
   */
  handleTableRowButton(row, flag) {
    let defaultValues, formGroupList;
    /**
     * 分配指标
     */
    if (flag.type === "assignKpi") {
      this.dialogFormSettings.dialogFormTitle = "分配指标";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.assignKpiButton;
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.assignCityItem)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
      defaultValues = this.$globalFnc.deepCopy(row);
      // 牵头部门
      if (row.assessdManageAssign) {
        defaultValues.manageOrg_MD = row["assessdManageAssign"].assessedOrgId;
        // 老数据
        defaultValues.old_manageOrg_MD =
          row["assessdManageAssign"].asmSchemeKpiAssignId;
      }
      // 配合部门
      if (row.assessdCooprateAssign && row["assessdCooprateAssign"].length) {
        defaultValues.cooprateOrgs_CD = row.assessdCooprateAssign.map(item => {
          return item.assessedOrgId;
        });
        // 保存老的数据
        defaultValues.old_cooprateOrgs_CD = row.assessdCooprateAssign
          .map(item => {
            return item.asmSchemeKpiAssignId;
          })
          .join(",");
      } else {
        defaultValues.cooprateOrgs_CD = [];
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
      this.dialogFormSettings.dialogFormVisible = true;
      return;
    }
    /**
     * 评分审核
     */
    if (flag.type === "scoreCheck") {
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.scoreCheckFormItems)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
      this.dialogFormSettings.dialogFormItems.formButtonList = this.scoreCheckFormBtns;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = row;
    }
    /**
     * 查看
     */
    if (flag.type === "preview") {
      this.dialogFormSettings.dialogFormTitle = "查看详情";
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(
          this.selfCooprateMessage,
          this.selfEvaluationMessage,
          this.departmentEvaluationMessage,
          this.spotCheckEvaluationMessage
        )
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancle",
          label: "关闭",
          styleType: ""
        }
      ];
      this.dialogFormSettings.dialogFormItems.formGroupValues = row;
      this.dialogFormSettings.dialogFormVisible = true;
    }
    defaultValues = this.$globalFnc.deepCopy(row);
    if (row.self_asmShemeAssessId) {
      // 获取列表需要的id
      let params = {
        asmSchemeKpiId: row.asmSchemeKpiId,
        asmShemeAssessId: row.self_asmShemeAssessId
      };
      // 市配合部门id
      params.cooperateOrgIds = row.assessedCityCOrgId;
      // 配合处室id
      if (row["assessdCOassigns"] && row["assessdCOassigns"].length) {
        row["assessdCOassigns"].forEach(item => {
          params.cooperateOrgIds.push(item.assessedOrgId);
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
    }
    this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
  },
  /**
   *  设置字典表的值
   */
  setDictList(data, id) {
    data.forEach(item => {
      // 指标类目树
      if (item.name === "kpiIndextree") {
        this.$getData(this.$api.getKpiIndexTree, { asmKpiIndexId: id }).then(
          res => {
            item.treeSettings.treeData = res;
          }
        );
      }
      // 牵头部门， 配合部门
      if (item.name === "manageOrg_MD" || item.name === "cooprateOrgs_CD") {
        this.$getData(this.$api.dictList, {
          _refKey: "org",
          orgtypeid: "202",
          parentorgid: this.$store.getters["user/userInfos"].orgId,
          status: "1"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 年度考核任务
      if (item.name === "asmSchemeId") {
        this.getSchemeList().then(res => {
          if (item.data) {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res.data,
              "name",
              "asmSchemeId"
            );
          }
          // 年度考核  督查 被考核机构
          if (
            this.pageType === this.$global.SCHME_TYPE_YEAR &&
            this.pageOperateType === "check" &&
            res.data.length
          ) {
            this.$getData(this.$api.getSchemeAssessedRef, {
              asmSchemeId: res.data[0].asmSchemeId
            }).then(result => {
              //  this.searchSettings.formGroupList[1] 是被考核市县
              this.$set(
                this.searchSettings.formGroupList[1],
                "data",
                this.$globalFnc.arrayToFormDropdown(
                  result.data,
                  "assessedOrgId__dsp",
                  "assessedOrgId"
                )
              );
            });
          }
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
      // 机构
      if (
        item.name === "self_mainOrgId" ||
        item.name === "department_mainOrgId" ||
        item.name === "spotCheck_mainOrgId"
      ) {
        this.$getData(this.$api.dictList, {
          _refKey: "org"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 不是专项，不需要选方案
      if (
        this.pageType !== this.$global.SCHME_TYPE_SPECIAL &&
        item.name === "asmSchemeId"
      ) {
        item.hideItem = true;
      }
      if (item.children) {
        this.setDictList(item.children, id);
      }
    });
    return data;
  },
  setOrgList(data) {
    data.map(item => {
      if (item.name === "asmSchemeId") {
        this.getSchemeList().then(res => {
          if (item.data) {
            item.data = this.$globalFnc.arrayToFormDropdown(
              res.data,
              "name",
              "asmSchemeId"
            );
          }
          this.$getData(this.$api.getRandomAssessedOrgIdsBySchemeId, {
            asmSchemeId: res.data[0].asmSchemeId
          }).then(result => {
            if (result.data && result.data.length) {
              // 发布表格内搜索
              this.$set(
                this.kpiSearchFormSetting.formGroupList[1],
                "data",
                this.$globalFnc.arrayToFormDropdown(
                  result.data,
                  "text",
                  "value"
                )
              );
            }
          });
        });
      }
      if (
        this.pageType !== this.$global.SCHME_TYPE_SPECIAL &&
        item.name === "asmSchemeId"
      ) {
        item.hideItem = true;
      }
      if (item.children) {
        this.setDictList(item.children);
      }
    });
    return data;
  },
  /**
   *  弹框确定按钮
   */
  handleDialogForm(button, data) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    let submitData = this.$globalFnc.deepCopy(data);
    if (button.flag === "assignKpiSave") {
      // 分配部门特殊处理
      submitData = this.dealAssignKpiData(submitData);
      this.$postData(button.postUrl, submitData, true).then(() => {
        this.dialogFormSettings.dialogFormVisible = false;
        this.$message.success("保存成功！");
        this.initPageData();
        this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      });
    }
    // 发布，提交
    if (button.flag === "submit") {
      this.submitConfirmation(button.postUrl, submitData);
    }
  },
  submitConfirmation(url, submitData) {
    this.$confirm("请核对工作情况，操作后不能再做任何修改", "提示", {
      dangerouslyUseHTMLString: true,
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      let params = {
        processinstStatus: this.assessPhase,
        asmSchemeId: submitData.asmSchemeId
      };
      if (this.assessPhase !== "self-assess") {
        params.assessedOrgids = submitData.assessedOrgids;
      }
      this.$postData(url, params).then(res => {
        // 保存不成功的情况
        if (res.data && res.data.msg) {
          // data有值说明是业务错
          if (this.assessPhase === "self-assess") {
            // 自评直接提示错误，
            this.$message.warning("当前方案有未完成工作，不可以提交！");
            return;
          }
          // 部门评审和抽查，提示有哪些机构没有完成
          let orgName = res.data.msg.join(",");
          this.$message.warning(orgName + "有未完成工作，不可以提交！");
          return;
        }
        this.dialogNormalFormSettings.dialogFormVisible = false;
        this.$message.success("操作成功！");
        // 专项考核的督查页面，不需要刷新首页表格
        if (
          this.pageType === this.$global.SCHME_TYPE_SPECIAL &&
          this.pageOperateType === "check"
        ) {
          this.initKpiPageData();
          return;
        }
        this.initPageData();
      });
    });
  },
  /**
   *  分配牵头部门，配合部门
   */
  dealAssignKpiData(data) {
    let params = {},
      addDepartment = [],
      deleteDepartment = [];

    // 删除的配合部门
    if (data.old_cooprateOrgs_CD) {
      deleteDepartment = data.old_cooprateOrgs_CD.split(",");
    }
    // 删除的牵头部门
    if (data.old_manageOrg_MD) {
      deleteDepartment.push(data.old_manageOrg_MD);
    }
    // 新增的牵头部门
    if (data.manageOrg_MD) {
      let obj = {};
      obj.type = this.$global.SCHEME_KPIASSIGN_TYPE_MD;
      // 谁分配的
      obj.assessOrgId = this.$store.getters["user/userInfos"].orgId;
      // 分配到哪里
      obj.assessedOrgId = data.manageOrg_MD;
      // 哪个方案
      obj.asmSchemeKpiId = data.asmSchemeKpiId;
      addDepartment.push(obj);
    }
    // 新增的配合部门
    if (data.cooprateOrgs_CD && data.cooprateOrgs_CD.length) {
      data.cooprateOrgs_CD.forEach(item => {
        let obj = {};
        obj.type = this.$global.SCHEME_KPIASSIGN_TYPE_CD;
        obj.assessedOrgId = item;
        obj.assessOrgId = this.$store.getters["user/userInfos"].orgId;
        // 哪个方案
        obj.asmSchemeKpiId = data.asmSchemeKpiId;
        addDepartment.push(obj);
      });
    }

    params.deleteAssignIds = deleteDepartment;
    params.datas = addDepartment;
    return params;
  }
};
export default methods;
