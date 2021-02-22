const methods = {
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn(
      { postUrl: "getQualityCertifyList" },
      defaultdatas
    );
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
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage
    };

    // 时间格式转换
    if (formData.checkDate && formData.checkDate.length) {
      formData.checkDateStart = formData.checkDate[0];
      formData.checkDateEnd = formData.checkDate[1];
    }
    // 组织机构
    // 承储单位
    let storeOrg = {};
    if (formData.storeOrgId) {
      storeOrg.storeOrgId =
        typeof formData.storeOrgId === "object"
          ? formData.storeOrgId[formData.storeOrgId.length - 1]
          : formData.storeOrgId;
    }

    let params = Object.assign({}, baseForm, formData, storeOrg);
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setTableList(data);
    });
  },
  // 格式化table数据
  setTableList(data) {
    let qualityCertifyList = this.$globalFnc.deepCopy(data.rows);
    qualityCertifyList.map(item => {
      // 质检时间
      item.checkDate_dsp = this.$globalFnc.dateStampFormat(
        new Date(item.checkDate).getTime(),
        "ymd"
      );
      // 物资名字
      if (item.basMaterial) {
        item.materialName = item.basMaterial.name;
      }

      // 按钮
      item.operateBtns =
        item.status !== "99"
          ? [
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
          : [
              {
                text: "查看",
                type: "look",
                class: "text-primary fontSize20 mr10",
                isIcon: true
              }
            ];
    });
    this.tableSettings.tableDatas = qualityCertifyList;
    this.paginationSettings.totalNumbers = data.total;
  },
  // 表单值选定修改事件
  handleChangeSelect(linkName, data) {
    // 根据组织机构获取库点列表
    if (linkName === "changeDialogOrg") {
      // 选择承储单位以后  库点 物资等信息要清空
      this.chosedMaterialData = [];
      this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.emmsBasMaterialId =
        "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.emmsBasMaterialSpecId =
        "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.materialName = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.brand = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.specs = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.mType = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.emmsStockDtlId =
        "";
    }
    if (linkName === "changeDialogStorePoint") {
      this.chosedMaterialData = [];
      this.dialogFormSettings.dialogFormItems.formGroupValues.emmsBasMaterialId =
        "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.emmsBasMaterialSpecId =
        "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.materialName = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.brand = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.specs = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.mType = "";
      this.dialogFormSettings.dialogFormItems.formGroupValues.emmsStockDtlId =
        "";
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
      this.deleteFileList = [];
      this.dialogFormSettings.dialogFormTitle = "新增质检单";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addButton;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        docNo: "系统自动生成",
        created: this.$globalFnc.dateStampFormat(new Date().getTime()),
        checkDate: this.$globalFnc.dateStampFormat(new Date().getTime(), "ymd"),
        emmsBasMaterialId: "",
        emmsBasMaterialSpecId: "",
        materialName: "",
        brand: "",
        specs: "",
        mType: "",
        emmsStockDtlId: "",
        storeOrgId: [this.$store.getters["user/userInfos"].orgId],
        storepointId: this.$store.getters["user/userInfos"].storePointId
          ? this.$store.getters["user/userInfos"].storePointId
          : ""
      };

      this.contentItems.map(dialogItem => {
        if (
          dialogItem.name !== "docNo" &&
          dialogItem.name !== "created" &&
          dialogItem.name !== "materialName" &&
          dialogItem.name !== "brand" &&
          dialogItem.name !== "specs" &&
          dialogItem.name !== "mType"
        ) {
          dialogItem.disabled = false;
        }
        if (dialogItem.name === "fbFile") {
          dialogItem.hideItem = false;
        }
        if (dialogItem.name === "files") {
          dialogItem.fileSettings.hidedelete = true;
        }
        if (dialogItem.name === "materialName") {
          dialogItem.buttonGroup.forEach(btnItem => {
            btnItem.disabled = false;
          });
        }
        if (
          dialogItem.name == "storepointId" &&
          !this.$store.getters["user/userInfos"].storePointId
        ) {
          dialogItem.data = [];
        }
      });
      this.dialogFormSettings.dialogFormVisible = true;
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
      this.$confirm("确定删除当前质检单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.removeQualityCertify,
          {
            emmsQualityId: row.emmsQualityId
          },
          true
        ).then(() => {
          this.$message.success("您已成功删除该质检单!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "submit") {
      this.$confirm("请核对质检单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.qualityCertifyStatus,
          {
            emmsQualityId: row.emmsQualityId,
            status: "99"
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
      this.dialogFormSettings.dialogFormTitle = "编辑质检单";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editButton;
      this.contentItems.forEach(item => {
        if (
          item.name !== "docNo" &&
          item.name !== "created" &&
          item.name !== "materialName" &&
          item.name !== "brand" &&
          item.name !== "specs" &&
          item.name !== "mType"
        ) {
          item.disabled = false;
        }
        if (item.name === "files") {
          item.fileSettings.hidedelete = false;
        }
        if (item.name === "fbFile") {
          item.hideItem = false;
        }
        if (item.name === "materialName") {
          item.buttonGroup.forEach(btnItem => {
            btnItem.disabled = false;
          });
        }
      });
    }
    if (btns.type === "look") {
      this.dialogFormSettings.dialogFormTitle = "查看质检单";
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
        if (item.name === "fbFile") {
          item.hideItem = true;
        }
        if (item.name === "files") {
          item.fileSettings.hidedelete = true;
        }
        if (item.name === "materialName") {
          item.buttonGroup.forEach(btnItem => {
            btnItem.disabled = true;
          });
        }
      });
    }
    this.$getData(this.$api.singleQuailtytCertifyData, {
      id: row.emmsQualityId
    }).then(xhr => {
      this.deleteFileList = [];
      this.getStorePointList(xhr.data.storeOrgId).then(res => {
        this.contentItems.map(dialogItem => {
          if (dialogItem.name == "storepointId") {
            dialogItem.data = res;
          }
        });
      });
      xhr.data.checkDate = this.$globalFnc.dateStampFormat(
        new Date(xhr.data.checkDate).getTime(),
        "ymd"
      );
      xhr.data.created = this.$globalFnc.dateStampFormat(
        new Date(xhr.data.created).getTime()
      );
      // 物资规格信息
      if (xhr.data.basMaterialSpec) {
        for (let key in xhr.data.basMaterialSpec) {
          xhr.data[key] = xhr.data.basMaterialSpec[key];
        }
      }
      // 物资信息
      if (xhr.data.basMaterial) {
        xhr.data.materialName = xhr.data.basMaterial.name;
      }
      if (xhr.data.emmsStockDtlId) {
        this.chosedMaterialData.push({
          emmsStockDtlId: xhr.data.emmsStockDtlId
        });
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
    });
    this.dialogFormSettings.dialogFormVisible = true;
  },
  /**
   * input选择事件
   */
  handleInputGroupButton(clickName) {
    if (clickName === "choiceMaterial") {
      if (
        !this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId
      ) {
        this.$message.warning("请先选择库点");
        return;
      }

      this.materialDetailDialog.dialogName = "质量检测明细添加";
      // 加载表单组
      this.materialDetailDialog.formButtonList = this.addMaterialButton;
      this.materialDetailDialog.dialogVisible = true;
      this.setMaterialSearchForm();
      this.initMaterialPage();
    }
  },
  /**
   *  物资选择页 搜索
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
   *  质量检测明细添加页 列表
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
          .storepointId
      }
    ];
    if (formData.storehouseId) {
      filterRules.push({
        field: "emmsStock.storehouseId",
        op: "=",
        value: formData.storehouseId
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
    this.materialDetailTableSettings.tableDatas = materialList;
    this.materialPaginationSettings.totalNumbers = data.total;
  },
  handleMaterialPaginationPagenumber(val) {
    this.materialPaginationSettings.currentPage = val;
    this.initMaterialPage();
  },
  /**
   *  质量检测明细添加页 表格选择
   */
  handleMaterialTableMutiChecked(data) {
    this.chosedMaterialData = [];
    if (data && data.length) {
      this.chosedMaterialData = data;
    }
  },
  /**
   *  质量检测明细添加页 弹框事件
   */
  handleMaterialDetailDialog(flag) {
    // 物资选择导入
    if (flag === "import") {
      if (!this.chosedMaterialData.length) {
        this.$message.warning("请选择需要导入的物资");
        return;
      }
      if (this.chosedMaterialData.length > 1) {
        this.$message.warning("只可以导入一个物资");
        return;
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues.emmsBasMaterialId = this.chosedMaterialData[0].emmsBasMaterialId;
      this.dialogFormSettings.dialogFormItems.formGroupValues.emmsBasMaterialSpecId = this.chosedMaterialData[0].emmsBasMaterialSpecId;

      this.dialogFormSettings.dialogFormItems.formGroupValues.materialName = this.chosedMaterialData[0].emmsBasMaterialName;
      this.dialogFormSettings.dialogFormItems.formGroupValues.brand = this.chosedMaterialData[0].materialBrand;
      this.dialogFormSettings.dialogFormItems.formGroupValues.specs = this.chosedMaterialData[0].materialSpec;
      this.dialogFormSettings.dialogFormItems.formGroupValues.mType = this.chosedMaterialData[0].materialMType;
      this.dialogFormSettings.dialogFormItems.formGroupValues.emmsStockDtlId = this.chosedMaterialData[0].emmsStockDtlId;
      this.materialDetailDialog.dialogVisible = false;
    }
    if (flag === "cancel") {
      this.chosedMaterialData = [];
      this.materialDetailDialog.dialogVisible = false;
    }
  },
  /**
   * 删除文件事件回调
   */
  handleRemoveFiles(file) {
    this.deleteFileList.push(file.fileId);
  },
  /**
   * 弹框确认按钮
   */
  handleDialogForm(button, formData, data) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    // 承储单位
    let storeOrgId =
      typeof data.storeOrgId === "object"
        ? data.storeOrgId[data.storeOrgId.length - 1]
        : data.storeOrgId;
    formData.set("storeOrgId", storeOrgId);
    // 文件需不需要替换
    formData.append("overwritten", false);
    // 删除的文件
    formData.append("deleteFileList", this.deleteFileList);

    // 送审改状态
    if (button.flag === "submit") {
      this.$confirm("请核对质检单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        formData.set("status", "99");
        this.handleSaveData(button, formData);
      });
    } else {
      formData.set("status", "1");
      this.handleSaveData(button, formData);
    }
  },
  handleSaveData(button, formData) {
    // 保存
    this.$postData(button.postUrl, formData, true).then(() => {
      this.$message.success("操作成功!");
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.chosedMaterialData = [];
      this.deleteFileList = [];
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
