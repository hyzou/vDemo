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
    let options = {
      vm: this
    };
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage,
      orgid: formData.storeOrgId ? formData.storeOrgId : "",
      subordinate: formData.subordinate ? formData.subordinate : "Y",
      filterRules: JSON.stringify(filterRules),
      sourceDocNo: formData.sourceDocNo ? formData.sourceDocNo : ""
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
    // this.getMaterialListByType(this.chosedEmmsBasMaterialTypeId, formData);
  },
  setTableList(data) {
    let taskList = this.$globalFnc.deepCopy(data.rows);
    taskList.map(item => {
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
                text: "退货出库",
                type: "out",
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
  formatData(data, prop) {
    data.map(item => {
      // 按钮
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
    });
  },
  // 表格多选事件
  handleTableMutiChecked(val, name) {
    this.toBeRemoveEmmsBasMaterial = val;
  },
  // 表单值选定修改事件
  handleChangeSelect(linkname, data) {
    // 根据组织机构获取库点列表
    if (linkname == "changeOrg" || linkname == "changeStoreOrg") {
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
      this.getStoreHouseList(data).then(houseList => {
        this.dialogInputTableSettings.headers.map(head => {
          if (head.key == "storehouseId") {
            head.data = houseList;
          }
        });
      });
      this.getIncomeTree(data).then(xhr => {
        this.contentItems.map(dialogItem => {
          if (dialogItem.name == "sourceId") {
            dialogItem.data = xhr;
          }
        });
      });
    }
    // if (linkname == "dialogSourceType") {
    //   this.contentItems.map(item => {
    //     if (item.name == "sourceId") {
    //       item.hideItem = data == "NON" ? true : false;
    //     }
    //   });
    // }
    if (linkname == "changesourceId") {
      this.tableChosedSettings.tableDatas = [];
      this.$getData(this.$api.single_incomeCertify, {
        emmsDocInoutId: data,
        isNeedStock: "Y"
      }).then(xhr => {
        this.$set(
          this.dialogFormSettings.dialogFormItems.formGroupValues,
          "storepointId",
          xhr.data.storepointId
        );
        this.$set(
          this.dialogFormSettings.dialogFormItems.formGroupValues,
          "storeOrgId",
          xhr.data.storeOrgId
        );
        this.$set(
          this.dialogFormSettings.dialogFormItems.formGroupValues,
          "storepointName",
          xhr.data.storepointName
        );
        this.$set(
          this.dialogFormSettings.dialogFormItems.formGroupValues,
          "storeOrgId__dsp",
          xhr.data.storeOrgId__dsp
        );
        this.$set(
          this.dialogFormSettings.dialogFormItems.formGroupValues,
          "sourceType",
          xhr.data.sourceType
        );
        this.$set(
          this.dialogFormSettings.dialogFormItems.formGroupValues,
          "sourceType__dsp",
          xhr.data.sourceType__dsp
        );
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
        ),
        storeOrgId: this.$store.getters["user/userInfos"].orgId,
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
      if (!this.dialogFormSettings.dialogFormItems.formGroupValues.sourceId) {
        this.$message.error("请先选定入库执行单号");
        return false;
      }
      this.getIncomeDetailMetirialList(
        this.dialogFormSettings.dialogFormItems.formGroupValues.sourceId
      ).then(xhr => {
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
  //待选物资table分页切换
  handleBeChosedPaginationPagenumber(val) {
    this.beChosedPaginationSettings.currentPage = val;
    this.getIncomeDetailMetirialList(
      this.dialogFormSettings.dialogFormItems.formGroupValues.sourceId,
      val
    );
  },
  handleTableRowButton(row, btns) {
    switch (btns.type) {
      case "edit":
        // 编辑
        this.getSingleInfo(row.emmsDocInoutId).then(xhr => {
          this.contentItems.map(dialogItem => {
            if (dialogItem.name == "sourceId") {
              dialogItem.data = [];
              this.getIncomeTree(
                xhr.data.storepointId,
                xhr.data.emmsDocInoutId
              ).then(xhrlist => {
                dialogItem.data = xhrlist;
              });
            }
          });
          this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
          this.tableChosedSettings.tableDatas = xhr.data.emmsDocInoutDtls;
          this.dialogInputTableSettings.headers = this.detailTableHeader;
          this.dialogInputTableSettings.selection = true;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.contentItems;
          this.dialogFormSettings.dialogFormVisible = true;
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
            if (item.name == "sourceId") {
              item.data = [];
              this.getIncomeTree(
                xhr.data.storepointId,
                xhr.data.emmsDocInoutId
              ).then(xhrlist => {
                item.data = xhrlist;
              });
            }
          });
          reviewDetailTableHeader.map(item => {
            item.disabled = true;
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
      case "out":
        // 出库
        this.$confirm("确定执行单据退货出库吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$getData(this.$api.inOut_incomeCertify, {
            emmsDocInoutId: row.emmsDocInoutId
            // type: "IN"
          }).then(() => {
            this.$message.success("您已成功执行单据退货出库!");
            this.initPageData();
          });
        });
        break;
      case "delete":
        // 删除
        this.$confirm("确定删除当前方案信息吗?", "提示", {
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
          dtl.unitName = dtl.emmsBasMaterial.basUnit.name;
        });
        reslove(xhr);
      });
    });
  },
  /**
   * 获取入库单列表
   */
  getIncomeTree(id, inoutId) {
    return new Promise(reslove => {
      let filterRules = [
        { field: "type", op: "=", value: "IN" },
        { field: "storepointId", op: "=", value: id },
        {
          field: "updateDocId",
          op: "=",
          value: inoutId
            ? inoutId
            : this.dialogFormSettings.dialogFormItems.formGroupValues
                .emmsDocInoutId
            ? this.dialogFormSettings.dialogFormItems.formGroupValues
                .emmsDocInoutId
            : ""
        }
      ];
      this.$getData(this.$api.getSourceInout, {
        filterRules: JSON.stringify(filterRules)
      }).then(res => {
        let list = this.$globalFnc.arrayToFormDropdown(
          res.data,
          "docNo",
          "emmsDocInoutId"
        );
        reslove(list);
      });
    });
  },
  /**
   * 获取入库单明细
   */
  getIncomeDetail(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.singleMaterialData, { id: id }).then(res => {
        this.tableToBeChosedSettings.tableDatas = res.data.emmsDocInoutDtls;
        reslove();
      });
    });
  },
  /**
   * 获取入库单物资明细
   */
  getIncomeDetailMetirialList(id, page) {
    return new Promise(reslove => {
      let filterRules = [
        {
          field: "emmsDocInoutId",
          op: "=",
          value: id
        },
        {
          field: "emmsDocInout.type",
          op: "=",
          value: "IN"
        },
        {
          field: "emmsDocInout.processinstStatus",
          op: "=",
          value: "99"
        }
      ];
      this.$getData(this.$api.detailList_incomeCertify, {
        filterRules: JSON.stringify(filterRules),
        isNeedStock: "Y",
        page: page ? page : 1,
        rows: this.$global.paginationOption.numberPerpage
      }).then(xhr => {
        let toBechosedTalbeData = this.$globalFnc.deepCopy(xhr.rows);
        toBechosedTalbeData.map(tableItem => {
          tableItem.sourceDtlId = tableItem.emmsDocInoutDtlId;
          tableItem.storePointName = tableItem.emmsDocInout.storepointName;
          tableItem.materialTypeName =
            tableItem.emmsBasMaterial.basMaterialType.name;
          tableItem.code = tableItem.emmsBasMaterial.code;
          tableItem.name = tableItem.emmsBasMaterial.name;
          tableItem.unitName = tableItem.emmsBasMaterial.basUnit.name;
          tableItem.specs = tableItem.emmsBasMaterialSpec.specs;
          tableItem.mType = tableItem.emmsBasMaterialSpec.mType;
          tableItem.inNum = tableItem.finishNum;
          tableItem.num = tableItem.returnableNum;
          tableItem.maxNumber = tableItem.returnableNum;
          tableItem.finishNum = tableItem.returnableNum;
        });
        this.tableToBeChosedSettings.tableDatas = toBechosedTalbeData;
        this.beChosedPaginationSettings.totalNumbers = xhr.total;
        reslove(xhr);
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
