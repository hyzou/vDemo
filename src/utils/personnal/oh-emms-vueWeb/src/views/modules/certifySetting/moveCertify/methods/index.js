const methods = {
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "list_moveCertify" }, defaultdatas);
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
    if (formData.inStorepointId) {
      filterRules.push({
        field: "inStorepointId",
        op: "=",
        value: formData.inStorepointId
      });
    }
    if (formData.outStorepointId) {
      filterRules.push({
        field: "outStorepointId",
        op: "=",
        value: formData.outStorepointId
      });
    }
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      orgid: formData.storeOrgId ? formData.storeOrgId : "",
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
      item.docNo = item.emmsDocMove.docNo;
      item.businessDate = item.emmsDocMove.businessDate;
      item.outStorepointName = item.emmsDocMove.outStorepointName;
      item.inStorepointName = item.emmsDocMove.inStorepointName;
      item.status__dsp = item.emmsDocMove.status__dsp;
      item.status = item.emmsDocMove.status;
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
                text: "移库",
                type: "move",
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
    this.toBeRemoveEmmsBasMaterial = val;
  },
  // 表单值选定修改事件
  handleChangeSelect(linkname, data) {
    // 根据组织机构获取库点列表
    if (
      linkname == "changeOrg" ||
      linkname == "inStoreOrgId" ||
      linkname == "outStoreOrgId"
    ) {
      this.getStorePointList(data[data.length - 1]).then(res => {
        if (linkname == "changeOrg") {
          this.searchFormSettings.formGroupList.map(searchItem => {
            if (
              searchItem.name == "outStorepointId" ||
              searchItem.name == "inStorepointId"
            ) {
              searchItem.data = res;
            }
          });
        } else if (linkname == "inStoreOrgId") {
          this.contentItems.map(dialogItem => {
            if (dialogItem.name == "inStorepointId") {
              dialogItem.data = res;
            }
          });
        } else if (linkname == "outStoreOrgId") {
          this.contentItems.map(dialogItem => {
            if (dialogItem.name == "outStorepointId") {
              dialogItem.data = res;
            }
          });
        }
      });
    }

    if (linkname == "outStorepointId") {
      this.tableChosedSettings.tableDatas = [];
    }
    if (linkname == "inStorepointId") {
      this.getStoreHouseList(data).then(houseList => {
        this.dialogInputTableSettings.headers.map(head => {
          if (head.key == "inStorehouseId") {
            head.data = houseList;
          }
        });
      });
      if (this.tableChosedSettings.tableDatas.length > 0) {
        this.tableChosedSettings.tableDatas.map(item => {
          item.inStorehouseId = "";
          item.inStackId = "";
        });
      }
    }
    if (linkname == "dialogSourceType") {
      this.contentItems.map(item => {
        if (item.name == "sourceId") {
          item.hideItem = data == "NON" ? true : false;
        }
      });
    }
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "详情";
      this.dialogInputTableSettings.headers = this.detailTableHeader;
      this.dialogInputTableSettings.selection = true;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.contentItems;
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addButton;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        docNo: "系统自动生成",
        created: this.$globalFnc.dateStampFormat(new Date().getTime()),
        businessDate: this.$globalFnc.dateStampFormat(
          new Date().getTime(),
          "ymd"
        )
      };
      this.contentItems.map(dialogItem => {
        if (dialogItem.name == "storepointId") {
          dialogItem.data = [];
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
      if (
        !this.dialogFormSettings.dialogFormItems.formGroupValues.outStorepointId
      ) {
        this.$message.error("请先选定移出库点");
        return false;
      }
      this.getStockList().then(xhr => {
        this.dialogTableSettings.dialogFormVisible = true;
      });
    }
    if (data.flag === "removeDetail") {
      let bakdatas = this.$globalFnc.deepCopy(
        this.tableChosedSettings.tableDatas
      );
      bakdatas.map(item => {
        let flag = false;
        this.toBeRemoveEmmsBasMaterial.map(removeItem => {
          if (item.emmsStockDtlId == removeItem.emmsStockDtlId) {
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
      this.tableChosedSettings.tableDatas = this.toBechosedEmmsBasMaterial;
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
        this.getSingleInfo(row.emmsDocMoveId).then(xhr => {
          this.getStorePointList(xhr.data.inStoreOrgId).then(res => {
            this.contentItems.map(dialogItem => {
              if (dialogItem.name == "inStorepointId") {
                dialogItem.data = res;
              }
            });
          });
          this.getStorePointList(xhr.data.outStoreOrgId).then(res => {
            this.contentItems.map(dialogItem => {
              if (dialogItem.name == "outStorepointId") {
                dialogItem.data = res;
              }
            });
          });
          this.getStoreHouseList(xhr.data.inStorepointId).then(houseList => {
            this.dialogInputTableSettings.headers.map(head => {
              if (head.key == "inStorehouseId") {
                head.data = houseList;
              }
            });
          });
          this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
          this.tableChosedSettings.tableDatas = xhr.data.emmsDocMoveDtls;
          this.dialogFormSettings.dialogFormVisible = true;
          this.dialogInputTableSettings.headers = this.detailTableHeader;
          this.dialogInputTableSettings.selection = true;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.contentItems;
          this.dialogFormSettings.dialogFormItems.formButtonList = this.editButton;
        });
        break;
      case "review":
        // 查看
        this.getSingleInfo(row.emmsDocMoveId).then(xhr => {
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
          this.getStorePointList(xhr.data.inStoreOrgId).then(res => {
            reviewItem.map(dialogItem => {
              if (dialogItem.name == "inStorepointId") {
                dialogItem.data = res;
              }
            });
          });
          this.getStorePointList(xhr.data.outStoreOrgId).then(res => {
            reviewItem.map(dialogItem => {
              if (dialogItem.name == "outStorepointId") {
                dialogItem.data = res;
              }
            });
          });
          this.getStoreHouseList(xhr.data.inStorepointId).then(houseList => {
            reviewDetailTableHeader.map(head => {
              if (head.key == "inStorehouseId") {
                head.data = houseList;
              }
            });
          });
          this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
          this.tableChosedSettings.tableDatas = xhr.data.emmsDocMoveDtls;
          this.dialogFormSettings.dialogFormItems.formGroupList = reviewItem;
          this.dialogInputTableSettings.headers = reviewDetailTableHeader;
          this.dialogInputTableSettings.selection = false;
          this.dialogFormSettings.dialogFormItems.formButtonList = [];
          this.dialogFormSettings.dialogFormVisible = true;
        });
        break;
      case "move":
        // 移库
        this.$confirm("确定执行单据移库吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$getData(this.$api.move_moveCertify, {
            emmsDocMoveId: row.emmsDocMoveId
            // type: "IN"
          }).then(() => {
            this.$message.success("您已成功执行单据移库!");
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
          this.$postData(this.$api.remove_moveCertify, {
            emmsDocMoveId: row.emmsDocMoveId
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
    if (rowData.key == "inStorehouseId") {
      this.getStoreHouseStackList(rowData.value).then(data => {
        this.$set(
          this.tableChosedSettings.tableDatas[rowData.index],
          "inStackId__selectOption",
          data
        );
        this.$set(
          this.tableChosedSettings.tableDatas[rowData.index],
          "inStackId",
          ""
        );
      });
    }
    if (rowData.key == "inStackId") {
      if (
        this.dialogFormSettings.dialogFormItems.formGroupValues
          .outStorepointId ==
          this.dialogFormSettings.dialogFormItems.formGroupValues
            .inStorepointId &&
        this.tableChosedSettings.tableDatas[rowData.index].inStorehouseId ==
          this.tableChosedSettings.tableDatas[rowData.index].outStorehouseId &&
        this.tableChosedSettings.tableDatas[rowData.index].inStackId ==
          this.tableChosedSettings.tableDatas[rowData.index].outStackId
      ) {
        this.tableChosedSettings.tableDatas[rowData.index].inStackId = "";
        this.$message.error("同库点同仓房同货位不可进行移库操作！");
      }
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
    postParams.inStoreOrgId =
      typeof data.inStoreOrgId === "object"
        ? data.inStoreOrgId[data.inStoreOrgId.length - 1]
        : data.inStoreOrgId;
    postParams.outStoreOrgId =
      typeof data.outStoreOrgId === "object"
        ? data.outStoreOrgId[data.outStoreOrgId.length - 1]
        : data.outStoreOrgId;
    postParams.emmsDocMoveDtls = this.tableChosedSettings.tableDatas;
    postParams.emmsDocMoveDtls.map(item => {
      item.finishOutNum = item.finishInNum;
    });
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
  //待选物资table分页切换
  handleBeChosedPaginationPagenumber(val) {
    this.beChosedPaginationSettings.currentPage = val;
    this.getStockList(val);
  },
  /**
   * 待选物资table点击事件
   */
  handleMetrialTableMutiChecked(val) {
    this.toBechosedEmmsBasMaterial = val;
  },
  /**
   * 获取单条单据详情
   */
  getSingleInfo(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.single_moveCertify, {
        emmsDocMoveId: id
      }).then(xhr => {
        xhr.data.emmsDocMoveDtls.map(dtl => {
          dtl.materialSpec = dtl.emmsBasMaterialSpec.specs;
          dtl.materialMType = dtl.emmsBasMaterialSpec.mType;
          dtl.emmsBasMaterialTypeId = dtl.emmsBasMaterial.emmsBasMaterialTypeId;
          dtl.materialTypeName = dtl.emmsBasMaterial.basMaterialType.name;
          dtl.materialCode = dtl.emmsBasMaterial.code;
          dtl.emmsBasMaterialName = dtl.emmsBasMaterial.name;
          dtl.unitName = dtl.emmsBasMaterial.basUnit.name;
          this.getStoreHouseStackList(dtl.inStorehouseId).then(data => {
            this.$set(dtl, "inStackId__selectOption", data);
          });
        });
        reslove(xhr);
      });
    });
  },
  /**
   * 获取库存明细
   */ getStockList(page) {
    return new Promise(reslove => {
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
            .outStorepointId
        },
        {
          field: "updateDocId",
          op: "=",
          value: this.dialogFormSettings.dialogFormItems.formGroupValues
            .emmsDocInoutId
            ? this.dialogFormSettings.dialogFormItems.formGroupValues
                .emmsDocInoutId
            : ""
        },
        {
          field: "updateDocType",
          op: "=",
          value: "move"
        }
      ];
      this.$getData(this.$api.pagelist_inventoryDetail, {
        page: page ? page : this.beChosedPaginationSettings.currentPage,
        rows: this.$global.paginationOption.numberPerpage,
        orgid: 1,
        subordinate: "Y",
        filterRules: JSON.stringify(filterRules)
      }).then(res => {
        let toBechosedTalbeData = this.$globalFnc.deepCopy(res.rows);
        toBechosedTalbeData.map(item => {
          item.outStorehouseId = item.storehouseId;
          item.outStorehouseName = item.storehouseName;
          item.outStackId = item.wmsBasStackId;
          item.outStackName = item.wmsBasStackName;
          item.outStockDtlId = item.emmsStockDtlId;
          item.allnum = item.num;
          item.num = item.operableNum;
          item.finishNum = item.operableNum;
          item.maxNumber = item.operableNum;
        });
        this.tableToBeChosedSettings.tableDatas = toBechosedTalbeData;
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
