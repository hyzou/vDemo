const methods = {
  /**
   * 设置搜索的值
   */
  setSearchFormData() {
    this.searchSettings.formGroupList = this.setDictList(this.searchFormItems);
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag == "closeSearch") {
      this.showSearchForm = !this.showSearchForm;
      if (this.showSearchForm) {
        data.label = "隐藏查询";
      } else {
        data.label = "显示查询";
      }
    }
  },
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "kpiConsultListByUser" }, defaultdatas);
  },
  handleSearchFormBtn(btns, formData) {
    if (btns.flag === "search") {
      this.paginationSettings.currentPage = 1;
    }
    let options = {
      vm: this
    };
    let params = {
      page: this.paginationSettings.currentPage,
      row: this.$global.paginationOption.numberPerpage,
      type: this.pageType
    };
    Object.assign(formData, params);
    this.$searchformBtnAction(btns, formData, options).then(data => {
      this.setTableList(data);
    });
  },
  setTableList(data) {
    let kpiConsultList = this.$globalFnc.deepCopy(data.rows);
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "查看",
          type: "lookDetail",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        }
      ]
    };
    this.formatData(kpiConsultList, propObject);
    this.tableSettings.tableDatas = kpiConsultList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      // 没有创建时间的话，说明没有提交上级考核办，可以填写意见
      if (!item.submitDt) {
        item.operateBtns.unshift({
          text: "意见",
          type: "opinion",
          styleType: "primary",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-s-comment",
          isIcon: true
        });
      }
    });
  },
  /**
   * 表格按钮点击事件
   */
  handleTableRowButton(row, btns) {
    let formGroupList;
    // 填写意见
    if (btns.type === "opinion") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formButtonList = this.suggestConsultationDialogFormBtns;
      formGroupList = this.$globalFnc.deepCopy(
        this.suggestConsultationDialogFormItems
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"]
      );
      //获取回显数据
      this.$getData(this.$api.singleKpiConsultByUserData, {
        asmSchemeConsulteFbId: row["asmSchemeConsulteFbId"]
      }).then(res => {
        let defaultValue = this.$globalFnc.deepCopy(res.data);
        this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValue;
      });
    }
    // 查看详情
    if (btns.type === "lookDetail") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formButtonList = [
        {
          flag: "cancle",
          label: "关闭",
          styleType: ""
        }
      ];
      formGroupList = this.$globalFnc.deepCopy(
        this.suggestConsultationDialogFormItems
      );
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        formGroupList,
        row["asmKpiIndexId"],
        "look"
      );
      //获取回显数据
      this.$getData(this.$api.singleKpiConsultByUserData, {
        asmSchemeConsulteFbId: row["asmSchemeConsulteFbId"]
      }).then(res => {
        let defaultValue = this.$globalFnc.deepCopy(res.data);
        this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValue;
      });
    }
  },
  /**
   * 字典表的值
   */
  setDictList(data, id, type) {
    return data.map(item => {
      // 指标类目树
      if (item.name === "kpiIndextree") {
        this.$getData(this.$api.getKpiIndexTree, { asmKpiIndexId: id }).then(
          res => {
            item.treeSettings.treeData = res;
          }
        );
      }
      // 牵头部门， 配合部门
      if (item.name === "manageOrgId" || item.name === "cooprateOrgsId") {
        this.$getData(this.$api.dictList, {
          _refKey: "org",
          orgtypeid: "202",
          parentorgid: this.$store.getters["user/userInfos"].orgId,
          status: "1"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 查看的意见，设置禁用
      if (type === "look" && item.name === "opinion") {
        item.disabled = true;
      }
      return item;
    });
  },
  //意见填写弹窗
  handleDialogForm(btns, data) {
    if (btns.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    let submitData = this.$globalFnc.deepCopy(data);
    if (!submitData.opinion) {
      submitData.opinion = "";
    }
    if (btns.flag === "save") {
      // 保存的需要传数组
      let array = [];
      array.push(submitData);
      submitData = array;
    }
    this.$postData(btns.postUrl, submitData, true).then(() => {
      this.$message.success("保存成功！");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  }
};
export default methods;
