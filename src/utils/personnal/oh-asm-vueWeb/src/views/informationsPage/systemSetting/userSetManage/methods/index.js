const methods = {
  /**
   *  设置搜索下拉数据
   */
  setSearchFormData() {
    this.searchFormSettings.formGroupList = this.setDictList(
      this.searchFormItems
    );
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag === "add") {
      this.dialogFormSettings.dialogFormTitle = "新增用户";
      // 密码验证类型
      this.dialogFormSettings.dialogFormItems.ruleType = "add";
      this.dialogFormSettings.dialogFormItems.rules = this.userSetRule;
      // 加载表单组
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addUserContentButton;
      this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
        this.$globalFnc.deepCopy(this.userContentItems),
        ""
      );
      this.dialogFormSettings.dialogFormItems.formGroupValues = { isEmp: "Y" };
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
  },
  /**
   *  初始化页面
   */
  initPageData() {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    this.handleSearchFormBtn({ postUrl: "getAllUserList" }, defaultdatas);
  },
  /**
   *  搜索
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
    let baseForm = {
      page: this.paginationSettings.currentPage,
      rows: this.$global.paginationOption.numberPerpage
    };
    let btnsObj = btns || {
      postUrl: "getAllUserList"
    };
    let formDataObj = Object.assign(baseForm, formData);
    this.tableSettings.tableDatas = [];
    this.$searchformBtnAction(btnsObj, formDataObj, options).then(data => {
      this.setTableList(data);
    });
  },
  /**
   * 表格
   */
  setTableList(data) {
    let propObject = {
      name: "operateBtns",
      porpvalue: [
        {
          text: "删除",
          type: "delete",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-delete",
          isIcon: true
        }
      ]
    };
    let allUserList = this.$globalFnc.deepCopy(data.rows);
    this.formatData(allUserList, propObject);
    this.tableSettings.tableDatas = allUserList;
    this.paginationSettings.totalNumbers = data.total;
  },
  formatData(data, prop) {
    data.map(item => {
      item[prop.name] = this.$globalFnc.deepCopy(prop.porpvalue);
      item["expiredDt_Format"] = this.$globalFnc.dateStampFormat(
        item.expiredDt,
        "ymd"
      );
      switch (item.status) {
        case 1:
          // 如果这个数据是启用状态，添加禁用按钮
          item["status-zh_CN"] = "启用";
          item[prop.name].unshift({
            text: "禁用",
            type: "closed",
            class: "text-success fontSize16 mr10",
            icon: "iconfont iconkaiguan-kai",
            isIcon: true
          });
          break;
        case 0:
          // 如果这个数据是禁用状态，添加启用按钮
          item["status-zh_CN"] = "禁用";
          item[prop.name].unshift({
            text: "启用",
            type: "open",
            class: "text-plainInfo fontSize16 mr10",
            icon: "iconfont iconkaiguan-guan",
            isIcon: true
          });
          break;
        default:
          // 没状态时候，添加启用按钮
          item["status-zh_CN"] = "禁用";
          item[prop.name].unshift({
            text: "启用",
            type: "open",
            class: "text-plainInfo fontSize17 mr10",
            icon: "iconfont iconkaiguan-guan",
            isIcon: true
          });
          break;
      }
      item[prop.name].unshift({
        text: "查看",
        type: "look",
        class: "text-primary fontSize20 mr10",
        icon: "el-icon-search",
        isIcon: true
      });
      if (this.$store.getters["user/userInfos"].userId !== item.operatorid) {
        item[prop.name].unshift({
          text: "编辑",
          type: "edit",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-edit-outline",
          isIcon: true
        });
      }
    });
  },
  //底部分页回调函数
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  /**
   * 表单切换
   */
  handleLinkSelect(linkName, data) {
    if (linkName === "userid" && data) {
      this.$postData(this.$api.userRepeatCheck, { userid: data }).then(res => {
        // 没重复的时候返回了一个对象， 重复返回 true
        if (res && typeof res !== "object") {
          this.$message.error("员工登录名不可重复!");
          this.dialogFormSettings.dialogFormItems.formGroupValues.userid = "";
        }
      });
    }
    if (linkName === "otel1" && data) {
      let operatorid = this.dialogFormSettings.dialogFormItems.formGroupValues
        .operatorid;
      this.$postData(this.$api.userRepeatCheck, {
        mobileno: data,
        operatorid: operatorid
      }).then(res => {
        // 没重复的时候返回了一个对象， 重复返回 true
        if (res && typeof res !== "object") {
          this.$message.error("联系电话不可重复!");
          this.dialogFormSettings.dialogFormItems.formGroupValues.otel1 = "";
        }
      });
    }
  },
  /**
   * 表格操作按钮
   */
  handleTableRowButton(row, btns) {
    let defaultValue, formGroupList;
    switch (btns.type) {
      case "open":
        // 禁用该组织机构
        this.$postData(this.$api.changeUserStatus, {
          orgIds: row["orgid"],
          optIds: row["operatorid"],
          status: "1"
        }).then(() => {
          this.$message.success("启用成功!");
          this.initPageData();
        });
        break;
      case "closed":
        // 禁用该组织机构
        this.$confirm("确定禁用？", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$postData(this.$api.changeUserStatus, {
            orgIds: row["orgid"],
            optIds: row["operatorid"],
            status: "0"
          }).then(() => {
            this.$message.success("禁用成功!");
            this.initPageData();
          });
        });
        break;
      case "delete":
        // 禁用该组织机构
        this.$confirm("确定删除？", "确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$postData(this.$api.destroyList, {
            orgIds: row["orgid"],
            optIds: row["operatorid"]
          }).then(() => {
            this.$message.success("删除成功!");
            this.initPageData();
          });
        });
        break;
      default:
        formGroupList = this.$globalFnc.deepCopy(this.userContentItems);
        if (btns.type === "edit") {
          this.dialogFormSettings.dialogFormTitle = "编辑用户信息";
          // 需不需要密码验证
          this.dialogFormSettings.dialogFormItems.ruleType = "edit";
          this.dialogFormSettings.dialogFormItems.rules = this.userSetRule;
          this.dialogFormSettings.dialogFormItems.formButtonList = this.editUserContentButton;
          this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
            formGroupList,
            row["operatorid"],
            "edit"
          );
        }
        if (btns.type === "look") {
          this.dialogFormSettings.dialogFormItems.ruleType = "";
          this.dialogFormSettings.dialogFormItems.rules = {};
          this.dialogFormSettings.dialogFormTitle = "查看用户信息";
          this.dialogFormSettings.dialogFormItems.formButtonList = [
            {
              flag: "cancle",
              label: "关闭",
              styleType: ""
            }
          ];
          this.dialogFormSettings.dialogFormItems.formGroupList = this.setDictList(
            formGroupList,
            row["operatorid"],
            "look"
          );
        }
        defaultValue = this.$globalFnc.deepCopy(row);
        defaultValue.expiredDt = this.$globalFnc.dateStampFormat(
          row.expiredDt,
          "ymd"
        );
        if (row.roles) {
          defaultValue.roles = row.roles;
        }
        if (row.specialty) {
          defaultValue.specialty = row.specialty.split(",");
        }
        // 编辑赋值
        this.dialogFormSettings.dialogFormItems.formGroupValues = defaultValue;
        this.dialogFormSettings.dialogFormVisible = true;
        break;
    }
  },
  /**
   *  获取机构树
   */
  getOrgList() {
    this.$getData(this.$api.getOrgList, { status: "all" }).then(res => {
      this.orgList = res;
      this.setSearchFormData();
    });
  },
  /**
   *  下拉列表赋值
   */
  setDictList(data, id, type) {
    return data.map(item => {
      // 赋值机构类型
      if (item.name === "orgid") {
        item.data = this.orgList;
      }
      // 角色授权
      if (item.name === "roles") {
        this.$getData(this.$api.getRoles, { operatorid: id }).then(res => {
          let allRole = [].concat(res["checkList"], res["uncheckList"]);
          if (type === "look") {
            allRole.forEach(item => {
              item.disabled = true;
              item.label = item.text;
            });
            item.data = allRole;
          } else {
            item.data = this.$globalFnc.arrayToFormDropdown(
              allRole,
              "text",
              "value",
              true
            );
          }
        });
      }
      // 分级角色授权
      if (item.name === "specialty") {
        this.$getData(this.$api.getTwoSpeciltys, { operatorid: id }).then(
          res => {
            let allRole = [].concat(res["checkList"], res["uncheckList"]);
            // 查看设置禁用
            if (type === "look") {
              allRole.forEach(item => {
                item.disabled = true;
                item.label = item.text;
              });
              item.data = allRole;
            } else {
              item.data = this.$globalFnc.arrayToFormDropdown(
                allRole,
                "text",
                "value",
                true
              );
            }
          }
        );
      }
      // 角色
      if (item.name === "roleid") {
        this.$getData(this.$api.dictList, { _refKey: "role" }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      // 机构类型
      if (item.name === "orgtypeid") {
        this.$getData(this.$api.dictList, {
          _refKey: "dict",
          busintypeid: "wms_bas_orgtype"
        }).then(res => {
          item.data = this.$globalFnc.arrayToFormDropdown(res, "text", "value");
        });
      }
      if (type === "edit" && item.name === "userid") {
        item.disabled = true;
      }
      if (type === "look") {
        item.disabled = true;
        item.placeHolder = " ";
      }
      return item;
    });
  },
  /**
   * 新增编辑表单组确认取消事件
   */
  handleDialogForm(button, data) {
    if (button.flag === "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      return;
    }
    let params = this.$globalFnc.deepCopy(data);
    if (data.specialty && data.specialty.length) {
      params.specialty = data.specialty.join(",");
    }
    if (data.roles && data.roles.length) {
      params.roles = data.roles.join(",");
    }
    if (data.expiredDt) {
      params["eosoperator.expiredDt"] = data.expiredDt;
      delete params["expiredDt"];
    }
    if (data.isEmp) {
      params["eosoperator.isEmp"] = data.isEmp;
      delete params["isEmp"];
    }
    if (data.userid) {
      params["eosoperator.userid"] = data.userid;
      delete params["userid"];
    }
    if (data.operatorname) {
      params["eosoperator.operatorname"] = data.operatorname;
      delete params["operatorname"];
    }
    if (data.password) {
      params["eosoperator.password"] = data.password;
      delete params["password"];
    }
    this.$postData(button.postUrl, params).then(() => {
      this.$message.success("保存成功!");
      this.initPageData();
      this.dialogFormSettings.dialogFormVisible = false;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
    });
  }
};
export default methods;
