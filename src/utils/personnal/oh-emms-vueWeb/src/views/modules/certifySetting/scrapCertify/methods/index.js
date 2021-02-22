const methods = {
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "getScrapCertifyList" }, defaultdatas);
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
        field: "businessDate",
        op: ">=",
        value: formData.businessDate[0]
      });
      filterRules.push({
        field: "businessDate",
        op: "<=",
        value: formData.businessDate[1]
      });
    }

    if (formData.storepointId) {
      filterRules.push({
        field: "storepointId",
        op: "=",
        value: formData.storepointId
      });
    }
    // 单号
    if (formData.docNo) {
      filterRules.push({
        field: "docNo",
        op: "=",
        value: formData.docNo
      });
    }
    // 状态
    if (formData.status) {
      filterRules.push({
        field: "status",
        op: "=",
        value: formData.status
      });
    }
    let storeOrg = {};
    // 组织机构
    if (formData.storeOrgId && formData.storeOrgId.length > 0) {
      storeOrg.orgid =
        typeof formData.storeOrgId === "object"
          ? formData.storeOrgId[formData.storeOrgId.length - 1]
          : formData.storeOrgId;
    }

    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      filterRules: JSON.stringify(filterRules)
    };
    let params = Object.assign(baseForm, storeOrg);
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setTableList(data);
    });
  },
  // 格式化table数据
  setTableList(data) {
    let scrapCertifyList = this.$globalFnc.deepCopy(data.rows);
    scrapCertifyList.map(item => {
      // 按钮
      if (item.status === "8") {
        item.operateBtns = [
          {
            text: "结束",
            type: "end",
            class: "text-primary fontSize20 mr10",
            isIcon: true
          }
        ];
      } else if (item.status === "99") {
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
            text: "结束",
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
    this.tableSettings.tableDatas = scrapCertifyList;
    this.paginationSettings.totalNumbers = data.total;
  },
  // 表单值选定修改事件
  handleChangeSelect(linkName, data) {
    // 根据组织机构获取库点列表
    if (linkName === "changeDialogOrg") {
      // 选择承储单位以后  库点 明细等信息要清空
      this.chosedMaterialData = [];
      this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ] = [];
    }
    if (linkName === "changeDialogStorePoint") {
      this.chosedMaterialData = [];
      this.dialogFormSettings.dialogFormItems.formGroupValues[
        this.dialogInputTableSettings.name
      ] = [];
    }
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
      this.dialogFormSettings.dialogFormTitle = "新增报废单";
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
          : ""
      };

      this.contentItems.map(dialogItem => {
        if (dialogItem.name !== "docNo" && dialogItem.name !== "created") {
          dialogItem.disabled = false;
        }
        if (
          dialogItem.name == "storepointId" &&
          !this.$store.getters["user/userInfos"].storePointId
        ) {
          dialogItem.data = [];
        }
      });
      this.detailTableHeader.forEach(item => {
        if (item.key === "qty" || item.key === "note") {
          item.disabled = false;
        }
      });
      this.dialogOperateButtonsSettings.buttonListData = this.materialDetailOperateButtons;
      this.dialogFormSettings.dialogFormVisible = true;
    }
    if (data.flag === "addMaterialDetail") {
      if (
        !this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId
      ) {
        this.$message.warning("请先选择库点");
        return;
      }

      // 报废明细添加页 选中回显
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
      this.materialDetailDialog.dialogName = "报废明细添加";
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
      // 报废选择页 选中删除
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
      this.$confirm("确定删除当前报废单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.removeScrapCertify, {
          emmsDocScrapId: row.emmsDocScrapId
        }).then(() => {
          this.$message.success("您已成功删除该报废单!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "end") {
      this.$confirm("请核对报废单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$getData(this.$api.endScrapCertify, {
          emmsDocScrapId: row.emmsDocScrapId
        }).then(() => {
          this.$message.success("操作成功!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑报废单";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editButton;
      this.contentItems.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
      });
      this.detailTableHeader.forEach(item => {
        if (item.key === "qty" || item.key === "note") {
          item.disabled = false;
        }
      });
      this.dialogOperateButtonsSettings.buttonListData = this.materialDetailOperateButtons;
    }
    if (btns.type === "look") {
      this.dialogFormSettings.dialogFormTitle = "查看报废单";
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
    // 回显
    this.$getData(this.$api.singleScrapCertifyData, {
      emmsDocScrapId: row.emmsDocScrapId
    }).then(xhr => {
      this.getStorePointList(xhr.data.storeOrgId).then(res => {
        this.contentItems.map(dialogItem => {
          if (dialogItem.name == "storepointId") {
            dialogItem.data = res;
          }
        });
      });
      if (xhr.data.emmsDocScrapDtls && xhr.data.emmsDocScrapDtls.length) {
        xhr.data.emmsDocScrapDtls.forEach(item => {
          // 物资信息
          if (item.emmsBasMaterial) {
            for (let key in item.emmsBasMaterial) {
              item[key] = item.emmsBasMaterial[key];
            }
            item.materialCode = item.emmsBasMaterial.code;
            if (item.emmsBasMaterial.basMaterialType) {
              item.materialTypeName = item.emmsBasMaterial.basMaterialType.name;
            }
            if (item.emmsBasMaterial.basUnit) {
              item.unitName = item.emmsBasMaterial.basUnit.name;
            }
          }
          // 物资规格信息
          if (item.emmsBasMaterialSpec) {
            for (let key in item.emmsBasMaterialSpec) {
              item[key] = item.emmsBasMaterialSpec[key];
            }
          }
        });
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
    });
    this.dialogFormSettings.dialogFormVisible = true;
  },
  /**
   * 报废单详情页 物资明细表格选择事件
   */
  handleTableMutiChecked(data) {
    this.chosedMaterialDetail = [];
    if (data && data.length) {
      this.chosedMaterialDetail = data;
    }
  },
  /**
   *  报废明细选择页 搜索
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
   *  报废明细选择页 列表
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

    // isExistOperableNum 可操作数量不为0
    let baseForm = {
      page: this.materialPaginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      filterRules: JSON.stringify(filterRules),
      isExistOperableNum: "Y"
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
   *  报废明细选择页 表格选择
   */
  handleMaterialTableMutiChecked(data) {
    this.chosedMaterialData = [];
    if (data && data.length) {
      this.chosedMaterialData = data;
    }
  },
  /**
   *  报废明细选择页 弹框事件
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
        if (!item.qty) {
          this.$set(item, "qty", "");
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
      this.$message.warning("请添加报废明细");
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
      this.$confirm("请核对报废单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        submit.status = "8";
        this.handleSaveData(button, submit);
      });
    } else {
      submit.status = "1";
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
