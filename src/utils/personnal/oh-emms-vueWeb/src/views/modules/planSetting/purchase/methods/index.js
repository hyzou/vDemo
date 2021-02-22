const methods = {
  /**
   * 设置默认值
   */
  setFormDefaultValue() {
    // 搜索
    this.searchFormItems.map(searchItem => {
      if (searchItem.name === "storeOrgId") {
        searchItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
    });

    // 购置弹框表单
    this.purchaseContentItem.forEach(item => {
      if (item.name === "storeOrgId") {
        item.data = this.$store.getters["user/baseInfos"].orgList;
      }
      if (item.name === "sourceId") {
        this.$getData(this.$api.reservePlanDict, {
          processinstStatus: "99"
        }).then(list => {
          item.data = this.$globalFnc.arrayToFormDropdown(
            list.data,
            "docNo",
            "emmsPlanReserveId"
          );
        });
      }
    });
  },
  /**
   * 获取库点
   */
  getStorePointList(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.getStorePointList_common, {
        orgid: id,
        districtFlag: false
      }).then(res => {
        let data = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
        reslove(data);
      });
    });
  },
  // 表单值选定修改事件
  handleChangeSelect(linkName, data) {
    // 根据组织机构获取库点列表
    if (linkName == "changeOrg" || linkName === "changeDialogOrg") {
      if (data && data.length) {
        this.getStorePointList(data[data.length - 1]).then(res => {
          let list = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
          // 搜索
          if (linkName == "changeOrg") {
            this.setGroupFormValue(this.searchFormItems, "storepointId", list);
          } else {
            this.setGroupFormValue(
              this.purchaseContentItem,
              "storepointId",
              list
            );
          }
        });
      } else {
        if (linkName === "changeOrg") {
          this.setGroupFormValue(this.searchFormItems, "storepointId", []);
        } else {
          this.setGroupFormValue(this.purchaseContentItem, "storepointId", []);
        }
      }
    }
    // 来源切换时 隐藏选择储备计划
    if (linkName === "sourceChange") {
      this.purchaseContentItem.forEach(item => {
        if (item.name === "sourceId") {
          item.hideItem = data === "PP" ? false : true;
        }
      });

      this.dialogInputTableSettings.headers =
        data === "PP"
          ? this.materialDetailReservePlanTableHeader
          : this.materialDetailOtherTableHeader;
    }
  },
  // 赋值
  setGroupFormValue(array, name, data) {
    array.forEach(item => {
      if (item.name === name) {
        item.data = data;
      }
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    // 首页新增
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "添加购置";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addPurchaseButton;
      this.purchaseContentItem.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
      });
      this.materialDetailReservePlanTableHeader.forEach(item => {
        if (item.name === "distributionNum") {
          item.disabled = false;
        }
      });
      this.materialDetailOtherTableHeader.forEach(item => {
        if (item.name === "distributionNum") {
          item.disabled = false;
        }
      });
      this.dialogOperateButtonsSettings.buttonListData = this.materialDetailOperateButtons;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        docNo: "系统自动生成",
        planPurchaseDtls: [],
        created: new Date().getTime(),
        year: new Date().getFullYear() + "",
        sourceType: "PP",
        sourceId: ""
      };
      this.handleChangeSelect("sourceChange", "PP");
    }
    // 新增购置详情页
    if (data.flag === "addMaterialDetail") {
      // 储备购置  添加物资明细
      let formGroupValue = this.dialogFormSettings.dialogFormItems
        .formGroupValues;
      if (formGroupValue.sourceType === "PP") {
        // 如果没有选择储备计划，不可以添加明细
        if (!formGroupValue.sourceId) {
          this.$message.warning("需选择储备计划后添加");
          return;
        }
        if (!formGroupValue.storepointId) {
          this.$message.warning("需选择库点后添加");
          return;
        }
        this.materialDetailDialog.dialogName = "物资选择";
        // 加载表单组
        this.materialDetailDialog.formButtonList = this.addMaterialButton;
        this.materialDetailDialog.dialogVisible = true;
        this.setMaterialSearchForm();
        this.initMaterialPage();
      } else {
        // 应急购置 和 补充购置 添加明细
        this.dialogTableSettings.dialogFormVisible = true;
        let materialTypeList = this.$store.getters["user/baseInfos"]
          .materialTypeList;
        this.treeSettings.treeData = materialTypeList;
        // 新增清空原来选过的
        this.tableChosedSettings.tableDatas = [];
        this.handleTreeNodeClick(materialTypeList[0]);
      }
    }
    if (data.flag === "deleteMaterialDetail") {
      if (!this.chosedMaterialDetail.length) {
        this.$message.warning("请选择需删除的物资明细");
        return;
      }
      // 物资明细表格数据
      let materialDetailList = this.dialogFormSettings.dialogFormItems
        .formGroupValues[this.dialogInputTableSettings.name];
      // 明细表格
      for (let i = 0; i < materialDetailList.length; i++) {
        for (let j = 0; j < this.chosedMaterialDetail.length; j++) {
          if (
            materialDetailList[i].code === this.chosedMaterialDetail[j].code
          ) {
            materialDetailList.splice(i, 1);
          }
        }
      }
      // 物资回显页面
      for (let i = 0; i < this.chosedReservePlanMaterialData.length; i++) {
        for (let j = 0; j < this.chosedMaterialDetail.length; j++) {
          if (
            this.chosedReservePlanMaterialData[i].code ===
            this.chosedMaterialDetail[j].code
          ) {
            this.chosedReservePlanMaterialData.splice(i, 1);
          }
        }
      }

      this.chosedMaterialDetail = [];
    }

    if (data.flag === "addMaterial") {
      let flag = false;
      if (this.tableChosedSettings.tableDatas.length > 0) {
        this.tableChosedSettings.tableDatas.map(item => {
          if (
            item.emmsBasMaterialId === this.toBechosedMaterial.emmsBasMaterialId
          ) {
            // 如果已经选择了的话就不添加
            flag = true;
          }
        });
      }
      if (!flag) {
        this.tableToBeChosedSettings.tableDatas.forEach(item => {
          if (
            item.emmsBasMaterialId === this.toBechosedMaterial.emmsBasMaterialId
          ) {
            this.tableChosedSettings.tableDatas.push(item);
          }
        });
      }
      this.$refs.chosedTab.setCurrent();
    }
    if (data.flag === "removeMaterial") {
      this.tableChosedSettings.tableDatas.forEach((item, index) => {
        if (
          item.emmsBasMaterialId === this.toBeRemoveMaterial.emmsBasMaterialId
        ) {
          this.tableChosedSettings.tableDatas.splice(index, 1);
        }
      });
    }
    if (data.flag === "saveChosedMaterial") {
      this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ] = this.tableChosedSettings.tableDatas;
      this.dialogTableSettings.dialogFormVisible = false;
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
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.searchFormSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "getPurchaseList" }, defaultdatas);
  },
  handleSearchFormBtn(btns, formData) {
    if (btns.flag === "search") {
      this.paginationSettings.currentPage = 1;
    }
    if (btns.flag === "clear") {
      this.paginationSettings.currentPage = 1;
      this.searchFormSettings.formGroupValues = {};
      formData = {};
    }
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      isHasChild: "Y"
    };
    let params = Object.assign({}, baseForm, formData);
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "编辑",
          type: "edit",
          class: "text-primary fontSize20 mr10",
          isIcon: true
        },
        {
          text: "送审",
          type: "submit",
          class: "text-primary fontSize20 mr10",
          isIcon: true
        },
        {
          text: "删除",
          type: "delete",
          class: "text-danger fontSize20 mr10",
          isIcon: true
        }
      ]
    };
    let reservePlanList = this.$globalFnc.deepCopy(data.rows);
    this.formatData(reservePlanList, propObject);
    this.tableSettings.tableDatas = reservePlanList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      // 开单时间
      item.created_dsp = this.$globalFnc.changeDateFormat(item.created);
      // 按钮
      item[prop.name] = [];
      // 制单状态可以 编辑 删除
      if (item.processinstStatus === "1") {
        item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      } else {
        item[prop.name].push({
          text: "查看",
          type: "look",
          class: "text-primary fontSize20 mr10",
          isIcon: true
        });
      }
    });
  },
  //首页，分页切换
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  handleTableRowButton(row, btns) {
    let defaultValue;
    if (btns.type === "delete") {
      this.$confirm("确认删除该购置单？", "确认框", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.deletePurchase,
          {
            emmsPlanPurchaseId: row.emmsPlanPurchaseId
          },
          true
        ).then(() => {
          this.$message.success("成功删除该购置单!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "submit") {
      this.$confirm("请核对该购置单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.purchaseStatus,
          {
            emmsPlanPurchaseId: row.emmsPlanPurchaseId,
            processinstStatus: "99"
          },
          true
        ).then(() => {
          this.$message.success("操作成功!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "修改购置";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editPurchaseButton;
      this.purchaseContentItem.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
        if (item.name === "sourceType") {
          item.disabled = true;
        }
      });
      this.materialDetailReservePlanTableHeader.forEach(item => {
        if (item.name === "distributionNum") {
          item.disabled = false;
        }
      });
      this.materialDetailOtherTableHeader.forEach(item => {
        if (item.name === "distributionNum") {
          item.disabled = false;
        }
      });
      this.dialogOperateButtonsSettings.buttonListData = this.materialDetailOperateButtons;
    }
    if (btns.type === "look") {
      this.dialogFormSettings.dialogFormTitle = "查看购置";
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: ""
        }
      ];
      this.purchaseContentItem.forEach(item => {
        item.disabled = true;
      });
      this.materialDetailReservePlanTableHeader.forEach(item => {
        item.disabled = true;
      });
      this.materialDetailOtherTableHeader.forEach(item => {
        item.disabled = true;
      });
      this.dialogOperateButtonsSettings.buttonListData = [];
    }
    this.dialogFormSettings.dialogFormVisible = true;
    this.$getData(this.$api.singlePurchaseData, {
      id: row.emmsPlanPurchaseId
    }).then(res => {
      defaultValue = this.$globalFnc.deepCopy(res.data);
      // 库点
      this.getStorePointList(res.data.storeOrgId).then(res => {
        this.purchaseContentItem.map(dialogItem => {
          if (dialogItem.name == "storepointId") {
            dialogItem.data = res;
          }
        });
      });
      if (
        defaultValue.planPurchaseDtls &&
        defaultValue.planPurchaseDtls.length
      ) {
        // 物资明细
        defaultValue.planPurchaseDtls.forEach(item => {
          // 物资规格
          if (item.basMaterialSpec) {
            for (let key in item.basMaterialSpec) {
              item[key] = item.basMaterialSpec[key];
            }
          }
          // 物资信息
          if (item.basMaterial) {
            // 计量单位
            if (item.basMaterial.basUnit) {
              item.unitName = item.basMaterial.basUnit.name;
            }
            // 物资类别
            if (item.basMaterial.basMaterialType) {
              item.materialTypeName = item.basMaterial.basMaterialType.name;
            }
            // 编码
            item.code = item.basMaterial.code;
            // 物资名称
            item.name = item.basMaterial.name;
          }
        });
      }
      // 物资选择页 回显
      if (defaultValue.sourceType === "PP") {
        this.chosedReservePlanMaterialData.push({
          code: defaultValue.code
        });
      } else {
        this.handleChangeSelect("sourceChange", defaultValue.sourceType);
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValue;
    });
  },
  /**
   *  物资选择页 搜索
   */
  setMaterialSearchForm() {
    this.materialSearchFormItems.forEach(item => {
      if (item.name === "materialTypeId") {
        item.data = this.$store.getters["user/baseInfos"].materialTypeList;
      }
    });
  },
  /**
   *  物资选择页 列表
   */
  initMaterialPage() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.materialSearchFormSettings.formGroupValues
    );
    this.handleMaterialSearchFormBtn(
      { postUrl: "getReservePlanMaterial" },
      defaultdatas
    );
  },
  handleMaterialSearchFormBtn(btns, formData) {
    if (btns.flag === "search") {
      this.materialPaginationSettings.currentPage = 1;
    }
    if (btns.flag === "clear") {
      this.materialPaginationSettings.currentPage = 1;
      this.materialSearchFormSettings.formGroupValues = {};
      formData = {};
    }
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.materialPaginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      emmsPlanReserveId: this.dialogFormSettings.dialogFormItems.formGroupValues
        .sourceId,
      storepointId: this.dialogFormSettings.dialogFormItems.formGroupValues
        .storepointId
    };
    let params = Object.assign({}, baseForm, formData);
    this.materialDetailTableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setMaterialTableList(data);
    });
  },
  setMaterialTableList(data) {
    let materialList = this.$globalFnc.deepCopy(data.rows);
    this.formatMaterialData(materialList);
    this.materialDetailTableSettings.tableDatas = materialList;
    this.materialPaginationSettings.totalNumbers = data.total;
  },
  formatMaterialData(data) {
    data.map(item => {
      // 计量单位
      if (item.basUnit) {
        item.unitName = item.basUnit.name;
      }
      if (item.basMaterialType) {
        item.materialTypeName = item.basMaterialType.name;
      }
    });
  },
  handleMaterialPaginationPagenumber(val) {
    this.materialPaginationSettings.currentPage = val;
    this.initMaterialPage();
  },
  handleReservePlanMaterialMutiChecked(data) {
    this.chosedReservePlanMaterialData = data;
    if (data && data.length) {
      this.chosedReservePlanMaterialData = data;
    }
  },
  handleMaterialDetailDialog(flag) {
    // 物资选择导入
    if (flag === "import") {
      this.materialDetailDialog.dialogVisible = false;

      // let planReserveDtls = this.reservePlanFormSettings.formGroupValues
      //   .planReserveDtls;
      // if (planReserveDtls && planReserveDtls.length) {
      //   this.selectMaterialData.forEach(item => {
      //     planReserveDtls.forEach(planItem => {
      //       if (item.code === planItem.code) {
      //         item.num = planItem.num;
      //       }
      //     });
      //   });
      // }
      let formatList = this.$globalFnc.deepCopy(
        this.chosedReservePlanMaterialData
      );
      formatList.forEach(item => {
        item.materialTypeName = item.emmsBasMaterialType;
        item.code = item.emmsBasMaterialCode;
        item.name = item.emmsBasMaterial;
        item.unitName = item.emmsBasMaterialUnit;
        item.specs = item.emmsBasMaterialSpec;
      });
      this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ] = formatList;
    }
    if (flag === "cancel") {
      this.chosedReservePlanMaterialData = [];
      this.materialDetailDialog.dialogVisible = false;
    }
  },
  /**
   * 购置详情页 物资明细表格选择事件
   */
  handleTableMutiChecked(data) {
    this.chosedMaterialDetail = [];
    if (data && data.length) {
      this.chosedMaterialDetail = data;
    }
  },
  /**
   * 树形选择点击事件
   */
  handleTreeNodeClick(node) {
    this.chosedMaterialTypeId = node.id;
    let baseForm = {
      page: this.toBeChosedPaginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      emmsBasMaterialTypeId: node.id
    };
    this.$getData(this.$api.getMaterialList, baseForm).then(res => {
      res.rows.map(row => {
        row.materialTypeName = row.basMaterialType.name;
        row.unitName = row.basUnit.name;
        if (row.basMaterialSpecs && row.basMaterialSpecs.length) {
          for (let key in row.basMaterialSpecs[0]) {
            row[key] = row.basMaterialSpecs[0][key];
          }
        }
      });
      this.tableToBeChosedSettings.tableDatas = res.rows;
      this.toBeChosedPaginationSettings.totalNumbers = res.total;
    });
  },
  //待选物资table分页切换
  handleToBeChosedPaginationPagenumber(val) {
    this.toBeChosedPaginationSettings.currentPage = val;
    this.handleTreeNodeClick({ id: this.chosedMaterialTypeId });
  },
  /**
   * 待选物资table点击事件
   */
  handleCurrentChange(val) {
    this.toBechosedMaterial = val;
  },
  /**
   * 已选物资table点击事件
   */
  handleChosedCurrentChange(val) {
    this.toBeRemoveMaterial = val;
  },
  /**
   * 弹框确认按钮
   */
  handleDialogForm(button, formData) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    if (
      !this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ].length
    ) {
      this.$message.warning("请先添加物资明细");
      return;
    }

    let submitData = this.$globalFnc.deepCopy(
      this.dialogFormSettings.dialogFormItems.formGroupValues
    );
    submitData.storeOrgId =
      typeof formData.storeOrgId === "object"
        ? formData.storeOrgId[formData.storeOrgId.length - 1]
        : formData.storeOrgId;
    // 送审改状态
    if (button.flag === "submit") {
      this.$confirm("请核对仓储建设规划信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        submitData.processinstStatus = "99";
        this.handleSaveData(button, submitData);
      });
    } else {
      submitData.processinstStatus = "1";
      this.handleSaveData(button, submitData);
    }
  },
  handleSaveData(button, formData) {
    // 保存
    this.$postData(button.postUrl, formData, true).then(() => {
      this.$message.success("操作成功!");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  }
};
export default methods;
