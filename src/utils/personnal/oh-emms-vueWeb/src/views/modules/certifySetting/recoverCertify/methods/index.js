const methods = {
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn(
      { postUrl: "getRecoverCertifyList" },
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
    let filterRules = [];
    // 单据日期
    if (formData.created) {
      filterRules.push({
        field: "created",
        op: "<=",
        value: formData.created[0]
      });
      filterRules.push({
        field: "created",
        op: ">=",
        value: formData.created[1]
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
        field: "requisition.docNo",
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
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      filterRules: JSON.stringify(filterRules)
    };
    if (formData.inoutDocNo) {
      baseForm.inoutDocNo = formData.inoutDocNo;
    }
    if (formData.storeOrgId) {
      baseForm.orgid =
        typeof formData.storeOrgId === "object"
          ? formData.storeOrgId[formData.storeOrgId.length - 1]
          : formData.storeOrgId;
    }
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, baseForm, options).then(data => {
      this.setTableList(data);
    });
  },
  // 格式化table数据
  setTableList(data) {
    let recoverCertifyList = this.$globalFnc.deepCopy(data.rows);
    recoverCertifyList.map(item => {
      // 质检时间
      item.checkDate_dsp = this.$globalFnc.dateStampFormat(
        new Date(item.checkDate).getTime(),
        "ymd"
      );
      // 物资名字
      if (item.basMaterial) {
        item.materialName = item.basMaterial.name;
      }

      // 操作
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
    this.tableSettings.tableDatas = recoverCertifyList;
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

    // 组织结构 切换
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
    if (linkName === "changeDialogStorePoint") {
      if (data) {
        this.getSourceInout(data, "OUT").then(list => {
          this.setGroupFormValue(this.contentItems, "emmsDocInoutId", list);
        });
      } else {
        this.setGroupFormValue(this.contentItems, "emmsDocInoutId", []);
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
      this.dialogFormSettings.dialogFormTitle = "新增回收单";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addButton;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        docNo: "系统自动生成",
        created: this.$globalFnc.dateStampFormat(new Date().getTime()),
        businessDate: this.$globalFnc.dateStampFormat(
          new Date().getTime(),
          "ymd"
        ),
        emmsDocInoutId: "",
        storeOrgId: [this.$store.getters["user/userInfos"].orgId],
        storepointId: this.$store.getters["user/userInfos"].storePointId
          ? this.$store.getters["user/userInfos"].storePointId
          : ""
      };
      this.contentItems.map(dialogItem => {
        if (
          dialogItem.name == "storepointId" &&
          !this.$store.getters["user/userInfos"].storePointId
        ) {
          dialogItem.data = [];
        }
        if (dialogItem.name == "emmsDocInoutId") {
          dialogItem.data = [];
        }
      });
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
      this.dialogFormSettings.dialogFormVisible = true;
    }
    if (data.flag === "addMaterialDetail") {
      if (
        !this.dialogFormSettings.dialogFormItems.formGroupValues.emmsDocInoutId
      ) {
        this.$message.warning("请先选择出库单号");
        return;
      }

      // 回收明细添加页回显
      this.chosedMaterialData = [];
      let materialDetail = this.dialogFormSettings.dialogFormItems
        .formGroupValues[this.dialogInputTableSettings.name];
      if (materialDetail && materialDetail.length) {
        materialDetail.forEach(item => {
          this.chosedMaterialData.push({
            emmsDocInoutDtlId: item.emmsDocInoutDtlId
          });
        });
      }

      this.materialDetailDialog.dialogName = "回收申请明细添加";
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
      // 调拨选择页 选中删除
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
      this.$confirm("确定删除当前回收单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.removeRecoverCertify, {
          emmsImplRecoverId: row.emmsImplRecoverId
        }).then(() => {
          this.$message.success("您已成功删除该回收单!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "end") {
      this.$confirm("请核对回收单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$getData(this.$api.recoverCertifyEnd, {
          emmsImplRecoverId: row.emmsImplRecoverId
        }).then(() => {
          this.$message.success("操作成功!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑回收单";
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
      this.dialogFormSettings.dialogFormTitle = "查看回收单";
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
    this.$getData(this.$api.singleRecoverCertifyData, {
      emmsImplRecoverId: row.emmsImplRecoverId
    }).then(xhr => {
      this.getStorePointList(xhr.data.storeOrgId).then(res => {
        this.setGroupFormValue(this.contentItems, "storepointId", res);
      });
      this.getSourceInout(xhr.data.storepointId, "OUT").then(list => {
        this.setGroupFormValue(this.contentItems, "emmsDocInoutId", list);
      });
      if (xhr.data.emmsImplRecoverDtls && xhr.data.emmsImplRecoverDtls.length) {
        xhr.data.emmsImplRecoverDtls.forEach(item => {
          // 物资信息
          if (item.emmsBasMaterial) {
            for (let key in item.emmsBasMaterial) {
              item[key] = item.emmsBasMaterial[key];
            }
            if (item.emmsBasMaterial.basMaterialType) {
              item.materialTypeName = item.emmsBasMaterial.basMaterialType.name;
            }
            if (item.emmsBasMaterial.basUnit) {
              item.unitName = item.emmsBasMaterial.basUnit.name;
            }
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
   * 回收详情页 物资明细表格选择事件
   */
  handleTableMutiChecked(data) {
    this.chosedMaterialDetail = [];
    if (data && data.length) {
      this.chosedMaterialDetail = data;
    }
  },
  /**
   *  回收明细选择页 搜索
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
   *  回收明细选择页 列表
   */
  initMaterialPage() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.materialSearchFormSettings.formGroupValues
    );
    this.handleMaterialSearchFormBtn(
      { postUrl: "detailList_incomeCertify" },
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
        field: "emmsDocInout.type",
        op: "=",
        value: "OUT"
      },
      {
        field: "emmsDocInout.storepointId",
        op: "=",
        value: this.dialogFormSettings.dialogFormItems.formGroupValues
          .storepointId
      },
      {
        field: "emmsDocInoutId",
        op: "=",
        value: this.dialogFormSettings.dialogFormItems.formGroupValues
          .emmsDocInoutId
      }
    ];
    if (formData.emmsBasMaterialTypeId) {
      filterRules.push({
        field: "emmsBasMaterial.basMaterialType.emmsBasMaterialTypeId",
        op: "=",
        value: formData.emmsBasMaterialTypeId
      });
    }
    if (formData.materialName) {
      filterRules.push({
        field: "emmsBasMaterial.name",
        op: "contains",
        value: formData.materialName
      });
    }
    if (formData.businessDate) {
      filterRules.push({
        field: "emmsDocInout.businessDate",
        op: "<=",
        value: formData.businessDate[0]
      });
      filterRules.push({
        field: "emmsDocInout.businessDate",
        op: ">=",
        value: formData.businessDate[1]
      });
    }
    let baseForm = {
      page: this.materialPaginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      filterRules: JSON.stringify(filterRules),
      isNeedStock: "Y",
      updateDocId: this.dialogFormSettings.dialogFormItems.formGroupValues
        .emmsImplRecoverId
        ? this.dialogFormSettings.dialogFormItems.formGroupValues
            .emmsImplRecoverId
        : ""
    };
    let params = Object.assign(baseForm, formData);
    this.materialDetailTableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, params, options).then(data => {
      this.setMaterialTableList(data);
    });
  },
  setMaterialTableList(data) {
    let materialList = this.$globalFnc.deepCopy(data.rows);
    materialList.forEach(item => {
      if (item.emmsBasMaterial) {
        item.name = item.emmsBasMaterial.name;
        item.code = item.emmsBasMaterial.code;
        if (item.emmsBasMaterial.basMaterialType) {
          item.materialTypeName = item.emmsBasMaterial.basMaterialType.name;
        }
        if (item.emmsBasMaterial.basUnit) {
          item.unitName = item.emmsBasMaterial.basUnit.name;
        }
      }
      if (item.emmsBasMaterialSpec) {
        item.mType = item.emmsBasMaterialSpec.mType;
        item.specs = item.emmsBasMaterialSpec.specs;
      }
      if (item.emmsDocInout) {
        for (let key in item.emmsDocInout) {
          item[key] = item.emmsDocInout[key];
        }
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
   *  回收明细选择页 表格选择
   */
  handleMaterialTableMutiChecked(data) {
    this.chosedMaterialData = [];
    if (data && data.length) {
      this.chosedMaterialData = data;
    }
  },
  /**
   *  回收明细选择页 弹框事件
   */
  handleMaterialDetailDialog(flag) {
    // 物资选择导入
    if (flag === "import") {
      if (!this.chosedMaterialData.length) {
        this.$message.warning("请选择需要导入的明细");
        return;
      }
      let formatList = this.$globalFnc.deepCopy(this.chosedMaterialData);
      formatList.forEach(item => {
        item.actualNum = item.returnableNum;
        item.planNum = item.returnableNum;
      });
      let materialList = this.dialogFormSettings.dialogFormItems
        .formGroupValues[this.dialogInputTableSettings.name];
      if (materialList && materialList.length) {
        formatList.forEach(item => {
          materialList.forEach(chosedItem => {
            if (item.code === chosedItem.code) {
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
      this.$message.warning("请添加回收明细");
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
      this.$confirm("请核对回收单信息，操作后不能再做任何修改", "提示", {
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
  },
  /**
   * 获取出入库来源
   */
  getSourceInout(id, type) {
    return new Promise(reslove => {
      let filterRules = [
        {
          field: "type",
          op: "=",
          value: type
        },
        {
          field: "storepointId",
          op: "=",
          value: id
        }
      ];
      this.$getData(this.$api.getSourceInout, {
        filterRules: JSON.stringify(filterRules)
      }).then(res => {
        let data = this.$globalFnc.arrayToFormDropdown(
          res.data,
          "docNo",
          "emmsDocInoutId"
        );
        reslove(data);
      });
    });
  }
};
export default methods;
