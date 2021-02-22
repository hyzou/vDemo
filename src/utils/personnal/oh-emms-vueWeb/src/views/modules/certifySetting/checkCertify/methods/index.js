const methods = {
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "getCheckCertifyList" }, defaultdatas);
  },
  /**
   *  根据搜索条件获取列表信息
   */
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
    let filterRules = [];
    // 单据日期
    if (formData.businessDate) {
      filterRules.push({
        field: "stocktakingInfo.businessDate",
        op: ">=",
        value: formData.businessDate[0]
      });
      filterRules.push({
        field: "stocktakingInfo.businessDate",
        op: "<=",
        value: formData.businessDate[1]
      });
    }
    // 组织机构
    if (formData.storeOrgId && formData.storeOrgId.length > 0) {
      filterRules.push({
        field: "stocktakingInfo.storeOrgId",
        op: "=",
        value: formData.storeOrgId[formData.storeOrgId.length - 1]
      });
    }
    if (formData.storepointId) {
      filterRules.push({
        field: "stocktakingInfo.storepointId",
        op: "=",
        value: formData.storepointId
      });
    }
    // 仓房
    if (formData.storehouseId) {
      filterRules.push({
        field: "stocktakingInfo.storehouseId",
        op: "contains",
        value: formData.storehouseId
      });
    }
    // 单号
    if (formData.docNo) {
      filterRules.push({
        field: "stocktakingInfo.docNo",
        op: "=",
        value: formData.docNo
      });
    }
    // 状态
    if (formData.processinstStatus) {
      filterRules.push({
        field: "stocktakingInfo.processinstStatus",
        op: "=",
        value: formData.processinstStatus
      });
    }
    let baseForm = {
      page: this.paginationSettings.currentPage,
      limit: this.$global.paginationOption.numberPerpage,
      filterRules: JSON.stringify(filterRules)
    };

    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, baseForm, options).then(data => {
      this.setTableList(data);
    });
  },
  // 格式化table数据
  setTableList(data) {
    let checkCertify = this.$globalFnc.deepCopy(data.rows);
    checkCertify.map(item => {
      // 按钮
      if (item.processinstStatus === "approve_") {
        item.operateBtns = [
          {
            text: "盘点",
            type: "end",
            class: "text-primary fontSize20 mr10",
            isIcon: true
          }
        ];
      } else if (item.processinstStatus === "end") {
        item.operateBtns = [
          {
            text: "查看",
            type: "look",
            class: "text-primary fontSize20 mr10",
            isIcon: true
          }
        ];
      } else {
        item.operateBtns = [
          {
            text: "编辑",
            type: "edit",
            class: "text-primary fontSize20 mr10",
            isIcon: true
          },
          {
            text: "盘点",
            type: "end",
            class: "text-primary fontSize20 mr10",
            isIcon: true
          },
          {
            text: "删除",
            type: "delete",
            class: "text-danger fontSize20 mr10",
            isIcon: true
          }
        ];
      }
    });
    this.tableSettings.tableDatas = checkCertify;
    this.paginationSettings.totalNumbers = data.total;
  },
  // 表单值选定修改事件
  handleChangeSelect(linkName, data) {
    // 搜索组织切换
    if (linkName === "changeOrg") {
      this.searchFormSettings.formGroupValues.storepointId = "";
      this.searchFormSettings.formGroupValues.storehouseId = "";
    }
    // 搜索库点切换
    if (linkName === "changeStorePoint") {
      this.searchFormSettings.formGroupValues.storehouseId = "";
    }
    //表单组织切换
    if (linkName === "changeDialogOrg") {
      // 选择承储单位以后  库点 明细等信息要清空
      this.chosedMaterialData = [];
      this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.storehouseId = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ] = [];
    }
    // 表单库点切换
    if (linkName === "changeDialogStorePoint") {
      this.chosedMaterialData = [];
      this.dialogFormSettings.dialogFormItems.formGroupValues.storehouseId = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ] = [];
    }
    // 搜索和表单 组织切换共用方法
    if (linkName === "changeOrg" || linkName === "changeDialogOrg") {
      if (data && data.length) {
        this.getStorePointList(data[data.length - 1]).then(res => {
          let list = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
          // 搜索
          if (linkName === "changeOrg") {
            this.setGroupFormValue(this.searchFormItems, "storepointId", list);
          } else {
            this.setGroupFormValue(this.contentItems, "storepointId", list);
          }
        });
      } else {
        if (linkName === "changeOrg") {
          this.setGroupFormValue(this.searchFormItems, "storepointId", []);
        } else {
          this.setGroupFormValue(this.contentItems, "storepointId", []);
        }
      }
    }
    // 搜索和表单 切换库点共用方法
    if (
      linkName === "changeStorePoint" ||
      linkName === "changeDialogStorePoint"
    ) {
      if (data) {
        this.getStoreHouseList(data).then(res => {
          // 搜索
          if (linkName === "changeStorePoint") {
            this.setGroupFormValue(this.searchFormItems, "storehouseId", res);
          } else {
            this.setGroupFormValue(this.contentItems, "storehouseId", res);
          }
        });
      } else {
        if (linkName === "changeStorePoint") {
          this.setGroupFormValue(this.searchFormItems, "storehouseId", []);
        } else {
          this.setGroupFormValue(this.contentItems, "storehouseId", []);
        }
      }
    }

    // 表单 切换仓房 验证
    if (linkName === "changeDialogStoreHouse") {
      this.$getData(this.$api.houseCanCheck, {
        id: data
      }).then(res => {
        if (!res.data) {
          this.$message.warning("该仓房有锁定库存，不可以进行盘点");
          this.dialogFormSettings.dialogFormItems.formGroupValues.storehouseId =
            "";
        }
      });
    }
  },
  handleTableChange(linkName, data) {
    if (linkName === "materialDetail") {
      this.$set(
        data.defaultdatas[data.index],
        "differNum",
        data.value - data.defaultdatas[data.index].stockNum
      );
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
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "新增盘点单";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addButton;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        docNo: "系统自动生成",
        created: this.$globalFnc.dateStampFormat(new Date().getTime()),
        businessDate: this.$globalFnc.dateStampFormat(
          new Date().getTime(),
          "ymd"
        ),
        storeOrgId: [this.$store.getters["user/userInfos"].orgId],
        storepointId: this.$store.getters["user/userInfos"].storePointId
          ? this.$store.getters["user/userInfos"].storePointId
          : "",
        storehouseId: ""
      };
      this.contentItems.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
        if (
          item.name === "storepointId" &&
          !this.$store.getters["user/userInfos"].storePointId
        ) {
          item.data = [];
        }
        if (item.name === "storehouseId") {
          item.data = [];
        }
      });
      this.detailTableHeader.forEach(item => {
        if (item.key === "actualNum" || item.key === "note") {
          item.disabled = false;
        }
      });
      this.dialogOperateButtonsSettings.buttonListData = this.materialDetailOperateButtons;
      this.dialogFormSettings.dialogFormVisible = true;
    }
    if (data.flag === "addMaterialDetail") {
      if (
        !this.dialogFormSettings.dialogFormItems.formGroupValues.storehouseId
      ) {
        this.$message.warning("请先选择仓房");
        return;
      }

      this.materialDetailDialog.dialogName = "盘点明细添加";

      // 盘点明细添加页 选中回显
      this.chosedMaterialData = [];
      let materialDetail = this.dialogFormSettings.dialogFormItems
        .formGroupValues[this.dialogInputTableSettings.name];
      if (materialDetail && materialDetail.length) {
        materialDetail.forEach(item => {
          this.chosedMaterialData.push({
            emmsStockDtlId: item.emmsStockDtlId
          });
        });
      }

      // 加载表单组
      this.materialDetailDialog.formButtonList = this.addMaterialButton;
      this.materialDetailDialog.dialogVisible = true;
      this.setMaterialSearchForm();
      this.initMaterialPage();
    }
    if (data.flag === "deleteMaterialDetail") {
      if (!this.chosedMaterialDetail.length) {
        this.$message.warning("请选择需删除的物资明细");
        return;
      }
      // 明细表格数据删除
      let materialList = this.dialogFormSettings.dialogFormItems
        .formGroupValues[this.dialogInputTableSettings.name];
      for (let i = 0; i < materialList.length; i++) {
        for (let j = 0; j < this.chosedMaterialDetail.length; j++) {
          if (materialList[i].code == this.chosedMaterialDetail[j].code) {
            materialList.splice(i, 1);
          }
        }
      }
      // 盘点选择页 选中删除
      for (let i = 0; i < this.chosedMaterialData.length; i++) {
        for (let j = 0; j < this.chosedMaterialDetail.length; j++) {
          if (
            this.chosedMaterialData[i].code == this.chosedMaterialDetail[j].code
          ) {
            this.chosedMaterialData.splice(i, 1);
          }
        }
      }
      // 删除成功后清空选择
      this.chosedMaterialDetail = [];
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
  //首页，分页切换
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  handleTableRowButton(row, btns) {
    if (btns.type === "delete") {
      // 删除
      this.$confirm("确定删除当前盘点单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.removeCheckCertify, {
          id: row.emmsStocktakingId
        }).then(() => {
          this.$message.success("您已成功删除该盘点单!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "end") {
      this.$confirm("请核对盘点单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.checkCertifyStatus, {
          emmsStocktakingId: row.emmsStocktakingId,
          processinstStatus: "end"
        }).then(() => {
          this.$message.success("操作成功!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑盘点单";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editButton;
      this.contentItems.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
      });
      this.detailTableHeader.forEach(item => {
        if (item.key === "actualNum" || item.key === "note") {
          item.disabled = false;
        }
      });
      this.dialogOperateButtonsSettings.buttonListData = this.materialDetailOperateButtons;
    }
    if (btns.type === "look") {
      this.dialogFormSettings.dialogFormTitle = "查看盘点单";
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: ""
        }
      ];
      this.contentItems.forEach(item => {
        item.disabled = true;
      });
      this.detailTableHeader.forEach(item => {
        item.disabled = true;
      });
      this.dialogOperateButtonsSettings.buttonListData = [];
    }
    // 编辑
    this.$getData(this.$api.singleCheckCertifyData, {
      id: row.emmsStocktakingId
    }).then(xhr => {
      this.getStorePointList(xhr.data.storeOrgId).then(res => {
        this.setGroupFormValue(this.contentItems, "storepointId", res);
      });
      this.getStoreHouseList(xhr.data.storepointId).then(res => {
        this.setGroupFormValue(this.contentItems, "storehouseId", res);
      });
      if (xhr.data.stocktakingDtls && xhr.data.stocktakingDtls.length) {
        xhr.data.stocktakingDtls.forEach(item => {
          // 物资信息
          if (item.stockInfo) {
            // 货位
            item.wmsBasStackName = item.stockInfo.wmsBasStackName;
            if (item.stockInfo.basMaterial) {
              for (let key in item.stockInfo.basMaterial) {
                item[key] = item.stockInfo.basMaterial[key];
              }
              item.materialCode = item.stockInfo.basMaterial.code;
              if (item.stockInfo.basMaterial.basUnit) {
                item.unitName = item.stockInfo.basMaterial.basUnit.name;
              }
              if (item.stockInfo.basMaterial.basMaterialType) {
                item.materialTypeName =
                  item.stockInfo.basMaterial.basMaterialType.name;
              }
            }
          }
          // 批次
          if (item.stockDtlInfo) {
            item.stockCode = item.stockDtlInfo.code;
          }
          // 物资规格信息
          if (item.basMaterialSpec) {
            for (let key in item.basMaterialSpec) {
              item[key] = item.basMaterialSpec[key];
            }
          }
        });
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
    });
    this.dialogFormSettings.dialogFormVisible = true;
  },
  /**
   * 盘点详情页 物资明细表格选择事件
   */
  handleTableMutiChecked(data) {
    this.chosedMaterialDetail = [];
    if (data && data.length) {
      this.chosedMaterialDetail = data;
    }
  },
  /**
   *  盘点明细选择页 搜索
   */
  setMaterialSearchForm() {
    this.materialSearchFormItems.forEach(item => {
      if (item.name === "emmsBasMaterialTypeId") {
        item.data = this.$store.getters["user/baseInfos"].materialTypeList;
      }
      if (item.name === "storehouseId") {
        this.getStoreHouseList(
          this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId
        ).then(data => {
          item.data = data;
        });
      }
    });
  },
  /**
   *  盘点明细选择页 列表
   */
  initMaterialPage() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.materialSearchFormSettings.formGroupValues
    );
    this.handleMaterialSearchFormBtn(
      { postUrl: "getStockMaterialList" },
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
    let filterRules = [
      {
        field: "num",
        op: ">",
        value: "0"
      },
      {
        field: "emmsStock.storepointId",
        op: "=",
        value: this.dialogFormSettings.dialogFormItems.formGroupValues
          .storePointId
      }
    ];
    if (formData.storehouseId) {
      filterRules.push({
        field: "emmsStock.storehouseId",
        op: "=",
        value: this.dialogFormSettings.dialogFormItems.formGroupValues
          .storehouseId
      });
    }
    if (formData.emmsBasMaterialTypeId) {
      filterRules.push({
        field: "emmsStock.basMaterial.basMaterialType.emmsBasMaterialTypeId",
        op: "=",
        value: formData.emmsBasMaterialTypeId
      });
    }
    if (formData.materialName) {
      filterRules.push({
        field: "emmsStock.basMaterial.name",
        op: "contains",
        value: formData.materialName
      });
    }
    let baseForm = {
      page: this.materialPaginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      filterRules: JSON.stringify(filterRules)
    };
    this.materialDetailTableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, baseForm, options).then(data => {
      this.setMaterialTableList(data);
    });
  },
  setMaterialTableList(data) {
    let materialList = this.$globalFnc.deepCopy(data.rows);
    materialList.forEach(item => {
      if (item.emmsBasMaterialName) {
        item.name = item.emmsBasMaterialName;
      }
      if (item.materialSpec) {
        item.specs = item.materialSpec;
      }
      if (item.materialMType) {
        item.mType = item.materialMType;
      }
    });
    this.materialDetailTableSettings.tableDatas = materialList;
    this.materialPaginationSettings.totalNumbers = data.total;
  },
  handleMaterialPaginationPagenumber(val) {
    this.materialPaginationSettings.currentPage = val;
    this.initMaterialPage();
  },
  /**
   *  盘点明细选择页 表格选择
   */
  handleMaterialTableMutiChecked(data) {
    this.chosedMaterialData = [];
    if (data && data.length) {
      this.chosedMaterialData = data;
    }
  },
  /**
   *  盘点明细选择页 弹框事件
   */
  handleMaterialDetailDialog(flag) {
    // 物资选择导入
    if (flag === "import") {
      if (!this.chosedMaterialData.length) {
        this.$message.warning("请选择需要导入的物资");
        return;
      }
      let formatList = this.$globalFnc.deepCopy(this.chosedMaterialData);
      formatList.forEach(item => {
        item.stockNum = item.num;
        item.stockCode = item.code;
        if (!item.actualNum) {
          this.$set(item, "actualNum", "");
        }
      });
      let materialList = this.dialogFormSettings.dialogFormItems
        .formGroupValues[this.dialogInputTableSettings.name];
      if (materialList && materialList.length) {
        formatList.forEach(item => {
          materialList.forEach(chosedItem => {
            if (item.emmsStockDtlId === chosedItem.emmsStockDtlId) {
              item = Object.assign(item, chosedItem);
            }
          });
        });
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ] = formatList;
      this.materialDetailDialog.dialogVisible = false;
    }
    if (flag === "cancel") {
      this.chosedMaterialData = [];
      this.materialDetailDialog.dialogVisible = false;
    }
  },
  /**
   * 弹框确认按钮
   */
  handleDialogForm(button, formData) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.chosedMaterialData = [];
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    if (
      !this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ] ||
      !this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ].length
    ) {
      this.$message.warning("请添加盘点明细");
      return;
    }

    let submit = this.$globalFnc.deepCopy(formData);
    // 承储单位
    let storeOrgId =
      typeof formData.storeOrgId === "object"
        ? formData.storeOrgId[formData.storeOrgId.length - 1]
        : formData.storeOrgId;
    submit.storeOrgId = storeOrgId;
    // 明细
    submit[
      this.dialogInputTableSettings.name
    ] = this.dialogFormSettings.dialogFormItems.formGroupValues[
      this.dialogInputTableSettings.name
    ];
    // 单号自动生成，不需要
    delete submit.docNo;

    // 送审改状态
    if (button.flag === "submit") {
      this.$confirm("请核对盘点单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        submit.processinstStatus = "approve_";
        this.handleSaveData(button, submit);
      });
    } else {
      this.handleSaveData(button, submit);
    }
  },
  handleSaveData(button, formData) {
    // 保存
    this.$postData(button.postUrl, formData, true).then(() => {
      this.$message.success("操作成功!");
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.chosedMaterialData = [];
      this.initPageData();
    });
  },
  /**
   * 获取库点
   */
  getStorePointList(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.getStorePointList_common, {
        orgid: id ? id : this.$store.getters["user/userInfos"].orgId,
        districtFlag: false
      }).then(res => {
        let data = this.$globalFnc.arrayToFormDropdown(res, "name", "spId");
        reslove(data);
      });
    });
  },
  /**
   * 获取仓房
   */
  getStoreHouseList(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.dictList_common, {
        _refKey: "storehouse",
        status: "1",
        spId: id
      }).then(res => {
        let data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        reslove(data);
      });
    });
  }
};
export default methods;
