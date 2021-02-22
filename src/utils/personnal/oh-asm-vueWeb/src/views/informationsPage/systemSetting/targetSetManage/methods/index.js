const methods = {
  /**
   * 表格
   */
  setTableList() {
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "编辑",
          type: "edit",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-edit-outline",
          isIcon: true
        }
      ]
    };
    // 获取指标列表
    this.$getData(this.$api.getAllKpiIndexTree, { code: this.pageType }).then(
      xhr => {
        let targetList = xhr;
        this.formatData(targetList, propObject);
        this.tableSettings.tableDatas = targetList;
      }
    );
  },
  formatData(data, prop) {
    data.map(item => {
      item[prop.name] = [];
      // parentId是0 ，说明是根节点，不需要编辑
      if (item.parentId !== "0") {
        item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      }
      switch (item.type) {
        case "KPI_INDEX":
          item[prop.name].push({
            text: "添加类目",
            type: "addKpiIndex",
            class: "text-primary fontSize20 mr10",
            icon: "el-icon-folder-add",
            isIcon: true
          });
          // 没有下级时，可以添加数据项
          if (!item.children) {
            // item[prop.name].push({
            //   text: "添加指标",
            //   type: "addKpi",
            //   class: "text-primary fontSize20 mr10",
            //   icon: "el-icon-folder-add",
            //   isIcon: true
            // });
            item[prop.name].push({
              text: "添加数据项",
              type: "addDataItems",
              class: "text-primary fontSize20 mr10",
              icon: "el-icon-folder-add",
              isIcon: true
            });
            item[prop.name].push({
              text: "查看数据项",
              type: "lookDataItems",
              class: "text-primary fontSize20 mr10",
              icon: "el-icon-folder-add",
              isIcon: true
            });
          }
          // 有下级，并且下级不是类目，可以指标，因为可以有多个评分标准
          // if (item.children && item.children[0].type !== "KPI_INDEX") {
          //   item[prop.name].push({
          //     text: "添加指标",
          //     type: "addKpi",
          //     class: "text-primary fontSize20 mr10",
          //     icon: "el-icon-folder-add",
          //     isIcon: true
          //   });
          // }
          break;
      }
      if (item.children) {
        this.formatData(item.children, prop);
      }
    });
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag == "addCheckContent") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormTitle = "新增考核内容";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addKpiIndexItemButton;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.kpiIndexItems;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        parentKpiIndexId: "1"
      };
    }
    if (data.flag == "closeSearch") {
      this.showSearchForm = !this.showSearchForm;
      if (this.showSearchForm) {
        data.label = "隐藏查询";
      } else {
        data.label = "显示查询";
      }
    }
  },
  /**
   *  下拉框change 事件
   */
  handleLinkSelect(type, data) {
    let formGroupList = this.dialogFormSettings.dialogFormItems.formGroupList;
    if (type === "isOpenSpecialCity") {
      formGroupList.map(item => {
        if (item.name === "specialCityScore") {
          data == "1" ? (item.hideItem = false) : (item.hideItem = true);
        }
      });
    }
  },
  /**
   * 表格操作 事件
   */
  handleTableRowButton(row, btns) {
    let formGroupValues = {},
      formGroupList;
    // 增加指标类目
    if (btns.type === "addKpiIndex") {
      this.dialogFormSettings.dialogFormTitle = "新增下级类目";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addKpiIndexItemButton;
      formGroupList = this.$globalFnc.deepCopy(this.kpiIndexItems);
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["pk"]
      );
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        parentKpiIndexId: row["pk"]
      };
      this.dialogFormSettings.dialogFormVisible = true;
    }
    // 编辑类目
    if (btns.type === "edit") {
      this.dialogFormSettings.dialogFormTitle = "编辑类目";
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.editKpiIndexItemButton;
      formGroupList = this.$globalFnc.deepCopy(this.kpiIndexItems);
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["pk"]
      );
      // 编辑赋值
      this.$getData(this.$api.getDataByKpiIndex, {
        asmKpiIndexId: row["pk"]
      }).then(res => {
        this.dialogFormSettings.dialogFormItems.formGroupValues = res.data;
      });
      this.dialogFormSettings.dialogFormVisible = true;
    }
    // 添加数据项
    if (btns.type === "addDataItems") {
      this.dialogFormSettings.dialogFormTitle = "添加数据项";
      formGroupValues.type = "add";
      formGroupValues.asmKpiIndexId = row["pk"];
      formGroupValues.targetParams = [
        {
          name: "",
          unit: ""
        }
      ];
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addDataItem;
      formGroupList = this.$globalFnc.deepCopy(this.dataItems);
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      this.dialogFormSettings.dialogFormItems.formGroupValues = formGroupValues;
      this.dialogFormSettings.dialogFormVisible = true;
    }
    // 修改数据项
    if (btns.type === "lookDataItems") {
      this.dialogFormSettings.dialogFormTitle = "查看数据项";
      this.$getData(this.$api.getSingleDataSet, {
        kpiIndexId: row["pk"]
      }).then(res => {
        formGroupValues.targetParams = res.data;
        this.dialogFormSettings.dialogFormItems.formGroupValues = formGroupValues;
      });
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancel",
          label: "关闭"
        }
      ];
      formGroupList = this.$globalFnc.deepCopy(this.dataItems);
      formGroupList.forEach(item => {
        if (item.name === "targetParams") {
          item.useType = "look";
          item.headers.forEach(headerItem => {
            headerItem.disabled = true;
          });
        }
      });
      this.dialogFormSettings.dialogFormItems.formGroupList = formGroupList;
      this.dialogFormSettings.dialogFormVisible = true;
    }
    // 增加指标
    // if (btns.type === "addKpi") {
    //   this.dialogFormSettings.dialogFormTitle = "新增指标";
    //   // 加载表单组
    //   this.dialogFormSettings.dialogFormItems.formButtonList = this.addKpiItemButton;
    //   formGroupList = this.$globalFnc.deepCopy(this.kpiItems);
    //   // 城市赋值
    //   formGroupList.map(item => {
    //     if (item.name == "specialCityScore") {
    //       this.$getData(this.$api.userCity, {
    //         sysParentcode: this.$store.getters["user/userInfos"]["distrinct"]
    //       }).then(res => {
    //         item.headers[0].data = this.$globalFnc.arrayToFormDropdown(
    //           res.data,
    //           "name",
    //           "code"
    //         );
    //       });
    //       // item.headers[0].data = this.$store.getters["user/citylist"];
    //     }
    //   });
    //   // 判断是新增还是编辑
    //   defaultDialogValues.type = "add";
    //   // 特殊区域分值
    //   defaultDialogValues.specialCityScore = [
    //     {
    //       areaCode: "",
    //       score: ""
    //     }
    //   ];
    //   //  指标数据项
    //   defaultDialogValues.targetParams = [
    //     {
    //       name: "",
    //       code: "",
    //       unit: ""
    //     }
    //   ];
    //   // 是否公开，默认公开
    //   defaultDialogValues.shared = "Y";
    //   // 父节点id
    //   defaultDialogValues.asmKpiIndexId = row["pk"];
    //   // 弹框表单组赋值
    //   this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
    //     formGroupList,
    //     row["pk"]
    //   );
    //   this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
    //   this.dialogFormSettings.dialogFormVisible = true;
    // }

    // switch (row.type) {
    //   case "KPI":
    //     formGroupList = this.$globalFnc.deepCopy(this.kpiItems);
    //     this.dialogFormSettings.dialogFormTitle = "编辑指标";
    //     // 弹框按钮
    //     this.dialogFormSettings.dialogFormItems.formButtonList = this.editKpiItemButton;
    //     // 编辑回显
    //     this.$getData(this.$api.getDataByKpi, { asmKpiId: row["pk"] }).then(
    //       res => {
    //         // 保存开始编辑前的值，编辑保存的时候，要和编辑后的值比较
    //         this.editKpiData = this.$globalFnc.deepCopy(res.data);
    //         // 字段回显
    //         defaultDialogValues = res.data.kpi;
    //         // 城市赋值
    //         formGroupList.map(item => {
    //           if (item.name == "specialCityScore") {
    //             this.$getData(this.$api.userCity, {
    //               sysParentcode: this.$store.getters["user/userInfos"][
    //                 "distrinct"
    //               ]
    //             }).then(res => {
    //               item.headers[0].data = this.$globalFnc.arrayToFormDropdown(
    //                 res.data,
    //                 "name",
    //                 "code"
    //               );
    //             });
    //             // item.headers[0].data = this.$store.getters["user/citylist"];
    //             // 特定市分值开或者关
    //             if (res.data["updateKpiAreaScoreList"].length) {
    //               defaultDialogValues["isOpenSpecialCity"] = "1";
    //               item.hideItem = false;
    //             } else {
    //               item.hideItem = true;
    //             }
    //           }
    //         });
    //         // 标识新增还是编辑
    //         defaultDialogValues.type = "edit";
    //         // 特殊区域分值
    //         defaultDialogValues.specialCityScore =
    //           res.data["updateKpiAreaScoreList"];
    //         //  指标数据项
    //         defaultDialogValues.targetParams = res.data["updateKpiVarList"];
    //
    //         // 弹框表单组   res.data.kpi.used 看表单有没有用，有用的话，不可编辑
    //         this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
    //           formGroupList,
    //           row["parentId"],
    //           res.data.kpi.used
    //         );
    //         this.handleLinkSelect(
    //           "isOpenSpecialCity",
    //           defaultDialogValues["isOpenSpecialCity"]
    //         );
    //         // 表单默认值
    //         this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
    //       }
    //     );
    //     this.dialogFormSettings.dialogFormVisible = true;
    //     break;
    // }
  },
  // 赋值 类目树
  setDictList(data, id, type) {
    return data.map(item => {
      if (item.name === "kpiIndextree") {
        this.$getData(this.$api.getKpiIndexTree, { asmKpiIndexId: id }).then(
          res => {
            item.treeSettings.treeData = res;
          }
        );
      }
      //  type 表示指标有没有正在使用， 使用中 除了 排序剩下的不可编辑
      if (type === "Y" && item.name !== "serialNo") {
        item.disabled = true;
        if (item.name === "specialCityScore" || item.name === "targetParams") {
          item.useType = "look";
          item.headers.forEach(headerItem => {
            headerItem.disabled = true;
          });
        }
      }
      return item;
    });
  },
  handleDialogForm(button, data) {
    if (button.flag == "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    let submitData = data,
      isFormdata;
    // if (button.flag === "kpiSave") {
    //   // 指标保存需要特殊处理
    //   submitData = this.dealData(submitData);
    // }
    if (button.flag === "dataSetSave") {
      isFormdata = true;
      // 数据项保存
      submitData = this.dealDataSet(submitData);
    }
    this.$postData(button.postUrl, submitData, isFormdata).then(() => {
      this.$message.success("保存成功！");
      this.setTableList();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  },
  dealDataSet(data) {
    // 后台需要的接收参数
    let kpi,
      addKpiVarList = [],
      updateKpiVarList = [],
      deleteKpiVarList = [],
      assessOrgId = {
        assessOrgId: this.$store.getters["user/userInfos"].orgId
      };
    // 新增情况下
    if (data.type === "add") {
      kpi = Object.assign({}, data, assessOrgId);
      delete kpi.specialCityScore;
      delete kpi.targetParams;

      addKpiVarList = data.targetParams.filter(item => {
        return item.name;
      });
    } else if (data.type === "edit") {
      //编辑情况下
      kpi = Object.assign({}, data, assessOrgId);
      delete kpi.specialCityScore;
      delete kpi.targetParams;

      // 指标项
      if (data.targetParams && data.targetParams.length) {
        // 如果没有id 的话，说明是新增数据
        data.targetParams.forEach(item => {
          if (item.asmKpiId) {
            updateKpiVarList.push(item);
          } else if (item.name) {
            addKpiVarList.push(item);
          }
        });
        // 编辑时获取的数据和 date 相比， 少了的就是删除的
        deleteKpiVarList = this.getArrDifference(
          data.targetParams,
          this.editKpiData["updateKpiVarList"]
        ).filter(item => {
          return item.asmKpiId;
        });
      } else {
        deleteKpiVarList = this.editKpiData["updateKpiVarList"];
      }
    }
    return {
      kpi: kpi,
      addKpiVarList: addKpiVarList,
      updateKpiVarList: updateKpiVarList,
      deleteKpiVarList: deleteKpiVarList
    };
  },
  dealData(data) {
    // 后台需要的接收参数
    let kpi,
      addKpiVarList = [],
      addKpiAreaScore = [],
      updateKpiVarList = [],
      updateKpiAreaScore = [],
      deleteKpiAreaScore = [],
      deleteKpiVarList = [],
      assessOrgId = {
        assessOrgId: this.$store.getters["user/userInfos"].orgId
      };
    // 新增情况下
    if (data.type === "add") {
      kpi = Object.assign({}, data, assessOrgId);
      delete kpi.specialCityScore;
      delete kpi.targetParams;

      addKpiVarList = data.targetParams.filter(item => {
        return item.name;
      });
      addKpiAreaScore = data.specialCityScore;
    } else if (data.type === "edit") {
      //编辑情况下
      kpi = Object.assign({}, data, assessOrgId);
      delete kpi.specialCityScore;
      delete kpi.targetParams;

      // 特定区域
      if (data.specialCityScore && data.specialCityScore.length) {
        // 如果没有id 的话，说明是新增数据
        data.specialCityScore.forEach(item => {
          if (item.asmKpiId) {
            updateKpiAreaScore.push(item);
          } else {
            addKpiAreaScore.push(item);
          }
        });
        // 编辑时获取的数据和 date 相比， 少了的就是删除的
        deleteKpiAreaScore = this.getArrDifference(
          data.specialCityScore,
          this.editKpiData["updateKpiAreaScoreList"]
        ).filter(item => {
          return item.asmKpiId;
        });
      } else {
        deleteKpiAreaScore = this.editKpiData["updateKpiAreaScoreList"];
      }

      // 指标项
      if (data.targetParams && data.targetParams.length) {
        // 如果没有id 的话，说明是新增数据
        data.targetParams.forEach(item => {
          if (item.asmKpiId) {
            updateKpiVarList.push(item);
          } else if (item.name) {
            addKpiVarList.push(item);
          }
        });
        // 编辑时获取的数据和 date 相比， 少了的就是删除的
        deleteKpiVarList = this.getArrDifference(
          data.targetParams,
          this.editKpiData["updateKpiVarList"]
        ).filter(item => {
          return item.asmKpiId;
        });
      } else {
        deleteKpiVarList = this.editKpiData["updateKpiVarList"];
      }
    }
    return {
      kpi: kpi,
      addKpiVarList: addKpiVarList,
      addKpiAreaScoreList: addKpiAreaScore,
      updateKpiAreaScoreList: updateKpiAreaScore,
      updateKpiVarList: updateKpiVarList,
      deleteKpiAreaScoreList: deleteKpiAreaScore,
      deleteKpiVarList: deleteKpiVarList
    };
  },
  // 找出俩个数组不同的元素
  getArrDifference(array1, array2) {
    let result = [];
    for (let i = 0; i < array2.length; i++) {
      let obj = array2[i];
      let arr2AsmKpiId = obj.asmKpiId;
      let flag = false;
      for (let j = 0; j < array1.length; j++) {
        if (array1[j].asmKpiId === arr2AsmKpiId) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        result.push(obj);
      }
    }
    return result;
  }
};
export default methods;
