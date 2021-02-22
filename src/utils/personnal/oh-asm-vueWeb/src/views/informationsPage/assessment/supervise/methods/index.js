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
   *  获取抽查城市
   */
  getSchemeAssessedRef(id) {
    return new Promise(resolve => {
      this.$getData(this.$api.getSchemeAssessedRef, {
        asmSchemeId: id
      }).then(res => {
        resolve(res);
      });
    });
  },
  /**
   *  获取抽查人员
   */
  getOperators(id) {
    return new Promise(resolve => {
      this.$getData(this.$api.getOperators, {
        asmSchemeId: id
      }).then(res => {
        resolve(res);
      });
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(btns) {
    /**
     * 抽查方案
     */
    if (btns.flag === "spotCheckPlan") {
      this.dialogFormSettings.dialogFormTitle = "抽查方案";
      // 抽查城市
      let asmSchemeId = this.searchSettings.formGroupValues.asmSchemeId;
      this.getSchemeAssessedRef(asmSchemeId).then(assessedOrg => {
        // 抽查人员
        this.getOperators(asmSchemeId).then(operators => {
          let spotCheckContentItems = this.$globalFnc.deepCopy(
            this.spotCheckContentItems
          );
          spotCheckContentItems.forEach(item => {
            // 指标
            if (item.name === "asmKpiIds") {
              this.$getData(this.$api.getKpiSelect, {
                schemeId: asmSchemeId
              }).then(kpi => {
                item.data = kpi.data.map(item => {
                  item.label = item.text;
                  item.value = Number(item.value);
                  return item;
                });
              });
            }
            if (item.name === "updatedPhaseAcls") {
              // 被抽查城市
              item.headers[2].data = this.$globalFnc.arrayToFormDropdown(
                assessedOrg.data,
                "assessedOrgId__dsp",
                "assessedOrgId"
              );
              // this.handleLinkSelect("updatedPhaseAcls", "assessedOrgs");
              // 抽查人
              item.headers[1].data = this.$globalFnc.arrayToFormDropdown(
                operators.data,
                "operatorname",
                "operatorid",
                true
              );
              item.headers[0].data = this.$globalFnc.arrayToFormDropdown(
                operators.data,
                "operatorname",
                "operatorid",
                true
              );
            }
          });

          this.$getData(this.$api.singleRandomPlan, {
            asmSchemeId: asmSchemeId
          }).then(res => {
            let params = {};
            // 如果有data ,回显
            if (res.data) {
              params = res.data;
              params.startDt = this.$globalFnc.dateStampFormat(
                res.data.startDt,
                "ymd"
              );
              params.endDt = this.$globalFnc.dateStampFormat(
                res.data.endDt,
                "ymd"
              );
            } else {
              // 没有data 就回显默认值
              params.updatedPhaseAcls = [
                {
                  leader: [],
                  members: [],
                  assessedOrgs: [],
                  attention: "",
                  focus: ""
                }
              ];
              // 指标
              params.asmKpiIds = [];
              params.weight = 100;
              params.asmSchemeId = asmSchemeId;
            }
            this.dialogFormSettings.dialogFormItems.formGroupValues = params;
          });
          this.dialogFormSettings.dialogFormItems.formGroupList = spotCheckContentItems;
          this.dialogFormSettings.dialogFormItems.formButtonList = this.spotCheckContentButton;
          this.dialogFormSettings.dialogFormVisible = true;
        });
      });
    }
    /**
     * 开启抽查
     */
    if (btns.flag === "startSpotCheck") {
      let asmSchemeId = this.searchSettings.formGroupValues.asmSchemeId;
      this.$confirm("确定开启抽查", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.startRamdomPhase, {
          asmSchemeId: asmSchemeId
        }).then(() => {
          this.$message.success("操作成功！");
          this.initPageData();
        });
      });
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
      this.superviseFormItems
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
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "superviseList" }, defaultdatas);
  },
  handleSearchFormBtn(btns, formData) {
    this.tableSettings.tableDatas = [];
    this.operateButtonsSettings.buttonListData = [];
    if (!formData.asmSchemeId) {
      this.$message.warning("需选择考核方案");
      return;
    }
    // 设置按钮组
    this.setOperateButton();

    let options = {
        vm: this
      },
      baseForm = {
        code: this.pageType
      };
    let formDataObj = Object.assign(baseForm, formData);
    this.$searchformBtnAction(btns, formDataObj, options).then(data => {
      this.setTableList(data);
    });
  },
  setOperateButton() {
    // 验证当前方案能不能开启抽查
    let params = {
      asmSchemeId: this.searchSettings.formGroupValues.asmSchemeId
    };
    let buttonArray = [
      // {
      //   flag: "spotCheckPlan",
      //   size: "small",
      //   icon: "",
      //   label: "抽查方案",
      //   styleType: "primary",
      //   postUrl: ""
      // },
      // {
      //   flag: "startSpotCheck",
      //   size: "small",
      //   icon: "",
      //   label: "开启抽查",
      //   styleType: "primary",
      //   postUrl: ""
      // },
      {
        flag: "closeSearch",
        size: "small",
        icon: "",
        label: "隐藏查询",
        styleType: "primary",
        postUrl: ""
      }
    ];
    this.operateButtonsSettings.buttonListData = buttonArray;
    this.$getData(this.$api.validateRamdomPhase, params).then(res => {
      // 如果返回0 说明都已经评审上报，可以抽查
      if (res.data == 0) {
        buttonArray.unshift({
          flag: "startSpotCheck",
          size: "small",
          icon: "",
          label: "开启抽查",
          styleType: "primary",
          postUrl: ""
        });
        buttonArray.unshift({
          flag: "spotCheckPlan",
          size: "small",
          icon: "",
          label: "抽查方案",
          styleType: "primary",
          postUrl: ""
        });
        this.operateButtonsSettings.buttonListData = buttonArray;
      }
    });
  },
  /**
   * 表格
   */
  setTableList(data) {
    let superviseList = this.$globalFnc.deepCopy(data.data);
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "详情",
          type: "lookDetail",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        }
      ]
    };
    this.formatData(superviseList, propObject);
    this.tableSettings.tableDatas = superviseList;
    // this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      // 按钮
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      if (item.processinstStatus === "higher-assess") {
        if (item.phaseAssessStatus === "1") {
          // 部门评审阶段 ，已经发布了的话， 可以结束考核
          item[prop.name].push({
            styleType: "primary",
            type: "end",
            text: "结束",
            class: "text-primary fontSize20 mr10",
            icon: "",
            isIcon: true
          });
        } else {
          // 流程节点到部门，按钮添加部门发布
          item[prop.name].unshift({
            styleType: "primary",
            type: "release",
            text: "发布",
            class: "text-primary fontSize20 mr10",
            icon: "",
            isIcon: true
          });
        }
      }
      if (item.processinstStatus === "random-assess") {
        item[prop.name].unshift({
          styleType: "primary",
          type: "release",
          text: "发布",
          class: "text-primary fontSize20 mr10",
          icon: "",
          isIcon: true
        });
      }
      // 流程信息
      if (item.processStatus) {
        item.processText = item.processStatus.text;
      }
      //扣分合计
      let cutTotalScore = 0;
      if (item.cutHigher) {
        cutTotalScore += item.cutHigher;
      }
      if (item.cutRandom) {
        cutTotalScore += item.cutRandom;
      }
      if (item.repeatCutScore) {
        cutTotalScore += item.repeatCutScore;
      }
      item.cutTotalScore = cutTotalScore.toFixed(2);
    });
  },
  /**
   * 分页
   */
  // handlePaginationPagenumber(val) {
  //   this.paginationSettings.currentPage = val;
  //   this.initPageData();
  // },
  /**
   * 自评结果提交
   */
  /**
   * 提交，发布弹框 按钮事件
   */
  /**
   * 表格按钮事件
   */
  handleTableRowButton(row, flag) {
    // 查看详情
    if (flag.type === "lookDetail") {
      // 保存一行数据，获取列表详情时候用
      this.singleData = row;
      this.kpiTableSettings.tableDatas = [];
      this.kpiSearchFormSetting.formGroupValues = {
        kpiFilter: "",
        assessPhase:  row["processinstStatus"]
      };
      // 指标到抽查阶段，增加筛选指标的搜索条件
      if (row["processinstStatus"] === "random-assess") {
        this.kpiSearchFormItems.forEach(item => {
          if (item.name === "kpiFilter") {
            item.hideItem = false;
          }
        });
        this.kpiSearchFormSetting.formGroupValues.kpiFilter = "random"
      } else {
        this.kpiSearchFormItems.forEach(item => {
          if (item.name === "kpiFilter") {
            item.hideItem = true;
          }
        })
      }
      this.initKpiPageData();
      return;
    }
    // asmSchemeAssessedId  记录id
    // asmSchemeId 方案id
    // processinstId 流程id
    // taskId 任务节点id
    // userAction 操作
    // assessedOrgId 被考核办id
    // processinstStatus 流程状态
    let params = {
      asmSchemeId: row.asmSchemeId,
      asmSchemeAssessedId: row.asmSchemeAssessedId,
      processinstId: row.processinstId,
      // userAction: row["userActiveTasks"][0].userTaskActions[0].value,
      // taskId: row["userActiveTasks"][0].id,
      name: row.processStatus.text,
      assessedOrgId: row.assessedOrgId,
      processinstStatus: row.processinstStatus
    };
    if (row.userActiveTasks && row.userActiveTasks.length) {
      params.taskId = row.userActiveTasks[0].id;
    }
    // 发布部门结果
    if (flag.type === "release") {
      this.$confirm("请核对工作情况，操作后不能再做修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        params.userAction = "complete";
        this.$postData(this.$api.submitEvaluation, params).then(res => {
          if (res.data && res.data.msg) {
            // data有值说明是业务错
            // 自评直接提示错误，
            this.$message.warning("有未完成工作，不可以发布！");
            return;
          }
          this.$message.success("操作成功！");
          this.initPageData();
        });
      });
    }
    // 结束考核
    if (flag.type === "end") {
      this.$confirm("确定要结束考核吗", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        params.userAction = "complete";
        this.$postData(this.$api.childrenFlowEnd, params).then(() => {
          this.$message.success("操作成功！");
          this.initPageData();
        });
      });
    }
  },
  // 详情
  initKpiPageData() {
    let defaultdatas = this.kpiSearchFormSetting.formGroupValues;
    this.handleKpiSearchFormBtn(
      { postUrl: "distributeSuperviseList" },
      defaultdatas
    );
  },
  handleKpiSearchFormBtn(btns, formData) {
    if (btns.flag === "search") {
      this.kpiPaginationSettings.currentPage = 1;
    }
    if (btns.flag === "clear") {
      this.kpiPaginationSettings.currentPage = 1;
      formData = {};
      this.kpiSearchFormSetting.formGroupValues = {};
    }
    let options = {
      vm: this
    };
    // 筛选抽查阶段的指标
    if (formData.kpiFilter === "random") {
      btns.postUrl = "schemeKpiBySchemeId"
    } else {
      btns.postUrl = "distributeSuperviseList"
    }
    let baseForm = {
      page: this.kpiPaginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      assessObject: this.pageOperateType,
      code: this.pageType,
      asmSchemeId: this.singleData.asmSchemeId,
      assessedOrgId: this.singleData.assessedOrgId
    };
    let formDataObj = Object.assign(baseForm, formData);
    this.$searchformBtnAction(btns, formDataObj, options).then(data => {
      this.setKpiTableList(data);
    });
  },
  setKpiTableList(data) {
    let kpiList = this.$globalFnc.deepCopy(data.rows);
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
    this.formatKpiListData(kpiList, propObject);
    this.kpiTableSettings.tableDatas = kpiList;
    this.kpiPaginationSettings.totalNumbers = data.total;
    this.superviseDetailDialog.dialogVisible = true;
  },
  formatKpiListData(data, prop) {
    data.map(item => {
      // 被考核机构
      if (item.assessdOrg) {
        item["orgname"] = item.assessdOrg.orgname.replace(/考核办/g, "");
        // 被考核市县
        item.district = item.assessdOrg.district;
      }
      // 方案信息
      if (item.scheme) {
        item.scoreCheck_asmSchemeId = item["scheme"].asmSchemeId;
        item.issueNo = item["scheme"].issueNo;
        item.schemeName = item["scheme"].name;
        item.processStatus_dsp = item.scheme.processStatus.text;
      }
      // 方案指标信息
      if (item.schemeKpi) {
        item.asmSchemeKpiId = item["schemeKpi"].asmSchemeKpiId;
      }
      if (item.kpi) {
        item["asmKpiId"] = item.kpi.asmKpiId;
        item["kpiName"] = item.kpi.name;
        item["criteria"] = item.kpi.criteria;
        item["kpiScore"] = item.kpi.score;
        item["asmKpiIndexId"] = item.kpi.asmKpiIndexId;
      }
      //省牵头部门
      if (item.assessManageAssign) {
        item["assessedProvinceMOrgId__dsp"] =
          item.assessManageAssign.assessedOrgId__dsp;
        item["assessedProvinceMOrgId"] = item.assessManageAssign.assessedOrgId;
      }
      //省配合部门
      if (item.assessCooprateAssign) {
        let nameList = [];
        let valueList = [];
        item.assessCooprateAssign.forEach(cooprate => {
          nameList.push(cooprate.assessedOrgId__dsp);
          valueList.push(cooprate.assessedOrgId);
        });

        item["assessedProvinceCOrgId__dsp"] = nameList.join();
        item["assessedProvinceCOrgId"] = valueList;
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
      // 子流程信息
      if (item.assessed) {
        switch (item.assessed.processinstStatus) {
          case "kpi-assign":
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
            break;
          case "self-assess":
            // 自评状态
            if (item.selfAssess) {
              // 如果状态是1 说明是已经上报
              if (
                item.selfAssess.assess &&
                item.selfAssess.assess["status"] == "1"
              ) {
                item.status = "reported";
              } else {
                // 状态不是1 ，填写了自评信息状态是 “完成”
                if (item.selfAssess.shemeAssessKpi) {
                  item.status = "complete";
                } else {
                  // 状态不是1 ，没填写了自评信息状态是 “未完成”
                  item.status = "incomplete";
                }
              }
            } else {
              // 没有自评信息 状态 ”未完成“
              item.status = "incomplete";
            }
            break;
          case "higher-assess":
            // 部门评审状态
            if (item.higherAssess) {
              // 如果状态是1 说明是已经上报
              if (
                item.higherAssess.assess &&
                item.higherAssess.assess["status"] == "1"
              ) {
                item.status = "reported";
              } else {
                // 状态不是1 ，有部门信息状态是 “完成”
                if (item.higherAssess.shemeAssessKpi) {
                  item.status = "complete";
                } else {
                  // 状态不是1 ，没填写了自评信息状态是 “未完成”
                  item.status = "incomplete";
                }
              }
            } else {
              // 没有自评信息 状态 ”未完成“
              item.status = "incomplete";
            }
            break;
          case "random-assess":
            // 抽查状态
            if (item.randomAssess) {
              // 如果状态是1 说明是已经上报
              if (
                item.randomAssess.assess &&
                item.randomAssess.assess["status"] == "1"
              ) {
                item.status = "reported";
              } else {
                // 状态不是1 ，you 抽查信息状态是 “完成”
                if (item.randomAssess.shemeAssessKpi) {
                  item.status = "complete";
                } else {
                  // 状态不是1 ，没填写了自评信息状态是 “未完成”
                  item.status = "incomplete";
                }
              }
            } else {
              // 没有自评信息 状态 ”未完成“
              item.status = "incomplete";
            }
            break;
          case "end":
            item.status = "reported";
            break;
          default:
            // 流程没有到指标分配 自评，抽查，部门评审阶段
            item["status"] = "incomplete";
            break;
        }
      } else {
        // 没有子流程信息 状态 ”未完成“
        item.status = "incomplete";
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
      // 按钮
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // ignoreScore 表示已经上报 而且没有设置过， 他们都有扣分，加选择分数的操作
      if (
        item.ignoreScore &&
        item.department_score !== item.kpiScore &&
        item.spotCheck_score !== item.kpiScore
      ) {
        item[prop.name].unshift({
          text: "评分审核",
          type: "scoreCheck",
          class: "text-primary fontSize20 mr10",
          icon: "",
          isIcon: true
        });
      }
    });
  },
  // 分页
  handleKpiPaginationPagenumber(val) {
    this.kpiPaginationSettings.currentPage = val;
    this.initKpiPageData();
  },
  /**
   * 表格按钮事件
   */
  handleKpiTableRowButton(row, flag) {
    let defaultValues, formGroupList;
    /**
     * 查看
     */
    if (flag.type === "preview") {
      this.dialogFormBlockSettings.dialogFormTitle = "查看详情";
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(
          this.selfCooprateMessage,
          this.selfEvaluationMessage,
          this.departmentEvaluationMessage,
          this.spotCheckEvaluationMessage
        )
      );
      this.dialogFormBlockSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
      this.dialogFormBlockSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancle",
          label: "关闭",
          styleType: ""
        }
      ];
    }
    /**
     * 评分审核
     */
    if (flag.type === "scoreCheck") {
      this.dialogFormBlockSettings.dialogFormTitle = "评分审核";
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(
          this.selfCooprateMessage,
          this.selfEvaluationMessage,
          this.departmentEvaluationMessage,
          this.spotCheckEvaluationMessage,
          this.scoreCheckContentItems
        )
      );
      this.dialogFormBlockSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
      this.dialogFormBlockSettings.dialogFormItems.formButtonList = this.scoreCheckContentBtn;
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
    this.dialogFormBlockSettings.dialogFormItems.formGroupValues = defaultValues;
    this.dialogFormBlockSettings.dialogFormVisible = true;
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
          item.data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "name",
            "asmSchemeId"
          );
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
  /**
   *  弹框确定按钮
   */
  handleDialogForm(button, data) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    this.$postData(button.postUrl, data, true).then(() => {
      this.$message.success("操作成功！");
      // this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  },
  handleDialogFormBlock(button, data) {
    if (button.flag === "cancel") {
      this.dialogFormBlockSettings.dialogFormVisible = false;
      this.dialogFormBlockSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    // 目前就评分审核按钮 走这里
    let submitData = this.dealScoreCheckData(data);
    this.$postData(button.postUrl, submitData).then(() => {
      this.$message.success("操作成功！");
      this.initKpiPageData();
      this.dialogFormBlockSettings.dialogFormVisible = false;
      this.dialogFormBlockSettings.dialogFormItems.formGroupValues = {};
    });
  },
  dealScoreCheckData(data) {
    let params = {};
    params.asmSchemeId = data.scoreCheck_asmSchemeId;
    // 选部门 传抽查数据
    if (data.acceptScore === "1") {
      params.asmShemeAssessId = data["spotCheck_asmShemeAssessId"];
      params.asmShemeAssessKpiId = data["spotCheck_asmShemeAssessKpiId"];
    }
    // 选抽查   传部门数据
    if (data.acceptScore === "2") {
      params.asmShemeAssessId = data["department_asmShemeAssessId"];
      params.asmShemeAssessKpiId = data["department_asmShemeAssessKpiId"];
    }
    return params;
  }
};
export default methods;
