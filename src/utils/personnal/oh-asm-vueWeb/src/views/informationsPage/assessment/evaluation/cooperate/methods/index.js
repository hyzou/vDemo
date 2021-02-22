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
    this.handleSearchFormBtn({ postUrl: "cooperateList" }, defaultdatas);
  },
  handleSearchFormBtn(btns, formData) {
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
    let cooperateList = this.$globalFnc.deepCopy(data.rows);
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
    this.formatData(cooperateList, propObject);
    this.tableSettings.tableDatas = cooperateList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      /**
       * 值修改
       */
      // 被考核机构
      if (item.assessdOrg) {
        item.orgname = item.assessdOrg.orgname;
      }
      // 方案信息
      if (item.scheme) {
        item.issueNo = item.scheme.issueNo;
        item.schemeName = item.scheme.name;
      }
      // 方案指标信息
      if (item.schemeKpi) {
        item.asmSchemeKpiId = item["schemeKpi"].asmSchemeKpiId;
      }
      // 方案流程信息
      if (item.assess) {
        item.asmShemeAssessId = item["assess"].asmShemeAssessId;
      }
      // 意见信息
      if (item.assessComment) {
        // 意见id
        item.asmShemeAssessCommentId =
          item.assessComment.asmShemeAssessCommentId;
        // 意见状态
        item.status = item["assessComment"].status;
        item.comment = item["assessComment"].comment;
        item.auditBy = item["assessComment"].auditBy;
        item.reportBy = item["assessComment"].reportBy;
      }
      if (item.kpi) {
        item.asmKpiId = item.kpi.asmKpiId;
        item.kpiName = item.kpi.name;
        item.criteria = item.kpi.criteria;
        item.kpiScore = item.kpi.score;
        item.asmKpiIndexId = item.kpi.asmKpiIndexId;
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
      // 配合处市
      if (item.assessdCOassigns) {
        let nameList = [];
        item.assessdCOassigns.forEach(cooprate => {
          nameList.push(cooprate.assessedOrgId__dsp);
        });

        item.assessdCOassigns__dsp = nameList.join();
      }
      // 市县
      item.district = this.$store.getters["user/userInfos"].distrinct;
      /**
       * 按钮
       */
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 意见状态为0 说明没有提交牵头部门 cooperate说明配合意见已经提交
      if ((!item.assessComment || item.status == "0") && !item.cooperate) {
        // 处不分配
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
          text: "意见",
          type: "opinion",
          styleType: "primary",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-s-comment",
          isIcon: true
        });
      }
    });
  },
  /**
   * 表格按钮点击事件
   */
  handleTableRowButton(row, btns) {
    let formGroupList, defaultValues;
    /**
     * 分配处室
     */
    if (btns.type === "assign") {
      this.dialogFormSettings.dialogFormTitle = "分配";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.assignKpiButton;
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.assignDepartmentCooprate)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
      defaultValues = this.$globalFnc.deepCopy(row);
      // 配合处室
      if (row["assessdCOassigns"] && row["assessdCOassigns"].length) {
        defaultValues.cooprateOrgs_CO = row["assessdCOassigns"].map(item => {
          return item.assessedOrgId;
        });
        // 保存老的
        defaultValues.old_cooprateOrgs_CO = row["assessdCOassigns"]
          .map(item => {
            return item.asmSchemeKpiAssignId;
          })
          .join(",");
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
      this.dialogFormSettings.dialogFormVisible = true;
      return;
    }
    /**
     * 填写意见
     */
    if (btns.type === "opinion") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formButtonList = this.opinionFormBtns;
      formGroupList = this.$globalFnc.deepCopy(
        this.schemeFormItem.concat(this.opinionFormItems)
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"],
        "edit"
      );
    }
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
        this.schemeFormItem.concat(this.opinionFormItems)
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
    this.deleteFileList = [];
    defaultValues = this.$globalFnc.deepCopy(row);
    // 配合单位
    defaultValues.cooperateOrgId = this.$store.getters["user/userInfos"][
      "orgId"
    ];
    // 部门意见列表
    if (this.$store.getters["user/userInfos"].orgType !== "OFFICE") {
      let params = {
        asmSchemeKpiId: row["asmSchemeKpiId"],
        asmShemeAssessId: row["asmShemeAssessId"],
        status: "1"
      };
      // 处室id
      if (row.assessdCOassigns && row.assessdCOassigns.length) {
        params.cooperateOrgIds = row.assessdCOassigns.map(item => {
          return item.assessedOrgId;
        });
      }
      this.$getData(this.$api.listAssessComment, params).then(res => {
        let fileList = res.data;
        fileList.forEach(item => {
          // 名字转换
          if (item.files && item.files.length) {
            item["fileName"] = item.files.join(",");
          } else {
            item["fileName"] = " ";
          }
        });
        this.$set(defaultValues, "officeOpinionList", fileList);
      });
    }
    if (row.asmShemeAssessCommentId) {
      this.$getData(this.$api.loadAssessComment, {
        asmShemeAssessCommentId: row.asmShemeAssessCommentId
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
      // 处室 不需要处室意见
      if (
        this.$store.getters["user/userInfos"].orgType === "OFFICE" &&
        item.name === "officeOpinion"
      ) {
        item.hideItem = true;
      }
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
      if (item.name === "cooperateOrgId") {
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
      // 查看全部禁用
      if (type === "look") {
        item.disabled = true;
        // 查看展示列表，不需要上传文件
        if (item.name === "material") {
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
   * 删除文件事件回调
   */
  handleRemoveFiles(file) {
    this.deleteFileList.push(file.fileId);
  },
  /**
   * 弹框 按钮
   */
  handleDialogForm(btns, formData, data) {
    if (btns.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    if (btns.flag === "assignKpiSave") {
      // 分配处室
      this.dealAssignKpiData(btns, data);
      return;
    }
    if (btns.flag === "save" || btns.flag === "submit") {
      // 有id说明填写过意见，是更新，没有是新增
      if (data.asmShemeAssessCommentId) {
        btns.postUrl = "_data/shemeAssess/comment/updateComment";
      } else {
        btns.postUrl = "_data/shemeAssess/comment/addComment";
      }
    }
    // 文件需不需要替换
    formData.append("overwritten", false);
    // 删除的文件
    formData.append("deleteFileList", this.deleteFileList);
    if (btns.flag === "submit") {
      // 提交牵头部门
      this.$confirm("请仔细核对内容，提交后不能再做任何修改", "提交", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          formData.set("status", "1");
          this.handleSubmitData(btns.postUrl, formData);
        })
        .catch(() => {});
    } else {
      this.handleSubmitData(btns.postUrl, formData);
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
   *  分配处室
   */
  dealAssignKpiData(btns, data) {
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

    this.handleSubmitData(btns.postUrl, params);
  }
};
export default methods;
