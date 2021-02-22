const methods = {
  initPageData(options) {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    if (options) {
      Object.assign(defaultdatas, options);
    }
    this.handleSearchFormBtn(
      { postUrl: "pageProfessorList_randomProfessorMng" },
      defaultdatas
    );
  },
  /**
   * 搜索栏按钮点击事件
   */
  handleSearchFormBtn(btns, formData) {
    let options = {
      vm: this
    };
    let postdata = {
      filterRules: [],
      page: this.paginationSettings.currentPage,
      limit: this.$global.paginationOption.numberPerpage
    };
    for (let key in formData) {
      let obj = {
        field: key,
        value: formData[key],
        op: "contains"
      };
      postdata.filterRules.push(obj);
    }
    postdata.filterRules = JSON.stringify(postdata.filterRules);
    this.$searchformBtnAction(btns, postdata, options).then(data => {
      this.setTableList(data);
    });
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
    if (data.flag == "new") {
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.addRandomItemDialogItems;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    }
  },
  // 保存
  handleDialogForm(button, data) {
    if (data.peopMajor) {
      data.peopMajor = data.peopMajor.join(",");
    }
    if (button.flag == "save") {
      this.$postData(this.$api[button.postUrl], data, true).then(res => {
        this.$message.success("保存成功!");
        this.initPageData();
        this.dialogFormSettings.dialogFormVisible = false;
        this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      });
    }
    if (button.flag == "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    }
  },
  // 表格按钮
  handleTableRowButton(rowData, btn) {
    let data = this.$globalFnc.deepCopy(rowData);
    if (btn.type === "check" || btn.type === "update") {
      if (btn.type === "check") {
        this.dialogFormSettings.dialogFormItems.formGroupList = this.checkRandomItemDialogItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.checkRandomItemDialogBtns;
      } else {
        this.dialogFormSettings.dialogFormItems.formGroupList = this.updateRandomItemDialogItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.updateRandomItemDialogBtns;
      }
      if (data.peopMajor) {
        data.peopMajor = data.peopMajor.split(",");
      }
      if (data.peopBirthday) {
        data.peopBirthday = this.$globalFnc.dateStampFormat(
          data.peopBirthday,
          "ymd"
        );
      }
      if (data.graduateDate) {
        data.graduateDate = this.$globalFnc.dateStampFormat(
          data.graduateDate,
          "ymd"
        );
      }
      if (data.peopJoinworkdate) {
        data.peopJoinworkdate = this.$globalFnc.dateStampFormat(
          data.peopJoinworkdate,
          "ymd"
        );
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = data;
      setTimeout(() => {
        this.dialogFormSettings.dialogFormVisible = true;
      }, 300);
    } else {
      if (btn.type === "delete") {
        this.$confirm("确定删除当前人员信息吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$postData(
            this.$api[btn.postUrl] + "?sysId=" + data.sysId,
            {},
            true
          ).then(() => {
            this.$message.success("操作成功！");
            this.initPageData();
          });
        });
      } else {
        this.$postData(this.$api[btn.postUrl], [data.sysId], true).then(() => {
          this.$message.success("操作成功！");
          this.initPageData();
        });
      }
    }
  },
  //底部分页回调函数
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  // 列表
  setTableList(data) {
    data.rows.map(item => {
      item.reportDateTime = this.$globalFnc.dateStampFormat(item.created);
      item.option = [
        {
          styleType: "primary",
          text: "查看",
          type: "check",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-search",
          isIcon: true
        },
        {
          styleType: "primary",
          text: "修改",
          type: "update",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-edit-outline",
          isIcon: true
        },
        {
          styleType: "primary",
          text: "删除",
          type: "delete",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-delete",
          isIcon: true,
          postUrl: "deleteProfessor_randomProfessorMng"
        }
      ];
    });
    this.tableSettings.tableDatas = data.rows;
    this.paginationSettings.totalNumbers = data.total;
  },
  // 获取字典表
  getReflists() {
    // 通用[是/否]下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "fb_common_yesno"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (
          item.name == "inspStatus" ||
          item.name == "iscardkeeper" ||
          item.name == "isAdmMan" ||
          item.name == "isCheckMan"
        ) {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (
          item.name == "inspStatus" ||
          item.name == "iscardkeeper" ||
          item.name == "isAdmMan" ||
          item.name == "isCheckMan"
        ) {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (
          item.name == "inspStatus" ||
          item.name == "iscardkeeper" ||
          item.name == "isAdmMan" ||
          item.name == "isCheckMan"
        ) {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 专业下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "rpt_insp_major"
    }).then(res => {
      this.searchFormItems.map(item => {
        if (item.name == "peopMajor") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "peopMajor") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "peopMajor") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "peopMajor") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 性别下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "BNDICT_gender"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "peopSex") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "peopSex") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "peopSex") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 婚姻状况下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "BNDICT_marry"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "peopMarital") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "peopMarital") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "peopMarital") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 用工形式下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "EMPLOYFORM"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "peopEmployform") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "peopEmployform") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "peopEmployform") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 政治面貌下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "POLITY"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "peopPolity") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "peopPolity") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "peopPolity") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 民族下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "NATIONALITY"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "peopNationality") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "peopNationality") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "peopNationality") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 学历下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "BNDICT_education"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "peopEducation") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "peopEducation") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "peopEducation") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 技术职称下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "JOBRANK"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "peopJobrank") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "peopJobrank") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "peopJobrank") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 行政职务下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "DUTYNAME"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "peopDutyname") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "peopDutyname") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "peopDutyname") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 用工性质下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "NATURE_PERSONNEL"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "naturePersonnel") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "naturePersonnel") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "naturePersonnel") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
    // 双随机转接级别下拉数据
    this.$getData(this.$api.dictList, {
      _refKey: "dict",
      busintypeid: "professor_level"
    }).then(res => {
      this.addRandomItemDialogItems.map(item => {
        if (item.name == "checkerLevel") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.updateRandomItemDialogItems.map(item => {
        if (item.name == "checkerLevel") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
      this.checkRandomItemDialogItems.map(item => {
        if (item.name == "checkerLevel") {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        }
      });
    });
  }
};
export default methods;
