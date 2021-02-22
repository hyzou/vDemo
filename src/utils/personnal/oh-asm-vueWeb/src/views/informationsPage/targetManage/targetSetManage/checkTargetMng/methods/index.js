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

      item.name = item.kpiSerialNo__dsp
        ? item.kpiSerialNo__dsp + " " + item.name
        : item.name;

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
            icon: "",
            isIcon: true
          });
          item[prop.name].push({
            text: "删除方案",
            type: "deleteTarget",
            class: "text-primary fontSize20 mr10",
            icon: "",
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

            // item[prop.name].push({
            //   text: "添加数据项",
            //   type: "addDataItems",
            //   class: "text-primary fontSize20 mr10",
            //   icon: "el-icon-folder-add",
            //   isIcon: true
            // });
          }
          // 指标可以删除和修改
          if (item.type === "kpi") {
            item[prop.name].push({
              text: "分配",
              type: "assignKpi",
              class: "text-primary fontSize20 mr10",
              icon: "el-icon-set-up",
              isIcon: true
            });
            item[prop.name].push({
              text: "编辑指标",
              type: "editKpi",
              class: "text-primary fontSize20 mr10",
              icon: "",
              isIcon: true
            });
            item[prop.name].push({
              text: "删除指标",
              type: "deleteKpi",
              class: "text-primary fontSize20 mr10",
              icon: "",
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
        // 查看流程信息
        item[prop.name].push({
          text: "查看计划",
          type: "lookSchemePhases",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        });
        // 查看数据项设置
        item[prop.name].push({
          text: "查看数据项",
          type: "lookDataSet",
          class: "text-primary fontSize20 mr10",
          icon: "iconfont iconshezhi",
          isIcon: true
        });
        // 编辑流程信息
        if (item.processinstStatus === "underAssessment") {
          item[prop.name].unshift({
            text: "编辑计划",
            type: "editSchemePhases",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-edit-outline",
            isIcon: true
          });
          // 方案创建者可以结束考核
          if (
            this.$store.getters["user/userInfos"].orgId === item.assessOrgId
          ) {
            item[prop.name].push({
              text: "结束考核",
              type: "endPhases",
              class: "text-primary fontSize20 mr10",
              icon: "",
              isIcon: true
            });
          }
        }
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
    let formButtonList;
    // 新增考核方案
    if (data.flag === "add") {
      this.schemeOperateDialog.dialogVisible = true;
      this.schemeOperateDialog.dialogName = "新增考核方案";
      // 打开新增  有下一步 和 退出 操作
      formButtonList = this.$globalFnc.deepCopy(this.addSchemeContentButton);
      formButtonList.splice(1, 1);
      this.schemeOperateDialog.formButtonList = formButtonList;
      this.schemeFormOperateSettings.formGroupList = this.setDictList(
        this.$globalFnc.deepCopy(this.schemeContentItems)
      );
      // // 获取基础数据 年度考核所有的指标
      // this.$getData(this.$api.getAllKpiIndexTree, { code: this.pageType }).then(
      //   res => {
      //     this.schemeTreeOperateSettings.treeData = res;
      //   }
      // );
      // 总分默认 100分。 评分策略默认 扣分制
      this.schemeFormOperateSettings.formGroupValues = {
        assessStrategy: "negative",
        grossScore: 100
      };
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
    let formGroupList,
      formGroupValues = {};
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
        this.dialogFormBlockSettings.dialogFormVisible = true;
        this.dialogFormBlockSettings.dialogFormTitle = btns.text;
        formGroupList = [].concat(this.processId, this.consultDateContentItems);
        this.dialogFormBlockSettings.dialogFormItems.formGroupList = formGroupList.map(
          item => {
            if (item.name === "name") {
              item.hideItem = true;
            }
            return item;
          }
        );
        this.dialogFormBlockSettings.dialogFormItems.formButtonList = this.consultDateContentButton;
        this.dialogFormBlockSettings.dialogFormItems.formGroupValues = params;
      } else if (
        btns.taskDefinitionKey === "consulte" &&
        btns.value === "complete"
      ) {
        // 如果在征询阶段 ，操作的是结束征询
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
      } else {
        // 目前流程驱动， 不是开启征询， 就是开启考核
        this.dialogFormBlockSettings.dialogFormTitle = "考核计划";
        formGroupList = [].concat(
          this.processId,
          this.selfEvaluationContentItems,
          this.departmentEvaluationContentItems
        );
        // 权重
        params.departmentWeight = 100;
        this.dialogFormBlockSettings.dialogFormItems.formGroupList = formGroupList;
        this.dialogFormBlockSettings.dialogFormItems.formGroupValues = params;
        this.dialogFormBlockSettings.dialogFormItems.formButtonList = this.schemePlanButton;
        this.dialogFormBlockSettings.dialogFormVisible = true;
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
          item["name"] = item.text + "(" + item.asmKpiVarUnit + ")";
          dataSetData.allotInfos.forEach(infoItem => {
            if (item["value"] == infoItem["asmKpiVarId"]) {
              item[infoItem.assessedOrgId] = infoItem["targetValue"];
            }
          });
        });
        this.dataSetContentItems[0].headers = dataSetTableHeader;
        this.dialogFormSettings.dialogFormItems.formGroupList = this.dataSetContentItems;
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          targetParams: dataSetData.vars
        };
      });
    }
    if (btns.type === "lookDataSet") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormTitle = "查看数据项";
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancel",
          label: "关闭"
        }
      ];
      // 获取特殊项设置列表
      this.$getData(this.$api.specialSettingList, {
        schemeId: row["asmSchemeId"],
        type: this.pageType
      }).then(res => {
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
          obj.disabled = true;
          obj.placeHolder = " ";
          dataSetTableHeader.push(obj);
        });
        // 处理默认值
        dataSetData.vars.forEach(item => {
          item["name"] = item.text + "(" + item.asmKpiVarUnit + ")";
          dataSetData.allotInfos.forEach(infoItem => {
            if (item["value"] == infoItem["asmKpiVarId"]) {
              item[infoItem.assessedOrgId] = infoItem["targetValue"];
            }
          });
        });
        this.dataSetContentItems[0].headers = dataSetTableHeader;
        this.dialogFormSettings.dialogFormItems.formGroupList = this.dataSetContentItems;
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          targetParams: dataSetData.vars
        };
      });
    }
    // 新增数据项
    if (btns.type === "addDataItems") {
      this.dialogFormSettings.dialogFormTitle = "添加数据项";
      formGroupValues.type = "add";
      formGroupValues.asmKpiIndexId = row["kpiIndexId"];
      formGroupValues.targetParams = [
        {
          name: "",
          unit: ""
        }
      ];
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addDataItemButton;
      formGroupList = this.$globalFnc.deepCopy(this.dataItems);
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      this.dialogFormSettings.dialogFormItems.formGroupValues = formGroupValues;
      this.dialogFormSettings.dialogFormVisible = true;
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
      // 获取回显数据
      this.schemeId = row["asmSchemeId"];
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
        this.addSchemeType = "nextStep";
        // 获取指标树
        this.initAddSchemeKpiTable(row["asmSchemeId"]);

        this.handleLinkSelect("assessStrategy", defaultData.assessStrategy);
        this.schemeTreeOperateSettings.checkedTreeData = defaultData.kpiIds;
        this.schemeFormOperateSettings.formGroupValues = defaultData;
      });
    }
    /**
     *  查看方案流程详情
     */
    if (btns.type === "lookSchemePhases") {
      this.dialogFormBlockSettings.dialogFormTitle = "计划详情";
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
        // 自评 部门 时间
        if (schemeDetailData["phases"] && schemeDetailData["phases"].length) {
          // 添加自评 部门 form
          formGroupList = formGroupList.concat(
            this.selfEvaluationContentItems,
            this.departmentEvaluationContentItems
          );
          let selfMessage = schemeDetailData["phases"][0],
            departmentMessage = schemeDetailData["phases"][1];
          // 自评
          // 字段转换
          schemeDetailData.selfStartDate = this.$globalFnc.dateStampFormat(
            selfMessage.startDt,
            "ymd"
          );
          schemeDetailData.selfEndDate = this.$globalFnc.dateStampFormat(
            selfMessage.endDt,
            "ymd"
          );
          // selfMessage.selfCooperateEndDate = this.$globalFnc.dateStampFormat(
          //   phasesItem.cooperateEndDt,
          //   "ymd"
          // );
          schemeDetailData.self_asmShemeAssessPhaseId =
            selfMessage.asmShemeAssessPhaseId;
          // 部门
          // 字段转换
          schemeDetailData.departmentStartDate = this.$globalFnc.dateStampFormat(
            departmentMessage.startDt,
            "ymd"
          );
          schemeDetailData.departmentEndDate = this.$globalFnc.dateStampFormat(
            departmentMessage.endDt,
            "ymd"
          );
          schemeDetailData.departmentWeight = departmentMessage.weight;
          schemeDetailData.department_asmShemeAssessPhaseId =
            departmentMessage.asmShemeAssessPhaseId;
        }
        // 最终得分
        // if (
        //   schemeDetailData.processinstStatus === "end" &&
        //   schemeDetailData.assessedInfo &&
        //   schemeDetailData.assessedInfo.length
        // ) {
        //   // 最终得分列表
        //   formGroupList = formGroupList.concat(this.schemeTotalScore);
        // }
        // 表单
        this.dialogFormBlockSettings.dialogFormItems.formGroupList = this.setDictList(
          this.$globalFnc.deepCopy(formGroupList),
          row["asmSchemeId"],
          "look"
        );
        // 表单赋值
        this.dialogFormBlockSettings.dialogFormItems.formGroupValues = schemeDetailData;
        this.dialogFormBlockSettings.dialogFormItems.formButtonList = [
          {
            flag: "cancel",
            label: "关闭"
          }
        ];
        this.dialogFormBlockSettings.dialogFormVisible = true;
      });
    }
    /**
     *  编辑流程详情
     */
    if (btns.type === "editSchemePhases") {
      this.dialogFormBlockSettings.dialogFormTitle = "编辑计划";
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
        // 自评 部门计划
        if (schemeDetailData["phases"] && schemeDetailData["phases"].length) {
          // 添加 自评， 部门计划 form
          formGroupList = formGroupList.concat(
            this.selfEvaluationContentItems,
            this.departmentEvaluationContentItems
          );
          let selfMessage = schemeDetailData["phases"][0],
            departmentMessage = schemeDetailData["phases"][1];
          // 自评
          // 字段转换
          schemeDetailData.selfStartDate = this.$globalFnc.dateStampFormat(
            selfMessage.startDt,
            "ymd"
          );
          schemeDetailData.selfEndDate = this.$globalFnc.dateStampFormat(
            selfMessage.endDt,
            "ymd"
          );
          // selfMessage.selfCooperateEndDate = this.$globalFnc.dateStampFormat(
          //   phasesItem.cooperateEndDt,
          //   "ymd"
          // );
          schemeDetailData.self_asmShemeAssessPhaseId =
            selfMessage.asmShemeAssessPhaseId;
          // 部门
          // 字段转换
          schemeDetailData.departmentStartDate = this.$globalFnc.dateStampFormat(
            departmentMessage.startDt,
            "ymd"
          );
          schemeDetailData.departmentEndDate = this.$globalFnc.dateStampFormat(
            departmentMessage.endDt,
            "ymd"
          );
          schemeDetailData.departmentWeight = departmentMessage.weight;
          schemeDetailData.department_asmShemeAssessPhaseId =
            departmentMessage.asmShemeAssessPhaseId;
        }
        // 表单
        this.dialogFormBlockSettings.dialogFormItems.formGroupList = this.$globalFnc.deepCopy(
          formGroupList
        );
        // 表单赋值
        this.dialogFormBlockSettings.dialogFormItems.formGroupValues = schemeDetailData;
        this.dialogFormBlockSettings.dialogFormItems.formButtonList = this.editSchemePlanButton;
        this.dialogFormBlockSettings.dialogFormVisible = true;
      });
    }
    /**
     *  结束流程
     */
    if (btns.type === "endPhases") {
      this.$confirm("确定要结束考核吗", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.flowEnd, {
          asmSchemeId: row.asmSchemeId
        }).then(() => {
          this.$message.success("操作成功！");
          this.initPageData();
        });
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
     *  首页表格新建指标
     */
    if (btns.type === "addKpi") {
      this.dialogFormBlockSettings.dialogFormTitle = "新增指标";
      // 加载表单组
      this.dialogFormBlockSettings.dialogFormItems.formButtonList = this.addKpiItemButton;
      formGroupList = this.$globalFnc.deepCopy(this.kpiContentItems);

      this.dialogFormBlockSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["kpiId"]
      );

      // 往哪个类目底下增加
      formGroupValues.asmKpiIndexId = row["kpiId"];
      // 方案id
      formGroupValues.asmSchemeId = row["asmSchemeId"];
      // 特殊区域分值
      formGroupValues.specialCityScore = [
        {
          areaCode: "",
          score: ""
        }
      ];
      //  指标数据项
      formGroupValues.targetParams = [
        {
          name: "",
          unit: ""
        }
      ];
      formGroupValues.allTargetParamsList = [];
      // 是否公开，默认公开
      formGroupValues.shared = "Y";

      this.dialogFormBlockSettings.dialogFormItems.formGroupValues = formGroupValues;
      this.dialogFormBlockSettings.dialogFormVisible = true;
    }
    if (btns.type === "editKpi") {
      this.dialogFormBlockSettings.dialogFormTitle = "编辑指标";
      // 加载表单组
      this.dialogFormBlockSettings.dialogFormItems.formButtonList = this.editKpiItemButton;
      formGroupList = this.$globalFnc.deepCopy(this.kpiContentItems);
      // 编辑回显
      this.$getData(this.$api.getSingleKpiData, {
        schemeKpiId: row["schemeKpiId"]
      }).then(res => {
        // 保存开始编辑前的值，编辑保存的时候，要和编辑后的值比较
        this.editKpiData = this.$globalFnc.deepCopy(res.data);
        // kpi每一项回显
        formGroupValues = res.data.kpiDto.kpi;
        formGroupValues.asmSchemeKpiId = res.data.asmSchemeKpiId;
        // 城市赋值
        formGroupList.forEach(item => {
          if (item.name === "kpi") {
            item.children.forEach(childrenItem => {
              if (childrenItem.name === "specialCityScore") {
                // 特定市分值开或者关
                if (res.data.kpiDto.updateKpiAreaScoreList.length) {
                  formGroupValues.isOpenSpecialCity = "1";
                  childrenItem.hideItem = false;
                } else {
                  childrenItem.hideItem = true;
                }
              }
            });
          }
        });
        // 特殊区域分值
        formGroupValues.specialCityScore =
          res.data.kpiDto.updateKpiAreaScoreList;
        //  指标数据项
        formGroupValues.targetParams = [];
        formGroupValues.allTargetParams = [];
        formGroupValues.allTargetParamsList = [];
        let targetParams = res.data.kpiDto.updateKpiVarList;
        if (targetParams && targetParams.length) {
          targetParams.forEach(item => {
            formGroupValues.allTargetParams.push(item.asmKpiVarId);
          });
          formGroupValues.allTargetParamsList = targetParams;
        }

        // 牵头部门， 配合部门
        if (res.data.manageOrg) {
          formGroupValues.manageOrg = res.data.manageOrg.assessedOrgId;
        }
        formGroupValues.cooprateOrgs = [];
        if (res.data.cooprateOrgs && res.data.cooprateOrgs.length) {
          res.data.cooprateOrgs.forEach(item => {
            formGroupValues.cooprateOrgs.push(item.assessedOrgId);
          });
        }

        // 弹框表单组
        this.dialogFormBlockSettings.dialogFormItems.formGroupList = this.setDictList(
          formGroupList,
          row["kpiIndexId"]
        );
        this.handleLinkSelect(
          "isOpenSpecialCity",
          formGroupValues.isOpenSpecialCity
        );
        // 表单默认值
        this.dialogFormBlockSettings.dialogFormItems.formGroupValues = formGroupValues;
        this.dialogFormBlockSettings.dialogFormVisible = true;
      });
    }
    /**
     *  新增方案 表格新建修改指标
     */
    if (btns.type === "addSchemeInSideAddKpi") {
      this.dialogFormSettings.dialogFormTitle = "新增指标";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addKpiItemButton;
      formGroupList = this.$globalFnc.deepCopy(this.schemeInsideKpiContent);
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["pk"]
      );
      // 往哪个类目底下增加
      formGroupValues.asmKpiIndexId = row["pk"];
      // 方案id
      formGroupValues.asmSchemeId = this.schemeId;
      // 特殊区域分值
      formGroupValues.specialCityScore = [
        {
          areaCode: "",
          score: ""
        }
      ];
      //  指标数据项
      formGroupValues.targetParams = [
        {
          name: "",
          unit: ""
        }
      ];
      formGroupValues.allTargetParamsList = [];
      // 是否公开，默认公开
      formGroupValues.shared = "Y";
      this.dialogFormSettings.dialogFormItems.formGroupValues = formGroupValues;
      this.dialogFormSettings.dialogFormVisible = true;
    }
    if (btns.type === "addSchemeInSideEditKpi") {
      formGroupList = this.$globalFnc.deepCopy(this.schemeInsideKpiContent);
      this.dialogFormSettings.dialogFormTitle = "编辑指标";
      // 弹框按钮
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editKpiItemButton;
      // 编辑回显
      this.$getData(this.$api.getSingleKpiData, {
        schemeKpiId: row["schemeKpiId"]
      }).then(res => {
        // 保存开始编辑前的值，编辑保存的时候，要和编辑后的值比较
        this.editKpiData = this.$globalFnc.deepCopy(res.data);
        // kpi每一项回显
        formGroupValues = res.data.kpiDto.kpi;
        formGroupValues.asmSchemeKpiId = res.data.asmSchemeKpiId;
        // 城市赋值
        formGroupList.map(item => {
          if (item.name == "specialCityScore") {
            // 特定市分值开或者关
            if (res.data.kpiDto.updateKpiAreaScoreList.length) {
              formGroupValues.isOpenSpecialCity = "1";
              item.hideItem = false;
            } else {
              item.hideItem = true;
            }
          }
        });
        // 特殊区域分值
        formGroupValues.specialCityScore =
          res.data.kpiDto.updateKpiAreaScoreList;
        //  指标数据项
        formGroupValues.targetParams = [];
        formGroupValues.allTargetParams = [];
        formGroupValues.allTargetParamsList = [];
        let targetParams = res.data.kpiDto.updateKpiVarList;
        if (targetParams && targetParams.length) {
          targetParams.forEach(item => {
            formGroupValues.allTargetParams.push(item.asmKpiVarId);
          });
          formGroupValues.allTargetParamsList = targetParams;
        }
        // 牵头部门， 配合部门
        if (res.data.manageOrg) {
          formGroupValues.manageOrg = res.data.manageOrg.assessedOrgId;
        }
        formGroupValues.cooprateOrgs = [];
        if (res.data.cooprateOrgs && res.data.cooprateOrgs.length) {
          res.data.cooprateOrgs.forEach(item => {
            formGroupValues.cooprateOrgs.push(item.assessedOrgId);
          });
        }

        // 弹框表单组
        this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
          formGroupList,
          row["asmKpiIndexId"]
        );
        this.handleLinkSelect(
          "addSchemeInsideIsOpenSpecialCity",
          formGroupValues.isOpenSpecialCity
        );
        // 表单默认值
        this.dialogFormSettings.dialogFormItems.formGroupValues = formGroupValues;
        this.dialogFormSettings.dialogFormVisible = true;
      });
    }
    /**
     * 分配指标
     */
    if (btns.type === "assignKpi") {
      this.dialogFormBlockSettings.dialogFormTitle = "分配指标";
      // 加载表单组
      this.dialogFormBlockSettings.dialogFormItems.formButtonList = this.assignKpiButton;
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.assignCityItem)
      );
      this.dialogFormBlockSettings.dialogFormItems.formGroupList = this.setDictList(
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
          this.dialogFormBlockSettings.dialogFormItems.formGroupValues = defaultValues;
        }
      });
      this.dialogFormBlockSettings.dialogFormVisible = true;
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
    /**
     * 新增方案里面的 删除指标
     */
    if (btns.type === "addSchemeInsideDeleteKpi") {
      this.$confirm("确认删除？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.deleteKpi, [row["schemeKpiId"]], true).then(
          () => {
            this.$message.success("删除成功!");
            this.initPageData();
            this.initAddSchemeKpiTable(this.schemeId);
          }
        );
      });
    }
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
        // 查看抽查组不需要填写
        if (item.name === "updatedPhaseAcls") {
          item.useType = "look";
          item.headers.forEach(headerItem => {
            headerItem.disabled = true;
          });
        }
      }

      // 获取指标库里面的数据项
      if (item.name === "allTargetParams") {
        this.$getData(this.$api.getSingleDataSet, {
          kpiIndexId: id
        }).then(res => {
          this.allTargetParams = res.data;
          item.data = this.$globalFnc.arrayToFormDropdown(
            res.data,
            "name",
            "asmKpiVarId",
            true
          );
        });
      }
      // 新增指标的时候 已有数据项列表，只可以查看
      if (item.name === "allTargetParamsList") {
        item.useType = "look";
        item.headers.forEach(headerItem => {
          headerItem.disabled = true;
        });
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
    if (btn.flag === "nextStep") {
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
      let dafaultValue = {
        type: this.pageType,
        assessOrgId: this.$store.getters["user/userInfos"].orgId,
        startDt: this.$moment(formData["startDt"]).valueOf(),
        endDt: this.$moment(formData["endDt"]).valueOf()
      };

      let params = Object.assign({}, formData, dafaultValue);
      this.$postData(btn.postUrl, params, true).then(res => {
        // 如果方案保存成功
        if (res.data) {
          this.schemeId = res.data;
          // 下一步成功后，留编辑保存和退出
          let formButtonList = this.$globalFnc.deepCopy(
            this.addSchemeContentButton
          );
          formButtonList.splice(0, 2);
          this.schemeOperateDialog.formButtonList = formButtonList;
          // 下一步以后不能选择引用  禁用
          this.schemeFormOperateSettings.formGroupList.forEach(item => {
            this.$set(item, "disabled", true);
            if (item.name === "isQuote") {
              this.$set(item, "hideItem", true);
            }
          });

          this.addSchemeType = "nextStep";
          // 获取树
          this.initAddSchemeKpiTable(res.data);
        }
      });
    }
    if (btn.flag === "save") {
      let formData;
      this.$refs.schemeForm.$refs["formItems"].validate(valid => {
        if (valid) {
          formData = this.schemeFormOperateSettings.formGroupValues;
        }
      });
      // let formData = this.$refs.schemeForm.onSubmit({}, "formItems", true);
      if (!formData) {
        return;
      }
      //  新增方案
      if (!formData.isQuote || formData.isQuote == "0") {
        // let treeSelect = this.$refs.schemeTree.$refs.tree.getCheckedNodes();
        // if (!treeSelect.length) {
        //   this.$message.warning("请选择考核指标");
        //   return;
        // }
        let dafaultValue = {
          type: this.pageType,
          assessOrgId: this.$store.getters["user/userInfos"].orgId,
          startDt: this.$moment(formData["startDt"]).valueOf(),
          endDt: this.$moment(formData["endDt"]).valueOf()
        };
        // 只需要kpi的id
        // treeSelect.forEach(treeItem => {
        //   if (treeItem["pk"]) {
        //     treeItem.asmKpiId = treeItem["pk"];
        //   }
        // });
        // let treeSelectFilter = treeSelect.filter(item => {
        //   return item.type === "KPI";
        // });
        let params = Object.assign({}, formData, dafaultValue);
        // if (formData.asmSchemeId) {
        //   // 有方案 id， 说明是编辑
        //   // 删除
        //   let deleteKpiIds = this.getDeleteKpiIds(
        //     treeSelectFilter,
        //     formData.kpiIds
        //   );
        //   params.deleteKpiIds = deleteKpiIds;
        //   // 新增
        //   let kpiInfos = this.getKpiInfos(formData.kpiIds, treeSelectFilter);
        //   params.kpiInfos = kpiInfos;
        // } else {
        //   params.kpiInfos = treeSelectFilter;
        // }
        this.$postData(btn.postUrl, params, true).then(() => {
          this.$message.success("保存成功！");
          this.initPageData();
          this.schemeFormOperateSettings.formGroupValues = {};
          this.schemeOperateDialog.dialogVisible = false;
          // // 指标树清空
          // this.schemeTreeOperateSettings.checkedTreeData = [];
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
  /**
   *  新增方案里面指标数表格
   */
  initAddSchemeKpiTable(schemeId) {
    this.$getData(this.$api.addSchemeKpiTree, {
      code: this.pageType,
      asmSchemeId: schemeId
    }).then(kpiTree => {
      let targetList = kpiTree[0].children;
      this.formatSchemeTableData(targetList);
      this.schemeTableSettings.tableDatas = targetList;
    });
  },
  formatSchemeTableData(data) {
    data.map(item => {
      item["operateBtns"] = [];
      if (item.type === "KPI_INDEX") {
        // 没有下级时，可以添加指标
        if (!item.children) {
          item["operateBtns"].push({
            text: "添加指标",
            type: "addSchemeInSideAddKpi",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-folder-add",
            isIcon: true
          });
        }
        // 有下级，并且下级不是类目，可以添加指标，因为可以有多个指标
        if (
          item.children &&
          item.children[0].type !== "KPI_INDEX" &&
          item.children[0].type !== "KPI"
        ) {
          item["operateBtns"].push({
            text: "添加指标",
            type: "addSchemeInSideAddKpi",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-folder-add",
            isIcon: true
          });
        }
      }
      // 指标可以删除和修改
      if (item.type === "KPI") {
        item["operateBtns"].push({
          text: "修改指标",
          type: "addSchemeInSideEditKpi",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-delete",
          isIcon: true
        });
        item["operateBtns"].push({
          text: "删除指标",
          type: "addSchemeInsideDeleteKpi",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-delete",
          isIcon: true
        });
      }
      if (item.children) {
        this.formatSchemeTableData(item.children);
      }
    });
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
    if (type === "updatedPhaseAcls") {
      if (data == "assessedOrgs") {
        let valueArr = this.$globalFnc.deepCopy(
            this.dialogFormBlockSettings.dialogFormItems.formGroupValues[type]
          ),
          valueString = "";
        valueArr.map(vItem => {
          valueString += "," + vItem[data].join(",");
        });
        let totalValue = Array.from(new Set(valueString.split(",")));
        this.spotCheckContentItems.map(citem => {
          if (citem.name == "spotCheckGroupMessage") {
            citem.children.map(cChild => {
              if (cChild.name == type) {
                cChild.headers.map(cHead => {
                  if (cHead.key == data) {
                    cHead.data.map(cdataItem => {
                      let cDisabled = false;
                      totalValue.map(vItem => {
                        if (cdataItem.value == vItem) {
                          cDisabled = true;
                        }
                      });
                      cdataItem.disabled = cDisabled;
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
    // 新增引用
    if (type === "isQuote") {
      let formButtonList;
      if (data == "1") {
        this.addSchemeType = "quote";
        this.quoteSchemePaginationSettings.currentPage = 1;
        this.initQuoteSchemePageData();
        // 引用 留保存和退出
        formButtonList = this.$globalFnc.deepCopy(this.addSchemeContentButton);
        formButtonList.splice(0, 1);
        this.schemeOperateDialog.formButtonList = formButtonList;
      } else {
        // 新增留下一步和退出
        formButtonList = this.$globalFnc.deepCopy(this.addSchemeContentButton);
        formButtonList.splice(1, 1);
        this.schemeOperateDialog.formButtonList = formButtonList;
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
    // 首页表格新增指标   特定市分值设定表显示隐藏
    if (type === "isOpenSpecialCity") {
      let formGroupList = this.dialogFormBlockSettings.dialogFormItems
        .formGroupList;
      formGroupList.map(item => {
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
    // 新增方案里面  新增指标  特定市分值设定表显示隐藏
    if (type === "addSchemeInsideIsOpenSpecialCity") {
      let formGroupList = this.dialogFormSettings.dialogFormItems.formGroupList;
      formGroupList.map(item => {
        if (item.name === "specialCityScore") {
          data == "1"
            ? this.$set(item, "hideItem", false)
            : this.$set(item, "hideItem", true);
        }
      });
    }
    // 首页添加指标已有数据项选择
    if (type === "allTargetParams") {
      let formGroupValues = this.dialogFormBlockSettings.dialogFormItems
        .formGroupValues;
      formGroupValues.allTargetParamsList = [];
      this.allTargetParams.forEach(item => {
        formGroupValues.allTargetParams.forEach(id => {
          if (item.asmKpiVarId === id) {
            formGroupValues.allTargetParamsList.push(item);
          }
        });
      });
    }
    //  新增方案里面 添加指标已有数据项选择
    if (type === "addSchemeInsideAllTargetParams") {
      let formGroupValues = this.dialogFormSettings.dialogFormItems
        .formGroupValues;
      formGroupValues.allTargetParamsList = [];
      this.allTargetParams.forEach(item => {
        formGroupValues.allTargetParams.forEach(id => {
          if (item.asmKpiVarId === id) {
            formGroupValues.allTargetParamsList.push(item);
          }
        });
      });
    }
  },
  /**
   *  弹框确定按钮
   */
  handleDialogFormBlock(button, data) {
    if (button.flag === "cancel") {
      this.dialogFormBlockSettings.dialogFormVisible = false;
      this.dialogFormBlockSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    let submitData = this.$globalFnc.deepCopy(data);
    if (button.flag === "kpiSave") {
      // 指标保存特殊处理
      submitData = this.dealKpiData(submitData);
    }
    if (button.flag === "kpiEdit") {
      // 指标保存特殊处理
      submitData = this.dealKpiEditData(submitData);
    }
    if (button.flag === "assignKpiSave") {
      // 分配部门特殊处理
      submitData = this.dealAssignKpiData(submitData);
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
    // 开启考核 保存方案计划
    if (button.flag === "schemePlan") {
      submitData = this.dealPlanData(submitData);
    }
    this.$postData(button.postUrl, submitData, true).then(() => {
      this.$message.success("操作成功！");
      this.initPageData();
      this.dialogFormBlockSettings.dialogFormVisible = false;
      this.dialogFormBlockSettings.dialogFormItems.formGroupValues = {};
    });
  },
  handleDialogForm(button, data) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    let submitData = this.$globalFnc.deepCopy(data);
    if (button.flag === "dataSetSave") {
      // 特殊项设置特殊处理
      submitData = this.dealSpecialSettingData(submitData);
    }
    if (button.flag === "addDataItems") {
      submitData = this.dealDataSet(submitData);
    }
    if (button.flag === "kpiSave") {
      // 指标保存特殊处理
      submitData = this.dealKpiData(submitData);
    }
    if (button.flag === "kpiEdit") {
      // 指标保存特殊处理
      submitData = this.dealKpiEditData(submitData);
    }
    this.$postData(button.postUrl, submitData, true).then(() => {
      this.$message.success("操作成功！");
      if (button.flag === "kpiSave" || button.flag == "kpiEdit") {
        // 刷新 新建方案里面的表格
        this.initAddSchemeKpiTable(this.schemeId);
      }
      // 刷新首页表格
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

    kpiDto.addKpiVarList = [];
    if (data.targetParams && data.targetParams.length) {
      kpiDto.addKpiVarList = data.targetParams.filter(item => {
        return item.name;
      });
    }
    if (data.allTargetParamsList && data.allTargetParamsList.length) {
      data.allTargetParamsList.forEach(item => {
        kpiDto.addKpiVarList.push(item);
      });
    }

    kpiDto.addKpiAreaScoreList = data.specialCityScore;
    kpiDto.kpi = kpi;

    kpiInfos.kpiDto = kpiDto;
    kpiInfos.manageOrg = manageOrg;
    kpiInfos.cooprateOrgs = cooprateOrgsList;

    params.asmSchemeId = data.asmSchemeId;
    params.kpiInfos = [kpiInfos];
    return params;
  },
  /**
   *  处理指标修改数据格式
   */
  dealKpiEditData(data) {
    // 后台需要的接收参数
    let params = {},
      kpiDto = {},
      kpi = {},
      manageOrg = {},
      cooprateOrgsList = [],
      deleteAssignIds = [],
      addKpiVarList = [],
      deleteKpiVarList = [],
      addKpiAreaScoreList = [],
      updateKpiAreaScoreList = [],
      deleteKpiAreaScoreList = [];
    // 指标信息
    kpi = Object.assign({}, data, {
      assessOrgId: this.$store.getters["user/userInfos"].orgId
    });
    delete kpi.specialCityScore;
    delete kpi.targetParams;
    delete kpi.cooprateOrgs;
    delete kpi.manageOrg;
    delete kpi.asmSchemeId;

    // 特定区域
    if (data.specialCityScore && data.specialCityScore.length) {
      // 如果没有id 的话，说明是新增数据
      data.specialCityScore.forEach(item => {
        if (item.asmKpiId) {
          updateKpiAreaScoreList.push(item);
        } else {
          addKpiAreaScoreList.push(item);
        }
      });
      // 编辑时获取的数据和 date 相比， 少了的就是删除的
      deleteKpiAreaScoreList = this.getKpiAreaArrDifference(
        data.specialCityScore,
        this.editKpiData.kpiDto.updateKpiAreaScoreList
      ).filter(item => {
        return item.asmKpiId;
      });
    } else {
      deleteKpiAreaScoreList = this.editKpiData.kpiDto.updateKpiAreaScoreList;
    }
    // 指标项
    if (data.targetParams && data.targetParams.length) {
      addKpiVarList = data.targetParams.filter(item => {
        return item.name;
      });
    }
    // 已有指标项选的
    if (data.allTargetParamsList && data.allTargetParamsList.length) {
      // 编辑时获取的数据和 date 相比， 少了的就是删除的
      deleteKpiVarList = this.getTargetParamsArrDifference(
        data.allTargetParamsList,
        this.editKpiData.kpiDto.updateKpiVarList
      ).filter(item => {
        return item.asmKpiId;
      });
      data.allTargetParamsList.forEach(item => {
        if (deleteKpiVarList.length) {
          deleteKpiVarList.forEach(deleteId => {
            if (item.asmKpiId !== deleteId) {
              addKpiVarList.push(item);
            }
          });
        } else {
          addKpiVarList.push(item);
        }
      });
    } else {
      deleteKpiVarList = this.editKpiData.kpiDto.updateKpiVarList;
    }

    kpiDto.kpi = kpi;
    kpiDto.addKpiVarList = addKpiVarList;
    kpiDto.deleteKpiVarList = deleteKpiVarList;
    kpiDto.addKpiAreaScoreList = addKpiAreaScoreList;
    kpiDto.updateKpiAreaScoreList = updateKpiAreaScoreList;
    kpiDto.deleteKpiAreaScoreList = deleteKpiAreaScoreList;

    // 新增 牵头部门
    manageOrg.type = this.$global.SCHEME_KPIASSIGN_TYPE_MD;
    manageOrg.assessedOrgId = data.manageOrg;
    manageOrg.assessOrgId = this.$store.getters["user/userInfos"].orgId;
    // 新增配合部门
    if (data.cooprateOrgs && data.cooprateOrgs.length) {
      data.cooprateOrgs.forEach(item => {
        let obj = {};
        obj.type = this.$global.SCHEME_KPIASSIGN_TYPE_CD;
        obj.assessedOrgId = item;
        obj.assessOrgId = this.$store.getters["user/userInfos"].orgId;
        cooprateOrgsList.push(obj);
      });
    }
    // 删除的配合部门
    if (this.editKpiData.cooprateOrgs && this.editKpiData.cooprateOrgs.length) {
      this.editKpiData.cooprateOrgs.forEach(item => {
        deleteAssignIds.push(item.asmSchemeKpiAssignId);
      });
    }
    // 删除的牵头部门
    if (this.editKpiData.manageOrg) {
      deleteAssignIds.push(this.editKpiData.manageOrg.asmSchemeKpiAssignId);
    }

    params.kpiDto = kpiDto;
    params.manageOrg = manageOrg;
    params.cooprateOrgs = cooprateOrgsList;
    params.deleteAssignIds = deleteAssignIds;
    params.asmSchemeKpiId = data.asmSchemeKpiId;
    return params;
  },
  getKpiAreaArrDifference(array1, array2) {
    let result = [];
    for (let i = 0; i < array2.length; i++) {
      let obj = array2[i];
      let arr2AsmKpiId = obj.asmKpiId;
      let flag = false;
      for (let j = 0; j < array1.length; j++) {
        if (array1[j].asmKpiId === arr2AsmKpiId) {
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
  getTargetParamsArrDifference(array1, array2) {
    let result = [];
    for (let i = 0; i < array2.length; i++) {
      let obj = array2[i];
      let arr2AsmKpiVarId = obj.asmKpiVarId;
      let flag = false;
      for (let j = 0; j < array1.length; j++) {
        if (array1[j].asmKpiVarId === arr2AsmKpiVarId) {
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
  // 添加数据项处理
  dealDataSet(data) {
    // 后台需要的接收参数
    let kpi,
      addKpiVarList = [],
      updateKpiVarList = [],
      deleteKpiVarList = [],
      assessOrgId = {
        assessOrgId: this.$store.getters["user/userInfos"].orgId
      };
    // 新增情况下
    if (data.type === "add") {
      kpi = Object.assign({}, data, assessOrgId);
      delete kpi.specialCityScore;
      delete kpi.targetParams;

      addKpiVarList = data.targetParams.filter(item => {
        return item.name;
      });
    } else if (data.type === "edit") {
      //编辑情况下
      kpi = Object.assign({}, data, assessOrgId);
      delete kpi.specialCityScore;
      delete kpi.targetParams;

      // 指标项
      if (data.targetParams && data.targetParams.length) {
        // 如果没有id 的话，说明是新增数据
        data.targetParams.forEach(item => {
          if (item.asmKpiId) {
            updateKpiVarList.push(item);
          } else if (item.name) {
            addKpiVarList.push(item);
          }
        });
        // 编辑时获取的数据和 date 相比， 少了的就是删除的
        deleteKpiVarList = this.getArrDifference(
          data.targetParams,
          this.editKpiData["updateKpiVarList"]
        ).filter(item => {
          return item.asmKpiId;
        });
      } else {
        deleteKpiVarList = this.editKpiData["updateKpiVarList"];
      }
    }
    return {
      kpi: kpi,
      addKpiVarList: addKpiVarList,
      updateKpiVarList: updateKpiVarList,
      deleteKpiVarList: deleteKpiVarList
    };
  },
  // 处理方案流程信息编辑
  dealPlanData(submitData) {
    let params = {},
      self = {},
      department = {};
    // 自评计划
    self.startDt = this.$moment(submitData["selfStartDate"]).valueOf();
    self.endDt = this.$moment(submitData["selfEndDate"]).valueOf();
    self.asmShemeAssessPhaseId = submitData["self_asmShemeAssessPhaseId"];
    // 部门计划
    department.startDt = this.$moment(
      submitData["departmentStartDate"]
    ).valueOf();
    department.endDt = this.$moment(submitData["departmentEndDate"]).valueOf();
    department.weight = submitData["departmentWeight"];
    department.asmShemeAssessPhaseId =
      submitData["department_asmShemeAssessPhaseId"];

    // 后台要的对象
    params.self = self;
    params.department = department;
    params.scheme = {
      asmSchemeId: submitData["asmSchemeId"],
      processinstId: submitData["processinstId"],
      userAction: submitData["userAction"],
      taskId: submitData["taskId"]
    };
    return params;
  }
};
export default methods;
