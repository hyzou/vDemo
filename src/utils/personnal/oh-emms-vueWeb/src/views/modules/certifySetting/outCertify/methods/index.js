import { toLower } from "lodash";

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
    if (formData.sourceType) {
      filterRules.push({
        field: "sourceType",
        op: "=",
        value: formData.sourceType
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
    this.getMaterialListByType(this.chosedEmmsBasMaterialTypeId, formData);
  },
  // 格式化table数据
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
                text: "出库",
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
        this.dialogInputRETableSettings.expandKeyValueArr.map(head => {
          if (head.value == "storehouseId") {
            head.data = houseList;
          }
        });
      });
      if (
        this.dialogFormSettings.dialogFormItems.formGroupValues.sourceType ==
        "RE"
      ) {
        this.getRequisitionList(data).then(xhr => {
          this.contentItems.map(item => {
            if (item.name == "sourceId") {
              item.data = xhr;
            }
          });
        });
      }
      if (
        this.dialogFormSettings.dialogFormItems.formGroupValues.sourceType ==
        "SCRAP"
      ) {
        this.getScrapCertifyListNopage(data).then(xhr => {
          this.contentItems.map(item => {
            if (item.name == "sourceId") {
              item.data = xhr;
            }
          });
        });
      }
    }
    if (linkname == "dialogSourceType") {
      // this.$set(
      //   this.dialogFormSettings.dialogFormItems.formGroupValues,
      //   "storeOrgId",
      //   ""
      // );
      // this.$set(
      //   this.dialogFormSettings.dialogFormItems.formGroupValues,
      //   "storepointId",
      //   ""
      // );
      this.$set(
        this.dialogFormSettings.dialogFormItems.formGroupValues,
        "sourceId",
        ""
      );
      this.contentItems.map(dialogItem => {
        // if (dialogItem.name == "storepointId") {
        //   dialogItem.data = [];
        // }
        if (dialogItem.name == "sourceId") {
          dialogItem.data = [];
          if (data == "RE" || data == "SCRAP") {
            dialogItem.hideItem = false;
            if (data == "RE") {
              this.getRequisitionList().then(xhr => {
                dialogItem.data = xhr;
              });
            }
            if (data == "SCRAP") {
              this.getScrapCertifyListNopage().then(xhr => {
                dialogItem.data = xhr;
              });
            }
          } else {
            dialogItem.hideItem = true;
          }
        }
      });
      this.tableChosedSettings.tableDatas = [];
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
        sourceType: this.$store.getters["user/baseInfos"].outSourceTypeList[0]
          .value,
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
      if (
        !this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId
      ) {
        this.$message.error("请先选定库点");
        return false;
      }
      if (
        this.dialogFormSettings.dialogFormItems.formGroupValues.sourceType ==
        "STOCK"
      ) {
        this.getStockList().then(xhr => {
          this.dialogTableSettings.dialogFormVisible = true;
        });
      } else {
        if (!this.dialogFormSettings.dialogFormItems.formGroupValues.sourceId) {
          this.$message.error("请先选择来源单号");
          return false;
        }
        this.toBechosedEmmsBasMaterialRefer = [];
        if (
          this.dialogFormSettings.dialogFormItems.formGroupValues.sourceType ==
          "RE"
        ) {
          this.getSingleRequisitionDetaillist().then(xhr => {
            this.dialogTableSettings.dialogFormVisible = true;
          });
        } else {
          this.getScrapDetail().then(xhr => {
            this.dialogTableSettings.dialogFormVisible = true;
          });
        }
      }
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
    if (
      // data.flag === "saveChosedMetrial" ||
      data.flag === "saveChosedReferMetrial"
    ) {
      let chosedData = this.$globalFnc.deepCopy(this.toBechosedEmmsBasMaterial);
      chosedData.map(chosedItem => {
        this.getStoreStackMetarialNumber(chosedItem).then(xhr => {
          this.$set(chosedItem, "storeHouseInfos", [
            {
              storehouseId: "",
              emmsStockDtlId: "",
              noLockNum: "",
              emmsBasMaterialSpecId: chosedItem.emmsBasMaterialSpecId,
              finishNum: "",
              emmsStockDtlId__selectOption: xhr
            }
          ]);
        });
      });
      this.tableChosedSettings.tableDatas = chosedData;
      this.dialogTableSettings.dialogFormVisible = false;
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
        this.isReview = false;
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
            // this.dialogInputTableSettings.headers.map(head => {
            //   if (head.key == "storehouseId") {
            //     head.data = houseList;
            //   }
            // });
            this.dialogInputRETableSettings.expandKeyValueArr.map(head => {
              if (head.value == "storehouseId") {
                head.data = houseList;
              }
            });
          });
          this.dialogFormSettings.dialogFormItems.formGroupValues = xhr.data;
          if (xhr.data.sourceType == "RE") {
            this.getRequisitionList().then(requist => {
              this.contentItems.map(item => {
                if (item.name == "sourceId") {
                  item.data = requist;
                }
              });
            });
            let copyDtllist = this.$globalFnc.deepCopy(
              xhr.data.emmsDocInoutDtls
            );
            let sorted = this.$globalFnc.arrayGroupByAttr(copyDtllist, function(
              item
            ) {
              return [item.sourceDtlId];
            });
            let storeHouseInfos = [];
            if (sorted.length > 0) {
              sorted.map(arrItem => {
                let obj = {};
                if (arrItem.length > 0) {
                  obj = this.$globalFnc.deepCopy(arrItem[0]);
                }
                obj.storeHouseInfos = this.$globalFnc.deepCopy(arrItem);
                obj.storeHouseInfos.map(houseInfo => {
                  this.getStoreStackMetarialNumber(houseInfo).then(xhrdata => {
                    this.$set(
                      houseInfo,
                      "emmsStockDtlId__selectOption",
                      xhrdata
                    );
                    xhrdata.map(xhrItem => {
                      if (xhrItem.emmsStockDtlId == houseInfo.emmsStockDtlId) {
                        this.$set(houseInfo, "noLockNum", xhrItem.noLockNum);
                        this.$set(houseInfo, "maxNumber", xhrItem.noLockNum);
                      }
                    });
                  });
                });
                storeHouseInfos.push(obj);
              });
            }
            this.tableChosedSettings.tableDatas = storeHouseInfos;
          } else {
            if (xhr.data.sourceType == "SCRAP") {
              this.getScrapCertifyListNopage(xhr.data.storepointId).then(
                listxhr => {
                  this.contentItems.map(item => {
                    if (item.name == "sourceId") {
                      item.data = listxhr;
                    }
                  });
                }
              );
            }
            this.tableChosedSettings.tableDatas = xhr.data.emmsDocInoutDtls;
          }
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
          this.isReview = true;
          let reviewItem = this.$globalFnc.deepCopy(this.contentItems),
            reviewDetailTableHeader = this.$globalFnc.deepCopy(
              this.detailTableHeader
            );
          reviewItem.map(item => {
            item.disabled = true;
          });
          this.getStorePointList(xhr.data.storeOrgId).then(res => {
            reviewItem.map(dialogItem => {
              if (dialogItem.name == "storepointId") {
                dialogItem.data = res;
              }
            });
          });
          reviewDetailTableHeader.map(item => {
            item.disabled = true;
          });
          if (xhr.data.sourceType == "RE") {
            this.getRequisitionList().then(requist => {
              this.contentItems.map(item => {
                if (item.name == "sourceId") {
                  item.data = requist;
                }
              });
            });
            let copyDtllist = this.$globalFnc.deepCopy(
              xhr.data.emmsDocInoutDtls
            );
            let sorted = this.$globalFnc.arrayGroupByAttr(copyDtllist, function(
              item
            ) {
              return [item.sourceDtlId];
            });
            let storeHouseInfos = [];
            if (sorted.length > 0) {
              sorted.map(arrItem => {
                let obj = {};
                if (arrItem.length > 0) {
                  obj = this.$globalFnc.deepCopy(arrItem[0]);
                }
                obj.storeHouseInfos = this.$globalFnc.deepCopy(arrItem);
                obj.storeHouseInfos.map(houseInfo => {
                  this.getStoreStackMetarialNumber(houseInfo).then(xhrdata => {
                    this.$set(
                      houseInfo,
                      "emmsStockDtlId__selectOption",
                      xhrdata
                    );
                    xhrdata.map(xhrItem => {
                      if (xhrItem.emmsStockDtlId == houseInfo.emmsStockDtlId) {
                        this.$set(houseInfo, "noLockNum", xhrItem.noLockNum);
                        this.$set(houseInfo, "maxNumber", xhrItem.noLockNum);
                      }
                    });
                  });
                });
                storeHouseInfos.push(obj);
              });
            }
            this.tableChosedSettings.tableDatas = storeHouseInfos;
          } else {
            if (xhr.data.sourceType == "SCRAP") {
              this.getScrapCertifyListNopage(xhr.data.storepointId).then(
                listxhr => {
                  this.contentItems.map(item => {
                    if (item.name == "sourceId") {
                      item.data = listxhr;
                    }
                  });
                }
              );
            }
          }
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
        this.$confirm("确定执行单据出库吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$getData(this.$api.inOut_incomeCertify, {
            emmsDocInoutId: row.emmsDocInoutId
            // type: "IN"
          }).then(() => {
            this.$message.success("您已成功执行单据出库!");
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
    if (rowData.key == "emmsStockDtlId") {
      let chosedDetailObj = {};
      rowData.defaultdatas[rowData.index].emmsStockDtlId__selectOption.map(
        selectItem => {
          if (selectItem.emmsStockDtlId == rowData.value) {
            chosedDetailObj = this.$globalFnc.deepCopy(selectItem);
          }
        }
      );
      this.$set(
        rowData.defaultdatas[rowData.index],
        "storehouseId",
        chosedDetailObj.storehouseId
      );
      this.$set(
        rowData.defaultdatas[rowData.index],
        "wmsBasStackId",
        chosedDetailObj.wmsBasStackId
      );
      this.$set(
        rowData.defaultdatas[rowData.index],
        "reserveType",
        chosedDetailObj.reserveType
      );
      this.$set(
        rowData.defaultdatas[rowData.index],
        "maxNumber",
        chosedDetailObj.noLockNum
      );
      this.$set(
        rowData.defaultdatas[rowData.index],
        "pbc",
        chosedDetailObj.pbc
      );
      this.$set(
        rowData.defaultdatas[rowData.index],
        "price",
        chosedDetailObj.price
      );
      this.$set(
        rowData.defaultdatas[rowData.index],
        "expiredDate",
        chosedDetailObj.expiredDate
      );
      this.$set(
        rowData.defaultdatas[rowData.index],
        "noLockNum",
        chosedDetailObj.noLockNum
      );
      this.$set(rowData.defaultdatas[rowData.index], "finishNum", 0);
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
        ),
        sourceType: this.$store.getters["user/baseInfos"].outSourceTypeList[0]
          .value
      };
      return;
    }
    let postParams = this.$globalFnc.deepCopy(data),
      emmsDocInoutDtls = this.$globalFnc.deepCopy(
        this.tableChosedSettings.tableDatas
      );
    postParams.storeOrgId =
      typeof data.storeOrgId === "object"
        ? data.storeOrgId[data.storeOrgId.length - 1]
        : data.storeOrgId;
    postParams.type = this.certifyType;
    if (button.flag === "addIncome") {
      delete postParams.docNo;
      delete postParams.created;
    }
    if (postParams.sourceType == "RE") {
      let dtlsList = [];
      emmsDocInoutDtls.map(dtl => {
        dtl.storeHouseInfos.map(info => {
          let bakDtl = this.$globalFnc.deepCopy(dtl);
          Object.assign(bakDtl, info);
          delete bakDtl.storeHouseInfos;
          delete bakDtl.basMaterial;
          delete bakDtl.basMaterialSpec;
          delete bakDtl.emmsStockDtlId__selectOption;
          delete bakDtl.requisition;
          dtlsList.push(bakDtl);
        });
      });
      postParams.emmsDocInoutDtls = dtlsList;
    } else {
      postParams.emmsDocInoutDtls = emmsDocInoutDtls;
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
  handleBeChosedReferPagenumber(val) {
    this.beChosedPaginationReferSettings.currentPage = val;
    if (
      this.dialogFormSettings.dialogFormItems.formGroupValues.sourceType == "PP"
    ) {
      this.getSinglePurchaseList();
    } else {
      this.getSingleRecoverList();
    }
  },
  /**
   * 待选物资table点击事件
   */
  handleMetrialTableMutiChecked(val) {
    this.toBechosedEmmsBasMaterial = val;
  },
  /**
   * 获取调拨单列表
   */
  getRequisitionList(id) {
    if (
      !id &&
      !this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId
    ) {
      // this.$message.error("请选择库点!");
      return false;
    }
    return new Promise(reslove => {
      this.$getData(this.$api.getRequisitionNopage, {
        "requisition.processinstStatus": "end",
        "requisition.storepointId": id
          ? id
          : this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId
      }).then(res => {
        let list = this.$globalFnc.arrayToFormDropdown(
          res.data,
          "docNo",
          "emmsDocRequisitionId"
        );
        this.ordersList = list;
        reslove(list);
      });
    });
  },
  /**
   * 获取单条调拨单详情
   */
  getSingleRequisitionInfo(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.singleRequisitionCertifyData, {
        id: id
      }).then(res => {
        reslove(res);
      });
    });
  },
  /**
   * 获取调拨单物资列表
   */
  getSingleRequisitionDetaillist(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.getRequisitionDetailList, {
        "requisition.emmsDocRequisitionId": id
          ? id
          : this.dialogFormSettings.dialogFormItems.formGroupValues.sourceId,
        page: this.beChosedPaginationSettings.currentPage,
        rows: this.$global.paginationOption.numberPerpage
      }).then(res => {
        res.rows.map(row => {
          row.sourceType = row.requisition.sourceType;
          row.sourceId = row.requisition.sourceId;
          row.sourceDtlId = row.emmsDocRequisitionDtlId;
          row.storepointName = row.requisition.storepointId__dsp;
          row.materialTypeName = row.basMaterial.basMaterialType.name;
          row.materialCode = row.basMaterial.code;
          row.emmsBasMaterialName = row.basMaterial.name;
          row.unitName = row.basMaterial.basUnit.name;
          row.emmsBasMaterialSpecId = row.basMaterialSpec.emmsBasMaterialSpecId;
          row.materialSpec = row.basMaterialSpec.specs;
          row.materialMType = row.basMaterialSpec.mType;
          row.planNum = row.num;
          // row.num = row.distributableNum;
          row.finishNum = 0;
          row.maxNumber = row.distributableNum;
        });
        this.tableToBeChosedReferSettings.tableDatas = res.rows;
        this.beChosedPaginationReferSettings.totalNumbers = res.total;
        reslove(res);
      });
    });
  },
  /**
   * 获取单条单据详情
   */
  getSingleInfo(id) {
    return new Promise(reslove => {
      this.$getData(this.$api.single_incomeCertify, {
        emmsDocInoutId: id
      }).then(xhr => {
        this.contentItems.map(item => {
          if (item.name == "sourceId") {
            item.hideItem = xhr.data.sourceType == "STOCK" ? true : false;
          }
        });
        xhr.data.emmsDocInoutDtls.map(dtl => {
          dtl.wmsBasStackName = dtl.storeStackName;
          dtl.materialCode = dtl.emmsBasMaterial.code;
          dtl.emmsBasMaterialName = dtl.emmsBasMaterial.name;
          dtl.materialSpec = dtl.emmsBasMaterialSpec.specs;
          dtl.materialMType = dtl.emmsBasMaterialSpec.mType;
          dtl.emmsBasMaterialTypeId = dtl.emmsBasMaterial.emmsBasMaterialTypeId;
          dtl.unitName = dtl.emmsBasMaterial.basUnit.name;
        });
        reslove(xhr);
      });
    });
  },
  /**
   * 获取库存明细
   */
  getStockList(page) {
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
            .storepointId
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
          value: this.dialogFormSettings.dialogFormItems.formGroupValues
            .sourceType
            ? this.dialogFormSettings.dialogFormItems.formGroupValues.sourceType.toLocaleLowerCase()
            : ""
        }
      ];
      this.$getData(this.$api.pagelist_inventoryDetail, {
        page: page ? page : this.beChosedPaginationSettings.currentPage,
        rows: this.$global.paginationOption.numberPerpage,
        orgid: 1,
        subordinate: "Y",
        filterRules: JSON.stringify(filterRules)
      }).then(xhr => {
        let toBechosedTalbeData = this.$globalFnc.deepCopy(xhr.rows);
        toBechosedTalbeData.map(choseItem => {
          choseItem.finishNum = 0;
          choseItem.maxNumber = choseItem.operableNum;
          choseItem.allnum = choseItem.num;
          choseItem.num = choseItem.operableNum;
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
  },
  /**
   * 获取货位物资库存
   */
  getStoreStackMetarialNumber(data) {
    return new Promise(reslove => {
      this.$getData(this.$api.getStackStock_common, {
        storepointId: this.dialogFormSettings.dialogFormItems.formGroupValues
          .storepointId,
        emmsBasMaterialSpecId: data.emmsBasMaterialSpecId
      }).then(res => {
        let list = this.$globalFnc.arrayToFormDropdown(
          res.data,
          "wmsBasStackId__dsp",
          "emmsStockDtlId"
        );
        reslove(list);
      });
    });
  },
  // 获取报废单来源单号
  getScrapCertifyListNopage(id) {
    if (
      !id &&
      !this.dialogFormSettings.dialogFormItems.formGroupValues.storepointId
    ) {
      // this.$message.error("请选择库点!");
      return false;
    }
    return new Promise(reslove => {
      let filterRules = [
        {
          field: "storepointId",
          op: "=",
          value: id
            ? id
            : this.dialogFormSettings.dialogFormItems.formGroupValues
                .storepointId
        }
      ];
      this.$getData(this.$api.getScrapCertifyListNopage, {
        updateDocId: this.dialogFormSettings.dialogFormItems.formGroupValues
          .emmsDocInoutId
          ? this.dialogFormSettings.dialogFormItems.formGroupValues
              .emmsDocInoutId
          : "",
        filterRules: JSON.stringify(filterRules)
      }).then(xhr => {
        let list = this.$globalFnc.arrayToFormDropdown(
          xhr.data,
          "docNo",
          "emmsDocScrapId"
        );
        reslove(list);
      });
    });
  },
  /**
   * 获取报废单号物资明细
   */
  getScrapDetail(id) {
    return new Promise(reslove => {
      let filterRules = [
        {
          field: "emmsDocScrapId",
          op: "=",
          value: id
            ? id
            : this.dialogFormSettings.dialogFormItems.formGroupValues.sourceId
        }
      ];
      this.$getData(this.$api.getScrapCertifyDetaillist, {
        filterRules: JSON.stringify(filterRules),
        isReturnOperableNum: "Y"
      }).then(xhr => {
        let toBechosedTalbeData = this.$globalFnc.deepCopy(xhr.rows);
        toBechosedTalbeData.map(choseItem => {
          choseItem.storepointName = choseItem.emmsDocScrap.storepointName;
          choseItem.storepointId = choseItem.emmsDocScrap.storepointId;
          choseItem.storeOrgId = choseItem.emmsDocScrap.storeOrgId;
          choseItem.materialTypeName =
            choseItem.emmsBasMaterial.basMaterialType.name;
          choseItem.materialCode = choseItem.emmsBasMaterial.code;
          choseItem.emmsBasMaterialName = choseItem.emmsBasMaterial.name;
          choseItem.unitName = choseItem.emmsBasMaterial.basUnit.name;
          choseItem.materialSpec = choseItem.emmsBasMaterialSpec.specs;
          choseItem.materialMType = choseItem.emmsBasMaterialSpec.mType;
          choseItem.sourceDtlId = choseItem.emmsDocScrapDtlId;
          choseItem.reserveType = choseItem.emmsStockDtl.reserveType;
          choseItem.pbc = choseItem.emmsStockDtl.pbc;
          choseItem.price = choseItem.emmsStockDtl.price;
          choseItem.operableNum = choseItem.scrapableNum;
          choseItem.finishNum = 0;
          choseItem.maxNumber = choseItem.scrapableNum;
          choseItem.allnum = choseItem.qty;
          choseItem.num = choseItem.scrapableNum;
          delete choseItem.emmsBasMaterial;
          delete choseItem.emmsBasMaterialSpec;
          delete choseItem.emmsDocScrap;
          delete choseItem.emmsStockDtl;
        });
        this.tableToBeChosedSettings.tableDatas = toBechosedTalbeData;
        this.beChosedPaginationSettings.totalNumbers = xhr.total;
        reslove(xhr);
      });
    });
  }
};
export default methods;
