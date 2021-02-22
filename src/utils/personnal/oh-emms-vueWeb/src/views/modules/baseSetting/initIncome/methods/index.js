const methods = {
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "list_incomeCertify" }, defaultdatas);
  },
  /**
   *  根据搜索条件获取列表信息
   */
  handleSearchFormBtn(btns, formData) {
    if (btns.flag === "search") {
      this.paginationSettings.currentPage = 1;
    }
    let filterRules = [
      {
        field: "type",
        op: "=",
        value: this.certifyType
      }
    ];
    if (formData.docNo) {
      filterRules.push({
        field: "docNo",
        op: "*=",
        value: formData.docNo
      });
    }
    if (formData.businessDate) {
      filterRules.push(
        {
          field: "businessDate",
          op: ">=",
          value: formData.businessDate[0]
        },
        {
          field: "businessDate",
          op: "<=",
          value: formData.businessDate[1]
        }
      );
    }
    if (formData.processinstStatus) {
      filterRules.push({
        field: "processinstStatus",
        op: "=",
        value: formData.processinstStatus
      });
    }
    if (formData.storepointId) {
      filterRules.push({
        field: "storepointId",
        op: "=",
        value: formData.storepointId
      });
    }
    if (formData.storeOrgId && formData.storeOrgId.length > 0) {
      filterRules.push({
        field: "storeOrgId",
        op: "=",
        value: formData.storeOrgId[formData.storeOrgId.length - 1]
      });
    }
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      // orgid: "1",
      subordinate: formData.subordinate ? formData.subordinate : "Y",
      filterRules: JSON.stringify(filterRules)
    };
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btns, baseForm, options).then(data => {
      this.setTableList(data);
    });
  },
  // 内页搜索栏回调
  handleDetailSearchFormBtn(btns, formData) {
    if (btns.flag === "search") {
      this.beChosedPaginationSettings.currentPage = 1;
    }
    this.getMaterialListByType(this.chosedEmmsBasMaterialTypeId, formData);
  },
  // 格式化table数据
  setTableList(data) {
    let taskList = this.$globalFnc.deepCopy(data.rows);
    taskList.map(item => {
      item.sourceType__dsp = "期初入库";
      // 按钮
      item.operateBtns =
        item.processinstStatus !== "99"
          ? [
              {
                text: "编辑",
                type: "edit",
                class: "text-primary fontSize20 mr10",
                isIcon: true
              },
              {
                text: "入库",
                type: "inCome",
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
                type: "review",
                class: "text-primary fontSize20 mr10",
                isIcon: true
              }
            ];
    });
    this.tableSettings.tableDatas = taskList;
    this.paginationSettings.totalNumbers = data.total;
  },
  // 表格多选事件
  handleTableMutiChecked(val, name) {
    this.toBeRemoveDetaillist = val;
  },
  // 表单值选定修改事件
  handleChangeSelect(linkname, data) {
    // 根据组织机构获取库点列表
    if (linkname == "changeOrg" || linkname == "changeStoreOrg") {
      this.$set(
        this.dialogFormSettings.dialogFormItems.formGroupValues,
        "storepointId",
        ""
      );
      if (!data[data.length - 1]) {
        this.tableChosedSettings.tableDatas = [];
        this.dialogInputTableSettings.headers.map(head => {
          if (head.key == "storehouseId") {
            head.data = [];
          }
        });
        this.contentItems.map(item => {
          if (item.name == "storepointId") {
            item.data = [];
          }
        });
        return false;
      }
      this.getStorePointList(data[data.length - 1]).then(res => {
        if (linkname == "changeOrg") {
          this.searchFormSettings.formGroupList.map(searchItem => {
            if (searchItem.name == "storepointId") {
              searchItem.data = res;
            }
          });
        } else {
          this.contentItems.map(dialogItem => {
            if (dialogItem.name == "storepointId") {
              dialogItem.data = res;
            }
          });
        }
      });
    }
    if (linkname == "changeStorePoint") {
      if (!data) {
        this.tableChosedSettings.tableDatas = [];
        this.dialogInputTableSettings.headers.map(head => {
          if (head.key == "storehouseId") {
            head.data = [];
          }
        });
        return false;
      }
      this.getStoreHouseList(data).then(houseList => {
        this.dialogInputTableSettings.headers.map(head => {
          if (head.key == "storehouseId") {
            head.data = houseList;
          }
        });
      });
    }
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "详情";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addButton;
      this.dialogInputTableSettings.headers = this.detailTableHeader;
      this.dialogInputTableSettings.selection = true;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.contentItems;
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
        if (dialogItem.name == "storepointId") {
          this.getStorePointList().then(res => {
            dialogItem.data = res;
          });
        }
        if (dialogItem.name == "sourceId") {
          dialogItem.hideItem = true;
        }
      });
      this.tableChosedSettings.tableDatas = [];
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
    if (data.flag === "addDetail") {
      this.treeSettings.treeData = this.$store.getters[
        "user/baseInfos"
      ].materialTypeList;
      this.handleTreeNodeClick(this.treeSettings.treeData[0]);
      this.detailSearchFormSettings.formGroupValues = {};
      this.dialogTableSettings.dialogFormVisible = true;
    }
    if (data.flag === "addMetrial") {
      let flag = false;
      if (this.tableChosedSettings.tableDatas.length > 0) {
        this.tableChosedSettings.tableDatas.map(item => {
          if (
            item.emmsBasMaterialId ==
            this.toBechosedEmmsBasMaterial.emmsBasMaterialId
          ) {
            flag = true;
          }
        });
      }
      if (!flag) {
        this.getMaterialDetail(
          this.toBechosedEmmsBasMaterial.emmsBasMaterialId
        ).then(xhr => {
          this.tableChosedSettings.tableDatas.push(xhr);
        });
      }
      this.$refs.chosedTab.setCurrent();
    }
    if (data.flag === "removeMetrial") {
      let indexNum,
        flag = false;
      this.tableChosedSettings.tableDatas.map((item, index) => {
        if (
          item.emmsBasMaterialId ==
          this.toBeRemoveEmmsBasMaterial.emmsBasMaterialId
        ) {
          indexNum = index;
          flag = true;
        }
      });
      if (flag) {
        this.tableChosedSettings.tableDatas.splice(indexNum, 1);
      }
    }
    if (data.flag === "removeDetail") {
      let bakdatas = this.$globalFnc.deepCopy(
        this.tableChosedSettings.tableDatas
      );
      bakdatas.map(item => {
        let flag = false;
        this.toBeRemoveDetaillist.map(removeItem => {
          if (item.emmsBasMaterialId == removeItem.emmsBasMaterialId) {
            flag = true;
          }
        });
        if (flag) {
          item.delFlag = true;
        }
      });
      this.tableChosedSettings.tableDatas = bakdatas.filter(
        item => !item.delFlag
      );
    }
    if (data.flag === "saveChosedMetrial") {
      this.dialogTableSettings.dialogFormVisible = false;
    }
    if (data.flag === "saveChosedReferMetrial") {
      this.tableChosedSettings.tableDatas = this.toBechosedEmmsBasMaterialRefer;
      this.dialogTableSettings.dialogFormVisible = false;
    }
  },
  //首页，分页切换
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  handleTableRowButton(row, btns) {
    switch (btns.type) {
      case "edit":
        // 编辑
        this.getSingleInfo(row.emmsDocInoutId).then(xhr => {
          this.getStorePointList(xhr.data.storeOrgId).then(res => {
            this.contentItems.map(dialogItem => {
              if (dialogItem.name == "storepointId") {
                dialogItem.data = res;
              }
            });
          });
          this.getStoreHouseList(xhr.data.storepointId).then(houseList => {
            this.dialogInputTableSettings.headers.map(head => {
              if (head.key == "storehouseId") {
                head.data = houseList;
              }
            });
          });
          this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
          this.tableChosedSettings.tableDatas = xhr.data.emmsDocInoutDtls;
          this.dialogFormSettings.dialogFormVisible = true;
          this.dialogInputTableSettings.headers = this.detailTableHeader;
          this.dialogInputTableSettings.selection = true;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.contentItems;
          this.dialogFormSettings.dialogFormItems.formButtonList = this.editButton;
        });
        break;
      case "review":
        // 查看
        this.getSingleInfo(row.emmsDocInoutId).then(xhr => {
          let reviewItem = this.$globalFnc.deepCopy(this.contentItems),
            reviewDetailTableHeader = this.$globalFnc.deepCopy(
              this.detailTableHeader
            );
          reviewItem.map(item => {
            item.disabled = true;
          });
          reviewDetailTableHeader.map(item => {
            item.disabled = true;
          });
          this.getStorePointList(xhr.data.storeOrgId).then(res => {
            reviewItem.map(dialogItem => {
              if (dialogItem.name == "storepointId") {
                dialogItem.data = res;
              }
            });
          });
          this.getStoreHouseList(xhr.data.storepointId).then(houseList => {
            reviewDetailTableHeader.map(head => {
              if (head.key == "storehouseId") {
                head.data = houseList;
              }
            });
          });
          this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
          this.tableChosedSettings.tableDatas = xhr.data.emmsDocInoutDtls;
          this.dialogFormSettings.dialogFormItems.formGroupList = reviewItem;
          this.dialogInputTableSettings.headers = reviewDetailTableHeader;
          this.dialogInputTableSettings.selection = false;
          this.dialogFormSettings.dialogFormItems.formButtonList = [];
          this.dialogFormSettings.dialogFormVisible = true;
        });
        break;
      case "inCome":
        // 入库
        this.$confirm("确定执行单据入库吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$getData(this.$api.inOut_incomeCertify, {
            emmsDocInoutId: row.emmsDocInoutId
            // type: "IN"
          }).then(() => {
            this.$message.success("您已成功执行单据入库!");
            this.initPageData();
          });
        });
        break;
      case "delete":
        // 删除
        this.$confirm("确定删除当前单据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$postData(this.$api.remove_incomeCertify, {
            emmsDocInoutId: row.emmsDocInoutId
          }).then(() => {
            this.$message.success("您已成功删除该执行单!");
            this.initPageData();
          });
        });
        break;
      default:
        break;
    }
  },
  /**
   * 弹窗可输入table中行间选择事件
   */
  handleTableSelectChange(key, rowData) {
    if (rowData.key == "storehouseId") {
      this.getStoreHouseStackList(rowData.value).then(data => {
        this.$set(
          this.tableChosedSettings.tableDatas[rowData.index],
          "wmsBasStackId__selectOption",
          data
        );
      });
    }
    if (rowData.key == "finishNum") {
      this.tableChosedSettings.tableDatas[rowData.index].num = rowData.value;
    }
  },
  /**
   * 弹框确认按钮
   */
  handleDialogForm(button, data) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        docNo: "系统自动生成",
        created: this.$globalFnc.dateStampFormat(new Date().getTime()),
        businessDate: this.$globalFnc.dateStampFormat(
          new Date().getTime(),
          "ymd"
        )
      };
      return;
    }
    let postParams = this.$globalFnc.deepCopy(data);
    postParams.storeOrgId =
      typeof data.storeOrgId === "object"
        ? data.storeOrgId[data.storeOrgId.length - 1]
        : data.storeOrgId;
    postParams.emmsDocInoutDtls = this.tableChosedSettings.tableDatas;
    postParams.type = this.certifyType;
    if (button.flag === "addIncome") {
      delete postParams.docNo;
      delete postParams.created;
    }
    this.$postData(this.$api[button.postUrl], postParams, true).then(() => {
      this.$message.success("保存成功!");
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.initPageData();
    });
  },
  /**
   * 树形选择点击事件
   */
  handleTreeNodeClick(node) {
    this.chosedEmmsBasMaterialTypeId = node.id;
    this.getMaterialListByType(this.chosedEmmsBasMaterialTypeId);
  },
  //待选物资table分页切换
  handleBeChosedPaginationPagenumber(val) {
    this.beChosedPaginationSettings.currentPage = val;
    this.handleTreeNodeClick({ id: this.chosedEmmsBasMaterialTypeId });
  },
  /**
   * 待选物资table点击事件
   */
  handleCurrentChange(val) {
    this.toBechosedEmmsBasMaterial = val;
  },
  /**
   * 已选物资table点击事件
   */
  handleChosedCurrentChange(val) {
    this.toBeRemoveEmmsBasMaterial = val;
  },
  /**
   * 待选物资table点击事件
   */
  handleMetrialTableMutiChecked(val) {
    this.toBechosedEmmsBasMaterialRefer = val;
  },
  /**
   * 获取单条单据详情
   */
  getSingleInfo(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.single_incomeCertify, {
        emmsDocInoutId: id
      }).then(xhr => {
        xhr.data.emmsDocInoutDtls.map(dtl => {
          dtl.specs = dtl.emmsBasMaterialSpec.specs;
          dtl.mType = dtl.emmsBasMaterialSpec.mType;
          dtl.emmsBasMaterialTypeId = dtl.emmsBasMaterial.emmsBasMaterialTypeId;
          dtl.materialTypeName = dtl.emmsBasMaterial.basMaterialType.name;
          dtl.code = dtl.emmsBasMaterial.code;
          dtl.name = dtl.emmsBasMaterial.name;
          dtl.expiredDate = this.$globalFnc.dateStampFormat(dtl.expiredDate);
          dtl.unitName = dtl.emmsBasMaterial.basUnit.name;
          this.getStoreHouseStackList(dtl.storehouseId).then(data => {
            this.$set(dtl, "wmsBasStackId__selectOption", data);
          });
        });
        reslove(xhr);
      });
    });
  },
  /**
   * 获取物资类别树
   */
  getMaterialTypeTree() {
    return new Promise(reslove => {
      this.$getData(this.$api.getMaterialTypeTree, {
        disabled: "N"
      }).then(res => {
        reslove(res);
      });
    });
  },
  /**
   * 获取物资类别下物资列表
   */
  getMaterialListByType(id, searchData) {
    return new Promise(reslove => {
      let baseForm = {
        page: this.beChosedPaginationSettings.currentPage,
        rows: this.$global.paginationOption.numberPerpage,
        emmsBasMaterialTypeId: id,
        isHasChild: "Y"
      };
      Object.assign(baseForm, searchData);
      this.$getData(this.$api.getMaterialList, baseForm).then(res => {
        // this.$getData(this.$api.getMaterialTypeList, baseForm).then(res => {
        res.rows.map(row => {
          row.materialTypeName = row.basMaterialType.name;
          row.unitName = row.basUnit.name;
          row.emmsBasMaterialSpecId =
            row.basMaterialSpecs[0].emmsBasMaterialSpecId;
          row.specs = row.basMaterialSpecs[0].specs;
          row.mType = row.basMaterialSpecs[0].mType;
          row.brand = row.basMaterialSpecs[0].brand;
          row.manufacturer = row.basMaterialSpecs[0].manufacturer;
        });
        this.tableToBeChosedSettings.tableDatas = res.rows;
        this.beChosedPaginationSettings.totalNumbers = res.total;
        reslove(res);
      });
    });
  },
  /**
   * 获取物资明细
   */
  getMaterialDetail(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.singleMaterialData, { id: id }).then(res => {
        res.data.materialTypeName = res.data.basMaterialType.name;
        res.data.unitName = res.data.basUnit.name;
        res.data.emmsBasMaterialSpecId =
          res.data.basMaterialSpecs[0].emmsBasMaterialSpecId;
        res.data.specs = res.data.basMaterialSpecs[0].specs;
        res.data.mType = res.data.basMaterialSpecs[0].mType;
        res.data.brand = res.data.basMaterialSpecs[0].brand;
        res.data.manufacturer = res.data.basMaterialSpecs[0].manufacturer;
        res.data.num = 0;
        res.data.finishNum = 0;
        reslove(res.data);
      });
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
   * 获取货位
   */
  getStoreHouseStackList(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.dictList_common, {
        _refKey: "basstack",
        status: "1",
        isReal: "Y",
        storehouseId: id
      }).then(res => {
        let data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        reslove(data);
      });
    });
  }
};
export default methods;
