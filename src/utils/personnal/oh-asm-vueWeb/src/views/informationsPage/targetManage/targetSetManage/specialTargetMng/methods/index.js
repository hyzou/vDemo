const methods = {
  /**
   * 搜索栏按钮点击事件
   */
  handleSearchFormBtn(btns, formData) {
    console.log(btns, formData);
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag == "addCheckContent") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormTitle = "新增专项工作任务";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addCheckContentButton;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.addContentItems;
    }
    if (data.flag == "quote") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormTitle = "引用专项工作任务";
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addCheckContentButton;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.editContentItems;
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
  handleLinkSelect(type, data) {
    if (type == "isOpenSpecialCity") {
      this.addCheckItemStandardItems.map(item => {
        if (item.name == "specialCityScore") {
          if (data == "1") {
            item.hideItem = false;
          } else {
            item.hideItem = true;
          }
        }
      });
      this.editCheckItemStandardItems.map(item => {
        if (item.name == "specialCityScore") {
          if (data == "1") {
            item.hideItem = false;
          } else {
            item.hideItem = true;
          }
        }
      });
    }
  },
  handleDialogForm(button, data) {
    console.log(button);
    console.log(data);
    this.dialogFormSettings.dialogFormVisible = false;
    if (button.flag == "cancel") {
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    }
  },
  handleTableRowButton(row, btns) {
    let textStrs = this.getDataFromTable(
        this.tableSettings.tableDatas[0].children,
        {
          prop: "id",
          propText: "text",
          path: row.code.split("."),
          id: row.code.split(".")[0]
        },
        ""
      ),
      defaultDialogValues = {};
    Object.assign(defaultDialogValues, row);
    if (btns.type == "edit") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormTitle = "编辑当前任务";

      switch (row.type) {
        case "check_content":
          // this.dialogFormSettings.dialogFormTitle = "编辑考核内容";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.editCheckContentButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.editCheckContentItems;
          defaultDialogValues.assessmentContent = textStrs.split("/*&*&*/")[0];
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
          break;
        case "check_main_item":
          // this.dialogFormSettings.dialogFormTitle = "编辑重点考核事项";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.editCheckMainItemButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.editCheckMainItemItems;
          defaultDialogValues.assessmentContent = textStrs.split("/*&*&*/")[0];
          defaultDialogValues.assessmentItems = textStrs.split("/*&*&*/")[1];
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
          break;
        case "check_Target":
          // this.dialogFormSettings.dialogFormTitle = "编辑考核指标";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.editCheckTargetButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.editCheckTargetItems;
          defaultDialogValues.assessmentContent = textStrs.split("/*&*&*/")[0];
          defaultDialogValues.assessmentItems = textStrs.split("/*&*&*/")[1];
          defaultDialogValues.assessmentTarget = textStrs.split("/*&*&*/")[2];
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
          break;
        case "check_Task":
          this.editCheckTargetTaskItems.map(mainItem => {
            if (
              mainItem.name == "provinceLeadDep" ||
              mainItem.name == "provinceCoorpDep"
            ) {
              mainItem.data = this.$globalFnc.arrayToFormDropdown(
                this.$store.getters["user/provinceOrgTree"],
                "orgName",
                "orgId"
              );
            }
          });
          // this.dialogFormSettings.dialogFormTitle = "编辑年度考核任务";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.editCheckTargetTaskButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.editCheckTargetTaskItems;
          defaultDialogValues.assessmentContent = textStrs.split("/*&*&*/")[0];
          defaultDialogValues.assessmentItems = textStrs.split("/*&*&*/")[1];
          defaultDialogValues.assessmentTarget = textStrs.split("/*&*&*/")[2];
          defaultDialogValues.assessmentTargetTask = textStrs.split(
            "/*&*&*/"
          )[3];
          defaultDialogValues.provinceLeadDep = "1004";
          defaultDialogValues.provinceCoorpDep = ["1005"];
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
          break;
        case "check_item_standard":
          this.editCheckItemStandardItems.map(item => {
            if (item.name == "specialCityScore") {
              item.headers[0].data = this.$store.getters["user/citylist"];
              if (row.isOpenSpecialCity == "1") {
                item.hideItem = false;
              } else {
                item.hideItem = true;
              }
            }
            if (
              item.name == "provinceLeadDep" ||
              item.name == "provinceCoorpDep"
            ) {
              item.data = this.$globalFnc.arrayToFormDropdown(
                this.$store.getters["user/provinceOrgTree"],
                "orgName",
                "orgId"
              );
            }
          });
          // this.dialogFormSettings.dialogFormTitle = "编辑评分标准";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.editCheckItemStandardButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.editCheckItemStandardItems;
          defaultDialogValues.assessmentContent = textStrs.split("/*&*&*/")[0];
          defaultDialogValues.assessmentItems = textStrs.split("/*&*&*/")[1];
          defaultDialogValues.assessmentTarget = textStrs.split("/*&*&*/")[2];
          defaultDialogValues.assessmentTargetTask = textStrs.split(
            "/*&*&*/"
          )[3];
          defaultDialogValues.scoreStandard = textStrs.split("/*&*&*/")[4];
          defaultDialogValues.score = "4";
          defaultDialogValues.provinceLeadDep = "1004";
          defaultDialogValues.provinceCoorpDep = ["1005"];
          defaultDialogValues.specialCityScore = [
            {
              cityName: "",
              cityScore: ""
            }
          ];
          defaultDialogValues.targetParams = [
            {
              name: "耕地面积",
              code: "gdmj",
              unit: "万亩"
            }
          ];
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
          break;
      }
    } else if (btns.type == "add") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormTitle = "新增下级任务";
      switch (row.type) {
        case "root":
          this.dialogFormSettings.dialogFormVisible = true;
          // this.dialogFormSettings.dialogFormTitle = "新增考核内容";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.addCheckContentButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.addCheckContentItems;
          break;
        case "check_content":
          // this.dialogFormSettings.dialogFormTitle = "新增重点考核事项";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.addCheckMainItemButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.addCheckMainItemItems;
          defaultDialogValues.assessmentContent = textStrs.split("/*&*&*/")[0];
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
          break;
        case "check_main_item":
          // this.dialogFormSettings.dialogFormTitle = "新增考核指标";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.addCheckTargetButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.addCheckTargetItems;
          defaultDialogValues.assessmentContent = textStrs.split("/*&*&*/")[0];
          defaultDialogValues.assessmentItems = textStrs.split("/*&*&*/")[1];
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
          break;
        case "check_Target":
          this.addCheckTargetTaskItems.map(mainItem => {
            if (
              mainItem.name == "provinceLeadDep" ||
              mainItem.name == "provinceCoorpDep"
            ) {
              mainItem.data = this.$globalFnc.arrayToFormDropdown(
                this.$store.getters["user/provinceOrgTree"],
                "orgName",
                "orgId"
              );
            }
          });
          // this.dialogFormSettings.dialogFormTitle = "新增年度考核任务";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.addCheckTargetTaskButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.addCheckTargetTaskItems;
          defaultDialogValues.assessmentContent = textStrs.split("/*&*&*/")[0];
          defaultDialogValues.assessmentItems = textStrs.split("/*&*&*/")[1];
          defaultDialogValues.assessmentTarget = textStrs.split("/*&*&*/")[2];
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
          break;
        case "check_Task":
          this.addCheckItemStandardItems.map(item => {
            if (item.name == "specialCityScore") {
              item.headers[0].data = this.$store.getters["user/citylist"];
              if (row.isOpenSpecialCity == "1") {
                item.hideItem = false;
              } else {
                item.hideItem = true;
              }
            }
            if (
              item.name == "provinceLeadDep" ||
              item.name == "provinceCoorpDep"
            ) {
              item.data = this.$globalFnc.arrayToFormDropdown(
                this.$store.getters["user/provinceOrgTree"],
                "orgName",
                "orgId"
              );
            }
          });
          // this.dialogFormSettings.dialogFormTitle = "新增评分标准";
          this.dialogFormSettings.dialogFormItems.formButtonList = this.addCheckItemStandardButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.addCheckItemStandardItems;
          defaultDialogValues.provinceLeadDep = "1004";
          defaultDialogValues.provinceCoorpDep = ["1005"];
          defaultDialogValues.specialCityScore = [
            {
              cityName: "",
              cityScore: ""
            }
          ];
          defaultDialogValues.targetParams = [
            {
              name: "",
              code: "",
              unit: ""
            }
          ];
          defaultDialogValues.assessmentContent = textStrs.split("/*&*&*/")[0];
          defaultDialogValues.assessmentItems = textStrs.split("/*&*&*/")[1];
          defaultDialogValues.assessmentTarget = textStrs.split("/*&*&*/")[2];
          defaultDialogValues.assessmentTargetTask = textStrs.split(
            "/*&*&*/"
          )[3];
          this.dialogFormSettings.dialogFormItems.formGroupValues = defaultDialogValues;
          break;
      }
    } else {
      this.$confirm("您确定要删除当前信息吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(confirm => {
        console.log(confirm);
      });
    }
  },
  setTableList() {
    let targetList = this.$globalFnc.deepCopy(
      this.$store.getters["assessment/specialTargetTreeData"]
    );
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "编辑",
          type: "edit",
          class: "text-danger fontSize20 mr10",
          icon: "el-icon-edit-outline",
          isIcon: true
        },
        {
          text: "删除",
          type: "delete",
          class: "text-danger fontSize20 mr10",
          icon: "el-icon-delete",
          isIcon: true
        },
        {
          text: "添加下级任务",
          type: "add",
          class: "text-danger fontSize20",
          icon: "el-icon-folder-add",
          isIcon: true
        }
      ]
    };
    this.formatData(targetList, propObject);
    this.tableSettings.tableDatas = targetList;
  },
  formatData(data, prop) {
    data.map(item => {
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      switch (item.type) {
        case "root":
          item[prop.name].shift();
          break;
        // case "check_content":
        //   item[prop.name].push({
        //     text: "添加重点考核事项",
        //     type: "add",
        //     class: "text-danger fontSize20 ml10",
        //     icon: "el-icon-folder-add",
        //     isIcon: true
        //   });
        //   break;
        // case "check_main_item":
        //   item[prop.name].push({
        //     text: "添加考核指标",
        //     type: "add",
        //     class: "text-danger fontSize20 ml10",
        //     icon: "el-icon-folder-add",
        //     isIcon: true
        //   });
        //   break;
        // case "check_Target":
        //   item[prop.name].push({
        //     text: "添加年度考核任务",
        //     type: "add",
        //     class: "text-danger fontSize20 ml10",
        //     icon: "el-icon-folder-add",
        //     isIcon: true
        //   });
        //   break;
        // case "check_Task":
        //   item.provinceLeaderDep = "浙江省农业农村厅";
        //   item.provinceCoorpDep = "浙江省自然资源厅";
        //   item[prop.name].push(
        //     {
        //       text: "编辑",
        //       type: "edit",
        //       class: "text-danger fontSize20 mr10",
        //       icon: "el-icon-edit-outline",
        //       isIcon: true
        //     },
        //     // {
        //     //   text: "删除",
        //     //   type: "delete",
        //     //   class: "text-danger fontSize20",
        //     //   icon: "el-icon-delete",
        //     //   isIcon: true
        //     // },
        //     {
        //       text: "添加评分标准",
        //       type: "add",
        //       class: "text-danger fontSize20",
        //       icon: "el-icon-folder-add",
        //       isIcon: true
        //     }
        //   );
        //   break;
        // default:
        //   item.provinceLeaderDep = "浙江省农业农村厅";
        //   item.provinceCoorpDep = "浙江省自然资源厅";
        //   item.score = "4";
        //   item[prop.name].push(
        //     {
        //       text: "编辑",
        //       type: "edit",
        //       class: "text-danger fontSize20 mr10",
        //       icon: "el-icon-edit-outline",
        //       isIcon: true
        //     },
        //     {
        //       text: "删除",
        //       type: "delete",
        //       class: "text-danger fontSize20",
        //       icon: "el-icon-delete",
        //       isIcon: true
        //     }
        //   );
      }
      if (item.children) {
        this.formatData(item.children, prop);
      }
    });
  },
  getDataFromTable(datalist, rowProps, propStr) {
    if (!rowProps.id) {
      return propStr;
    }
    let totalPropStr = propStr || "";
    for (let item of datalist) {
      if (item[rowProps.prop] == rowProps.path[0]) {
        totalPropStr = totalPropStr
          ? totalPropStr + "/*&*&*/" + item[rowProps.propText]
          : item[rowProps.propText];
        rowProps.path.shift();
        rowProps.id = rowProps.path.length > 0 ? rowProps.path[0] : "";
        if (item.children) {
          return this.getDataFromTable(item.children, rowProps, totalPropStr);
        } else {
          return totalPropStr;
        }
      }
    }
  }
};
export default methods;
