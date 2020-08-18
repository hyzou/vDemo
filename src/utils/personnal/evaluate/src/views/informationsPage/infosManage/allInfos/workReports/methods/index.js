const methods = {
  /**
   * 搜索栏数据筛选
   * @params:{}
   */
  handleSearchSubmit(flag, data) {
    console.log(flag, data);
    let tabledatas = this.$globalFnc.deepCopy(
      this.tablelistSettings.tableDatas
    );
    if (data.title) {
      this.tablelistSettings.tableDatas = tabledatas.filter(
        item => item.title.indexOf(data.title) > -1
      );
    } else {
      this.tablelistSettings.tableDatas = this.defaultTabledatas;
    }
    this.paginationSettings.totalNumbers = this.tablelistSettings.tableDatas.length;
  },
  /**
   * operateButtons点击事件
   */
  handleOperateButton(data) {
    if (data.flag == "closeSearch") {
      this.showSearchForm = !this.showSearchForm;
      if (this.showSearchForm) {
        data.label = "关闭查询";
      } else {
        data.label = "开启查询";
      }
    }
    if (data.flag == "newSet") {
      this.$router.push("/informationsPage/infosManage/setNewInfo");
    }
  },
  /**
   * 编辑信息对话框点击事件
   */
  handleDialogForm(btn, data) {
    data.updateTime = this.$globalFnc.dateStampFormat(new Date().getTime());
    if (this.$route.name == "stuff") {
      if (btn.flag == "publish") {
        this.$store
          .dispatch("app/commitRemoveInfoFromStuffList", data.id)
          .then(() => {
            data.id = this.$store.getters["app/allInfosList"].length + 1;
            this.$store
              .dispatch("app/commitAddInfoToAllInfosList", data)
              .then(() => {
                this.getInfolist("stuff");
              });
          });
      } else {
        this.$store
          .dispatch("app/commitEditInfoFromStuffList", data)
          .then(() => {
            this.getInfolist("stuff");
          });
      }
    } else if (this.$route.name == "myIssue") {
      this.$store
        .dispatch("app/commitEditInfoFromAllInfosList", data)
        .then(() => {
          this.getInfolist("myIssue");
        });
    }
    this.dialogFormSettings.dialogFormVisible = false;
  },
  /**
   * table 标题栏点击事件
   */
  handleTableItem(id, type, row) {
    this.dialogShowInfoDialogSettings.title = this.titlesManage[row.subColumn];
    this.dialogShowInfoDialogSettings.dialogShowInfoVisible = true;
    this.dialogShowInfoDialogSettings.showInfoData = row;
  },
  /**
   * table 按钮点击事件
   */
  handleTableRowButton(rowData, btn) {
    if (btn.type == "remove") {
      this.$confirm("您确定要删除当前信息吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(confirm => {
          console.log(confirm);
          if (this.$route.name == "stuff") {
            this.$store
              .dispatch("app/commitRemoveInfoFromStuffList", rowData.id)
              .then(() => {
                this.getInfolist("stuff");
              });
          } else if (this.$route.name == "myIssue") {
            this.$store
              .dispatch("app/commitRemoveInfoFromAllInfosList", rowData.id)
              .then(() => {
                this.getInfolist("myIssue");
              });
          }
        })
        .catch();
    } else if (btn.type == "edit") {
      if (this.editInfoFormBtns.length > 1) {
        this.editInfoFormBtns.pop();
      }
      if (this.$route.name == "stuff") {
        this.editInfoFormBtns.push({
          flag: "publish",
          size: "",
          icon: "",
          label: "发布",
          styleType: "primary",
          postUrl: "addRegisterMember"
        });
      }
      this.dialogFormSettings.dialogFormItems.formGroupValues = rowData;
      this.dialogFormSettings.dialogFormVisible = true;
    }
  },
  /**
   * 点击分页器页码
   */
  handlePaginationPagenumber(num) {
    this.tablelistSettings.tableDatas = [];
    this.page = num;
    this.tablelistSettings.tableDatas = this.$globalFnc
      .deepCopy(this.defaultTabledatas)
      .splice(10 * (this.page - 1), 10 * (this.page - 1) + 10);
  },
  /**
   * 切换地址触发回调
   */
  getRouteName(name) {
    return new Promise(relsove => {
      if (this.workReportsOperateBtns.length > 1) {
        this.workReportsOperateBtns.shift();
      }
      if (this.workReportsTableHeaderOpts.length > 6) {
        this.workReportsTableHeaderOpts.pop();
      }
      this.workReportsSearchItems.map(item => {
        if (item.name == "subColumn") {
          item.hideItem = true;
        }
      });
      if (name == "infosDistribution" || name == "indexInfosDistribution") {
        this.workReportsOperateBtns.unshift({
          flag: "newSet",
          size: "",
          icon: "",
          label: "新建",
          styleType: "primary",
          postUrl: "addRegisterMember"
        });
      } else if (name == "myIssue" || name == "stuff") {
        this.workReportsTableHeaderOpts.push({
          prop: "operateBtns",
          lable: "操作",
          propType: "operateBtns",
          width: "200"
        });
        this.workReportsSearchItems.map(item => {
          if (item.name == "subColumn") {
            item.hideItem = false;
          }
        });
      }
      this.titles.tableTitle = this.titlesManage[name];
      relsove(name);
    });
  },
  getInfolist(name) {
    this.tablelistSettings.tableDatas = [];
    let tabledataSet = [];
    if (name == "stuff") {
      this.$store.getters["app/stuffList"].map(item => {
        if (item.userId == this.$store.getters["user/userInfos"].userId) {
          item.operateBtns = [
            {
              id: item.id,
              text: "编辑",
              styleType: "primary",
              type: "edit"
            },
            {
              id: item.id,
              text: "删除",
              styleType: "danger",
              type: "remove"
            }
          ];
          tabledataSet.push(item);
        }
      });
    } else {
      this.$store.getters["app/allInfosList"].map(item => {
        if (name == "myIssue") {
          if (item.userId == this.$store.getters["user/userInfos"].userId) {
            item.operateBtns = [
              {
                id: item.id,
                text: "编辑",
                styleType: "primary",
                type: "edit"
              },
              {
                id: item.id,
                text: "删除",
                styleType: "danger",
                type: "remove"
              }
            ];
            tabledataSet.push(item);
          }
        } else {
          if (name == "indexInfosDistribution") {
            if (item.subColumn == "infosDistribution") {
              tabledataSet.push(item);
            }
          } else {
            if (item.subColumn == name) {
              tabledataSet.push(item);
            }
          }
        }
      });
    }
    tabledataSet.sort(this.sortObjAttrFromBigToSmall("addTime"));
    this.defaultTabledatas = this.$globalFnc.deepCopy(tabledataSet);
    this.tablelistSettings.tableDatas = this.$globalFnc
      .deepCopy(tabledataSet)
      .splice(0, 10);
    this.paginationSettings.totalNumbers = tabledataSet.length;
  },
  sortObjAttrFromBigToSmall(keyName) {
    return function(objectN, objectM) {
      var valueN = objectN[keyName];
      var valueM = objectM[keyName];
      if (valueN < valueM) return 1;
      else if (valueN > valueM) return -1;
      else return 0;
    };
  }
};
export default methods;
