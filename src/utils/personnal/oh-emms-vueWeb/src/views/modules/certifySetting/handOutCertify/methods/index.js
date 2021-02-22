const methods = {
  handleChangeSelect(linkName, data) {
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
      this.dialogFormSettings.dialogFormTitle = "添加发放单";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addButton;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        docNo: "系统自动生成",
        created: this.$globalFnc.dateStampFormat(new Date().getTime()),
        startDate: this.$globalFnc.dateStampFormat(new Date().getTime(), "ymd"),
        storeOrgId: [this.$store.getters["user/userInfos"].orgId],
        storepointId: this.$store.getters["user/userInfos"].storePointId
          ? this.$store.getters["user/userInfos"].storePointId
          : ""
      };
      this.deleteFileList = [];
      this.contentItems.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
        if (item.name === "files") {
          item.fileSettings.hidedelete = true;
        }
        if (item.name === "fbFile") {
          item.hideItem = false;
        }
        if (
          item.name === "storepointId" &&
          !this.$store.getters["user/userInfos"].storePointId
        ) {
          item.data = [];
        }
      });
      this.materialDetailTableHeader.forEach(item => {
        if (
          item.key === "num" ||
          item.key === "receiver" ||
          item.key === "receiveDate" ||
          item.key === "note"
        ) {
          item.disabled = false;
        }
      });
      this.dialogOperateButtonsSettings.buttonListData = this.materialDetailOperateButtons;
    }
    // 新增购置详情页
    if (data.flag === "addMaterialDetail") {
      // 储备购置  添加物资明细
      let formGroupValue = this.dialogFormSettings.dialogFormItems
        .formGroupValues;
      if (!formGroupValue.storepointId) {
        this.$message.warning("需选择库点后添加");
        return;
      }
      this.dialogTableSettings.dialogFormVisible = true;
      let materialTypeList = this.$store.getters["user/baseInfos"]
        .materialTypeList;
      this.treeSettings.treeData = materialTypeList;
      // 新增清空原来选过的
      this.tableChosedSettings.tableDatas = [];
      this.handleTreeNodeClick(materialTypeList[0]);
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
      this.tableChosedSettings.tableDatas.forEach(item => {
        // 发放数量和发放领取人，付默认值， 达到双向绑定的效果
        if (!item.num) {
          this.$set(item, "num", "");
        }
        if (!item.receiver) {
          this.$set(item, "receiver", "");
        }
        if (!item.receiveDate) {
          this.$set(item, "receiveDate", "");
        }
      });
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
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "list_handOutCertify" }, defaultdatas);
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
    if (formData.created) {
      formData.createdStart = formData.created[0];
      formData.createdEnd = formData.created[1];
    }
    let storeOrgId = {};
    if (formData.storeOrgId) {
      storeOrgId.storeOrgId =
        typeof formData.storeOrgId === "object"
          ? formData.storeOrgId[formData.storeOrgId.length - 1]
          : formData.storeOrgId;
    }
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage
    };
    let params = Object.assign(baseForm, formData, storeOrgId);
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
    let handOutCertifyList = this.$globalFnc.deepCopy(data.rows);
    this.formatData(handOutCertifyList, propObject);
    this.tableSettings.tableDatas = handOutCertifyList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      item.startDate_dsp = this.$globalFnc.dateStampFormat(
        item.startDate,
        "ymd"
      );
      // 按钮
      item[prop.name] =
        item.status !== "99"
          ? this.$globalFnc.deepCopy(prop.porpvalue)
          : [
              {
                text: "查看",
                type: "look",
                class: "text-primary fontSize20 mr10",
                isIcon: true
              }
            ];
    });
  },
  //首页，分页切换
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  handleTableRowButton(row, btns) {
    let defaultValues;
    if (btns.type === "delete") {
      // 删除
      this.$confirm("确定删除当前发放单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api.remove_handOutCertify,
          {
            emmsImplHandoutId: row.emmsImplHandoutId
          },
          true
        ).then(() => {
          this.$message.success("您已成功删除该发放单!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "submit") {
      this.$confirm("请核对发放单信息，操作后不能再做任何修改", "提示", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(this.$api.handOutCertifyStatus, {
          emmsImplHandoutId: row.emmsImplHandoutId,
          status: "99"
        }).then(() => {
          this.$message.success("操作成功!");
          this.initPageData();
        });
      });
      return;
    }
    if (btns.type === "edit") {
      this.deleteFileList = [];
      this.contentItems.forEach(item => {
        if (item.name !== "docNo" && item.name !== "created") {
          item.disabled = false;
        }
        if (item.name === "files") {
          item.fileSettings.hidedelete = false;
        }
        if (item.name === "fbFile") {
          item.hideItem = false;
        }
      });
      this.materialDetailTableHeader.forEach(item => {
        if (
          item.key === "num" ||
          item.key === "receiver" ||
          item.key === "receiveDate" ||
          item.key === "note"
        ) {
          item.disabled = false;
        }
      });
      this.dialogOperateButtonsSettings.buttonListData = this.materialDetailOperateButtons;
      this.dialogFormSettings.dialogFormTitle = "编辑发放单";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editButton;
    }
    if (btns.type === "look") {
      this.contentItems.forEach(item => {
        item.disabled = true;
        if (item.name === "files") {
          item.fileSettings.hidedelete = true;
        }
        if (item.name === "fbFile") {
          item.hideItem = true;
        }
      });
      this.materialDetailTableHeader.forEach(item => {
        item.disabled = true;
      });
      this.dialogOperateButtonsSettings.buttonListData = [];
      this.dialogFormSettings.dialogFormTitle = "查看发放单";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancel",
          size: "",
          icon: "",
          label: "关闭",
          styleType: ""
        }
      ];
    }
    this.$getData(this.$api.single_handOutCertify, {
      id: row.emmsImplHandoutId
    }).then(res => {
      defaultValues = this.$globalFnc.deepCopy(res.data);
      this.getStorePointList(res.data.storeOrgId).then(res => {
        this.contentItems.map(dialogItem => {
          if (dialogItem.name == "storepointId") {
            dialogItem.data = res;
          }
        });
      });
      // 时间转换
      if (res.data.created) {
        defaultValues.created = this.$globalFnc.dateStampFormat(
          res.data.created
        );
      }
      if (res.data.startDate) {
        defaultValues.startDate = this.$globalFnc.dateStampFormat(
          res.data.startDate,
          "ymd"
        );
      }
      if (res.data.endDate) {
        defaultValues.endDate = this.$globalFnc.dateStampFormat(
          res.data.endDate,
          "ymd"
        );
      }
      // 明细
      if (res.data.handoutDtls && res.data.handoutDtls.length) {
        defaultValues.handoutDtlsJsonStr = res.data.handoutDtls;
        defaultValues.handoutDtlsJsonStr.forEach(item => {
          // 物资信息
          if (item.material) {
            for (let key in item.material) {
              item[key] = item.material[key];
            }
            if (item.basMaterialType) {
              item.materialTypeName = item.basMaterialType.name;
            }
            if (item.basUnit) {
              item.unitName = item.basUnit.name;
            }
            // 调拨明细添加页 选中回显
            // this.chosedMaterialData.push({
            //   code: item.basMaterial.code
            // });
          }
          // 物资规格信息
          if (item.materialSpec) {
            for (let key in item.materialSpec) {
              item[key] = item.materialSpec[key];
            }
          }
          // 发放时间
          if (item.receiveDate) {
            item.receiveDate = this.$globalFnc.dateStampFormat(
              item.receiveDate,
              "ymd"
            );
          }
        });
      }

      this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValues;
    });
    this.dialogFormSettings.dialogFormVisible = true;
  },
  /**
   * 发放详情页 物资明细表格选择事件
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
    // 明细
    formData.set(
      this.dialogInputTableSettings.name,
      JSON.stringify(
        this.dialogFormSettings.dialogFormItems.formGroupValues[
          this.dialogInputTableSettings.name
        ]
      )
    );
    // 送审改状态
    if (button.flag === "submit") {
      this.$confirm("请核对发放单信息，操作后不能再做任何修改", "提示", {
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
