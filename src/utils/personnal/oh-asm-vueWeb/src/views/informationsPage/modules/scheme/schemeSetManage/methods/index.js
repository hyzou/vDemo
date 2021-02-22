const methods = {
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "muitScheme" }, defaultdatas);
  },
  /**
   * 搜索栏按钮点击事件
   */
  handleSearchFormBtn(btns, formData) {
    let options = {
      vm: this
    };
    let filterRules = [];
    if (formData && formData["issueNo"]) {
      filterRules.push({
        field: "issueNo",
        op: "contains",
        value: formData["issueNo"]
      });
      delete formData["issueNo"];
    }
    let params = {
      filterRules: JSON.stringify(filterRules),
      assessOrgId: this.$store.getters["user/userInfos"]["orgId"],
      type: this.pageType
    };
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let schemeList = this.$globalFnc.deepCopy(data.data);
    let propObject = {
      name: "operateBtns",
      porpvalue: []
    };
    this.formatData(schemeList, propObject);
    this.tableSettings.tableDatas = schemeList;
  },
  formatData(data, prop) {
    // 当前方案的机构id
    data.map(item => {
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 并且状态是刚创建的话才可以对方案操作
      if (item["processinstStatus"] === "create") {
        // 根节点添加一个修改方案按钮
        if (!item.parentId) {
          this.assessOrgId = item.assessOrgId;
          item[prop.name].push({
            text: "修改方案",
            type: "editScheme",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-edit-outline",
            isIcon: true
          });
          item[prop.name].push({
            text: "数据项设置",
            type: "dataSet",
            class: "text-primary fontSize20 mr10",
            icon: "iconfont iconshezhi",
            isIcon: true
          });
          item[prop.name].push({
            text: "删除方案",
            type: "deleteTarget",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-delete",
            isIcon: true
          });
        } else {
          // 有下级，并且下级不是类目，可以添加评分标准，因为可以有多个评分标准
          item.assessOrgId = this.assessOrgId;
          if (item.children && item.children[0].type !== "indexKpi") {
            item[prop.name].push({
              text: "添加指标",
              type: "addKpi",
              class: "text-primary fontSize20 mr10",
              icon: "el-icon-folder-add",
              isIcon: true
            });
          }
          // 评分标准可以删除和修改
          if (item.type === "kpi") {
            item[prop.name].push({
              text: "分配",
              type: "assignKpi",
              class: "text-primary fontSize20 mr10",
              icon: "el-icon-set-up",
              isIcon: true
            });
            item[prop.name].push({
              text: "删除指标",
              type: "deleteKpi",
              class: "text-primary fontSize20 mr10",
              icon: "el-icon-delete",
              isIcon: true
            });
          }
        }
      }
      // 没有parentId说明是根节点 allKpiAssigned表示已经分配
      if (
        !item.parentId &&
        item.allKpiAssigned &&
        item.allKpiAssigned === "true"
      ) {
        // 编辑流程信息
        if (
          item.processinstStatus === "self-assess" ||
          item.processinstStatus === "higher-assess" ||
          item.processinstStatus === "random-assess"
        ) {
          item[prop.name].push({
            text: "编辑流程",
            type: "editSchemePhases",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-edit-outline",
            isIcon: true
          });
        }
        // 查看流程信息
        item[prop.name].push({
          text: "查看流程",
          type: "lookSchemePhases",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        });
        // 流程
        if (item["userActiveTasks"]) {
          let flow = JSON.parse(item["userActiveTasks"]);
          if (flow && flow.length) {
            flow[0].userTaskActions.forEach((flowItem, flowIndex) => {
              item[prop.name].push({
                text: flowItem.text,
                value: flowItem.value,
                type: "flow" + flowIndex,
                flag: "flow",
                class: "text-primary fontSize20 mr10",
                icon: "iconfont iconflow",
                taskDefinitionKey: flow[0].taskDefinitionKey,
                isIcon: true
              });
            });
          }
        }
      }
      if (item.children) {
        this.formatData(item.children, prop);
      }
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    // 新增考核方案
    if (data.flag === "add") {
      this.schemeOperateDialog.dialogVisible = true;
      this.schemeOperateDialog.dialogName = "新增考核方案";
      this.schemeOperateDialog.formButtonList = this.addSchemeContentButton;
      this.schemeFormOperateSettings.formGroupList = this.setDictList(
        this.$globalFnc.deepCopy(this.schemeContentItems)
      );
      // 获取基础数据 年度考核所有的指标
      this.$getData(this.$api.getKpiTree, { code: this.pageType }).then(res => {
        this.schemeTreeOperateSettings.treeData = res;
      });
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
  /**
   *  表格按钮事件
   */
  handleTableRowButton(row, btns) {
    let formGroupList;
    /**
     *  开启流程
     */
    if (btns.flag && btns.flag === "flow") {
      // asmSchemeId 方案id
      // processinstId 流程id
      // taskId 任务节点id
      // userAction 操作
      let params = {
        asmSchemeId: row["asmSchemeId"],
        processinstId: row["processinstId"],
        userAction: btns.value,
        taskId: JSON.parse(row["userActiveTasks"])[0].id,
        name: btns.text
      };
      if (
        btns.taskDefinitionKey === "create" &&
        (btns.value === "submit" || btns.value === "pass")
      ) {
        delete params["name"];
        // 开启征询
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormTitle = btns.text;
        formGroupList = [].concat(this.processId, this.consultDateContentItems);
        this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList.map(
          item => {
            if (item.name === "name") {
              item.hideItem = true;
            }
            return item;
          }
        );
        this.dialogFormSettings.dialogFormItems.formButtonList = this.consultDateContentButton;
        this.dialogFormSettings.dialogFormItems.formGroupValues = params;
      } else if (
        btns.taskDefinitionKey === "routine-supervision" &&
        btns.value === "complete"
      ) {
        // 开启自评
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormTitle = btns.text;
        // 当前的流程节点
        this.processinstStatus = "self-assess";
        formGroupList = [].concat(
          this.processId,
          this.selfEvaluationContentItems
        );
        this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.evaluationContentButton;
        this.dialogFormSettings.dialogFormItems.formGroupValues = params;
      } else if (
        btns.taskDefinitionKey === "self-assess" &&
        btns.value === "complete"
      ) {
        // 开启部门评审
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormTitle = btns.text;
        // 当前的流程节点
        this.processinstStatus = "higher-assess";
        formGroupList = [].concat(
          this.processId,
          this.departmentEvaluationContentItems
        );
        this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.evaluationContentButton;
        this.dialogFormSettings.dialogFormItems.formGroupValues = params;
      } else if (
        btns.taskDefinitionKey === "higher-assess" &&
        btns.value === "submit"
      ) {
        // 开启抽查
        this.dialogFormSettings.dialogFormTitle = btns.text;
        formGroupList = [].concat(this.processId, this.spotCheckContentItems);
        this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
          formGroupList,
          row["asmSchemeId"]
        );
        params.updatedPhaseAcls = [
          {
            leader: [],
            members: [],
            assessedOrgs: [],
            attention: "",
            focus: ""
          }
        ];
        this.dialogFormSettings.dialogFormItems.formButtonList = this.spotCheckContentButton;
        this.dialogFormSettings.dialogFormItems.formGroupValues = params;
        setTimeout(() => {
          this.dialogFormSettings.dialogFormVisible = true;
        }, 500);
      } else {
        // 流程流转
        this.$confirm("确认" + btns.text, "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          delete params["name"];
          this.$postData(this.$api.flow, params, true).then(() => {
            this.$message.success("操作成功！");
            this.initPageData();
          });
        });
      }
    }
    /**
     *  数据项设置
     */
    if (btns.type === "dataSet") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormTitle = "数据项设定";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.dataSetContentButton;
      // 获取特殊项设置列表
      this.$getData(this.$api.specialSettingList, {
        schemeId: row["asmSchemeId"],
        type: this.pageType
      }).then(res => {
        this.specialSettingValue = res.data;
        let dataSetData = this.$globalFnc.deepCopy(res.data);
        // 头部
        let dataSetTableHeader = [
          {
            key: "name",
            title: "指标项名称",
            disabled: true,
            inputType: "input",
            width: "150"
          }
        ];
        dataSetData.assessedOrgs.forEach(item => {
          let obj = {};
          obj.title = item.text;
          obj.key = item.value;
          obj.inputType = "input";
          dataSetTableHeader.push(obj);
        });
        // 处理默认值
        dataSetData.vars.forEach(item => {
          item["name"] = item.text;
          dataSetData.allotInfos.forEach(infoItem => {
            if (item["value"] == infoItem["asmKpiVarId"]) {
              item[infoItem.assessedOrgId] = infoItem["targetValue"];
            }
          });
        });
        this.dataSetContentItems[0].children[0].headers = dataSetTableHeader;
        this.dialogFormSettings.dialogFormItems.formGroupList = this.dataSetContentItems;
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          targetParams: dataSetData.vars
        };
      });
    }
    /**
     *  修改方案
     */
    if (btns.type === "editScheme") {
      this.schemeOperateDialog.dialogVisible = true;
      this.schemeOperateDialog.dialogName = "编辑考核方案";
      this.schemeOperateDialog.formButtonList = this.editSchemeContentButton;
      this.schemeFormOperateSettings.formGroupList = this.setDictList(
        this.$globalFnc.deepCopy(this.schemeContentItems),
        "",
        "edit"
      );
      // 获取基础数据 年度考核所有的指标
      this.$getData(this.$api.getKpiTree, { code: this.pageType }).then(res => {
        this.schemeTreeOperateSettings.treeData = res;
      });
      // 获取回显数据
      this.$getData(this.$api.singleScheme, {
        schemeId: row["asmSchemeId"]
      }).then(res => {
        let defaultData = this.$globalFnc.deepCopy(res.data);
        defaultData.year = defaultData["issueNo"].substring(0, 4);
        defaultData.startDt = this.$globalFnc.dateStampFormat(
          res.data.startDt,
          "ymd"
        );
        defaultData.endDt = this.$globalFnc.dateStampFormat(
          res.data.endDt,
          "ymd"
        );
        this.handleLinkSelect("assessStrategy", defaultData.assessStrategy);
        this.schemeTreeOperateSettings.checkedTreeData = defaultData.kpiIds;
        this.schemeFormOperateSettings.formGroupValues = defaultData;
      });
    }
    /**
     *  查看方案流程详情
     */
    if (btns.type === "lookSchemePhases") {
      this.dialogFormSettings.dialogFormTitle = "方案流程详情";
      this.$getData(this.$api.schemePhases, {
        schemeId: row["asmSchemeId"]
      }).then(res => {
        let schemeDetailData = this.$globalFnc.deepCopy(res.data);
        // form设置
        formGroupList = [].concat(this.schemeMessageItems);
        // 处理时间
        schemeDetailData.year = schemeDetailData["issueNo"].substring(0, 4);
        schemeDetailData.startDt = this.$globalFnc.dateStampFormat(
          res.data.startDt,
          "ymd"
        );
        schemeDetailData.endDt = this.$globalFnc.dateStampFormat(
          res.data.endDt,
          "ymd"
        );
        // 指标征询
        if (
          schemeDetailData["consultePhases"] &&
          schemeDetailData["consultePhases"].length
        ) {
          // 添加征询阶段form
          formGroupList = formGroupList.concat(this.consulteMessageItems);

          // 时间转换
          schemeDetailData["consultePhases"].forEach(item => {
            item.startDate = this.$globalFnc.dateStampFormat(
              item.startDt,
              "ymd"
            );
            item.endDate = this.$globalFnc.dateStampFormat(item.endDt, "ymd");
          });
        }
        if (schemeDetailData["phases"] && schemeDetailData["phases"].length) {
          schemeDetailData["phases"].forEach(phasesItem => {
            if (phasesItem.type === "1") {
              // 增加自评阶段form
              formGroupList = formGroupList.concat(
                this.selfEvaluationContentItems
              );
              // 字段转换
              schemeDetailData.selfStartDate = this.$globalFnc.dateStampFormat(
                phasesItem.startDt,
                "ymd"
              );
              schemeDetailData.selfEndDate = this.$globalFnc.dateStampFormat(
                phasesItem.endDt,
                "ymd"
              );
              schemeDetailData.selfCooperateEndDate = this.$globalFnc.dateStampFormat(
                phasesItem.cooperateEndDt,
                "ymd"
              );
              schemeDetailData.selfWeight = phasesItem.weight;
            }
            if (phasesItem.type === "2") {
              // 增加部门评审阶段form
              formGroupList = formGroupList.concat(
                this.departmentEvaluationContentItems
              );
              // 字段转换
              schemeDetailData.departmentStartDate = this.$globalFnc.dateStampFormat(
                phasesItem.startDt,
                "ymd"
              );
              schemeDetailData.departmentEndDate = this.$globalFnc.dateStampFormat(
                phasesItem.endDt,
                "ymd"
              );
              schemeDetailData.departmentWeight = phasesItem.weight;
            }
            if (phasesItem.type === "3") {
              // 增加抽查阶段form
              formGroupList = formGroupList.concat(this.spotCheckContentItems);
              // 字段转换
              schemeDetailData.spotCheckStartDate = this.$globalFnc.dateStampFormat(
                phasesItem.startDt,
                "ymd"
              );
              schemeDetailData.spotCheckEndDate = this.$globalFnc.dateStampFormat(
                phasesItem.endDt,
                "ymd"
              );
              schemeDetailData.spotCheckWeight = phasesItem.weight;
              // 抽查组
              schemeDetailData.updatedPhaseAcls = phasesItem.updatedPhaseAcls;
              // 指标
              schemeDetailData.asmKpiIds = phasesItem.asmKpiIds;
            }
          });
        }
        // 表单
        this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
          this.$globalFnc.deepCopy(formGroupList),
          row["asmSchemeId"],
          "look"
        );
        // 表单赋值
        this.dialogFormSettings.dialogFormItems.formGroupValues = schemeDetailData;
        this.dialogFormSettings.dialogFormItems.formButtonList = [
          {
            flag: "cancel",
            label: "关闭"
          }
        ];
        setTimeout(() => {
          this.dialogFormSettings.dialogFormVisible = true;
        }, 200);
      });
    }
    /**
     *  编辑流程详情
     */
    if (btns.type === "editSchemePhases") {
      this.dialogFormSettings.dialogFormTitle = "编辑方案流程信息";
      this.$getData(this.$api.schemePhases, {
        schemeId: row["asmSchemeId"]
      }).then(res => {
        let schemeDetailData = this.$globalFnc.deepCopy(res.data);
        // form设置
        formGroupList = [].concat(
          this.setDictList(
            this.$globalFnc.deepCopy(this.schemeMessageItems),
            "",
            "look"
          )
        );
        // 处理时间
        schemeDetailData.year = schemeDetailData["issueNo"].substring(0, 4);
        schemeDetailData.startDt = this.$globalFnc.dateStampFormat(
          res.data.startDt,
          "ymd"
        );
        schemeDetailData.endDt = this.$globalFnc.dateStampFormat(
          res.data.endDt,
          "ymd"
        );
        // 指标征询
        if (
          schemeDetailData["consultePhases"] &&
          schemeDetailData["consultePhases"].length
        ) {
          // 添加征询阶段form
          formGroupList = formGroupList.concat(this.consulteMessageItems);

          // 时间转换
          schemeDetailData["consultePhases"].forEach(item => {
            item.startDate = this.$globalFnc.dateStampFormat(
              item.startDt,
              "ymd"
            );
            item.endDate = this.$globalFnc.dateStampFormat(item.endDt, "ymd");
          });
        }
        // 开启自评，开启部门评审，开启抽查
        if (schemeDetailData["phases"] && schemeDetailData["phases"].length) {
          schemeDetailData["phases"].forEach(phasesItem => {
            // 自评
            if (phasesItem.type === "1") {
              // 字段转换
              schemeDetailData.selfStartDate = this.$globalFnc.dateStampFormat(
                phasesItem.startDt,
                "ymd"
              );
              schemeDetailData.selfEndDate = this.$globalFnc.dateStampFormat(
                phasesItem.endDt,
                "ymd"
              );
              schemeDetailData.selfCooperateEndDate = this.$globalFnc.dateStampFormat(
                phasesItem.cooperateEndDt,
                "ymd"
              );
              schemeDetailData.selfWeight = phasesItem.weight;
              schemeDetailData.self_asmShemeAssessPhaseId =
                phasesItem.asmShemeAssessPhaseId;
            }
            // 部门
            if (phasesItem.type === "2") {
              // 字段转换
              schemeDetailData.departmentStartDate = this.$globalFnc.dateStampFormat(
                phasesItem.startDt,
                "ymd"
              );
              schemeDetailData.departmentEndDate = this.$globalFnc.dateStampFormat(
                phasesItem.endDt,
                "ymd"
              );
              schemeDetailData.departmentWeight = phasesItem.weight;
              schemeDetailData.department_asmShemeAssessPhaseId =
                phasesItem.asmShemeAssessPhaseId;
            }
            // 抽查
            if (phasesItem.type === "3") {
              // 字段转换
              schemeDetailData.spotCheckStartDate = this.$globalFnc.dateStampFormat(
                phasesItem.startDt,
                "ymd"
              );
              schemeDetailData.spotCheckEndDate = this.$globalFnc.dateStampFormat(
                phasesItem.endDt,
                "ymd"
              );
              schemeDetailData.spotCheckWeight = phasesItem.weight;
              // 抽查组
              schemeDetailData.updatedPhaseAcls = phasesItem.updatedPhaseAcls;
              // 指标
              schemeDetailData.asmKpiIds = phasesItem.asmKpiIds;
              schemeDetailData.spotCheck_asmShemeAssessPhaseId =
                phasesItem.asmShemeAssessPhaseId;
            }
          });
        }
        // 当前的流程节点
        this.processinstStatus = row["processinstStatus"];
        switch (row["processinstStatus"]) {
          case "self-assess":
            // 自评
            formGroupList = formGroupList.concat(
              this.$globalFnc.deepCopy(
                this.setDictList(this.selfEvaluationContentItems)
              )
            );
            break;
          case "higher-assess":
            // 部门
            formGroupList = formGroupList.concat(
              this.$globalFnc.deepCopy(
                this.setDictList(this.selfEvaluationContentItems, "", "look")
              )
            );
            formGroupList = formGroupList.concat(
              this.$globalFnc.deepCopy(
                this.setDictList(this.departmentEvaluationContentItems)
              )
            );
            break;
          case "random-assess":
            // 抽查
            formGroupList = formGroupList.concat(
              this.$globalFnc.deepCopy(
                this.setDictList(this.selfEvaluationContentItems, "", "look")
              )
            );
            formGroupList = formGroupList.concat(
              this.$globalFnc.deepCopy(
                this.setDictList(
                  this.departmentEvaluationContentItems,
                  "",
                  "look"
                )
              )
            );
            formGroupList = formGroupList.concat(
              this.setDictList(this.spotCheckContentItems, row["asmSchemeId"])
            );
            break;
        }
        // 表单
        this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
        // 表单赋值
        this.dialogFormSettings.dialogFormItems.formGroupValues = schemeDetailData;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.editPhasesButton;
        setTimeout(() => {
          this.dialogFormSettings.dialogFormVisible = true;
        }, 300);
      });
    }
    /**
     *  删除方案
     */
    if (btns.type === "deleteTarget") {
      this.$confirm("确认删除该方案？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.deleteScheme, {
          schemeId: row["asmSchemeId"]
        }).then(() => {
          this.$message.success("删除成功!");
          this.initPageData();
        });
      });
    }
    /**
     *  新建指标
     */
    if (btns.type === "addKpi") {
      this.dialogFormSettings.dialogFormTitle = "新增指标";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addKpiItemButton;

      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        this.kpiContentItems,
        row["kpiId"]
      );
      let defaultDialogValues = {};
      // 往哪个类目底下增加
      defaultDialogValues.asmKpiIndexId = row["kpiId"];
      // 方案id
      defaultDialogValues.asmSchemeId = row["asmSchemeId"];
      // 特殊区域分值
      defaultDialogValues.specialCityScore = [
        {
          areaCode: "",
          score: ""
        }
      ];
      //  指标数据项
      defaultDialogValues.targetParams = [
        {
          name: "",
          code: "",
          unit: ""
        }
      ];
      // 是否公开，默认公开
      defaultDialogValues.shared = "Y";
      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
      this.dialogFormSettings.dialogFormVisible = true;
    }
    /**
     * 分配指标
     */
    if (btns.type === "assignKpi") {
      this.dialogFormSettings.dialogFormTitle = "分配指标";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.assignKpiButton;
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.assignCityItem)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["kpiIndexId"]
      );
      // 获取回显的数据
      this.$getData(this.$api.singleKpi, {
        schemeKpiId: row["schemeKpiId"]
      }).then(res => {
        if (res.data) {
          let defaultValues = this.$globalFnc.deepCopy(res.data);
          defaultValues.asmSchemeKpiId = row["schemeKpiId"];
          defaultValues["criteria"] = res.data["kpiCriteria"];
          // 牵头部门
          if (res.data.manageOrg) {
            defaultValues.manageOrg_MD = res.data.manageOrg.assessedOrgId;
            // 老数据
            defaultValues.old_manageOrg_MD =
              res.data.manageOrg["asmSchemeKpiAssignId"];
          }
          // 配合部门
          if (res.data.cooprateOrgs && res.data.cooprateOrgs.length) {
            defaultValues.cooprateOrgs_CD = res.data.cooprateOrgs.map(item => {
              return item.assessedOrgId;
            });
            // 保存老的
            defaultValues.old_cooprateOrgs_CD = res.data.cooprateOrgs
              .map(item => {
                return item.asmSchemeKpiAssignId;
              })
              .join(",");
          }
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
        }
      });
      this.dialogFormSettings.dialogFormVisible = true;
    }
    /**
     * 删除指标
     */
    if (btns.type === "deleteKpi") {
      this.$confirm("确认删除？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.deleteKpi, [row["schemeKpiId"]], true).then(
          () => {
            this.$message.success("删除成功!");
            this.initPageData();
          }
        );
      });
    }
  },
  /**
   *  设置字典表的值
   */
  setDictList(data, id, type) {
    data.forEach(item => {
      if (item.name === "assessStrategy") {
        // 评分策略
        this.$getData(this.$api.dictList, {
          _refKey: "dict",
          busintypeid: "asm_assess_strategy"
        }).then(res => {
          // 年度考核方案，字典不需要不计分
          if (this.pageType === "1") {
            res.forEach((item, index) => {
              if (item.value === "notScored") {
                res.splice(index, 1);
              }
            });
          }
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 指标类目树
      if (item.name === "kpiIndextree") {
        this.$getData(this.$api.getKpiIndexTree, { asmKpiIndexId: id }).then(
          res => {
            item.treeSettings.treeData = res;
          }
        );
      }
      // 牵头部门， 配合部门
      if (
        item.name === "manageOrg_MD" ||
        item.name === "cooprateOrgs_CD" ||
        item.name === "manageOrg" ||
        item.name === "cooprateOrgs"
      ) {
        this.$getData(this.$api.dictList, {
          _refKey: "org",
          orgtypeid: "202",
          parentorgid: this.$store.getters["user/userInfos"].orgId,
          status: "1"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 市县
      if (item.name === "district") {
        item.hideItem = true;
      }
      // 指标
      if (item.name === "asmKpiIds") {
        this.$getData(this.$api.getKpiSelect, { schemeId: id }).then(res => {
          item.data = res.data.map(item => {
            item.label = item.text;
            item.value = Number(item.value);
            return item;
          });
        });
      }
      // 成员
      if (item.name === "specialCityScore") {
        this.$getData(this.$api.userCity, {
          sysParentcode: this.$store.getters["user/userInfos"]["distrinct"]
        }).then(res => {
          item.headers[0].data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "name",
            "code"
          );
        });
      }
      // 城市赋值
      if (item.name === "specialCityScore") {
        this.$getData(this.$api.userCity, {
          sysParentcode: this.$store.getters["user/userInfos"]["distrinct"]
        }).then(res => {
          item.headers[0].data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "name",
            "code"
          );
        });
      }
      // 抽查组
      if (item.name === "updatedPhaseAcls") {
        // 抽查对象
        this.$getData(this.$api.getSchemeAssessedRef, {
          asmSchemeId: id
        }).then(res => {
          item.headers[2].data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "assessedOrgId__dsp",
            "assessedOrgId"
          );
        });
        // 抽查人员
        this.$getData(this.$api.getOperators, {
          asmSchemeId: id
        }).then(res => {
          item.headers[1].data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "operatorname",
            "operatorid"
          );
          item.headers[0].data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "operatorname",
            "operatorid"
          );
        });
      }
      // 编辑不需要 是否引用方案
      if (type === "edit" && item.name === "isQuote") {
        item.hideItem = true;
      }
      // 查看禁用
      if (type === "look") {
        item.disabled = true;
        // 查看不需要选择引用方案
        if (item.name === "isQuote") {
          item.hideItem = true;
        }
        // 流程节点
        if (item.name === "processinstStatus__dsp") {
          item.hideItem = false;
        }
      }
      if (item.children) {
        this.setDictList(item.children, id, type);
      }
    });
    return data;
  },
  /**
   *  新增方案事件
   */
  handleSaveScheme(btn) {
    if (btn.flag === "save") {
      let formData;
      this.$refs.schemeForm.$refs["formItems"].validate(valid => {
        if (valid) {
          formData = this.$refs.schemeForm.formGroupSettings.formGroupValues;
        }
      });
      // let formData = this.$refs.schemeForm.onSubmit({}, "formItems", true);
      if (!formData) {
        return;
      }
      //  新增方案
      if (!formData.isQuote || formData.isQuote == "0") {
        let treeSelect = this.$refs.schemeTree.$refs.tree.getCheckedNodes();
        if (!treeSelect.length) {
          this.$message.warning("请选择考核指标");
          return;
        }
        let dafaultValue = {
          type: this.pageType,
          assessOrgId: this.$store.getters["user/userInfos"].orgId,
          startDt: this.$moment(formData["startDt"]).valueOf(),
          endDt: this.$moment(formData["endDt"]).valueOf()
        };
        // 只需要kpi的id
        treeSelect.forEach(treeItem => {
          if (treeItem["pk"]) {
            treeItem.asmKpiId = treeItem["pk"];
          }
        });
        let treeSelectFilter = treeSelect.filter(item => {
          return item.type === "KPI";
        });
        let params = Object.assign({}, formData, dafaultValue);
        if (formData.asmSchemeId) {
          // 有方案 id， 说明是编辑
          // 删除
          let deleteKpiIds = this.getDeleteKpiIds(
            treeSelectFilter,
            formData.kpiIds
          );
          params.deleteKpiIds = deleteKpiIds;
          // 新增
          let kpiInfos = this.getKpiInfos(formData.kpiIds, treeSelectFilter);
          params.kpiInfos = kpiInfos;
        } else {
          params.kpiInfos = treeSelectFilter;
        }
        this.$postData(btn.postUrl, params, true).then(() => {
          this.$message.success("保存成功！");
          this.initPageData();
          this.schemeFormOperateSettings.formGroupValues = {};
          this.schemeOperateDialog.dialogVisible = false;
          // 指标树清空
          this.schemeTreeOperateSettings.checkedTreeData = [];
        });
      }
      // 引用方案
      if (formData.isQuote == "1") {
        if (!this.selectSchemeId.length) {
          this.$message.warning("请先选择引用的方案");
          return;
        }
        if (this.selectSchemeId.length > 1) {
          this.$message.warning("只可以引用一套方案");
          return;
        }
        let dafaultValue = {
          type: this.pageType,
          assessOrgId: this.$store.getters["user/userInfos"].orgId,
          startDt: this.$moment(formData["startDt"]).valueOf(),
          endDt: this.$moment(formData["endDt"]).valueOf()
        };
        let params = Object.assign(
          {},
          formData,
          { asmSchemeId: this.selectSchemeId[0] },
          dafaultValue
        );
        this.$postData(this.$api.addQuoteScheme, params, true).then(() => {
          this.$message.success("保存成功！");
          this.initPageData();
          this.schemeFormOperateSettings.formGroupValues = {};
          this.schemeOperateDialog.dialogVisible = false;
          // 建立方案的状态改为新建
          this.addSchemeType = "add";
          // 引用方案时的选择清空
          this.selectSchemeId = [];
        });
      }
    }
    if (btn.flag === "cancel") {
      this.schemeFormOperateSettings.formGroupValues = {};
      this.schemeOperateDialog.dialogVisible = false;
      this.schemeTreeOperateSettings.checkedTreeData = [];
      this.addSchemeType = "add";
      // 引用方案时的选择清空
      this.selectSchemeId = [];
    }
  },
  // 找出俩个数组不同的元素
  getDeleteKpiIds(array1, array2) {
    let result = [];
    for (let i = 0; i < array2.length; i++) {
      let flag = false;
      for (let j = 0; j < array1.length; j++) {
        let obj = array1[j];
        let arr2AsmKpiId = obj.asmKpiId;
        if (array2[i] == arr2AsmKpiId) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        result.push(array2[i]);
      }
    }
    return result;
  },
  getKpiInfos(array1, array2) {
    let result = [];
    for (let i = 0; i < array2.length; i++) {
      let obj = array2[i];
      let arr2AsmKpiId = obj.asmKpiId;
      let flag = false;
      for (let j = 0; j < array1.length; j++) {
        if (array1[j] == arr2AsmKpiId) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        result.push(obj);
      }
    }
    return result;
  },
  /**
   *  引用方案 表格事件
   */
  handleQuoteSchemeTableRowButton(row, btn) {
    // 查看历史方案详情
    if (btn.type === "look") {
      this.quoteSchemeDetailDialog.dialogVisible = true;
      this.initQuoteSchemeDetailPageData(row["asmSchemeId"]);
    }
  },
  // 获取历史方案详情
  initQuoteSchemeDetailPageData(id) {
    let formData = {
        asmSchemeId: id
      },
      url = { postUrl: "muitScheme" },
      options = {
        vm: this
      };
    this.$searchformBtnAction(url, formData, options).then(data => {
      this.quoteSchemeDetailTableSettings.tableDatas = this.$globalFnc.deepCopy(
        data.data
      );
    });
  },
  // 引用方案列表
  initQuoteSchemePageData() {
    let formData = {
        page: this.quoteSchemePaginationSettings.currentPage,
        rows: this.$global.paginationOption.numberPerpage,
        type: this.pageType
      },
      url = { postUrl: "quoteSchemeList" },
      options = {
        vm: this
      };
    this.$searchformBtnAction(url, formData, options).then(data => {
      this.setQuoteSchemeTableList(data);
    });
  },
  setQuoteSchemeTableList(data) {
    let schemeList = this.$globalFnc.deepCopy(data.rows);
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
    schemeList.map(item => {
      item["operateBtns"] = this.$globalFnc.deepCopy(propObject.porpvalue);
    });
    this.quoteSchemeTableSettings.tableDatas = schemeList;
    this.quoteSchemePaginationSettings.totalNumbers = data.total;
  },
  // 分页
  handleQuoteSchemePaginationPagenumber(num) {
    this.quoteSchemeTableSettings.tableDatas = [];
    this.quoteSchemePaginationSettings.currentPage = num;
    this.initQuoteSchemePageData();
  },
  // 引用方案 表格选择事件
  handleQuoteSchemeSelectionChange(data) {
    this.selectSchemeId = [];
    if (data && data.length) {
      data.forEach(item => {
        this.selectSchemeId.push(item.asmSchemeId);
      });
    }
  },
  /**
   *  下拉change 事件
   */
  handleLinkSelect(type, data) {
    // 新增引用
    if (type === "isQuote") {
      if (data == "1") {
        this.addSchemeType = "quote";
        this.quoteSchemePaginationSettings.currentPage = 1;
        this.initQuoteSchemePageData();
      } else {
        this.addSchemeType = "add";
      }
    }
    // 总分显示隐藏
    if (type === "assessStrategy") {
      let formGroupList = this.schemeFormOperateSettings.formGroupList;
      formGroupList.map(item => {
        if (item.name === "grossScore") {
          data === "notScored"
            ? (item.hideItem = true)
            : (item.hideItem = false);
        }
      });
    }
    // 特定市分值设定表显示隐藏
    if (type === "isOpenSpecialCity") {
      this.kpiContentItems.map(item => {
        if (item.name === "kpi") {
          item.children.map(childItem => {
            if (childItem.name === "specialCityScore") {
              data == "1"
                ? this.$set(childItem, "hideItem", false)
                : this.$set(childItem, "hideItem", true);
            }
          });
        }
      });
    }
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
    if (button.flag === "kpiSave") {
      // 指标保存特殊处理
      submitData = this.dealKpiData(submitData);
    }
    if (button.flag === "assignKpiSave") {
      // 分配部门特殊处理
      submitData = this.dealAssignKpiData(submitData);
    }
    if (button.flag === "dataSetSave") {
      // 特殊项设置特殊处理
      submitData = this.dealSpecialSettingData(submitData);
    }
    if (button.flag === "startConsulte") {
      // 开启征询
      if (submitData["startDate"]) {
        submitData.startDt = this.$moment(submitData["startDate"]).valueOf();
      }
      if (submitData["endDate"]) {
        submitData.endDt = this.$moment(submitData["endDate"]).valueOf();
      }
      delete submitData["startDate"];
      delete submitData["endDate"];
    }
    if (button.flag === "startEvaluation") {
      // 自评信息
      if (this.processinstStatus === "self-assess") {
        submitData.startDt = this.$moment(
          submitData["selfStartDate"]
        ).valueOf();
        submitData.endDt = this.$moment(submitData["selfEndDate"]).valueOf();
        submitData.cooperateEndDt = this.$moment(
          submitData["selfCooperateEndDate"]
        ).valueOf();
        submitData.weight = submitData["selfWeight"];
      }
      // 部门评审信息
      if (this.processinstStatus === "higher-assess") {
        submitData.startDt = this.$moment(
          submitData["departmentStartDate"]
        ).valueOf();
        submitData.endDt = this.$moment(
          submitData["departmentEndDate"]
        ).valueOf();
        submitData.weight = submitData["departmentWeight"];
      }
      submitData.scheme = {
        asmSchemeId: submitData["asmSchemeId"],
        processinstId: submitData["processinstId"],
        userAction: submitData["userAction"],
        taskId: submitData["taskId"]
      };
    }
    if (button.flag === "startSpotCheck") {
      // 开启抽查
      submitData.startDt = this.$moment(
        submitData["spotCheckStartDate"]
      ).valueOf();
      submitData.endDt = this.$moment(submitData["spotCheckEndDate"]).valueOf();
      submitData.weight = submitData["spotCheckWeight"];
      submitData.scheme = {
        asmSchemeId: submitData["asmSchemeId"],
        processinstId: submitData["processinstId"],
        userAction: submitData["userAction"],
        taskId: submitData["taskId"]
      };
    }
    if (button.flag === "editPhases") {
      submitData = this.dealEditPhasesData(submitData);
    }

    this.$postData(button.postUrl, submitData, true).then(() => {
      this.$message.success("操作成功！");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  },
  /**
   *  处理指标保存数据格式
   */
  dealKpiData(data) {
    // 后台需要的接收参数
    let params = {},
      kpiInfos = {},
      kpiDto = {},
      kpi = {},
      manageOrg = {},
      cooprateOrgsList = [];
    // 牵头部门
    manageOrg.type = this.$global.SCHEME_KPIASSIGN_TYPE_MD;
    manageOrg.assessedOrgId = data.manageOrg;
    manageOrg.assessOrgId = this.$store.getters["user/userInfos"].orgId;
    // 配合部门
    if (data.cooprateOrgs && data.cooprateOrgs.length) {
      data.cooprateOrgs.forEach(item => {
        let obj = {};
        obj.type = this.$global.SCHEME_KPIASSIGN_TYPE_CD;
        obj.assessedOrgId = item;
        obj.assessOrgId = this.$store.getters["user/userInfos"].orgId;
        cooprateOrgsList.push(obj);
      });
    }

    // 指标配置项保存对象
    kpi = Object.assign({}, data, {
      assessOrgId: this.$store.getters["user/userInfos"].orgId
    });
    delete kpi.specialCityScore;
    delete kpi.targetParams;
    delete kpi.cooprateOrgs;
    delete kpi.manageOrg;
    delete kpi.asmSchemeId;

    if (data.targetParams && data.targetParams.length) {
      kpiDto.addKpiVarList = data.targetParams.filter(item => {
        return item.name;
      });
    } else {
      kpiDto.addKpiVarList = [];
    }
    kpiDto.addKpiAreaScore = data.specialCityScore;
    kpiDto.kpi = kpi;

    kpiInfos.kpiDto = kpiDto;
    kpiInfos.manageOrg = manageOrg;
    kpiInfos.cooprateOrgs = cooprateOrgsList;

    params.asmSchemeId = data.asmSchemeId;
    params.kpiInfos = [kpiInfos];
    return params;
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
  },
  // 数据项设定数据处理
  dealSpecialSettingData(data) {
    let dataSet = this.$globalFnc.deepCopy(this.specialSettingValue);
    dataSet.allotInfos.forEach(item => {
      data["targetParams"].forEach(dataItem => {
        for (let key in dataItem) {
          if (
            item["assessedOrgId"] === key &&
            item["asmKpiVarId"] == dataItem["value"]
          ) {
            item.targetValue = Number(dataItem[key]);
          }
        }
      });
    });
    return dataSet.allotInfos;
  },
  // 处理方案流程信息编辑
  dealEditPhasesData(submitData) {
    let params = {};
    switch (this.processinstStatus) {
      case "self-assess":
        // 自评
        params.startDt = this.$moment(submitData["selfStartDate"]).valueOf();
        params.endDt = this.$moment(submitData["selfEndDate"]).valueOf();
        params.cooperateEndDt = this.$moment(
          submitData["selfCooperateEndDate"]
        ).valueOf();
        params.weight = submitData["selfWeight"];
        params.asmShemeAssessPhaseId = submitData["self_asmShemeAssessPhaseId"];
        params.type = "1";
        break;
      case "higher-assess":
        // 部门
        params.startDt = this.$moment(
          submitData["departmentStartDate"]
        ).valueOf();
        params.endDt = this.$moment(submitData["departmentEndDate"]).valueOf();
        params.weight = submitData["departmentWeight"];
        params.asmShemeAssessPhaseId =
          submitData["department_asmShemeAssessPhaseId"];
        params.type = "2";
        break;
      case "random-assess":
        // 抽查
        params.asmKpiIds = submitData.asmKpiIds;
        params.updatedPhaseAcls = submitData.updatedPhaseAcls;
        params.startDt = this.$moment(
          submitData["spotCheckStartDate"]
        ).valueOf();
        params.endDt = this.$moment(submitData["spotCheckEndDate"]).valueOf();
        params.weight = submitData["spotCheckWeight"];
        params.asmShemeAssessPhaseId =
          submitData["spotCheck_asmShemeAssessPhaseId"];
        params.type = "3";
        break;
    }
    return params;
  }
};
export default methods;
