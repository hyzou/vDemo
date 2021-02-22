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
   * 搜索
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
        // 获取被考核市县
        this.handleLinkSelect("scheme", res[0].asmSchemeId);
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
    this.handleSearchFormBtn(
      { postUrl: "departmentCooperateList" },
      defaultdatas
    );
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
    let departmentList = this.$globalFnc.deepCopy(data.rows);
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
    this.formatData(departmentList, propObject);
    this.tableSettings.tableDatas = departmentList;
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
      if (item["selfAssess"] && item["selfAssess"].shemeAssessKpi) {
        for (let key in item["selfAssess"].shemeAssessKpi) {
          item["self_" + key] = item["selfAssess"]["shemeAssessKpi"][key];
        }
      }
      // 状态
      if (item.assess && item.assess["status"] == "1") {
        // 如果状态是1 说明是已经上报
        item["status"] = "reported";
      } else {
        if (item.higherAssess && item["higherAssess"].shemeAssessKpi) {
          // 有自评信息，说明已完成评分
          item["status"] = "complete";
        } else {
          item["status"] = "incomplete";
        }
      }
      /**
       * 部门打分信息
       */
      if (item["higherAssess"] && item["higherAssess"].shemeAssessKpi) {
        for (let key in item["higherAssess"].shemeAssessKpi) {
          item["department_" + key] =
            item["higherAssess"]["shemeAssessKpi"][key];
        }
      }
      // 被考核机构
      if (item.assessdOrg) {
        item["assessdOrgName"] = item.assessdOrg.orgname;
        // 市县
        item["district"] = item.assessdOrg.district;
      }
      // 方案信息
      if (item.scheme) {
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
        let valueList = [];
        item.assessMOassigns.forEach(cooprate => {
          nameList.push(cooprate.assessedOrgId__dsp);
          valueList.push(cooprate.assessedOrgId);
        });
        item["assessMOassigns__dsp"] = nameList.join();
        item["assessdMOassignsId"] = valueList;
      }
      /**
       * 按钮
       */
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 意见状态为0 说明没有提交牵头部门
      // if (!item["assessComment"] || item["status"] == "0") {
      //   // 处不分配
      //   if (this.$store.getters["user/userInfos"].orgType !== "OFFICE") {
      //     item.operateBtns.unshift({
      //       text: "分配",
      //       type: "assign",
      //       class: "text-primary fontSize20 mr10",
      //       icon: "el-icon-set-up",
      //       isIcon: true
      //     });
      //   }
      //   item.operateBtns.unshift({
      //     text: "意见",
      //     type: "opinion",
      //     styleType: "primary",
      //     class: "text-primary fontSize20 mr10",
      //     icon: "el-icon-s-comment",
      //     isIcon: true
      //   });
      // }
    });
  },
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
     * 分配处室
     */
    // if (btns.type === "assign") {
    //   this.dialogFormSettings.dialogFormTitle = "分配";
    //   // 加载表单组
    //   this.dialogFormSettings.dialogFormItems.formButtonList = this.assignKpiButton;
    //   formGroupList = this.$globalFnc.deepCopy(
    //     this.schemeFormItem.concat(
    //       this.assessdDepartmentMessage,
    //       this.assignDepartmentCooprate
    //     )
    //   );
    //   this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
    //     formGroupList,
    //     row["asmKpiIndexId"]
    //   );
    //   defaultValues = this.$globalFnc.deepCopy(row);
    //   // 牵头部门
    //   if (row["assessdManageAssign"]) {
    //     defaultValues.manageOrg_MD = row["assessdManageAssign"].assessedOrgId;
    //   }
    //   // 配合部门
    //   if (row["assessdCooprateAssign"] && row["assessdCooprateAssign"].length) {
    //     defaultValues.cooprateOrgs_CD = row["assessdCooprateAssign"].map(
    //       item => {
    //         return item.assessedOrgId;
    //       }
    //     );
    //   }
    //   // 配合处室
    //   if (row["assessCOassigns"] && row["assessCOassigns"].length) {
    //     defaultValues.cooprateOrgs_CO = row["assessCOassigns"].map(item => {
    //       return item.assessedOrgId;
    //     });
    //     // 保存老的
    //     defaultValues.old_cooprateOrgs_CO = row["assessCOassigns"]
    //       .map(item => {
    //         return item.asmSchemeKpiAssignId;
    //       })
    //       .join(",");
    //   }
    //   this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
    //   this.dialogFormSettings.dialogFormVisible = true;
    //   return;
    // }
    /**
     * 填写意见
     */
    // if (btns.type === "opinion") {
    //   this.dialogFormSettings.dialogFormVisible = true;
    //   this.dialogFormSettings.dialogFormItems.formButtonList = this.opinionFormBtns;
    //   formGroupList = this.$globalFnc.deepCopy(
    //     this.schemeFormItem.concat(this.opinionFormItems)
    //   );
    //   this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
    //     formGroupList,
    //     row["asmKpiIndexId"]
    //   );
    // }
    /**
     * 查看意见
     */
    if (btns.type === "lookDetail") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancle",
          label: "关闭",
          styleType: ""
        }
      ];
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.departmentAssessDetailItems)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"],
        "look"
      );
    }
    /**
     * 查看意见和填写意见的默认值
     */
    defaultValues = this.$globalFnc.deepCopy(row);
    // 获取评分部门
    if (
      defaultValues.higherAssess &&
      defaultValues.higherAssess.shemeAssessKpi
    ) {
      this.$getData(this.$api.departmentAssessDetail, {
        orgid: defaultValues.higherAssess.shemeAssessKpi.mainOrgId
      }).then(res => {
        if (res.data && res.data.orgname) {
          this.$set(defaultValues, "orgName", res.data.orgname);
        }
      });
    }
    // 自评配合意见列表
    if (row["self_asmShemeAssessId"]) {
      let params = {
        asmSchemeKpiId: row.asmSchemeKpiId,
        asmShemeAssessId: row.self_asmShemeAssessId
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
    }
    // 部门责任处室打分情况
    if (row.department_asmShemeAssessId) {
      let departmentParams = {
        asmSchemeKpiId: row.asmSchemeKpiId,
        asmShemeAssessId: row.department_asmShemeAssessId
      };
      // 责任处室id
      departmentParams.mainOrgIds = row["assessdMOassignsId"];
      this.$getData(this.$api.listAssessKpi, departmentParams).then(res => {
        this.$set(defaultValues, "departmentAssessTable", res.data);
      });
    }
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
      // 配合处室
      if (item.name === "cooprateOrgs_CO") {
        this.$getData(this.$api.dictList, {
          _refKey: "org",
          orgtypeid: "203",
          parentorgid: this.$store.getters["user/userInfos"].orgId,
          status: "1"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 配合机构
      if (item.name === "cooperateOrgId" && item.name === "mainOrgId") {
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
          schemeProcessStatus: "higher-assess",
          assessedOrgId: this.$store.getters["user/userInfos"].orgId,
          assessType: this.pageType,
          running: true
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(
            res,
            "name",
            "asmSchemeId"
          );
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
  handleLinkSelect(linkName, data) {
    // 被考核结构
    if (linkName === "scheme") {
      this.searchSettings.formGroupValues.assessedOrgId = "";
      let formGroupList = this.searchSettings.formGroupList;
      if (data) {
        this.$getData(this.$api.getSchemeAssessedRef, {
          asmSchemeId: data
        }).then(res => {
          formGroupList.forEach(item => {
            if (item.name === "assessedOrgId") {
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
          if (item.name === "assessedOrgId") {
            item.data = [];
          }
        });
      }
    }
  },
  /**
   * 弹框 操作
   */
  handleDialogForm(btns, data) {
    if (btns.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    let submitData = this.$globalFnc.deepCopy(data),
      isFormdata;
    if (btns.flag === "assignKpiSave") {
      // 分配处室特殊处理
      submitData = this.dealAssignKpiData(submitData);
      isFormdata = true;
    }
    if (btns.flag === "save" || btns.flag === "submit") {
      // 有id说明填写过意见，是更新，没有是新增
      if (submitData["asmShemeAssessCommentId"]) {
        btns.postUrl = "_data/shemeAssess/comment/updateComment";
      } else {
        btns.postUrl = "_data/shemeAssess/comment/addComment";
      }
    }
    if (btns.flag === "submit") {
      // 提交牵头部门
      submitData["status"] = "1";
    }
    this.$postData(btns.postUrl, submitData, isFormdata).then(() => {
      this.$message.success("保存成功！");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  },
  /**
   *  分配处室
   */
  dealAssignKpiData(data) {
    let params = {},
      addDepartment = [],
      deleteDepartment = [];
    // 删除的配合部门
    if (data.old_cooprateOrgs_CO) {
      deleteDepartment = data.old_cooprateOrgs_CO.split(",");
    }
    // 新增的处室
    if (data.cooprateOrgs_CO && data.cooprateOrgs_CO.length) {
      data.cooprateOrgs_CO.forEach(item => {
        let obj = {};
        obj.type = this.$global.SCHEME_KPIASSIGN_TYPE_CO;
        obj.assessedOrgId = item;
        obj.assessOrgId = this.$store.getters["user/userInfos"]["assess"];
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
