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
      assessOrgId: this.$store.getters["user/userInfos"]["orgId"]
    };
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setTableList(data);
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    // 新增考核方案
    if (data.flag === "add") {
      this.schemeOperateDialog.dialogVisible = true;
      this.schemeOperateDialog.formButtonList = this.addSchemeContentButton;
      this.schemeFormOperateSettings.formGroupList = this.setDictList(
        this.$globalFnc.deepCopy(this.schemeContentItems)
      );
      // 获取基础数据 年度考核所有的指标
      this.$getData(this.$api.getKpiTree, { code: "1" }).then(res => {
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
      if (item.name === "manageOrg" || item.name === "cooprateOrgs") {
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
      // 编辑不需要 是否引用方案
      if (type === "edit" && item.name === "isQuote") {
        item.hideItem = true;
      }
      if (item.children) {
        this.setDictList(item.children, id);
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
        // 只需要kpi的id
        treeSelect.forEach(treeItem => {
          if (treeItem["pk"]) {
            treeItem.asmKpiId = treeItem["pk"];
          }
        });
        let treeSelectFilter = treeSelect.filter(item => {
          return item.type === "KPI";
        });
        // TODO type类别应该是传值的
        let dafaultValue = {
          type: "1",
          assessOrgId: this.$store.getters["user/userInfos"].orgId,
          startDt: this.$moment(formData["startDt"]).valueOf(),
          endDt: this.$moment(formData["endDt"]).valueOf()
        };
        let params = Object.assign(
          {},
          formData,
          { kpiInfos: treeSelectFilter },
          dafaultValue
        );
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
          type: "1",
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
    }
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
        rows: this.$global.paginationOption.numberPerpage
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
    if (data && data.length) {
      data.forEach(item => {
        this.selectSchemeId.push(item.asmSchemeId);
      });
    } else {
      this.selectSchemeId = [];
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
        this.initQuoteSchemePageData();
      } else {
        this.addSchemeType = "add";
      }
    }
    // 总分显示隐藏
    // if (type === "assessStrategy") {
    //   this.schemeContentItems.map(item => {
    //     if (item.name === "grossScore") {
    //       data === "positive"
    //         ? (item.hideItem = true)
    //         : (item.hideItem = false);
    //     }
    //   });
    // }
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
      // 开启自评
      if (submitData["startDate"]) {
        submitData.startDt = this.$moment(submitData["startDate"]).valueOf();
      }
      if (submitData["endDate"]) {
        submitData.endDt = this.$moment(submitData["endDate"]).valueOf();
      }
      submitData.scheme = {
        asmSchemeId: submitData["asmSchemeId"],
        processinstId: submitData["processinstId"],
        userAction: submitData["userAction"],
        taskId: submitData["taskId"]
      };
      delete submitData["startDate"];
      delete submitData["endDate"];
    }
    this.$postData(button.postUrl, submitData, true).then(() => {
      this.$message.success("保存成功！");
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
    kpiDto.addKpiVarList = data.targetParams;
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
    if (data.old_cooprateOrgs) {
      deleteDepartment = data.old_cooprateOrgs.split(",");
    }
    // 删除的牵头部门
    if (data.old_manageOrg) {
      deleteDepartment.push(data.old_manageOrg);
    }
    // 新增的牵头部门
    if (data.manageOrg) {
      let obj = {};
      obj.type = this.$global.SCHEME_KPIASSIGN_TYPE_MD;
      // 谁分配的
      obj.assessOrgId = this.$store.getters["user/userInfos"].orgId;
      // 分配到哪里
      obj.assessedOrgId = data.manageOrg;
      // 哪个方案
      obj.asmSchemeKpiId = data.asmSchemeKpiId;
      addDepartment.push(obj);
    }
    // 新增的配合部门
    if (data.cooprateOrgs && data.cooprateOrgs.length) {
      data.cooprateOrgs.forEach(item => {
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
        // 开启征询
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormTitle = btns.text;
        this.dialogFormSettings.dialogFormItems.formGroupList = this.consultDateContentItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.consultDateContentButton;
        this.dialogFormSettings.dialogFormItems.formGroupValues = params;
      } else if (
        (btns.taskDefinitionKey === "routine-supervision" ||
          btns.taskDefinitionKey === "self-assess") &&
        btns.value === "complete"
      ) {
        // 开启自评
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormTitle = btns.text;
        this.dialogFormSettings.dialogFormItems.formGroupList = this.evaluationContentItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.evaluationContentButton;
        this.dialogFormSettings.dialogFormItems.formGroupValues = params;
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
        schemeId: row["asmSchemeId"]
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
      this.schemeOperateDialog.formButtonList = this.editSchemeContentButton;
      this.schemeFormOperateSettings.formGroupList = this.setDictList(
        this.$globalFnc.deepCopy(this.schemeContentItems),
        "",
        "edit"
      );
      // 获取基础数据 年度考核所有的指标
      this.$getData(this.$api.getKpiTree, { code: "1" }).then(res => {
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
        this.schemeTreeOperateSettings.checkedTreeData = defaultData.kpiIds;
        this.schemeFormOperateSettings.formGroupValues = defaultData;
      });
    }
    /**
     *  查看方案详情
     */
    if (btns.type === "lookSchemeDetail") {
      this.schemeDetailDialog.dialogVisible = true;
      let schemeDetailContentItems = this.$globalFnc.deepCopy(
        this.schemeContentItems
      );
      this.schemeDetailFormSettings.formGroupList = this.setDictList(
        schemeDetailContentItems.map(item => {
          item["disabled"] = true;
          // 是否引用按钮
          if (item.name === "isQuote") {
            item.hideItem = true;
          }
          // 目前流程节点
          if (item.name === "processinstStatus__dsp") {
            item.hideItem = false;
          }
          return item;
        })
      );
      this.$getData(this.$api.schemeDetail, {
        schemeId: row["asmSchemeId"]
      }).then(res => {
        let schemeDetailData = this.$globalFnc.deepCopy(res.data);
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
        // 表单赋值
        this.schemeDetailFormSettings.formGroupValues = schemeDetailData;
        if (schemeDetailData["phases"] && schemeDetailData["phases"].length) {
          schemeDetailData["phases"].forEach(item => {
            item.startDate = this.$globalFnc.dateStampFormat(
              item.startDt,
              "ymd"
            );
            item.endDate = this.$globalFnc.dateStampFormat(item.endDt, "ymd");
          });
          // 表格赋值
          this.schemeDetailTableSettings.tableDatas =
            schemeDetailData["phases"];
        }
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

      // 城市赋值
      this.kpiContentItems.map(item => {
        if (item.name === "kpi") {
          item.children.forEach(childItem => {
            if (childItem.name === "specialCityScore") {
              this.$getData(this.$api.userCity, {
                sysParentcode: this.$store.getters["user/userInfos"][
                  "distrinct"
                ]
              }).then(res => {
                childItem.headers[0].data = this.$globalFnc.arrayToFormDropdown(
                  res.data,
                  "name",
                  "code"
                );
              });
            }
          });
        }
      });
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
            defaultValues.manageOrg = res.data.manageOrg.assessedOrgId;
            // 老数据
            defaultValues.old_manageOrg =
              res.data.manageOrg["asmSchemeKpiAssignId"];
          }
          // 配合部门
          if (res.data.cooprateOrgs && res.data.cooprateOrgs.length) {
            defaultValues.cooprateOrgs = res.data.cooprateOrgs.map(item => {
              return item.assessedOrgId;
            });
            // 保存老的
            defaultValues.old_cooprateOrgs = res.data.cooprateOrgs
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
     * 修改指标
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
      // 没有parentId说明是根节点
      if (!item.parentId) {
        item[prop.name].push({
          text: "查看",
          type: "lookSchemeDetail",
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
  }
};
export default methods;
