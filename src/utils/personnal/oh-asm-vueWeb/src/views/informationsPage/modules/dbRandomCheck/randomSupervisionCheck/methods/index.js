const methods = {
  initPageData(options) {
    let defaultdatas = this.$globalFnc.deepCopy(
      this.$refs.searchForm.formGroupSettings.formGroupValues
    );
    if (options) {
      Object.assign(defaultdatas, options);
    }
    this.handleSearchFormBtn(
      { postUrl: "pageScheme_randomSupervisionCheck" },
      defaultdatas
    );
    this.getCheckUserList();
    this.getCheckItemsList();
    this.getCheckDistrictScopeList();
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
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        orgId: this.$store.getters["user/userInfos"].orgId,
        groupMembers: [],
        year: new Date().getFullYear() + "",
        extractedDistricts__dsp: "当前无抽取结果"
      };
      this.addRandomItemDialogItems.map(addItem => {
        if (addItem.name == "countyNum") {
          addItem.hideItem = true;
        }
        if (addItem.name == "townNum") {
          addItem.hideItem = true;
        }
        if (addItem.name == "villageNum") {
          addItem.hideItem = true;
        }
      });
      this.dialogFormSettings.dialogFormItems.formGroupList = this.addRandomItemDialogItems;
      this.dialogFormSettings.dialogFormItems.formButtonList = this.addRandomItemDialogBtns;
      this.dialogFormSettings.dialogFormVisible = true;
    }
    if (data.flag == "export") {
      this.dialogVisible = true;
    }
  },
  // table数据预处理
  setTableList(data) {
    data.rows.map(item => {
      item.reportDateTime = this.$globalFnc.dateStampFormat(item.created);
      item.createdParse = this.$globalFnc.dateStampFormat(item.created);
      item.startDtParse = this.$globalFnc.dateStampFormat(item.startDt);
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
        // {
        //   styleType: "primary",
        //   text: "抽查",
        //   type: "random",
        //   class: "text-primary fontSize20 mr10",
        //   icon: "el-icon-data-analysis",
        //   isIcon: true,
        //   postUrl: "pick_randomSupervisionCheck"
        // },
        {
          styleType: "primary",
          text: "删除",
          type: "delete",
          class: "text-primary fontSize20 mr10",
          icon: "el-icon-delete",
          isIcon: true,
          postUrl: "deleteScheme_randomSupervisionCheck"
        }
        // {
        //   styleType: "primary",
        //   text: "打印",
        //   type: "print",
        //   class: "text-primary fontSize20 mr10",
        //   icon: "el-icon-printer",
        //   isIcon: true,
        //   postUrl: ""
        // }
      ];
    });
    this.tableSettings.tableDatas = data.rows;
    this.paginationSettings.totalNumbers = data.total;
  },
  // 点击对话框保存按钮
  handleDialogForm(button, data, isRandom) {
    if (button.flag == "save" || button.flag === "random") {
      let leaderObj = {},
        depLeaderObj = {},
        groupMembers = [];
      this.checkUserlist.map(user => {
        if (user.sysId == data.groupLeader) {
          leaderObj.name = user.peopName;
          leaderObj.inspectorId = user.sysId;
        }
        if (user.sysId == data.deputyGroupLeader) {
          depLeaderObj.name = user.peopName;
          depLeaderObj.inspectorId = user.sysId;
        }
        data.groupMembers.map(item => {
          let obj = {};
          if (user.sysId == item) {
            obj.name = user.peopName;
            obj.inspectorId = user.sysId;
            groupMembers.push(obj);
          }
        });
      });
      data.groupLeader = leaderObj;
      data.deputyGroupLeader = depLeaderObj;
      data.groupMembers = groupMembers;
      this.$postData(this.$api[button.postUrl], data, true).then(res => {
        this.initPageData();
        this.dialogFormSettings.dialogFormVisible = false;
        if (isRandom) {
          this.dialogVisible = false;
          this.getSingleData({
            chkSchemeId: this.randomRowData.chkSchemeId
          }).then(() => {
            this.dialogFormSettings.dialogFormItems.formGroupList = this.updateRandomItemDialogItems;
            this.dialogFormSettings.dialogFormItems.formButtonList = this.updateRandomItemDialogBtns;
            this.dialogFormSettings.dialogFormItems.formGroupValues = this.randomRowData;
            this.dialogFormSettings.dialogFormVisible = true;
            return false;
          });
        }
        if (button.flag === "random") {
          if (button.postUrl == "addScheme_randomSupervisionCheck") {
            this.getSingleData({ chkSchemeId: res.data.chkSchemeId });
          }
          this.randomScopelist = [{ code: "330000000000", name: "浙江省" }];
          let postData = {
            pickNum: data.cityNum,
            districtScopeCode: this.randomScopelist
          };
          this.stepNum = 1;
          this.dataShowNumber = data.cityNum > 3 ? 3 : data.cityNum;
          this.totalStepNumber = data.scopeTo;
          this.getCheckedDistrict("pick_randomSupervisionCheck", postData).then(
            () => {
              this.dialogVisible = true;
            }
          );
        } else {
          this.dialogVisible = false;
          if (!isRandom) {
            this.$message.success("保存成功!");
          }
        }
      });
    } else if (button.flag == "cancel") {
      this.dialogFormSettings.dialogFormVisible = false;
    } else if (button.flag == "print") {
      var printHtml = `<table border="1" style="border-collapse:collapse;border-spacing:0;width:100%;line-height: 40px;text-align: center;">
      <caption>${this.randomRowData.name}</caption>
      <colgroup>
        <col width="15%">
        <col width="35%">
        <col width="15%">
        <col width="35%">
      </colgroup>
      <tr>
        <td>方案名称</td>
        <td align="left" style="padding-left:5px;">${this.randomRowData.name ||
          ""}</td>
        <td>年度</td>
        <td align="left" style="padding-left:5px;">${this.randomRowData.year ||
          ""}</td>
      </tr>
      <tr>
        <td>开始时间</td>
        <td align="left" style="padding-left:5px;">${this.$globalFnc.dateStampFormat(
          this.randomRowData.startDt,
          "ymd"
        ) || ""}</td>
        <td>结束时间</td>
        <td align="left" style="padding-left:5px;">${this.$globalFnc.dateStampFormat(
          this.randomRowData.endDt,
          "ymd"
        ) || ""}</td>
      </tr>
      <tr>
        <td>抽查事项</td>
        <td colspan="3" align="left" style="padding-left:5px;">${this
          .randomRowData.itemInfo.name || ""}</td>
      </tr>
      <tr>
        <td>抽查主体</td>
        <td colspan="3" align="left" style="padding-left:5px;">${this
          .randomRowData.itemInfo.sponsor || ""}</td>
      </tr>
      <tr>
        <td>抽查方式</td>
        <td colspan="3" align="left" style="padding-left:5px;">${this
          .randomRowData.itemInfo.mode__dsp || ""}</td>
      </tr>
      <tr>
        <td>抽查依据</td>
        <td colspan="3" align="left" style="padding-left:5px;">${this
          .randomRowData.itemInfo.basis || ""}</td>
      </tr>
      <tr>
        <td>内容及要求</td>
        <td colspan="3" align="left" style="padding-left:5px;">${this
          .randomRowData.itemInfo.content || ""}</td>
      </tr>
      <tr>
        <td>组长</td>
        <td colspan="3" align="left" style="padding-left:5px;">${data.groupLeader__dsp ||
          ""}</td>
      </tr>
      <tr>
        <td>副组长</td>
        <td colspan="3" align="left" style="padding-left:5px;">${this
          .randomRowData.deputyGroupLeader__dsp || ""}</td>
      </tr>
      <tr>
        <td>抽查组成员</td>
        <td colspan="3" align="left" style="padding-left:5px;">${this
          .randomRowData.groupMembers__dsp || ""}</td>
      </tr>
      <tr>
        <td>检查最小范围</td>
        <td align="left" style="padding-left:5px;">${this.randomRowData
          .scopeTo__dsp || ""}</td>
        <td>行政市个数</td>
        <td align="left" style="padding-left:5px;">${this.randomRowData
          .cityNum || ""}</td>
      </tr>
      <tr>
        <td>区/县个数</td>
        <td align="left" style="padding-left:5px;">${this.randomRowData
          .countyNum || ""}</td>
        <td>乡/镇个数</td>
        <td align="left" style="padding-left:5px;">${this.randomRowData
          .townNum || ""}</td>
      </tr>
      <tr>
        <td>村/社区个数</td>
        <td align="left" style="padding-left:5px;">${this.randomRowData
          .villageNum || ""}</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>抽查范围(随机抽取)</td>
        <td colspan="3" align="left" style="padding-left:5px;">${this
          .randomRowData.extractedDistricts__dsp || ""}</td>
      </tr>
      <tr>
        <td>抽查总结</td>
        <td colspan="3" align="left" style="padding-left:5px;">${this
          .randomRowData.summary || ""}</td>
      </tr>
    </table>`;
      var wind = window.open(
        "",
        "newwindow",
        "toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no"
      );

      wind.document.body.innerHTML = printHtml;

      wind.print();
      return false;
    }
  },
  // 表格按钮
  handleTableRowButton(data, btn) {
    if (btn.type === "check" || btn.type === "update") {
      if (btn.type === "check") {
        this.dialogFormSettings.dialogFormItems.formGroupList = this.checkRandomItemDialogItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.checkRandomItemDialogBtns;
      } else {
        this.dialogFormSettings.dialogFormItems.formGroupList = this.updateRandomItemDialogItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = this.updateRandomItemDialogBtns;
      }
      this.getSingleData({ chkSchemeId: data.chkSchemeId }).then(() => {
        this.dialogFormSettings.dialogFormItems.formGroupValues = this.randomRowData;
        this.dialogFormSettings.dialogFormVisible = true;
      });
    } else if (btn.type === "delete") {
      this.$confirm("确定删除当前方案信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$postData(
          this.$api[btn.postUrl] + "?chkSchemeId=" + data.chkSchemeId,
          {},
          true
        ).then(() => {
          this.$message.success("操作成功！");
          this.initPageData();
        });
      });
    }
  },
  // 切换数据联动
  handleLinkSelect(link, data) {
    if (link == "scopeTo") {
      this.randomRowData.extractedDistricts = "";
      this.randomRowData.extractedDistricts__dsp = "";
      this.randomRowData.districtInfos = [];
      this.randomRowData.districtInfos__dsp = "";
      this.updateRandomItemDialogBtns[1].label = "下一步(抽取市)";
      switch (data) {
        case "2": {
          this.dialogSetRule.countyNum[0].required = true;
          this.dialogSetRule.townNum[0].required = false;
          this.dialogSetRule.villageNum[0].required = false;
          this.addRandomItemDialogItems.map(addItem => {
            if (addItem.name == "countyNum") {
              addItem.hideItem = false;
            }
            if (addItem.name == "townNum") {
              addItem.hideItem = true;
            }
            if (addItem.name == "villageNum") {
              addItem.hideItem = true;
            }
          });
          this.updateRandomItemDialogItems.map(updItem => {
            if (updItem.name == "countyNum") {
              updItem.hideItem = false;
            }
            if (updItem.name == "townNum") {
              updItem.hideItem = true;
            }
            if (updItem.name == "villageNum") {
              updItem.hideItem = true;
            }
          });
          break;
        }
        case "3": {
          this.dialogSetRule.countyNum[0].required = true;
          this.dialogSetRule.townNum[0].required = true;
          this.dialogSetRule.villageNum[0].required = false;
          this.addRandomItemDialogItems.map(addItem => {
            if (addItem.name == "countyNum") {
              addItem.hideItem = false;
            }
            if (addItem.name == "townNum") {
              addItem.hideItem = false;
            }
            if (addItem.name == "villageNum") {
              addItem.hideItem = true;
            }
          });
          this.updateRandomItemDialogItems.map(updItem => {
            if (updItem.name == "countyNum") {
              updItem.hideItem = false;
            }
            if (updItem.name == "townNum") {
              updItem.hideItem = false;
            }
            if (updItem.name == "villageNum") {
              updItem.hideItem = true;
            }
          });
          break;
        }
        case "4": {
          this.dialogSetRule.countyNum[0].required = true;
          this.dialogSetRule.townNum[0].required = true;
          this.dialogSetRule.villageNum[0].required = true;
          this.addRandomItemDialogItems.map(addItem => {
            if (addItem.name == "countyNum") {
              addItem.hideItem = false;
            }
            if (addItem.name == "townNum") {
              addItem.hideItem = false;
            }
            if (addItem.name == "villageNum") {
              addItem.hideItem = false;
            }
          });
          this.updateRandomItemDialogItems.map(updItem => {
            if (updItem.name == "countyNum") {
              updItem.hideItem = false;
            }
            if (updItem.name == "townNum") {
              updItem.hideItem = false;
            }
            if (updItem.name == "villageNum") {
              updItem.hideItem = false;
            }
          });
          break;
        }
        default: {
          this.dialogSetRule.countyNum[0].required = false;
          this.dialogSetRule.townNum[0].required = false;
          this.dialogSetRule.villageNum[0].required = false;
          this.addRandomItemDialogItems.map(addItem => {
            if (addItem.name == "countyNum") {
              addItem.hideItem = true;
            }
            if (addItem.name == "townNum") {
              addItem.hideItem = true;
            }
            if (addItem.name == "villageNum") {
              addItem.hideItem = true;
            }
          });
          this.updateRandomItemDialogItems.map(updItem => {
            if (updItem.name == "countyNum") {
              updItem.hideItem = true;
            }
            if (updItem.name == "townNum") {
              updItem.hideItem = true;
            }
            if (updItem.name == "villageNum") {
              updItem.hideItem = true;
            }
          });
        }
      }
    }
  },
  //底部分页回调函数
  handlePaginationPagenumber(val) {
    this.paginationSettings.currentPage = val;
    this.initPageData();
  },
  //点击开始抽查滚动
  handleStartRandom() {
    this.scrollRun = true;
    this.scrollResult = false;
    this.getRandomlistData();
  },
  //点击重新抽查滚动
  handleReStartRandom() {
    if (this.reRandomIdList.length < 1) {
      this.$message.error("请先勾选您要重新抽取的地区名称!");
      return false;
    }
    let randomlength =
      this.reRandomIdList.length > 3 ? 3 : this.reRandomIdList.length;
    this.getRandomlistData(randomlength);
    let postData = {
      districtScopeCode: this.randomScopelist,
      pickedCode: this.randomResultIdlist,
      replaceCode: this.reRandomIdList
    };
    this.getCheckedDistrict("pick_randomSupervisionCheck", postData).then(
      () => {
        this.scrollRun = true;
        this.scrollResult = false;
        this.reRandomIdList = [];
      }
    );
  },
  //点击停止抽查滚动
  handleStopRandom() {
    this.scrollRun = false;
    this.scrollResult = true;
    clearInterval(this.randomFnc);
  },
  // 点击勾选重选地区
  handleChangeRandom() {
    this.reRandomList = [];
    this.randomResultlist.map(resItem => {
      this.reRandomIdList.map(reId => {
        if (resItem.code == reId) {
          this.reRandomList.push(resItem);
        }
      });
    });
  },
  //点击下一步抽查
  handleContinue() {
    this.stepNum += 1;
    this.randomScopelist = this.$globalFnc.deepCopy(this.randomResultlist);
    this.dataShowNumber =
      this.randomRowData[this.stepLevel[this.stepNum]] > 3
        ? 3
        : this.randomRowData[this.stepLevel[this.stepNum]];
    let postData = {
      pickNum: this.randomRowData[this.stepLevel[this.stepNum]],
      districtScopeCode: this.randomResultlist
    };
    this.getCheckedDistrict("pick_randomSupervisionCheck", postData);
  },
  //点击保存抽查结果
  handleSaveRandom() {
    let resultlist = [];
    this.randomResultlist.map(item => {
      resultlist.push(item.code);
    });
    this.randomRowData.extractedDistricts = resultlist.join(",");
    this.handleDialogForm(
      { flag: "save", postUrl: "updateScheme_randomSupervisionCheck" },
      this.randomRowData,
      true
    );
  },
  // handleHtmlNodeAction
  handleHtmlNodeAction(data) {
    if (data.dataId && data.dataType) {
      if (data.dataType == "dataPath") {
        this.$getData(
          this.$api["openPath_randomDistrictMng"],
          { code: data.dataId },
          true
        ).then(res => {
          console.log(res);
        });
      } else {
        let paramName = "",
          spotName = "",
          namelist = data.dataText.split("-");
        spotName = namelist[namelist.length - 1];
        if (data.dataType == "stock_divide") {
          paramName = "spDisrtictName";
        } else {
          paramName = "name__dsp";
        }
        this.reportSeverShow = true;
        this.reportServerUrl =
          this.$store.getters["user/reportServerUrl"] +
          `?reportlet=${data.dataType}.cpt&year=${
            this.randomRowData.year
          }&${paramName}=${spotName.substr(0, spotName.length - 1)}`;
      }
    }
  },
  //获取单条数据
  getSingleData(postData) {
    return new Promise(rel => {
      this.$getData(
        this.$api["loadInfo_randomSupervisionCheck"],
        postData,
        true
      ).then(xhr => {
        let htmlstr = "",
          defaultdatas = this.$globalFnc.deepCopy(xhr.data);
        defaultdatas.year += "";
        defaultdatas.scopeTo += "";
        if (xhr.data.districtInfos && xhr.data.districtInfos.length > 0) {
          let countryArr = [],
            townArr = [];
          if (defaultdatas.scopeTo == "3" || defaultdatas.scopeTo == "4") {
            xhr.data.districtInfos.map(stItem => {
              let conObj = {},
                hasCon = false,
                hasTown = false;
              conObj.value = stItem.value.substr(0, 6) + "000000";
              conObj.text = stItem.text
                .split("-")
                .slice(0, 3)
                .join("-");
              countryArr.map(cItem => {
                if (cItem.value == conObj.value) {
                  hasCon = true;
                }
              });
              if (!hasCon) {
                countryArr.push(conObj);
              }
              if (defaultdatas.scopeTo == "4") {
                let townObj = {};
                townObj.value = stItem.value.substr(0, 9) + "000";
                townObj.text = stItem.text
                  .split("-")
                  .slice(0, 4)
                  .join("-");
                townArr.map(tItem => {
                  if (tItem.value == townObj.value) {
                    hasTown = true;
                  }
                });
                if (!hasTown) {
                  townArr.push(townObj);
                }
              }
            });
            console.log(countryArr, townArr);
          }
          if (countryArr.length > 0) {
            countryArr.map(countryItem => {
              htmlstr += `${countryItem.text}
              <button type="button" class="el-button el-button--primary el-button--mini is-plain ml15" data-id="${countryItem.value}" data-text="${countryItem.text}" data-type="rptAreaStore">
                查看地方储备
              </button>
              <button type="button" class="el-button el-button--primary el-button--mini is-plain ml15" data-id="${countryItem.value}" data-text="${countryItem.text}" data-type="farmland">
                查看永久农田规划
              </button>
              <button type="button" class="el-button el-button--primary el-button--mini is-plain ml15" data-id="${countryItem.value}" data-text="${countryItem.text}" data-type="stock_divide">
                查看粮食库存分解
              </button>
              </br>`;
            });
          }
          if (townArr.length > 0) {
            townArr.map(townItem => {
              // 服务器起服务暂时隐藏本地目录查看功能，目录查看适用单机部署，服务部署到本地才能打开目录结构
              // htmlstr += `${townItem.text}
              // <button type="button" class="el-button el-button--primary el-button--mini is-plain ml15" data-id="${townItem.value}" data-text="${townItem.text}" data-type="dataPath">
              //   查看数据报表
              // </button>
              // </br>`;
              htmlstr += `${townItem.text}
              </br>`;
            });
          }
          xhr.data.districtInfos.map(stItem => {
            if (defaultdatas.scopeTo == "3" || defaultdatas.scopeTo == "4") {
              htmlstr += `${stItem.text}
              </br>`;
              // htmlstr += `${stItem.text}
              // <button type="button" class="el-button el-button--primary el-button--mini is-plain ml15" data-id="${stItem.value}" data-text="${stItem.text}" data-type="dataPath">
              //   查看数据报表
              // </button>
              // </br>`;
            } else {
              htmlstr += `${stItem.text}
              <button type="button" class="el-button el-button--primary el-button--mini is-plain ml15" data-id="${stItem.value}" data-text="${stItem.text}" data-type="rptAreaStore">
                查看地方储备
              </button>
              <button type="button" class="el-button el-button--primary el-button--mini is-plain ml15" data-id="${stItem.value}" data-text="${stItem.text}" data-type="farmland">
                查看永久农田规划
              </button>
              <button type="button" class="el-button el-button--primary el-button--mini is-plain ml15" data-id="${stItem.value}" data-text="${stItem.text}" data-type="stock_divide">
                查看粮食库存分解
              </button>
              </br>`;
            }
          });
        }
        defaultdatas.districtInfos__dsp = htmlstr;
        defaultdatas.extractedDistricts__dsp = xhr.data.extractedDistricts__dsp
          ? xhr.data.extractedDistricts__dsp.split(",").join("<br>")
          : "当前无抽取结果";
        if (xhr.data.extractedDistricts__dsp) {
          this.updateRandomItemDialogBtns[1].label = "重新抽取(抽取市)";
        } else {
          this.updateRandomItemDialogBtns[1].label = "下一步(抽取市)";
        }
        defaultdatas.groupLeader = xhr.data.groupLeader.inspectorId;
        defaultdatas.deputyGroupLeader = xhr.data.deputyGroupLeader.inspectorId;
        defaultdatas.groupMembers = [];
        xhr.data.groupMembers.map(user => {
          defaultdatas.groupMembers.push(user.inspectorId);
        });
        switch (defaultdatas.scopeTo) {
          case "2": {
            this.dialogSetRule.countyNum[0].required = true;
            this.dialogSetRule.townNum[0].required = false;
            this.dialogSetRule.villageNum[0].required = false;
            this.addRandomItemDialogItems.map(addItem => {
              if (addItem.name == "countyNum") {
                addItem.hideItem = false;
              }
              if (addItem.name == "townNum") {
                addItem.hideItem = true;
              }
              if (addItem.name == "villageNum") {
                addItem.hideItem = true;
              }
            });
            this.updateRandomItemDialogItems.map(updItem => {
              if (updItem.name == "countyNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "townNum") {
                updItem.hideItem = true;
              }
              if (updItem.name == "villageNum") {
                updItem.hideItem = true;
              }
            });
            this.checkRandomItemDialogItems.map(updItem => {
              if (updItem.name == "countyNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "townNum") {
                updItem.hideItem = true;
              }
              if (updItem.name == "villageNum") {
                updItem.hideItem = true;
              }
            });
            break;
          }
          case "3": {
            this.dialogSetRule.countyNum[0].required = true;
            this.dialogSetRule.townNum[0].required = true;
            this.dialogSetRule.villageNum[0].required = false;
            this.addRandomItemDialogItems.map(addItem => {
              if (addItem.name == "countyNum") {
                addItem.hideItem = false;
              }
              if (addItem.name == "townNum") {
                addItem.hideItem = false;
              }
              if (addItem.name == "villageNum") {
                addItem.hideItem = true;
              }
            });
            this.updateRandomItemDialogItems.map(updItem => {
              if (updItem.name == "countyNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "townNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "villageNum") {
                updItem.hideItem = true;
              }
            });
            this.checkRandomItemDialogItems.map(updItem => {
              if (updItem.name == "countyNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "townNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "villageNum") {
                updItem.hideItem = true;
              }
            });
            break;
          }
          case "4": {
            this.dialogSetRule.countyNum[0].required = true;
            this.dialogSetRule.townNum[0].required = true;
            this.dialogSetRule.villageNum[0].required = true;
            this.addRandomItemDialogItems.map(addItem => {
              if (addItem.name == "countyNum") {
                addItem.hideItem = false;
              }
              if (addItem.name == "townNum") {
                addItem.hideItem = false;
              }
              if (addItem.name == "villageNum") {
                addItem.hideItem = false;
              }
            });
            this.updateRandomItemDialogItems.map(updItem => {
              if (updItem.name == "countyNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "townNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "villageNum") {
                updItem.hideItem = false;
              }
            });
            this.checkRandomItemDialogItems.map(updItem => {
              if (updItem.name == "countyNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "townNum") {
                updItem.hideItem = false;
              }
              if (updItem.name == "villageNum") {
                updItem.hideItem = false;
              }
            });

            break;
          }
          default: {
            this.dialogSetRule.countyNum[0].required = false;
            this.dialogSetRule.townNum[0].required = false;
            this.dialogSetRule.villageNum[0].required = false;
            this.addRandomItemDialogItems.map(addItem => {
              if (addItem.name == "countyNum") {
                addItem.hideItem = true;
              }
              if (addItem.name == "townNum") {
                addItem.hideItem = true;
              }
              if (addItem.name == "villageNum") {
                addItem.hideItem = true;
              }
            });
            this.updateRandomItemDialogItems.map(updItem => {
              if (updItem.name == "countyNum") {
                updItem.hideItem = true;
              }
              if (updItem.name == "townNum") {
                updItem.hideItem = true;
              }
              if (updItem.name == "villageNum") {
                updItem.hideItem = true;
              }
            });
            this.checkRandomItemDialogItems.map(updItem => {
              if (updItem.name == "countyNum") {
                updItem.hideItem = true;
              }
              if (updItem.name == "townNum") {
                updItem.hideItem = true;
              }
              if (updItem.name == "villageNum") {
                updItem.hideItem = true;
              }
            });
          }
        }
        this.randomRowData = defaultdatas;
        rel();
      });
    });
  },
  // 生成随机数组
  getRandomlistData(number) {
    let showlistNumber = 3;
    if (number) {
      showlistNumber = number;
    }
    this.randomFnc = setInterval(() => {
      let randomlistdata = this.datalist
        .sort(function() {
          return 0.5 - Math.random();
        })
        .slice(0, this.randomRowData[this.stepLevel[this.stepNum]]);
      this.randomListData =
        randomlistdata.length > showlistNumber
          ? randomlistdata.splice(0, showlistNumber)
          : randomlistdata;
    }, 50);
  },
  //抽查地区
  getCheckedDistrict(postUrl, postData) {
    return new Promise(rel => {
      this.$postData(this.$api[postUrl], postData, true).then(xhr => {
        this.randomResultIdlist = [];
        this.datalist = xhr.data.pickItems;
        this.randomResultlist = xhr.data.picked.sort(
          this.$globalFnc.sortArrayByProps("code", true)
        );
        xhr.data.picked.map(pickItem => {
          this.randomResultIdlist.push(pickItem.code);
        });
        this.reRandomList = [];
        this.scrollRun = false;
        this.scrollResult = false;
        rel();
      });
    });
  },
  //获取抽查范围下拉选项
  getCheckDistrictScopeList() {
    let that = this;
    this.$getData(
      this.$api["districtScope_randomSupervisionCheck"],
      {},
      true
    ).then(xhr => {
      that.checkDistrictScope = that.$globalFnc.arrayToFormDropdown(
        xhr.data,
        "text",
        "value"
      );
      that.addRandomItemDialogItems.map(item => {
        if (item.name == "scopeTo") {
          item.data = that.checkDistrictScope;
        }
      });
      that.updateRandomItemDialogItems.map(item => {
        if (item.name == "scopeTo") {
          item.data = that.checkDistrictScope;
        }
      });
      that.checkRandomItemDialogItems.map(item => {
        if (item.name == "scopeTo") {
          item.data = that.checkDistrictScope;
        }
      });
    });
  },
  //获取抽查人员列表
  getCheckUserList() {
    let that = this;
    this.$getData(
      this.$api["checkerSelects_randomProfessorMng"],
      {},
      true
    ).then(xhr => {
      that.checkUserlist = that.$globalFnc.arrayToFormDropdown(
        xhr.data,
        "peopName",
        "sysId"
      );
      that.addRandomItemDialogItems.map(item => {
        if (
          item.name == "groupLeader" ||
          item.name == "deputyGroupLeader" ||
          item.name == "groupMembers"
        ) {
          item.data = that.checkUserlist;
        }
      });
      that.updateRandomItemDialogItems.map(item => {
        if (
          item.name == "groupLeader" ||
          item.name == "deputyGroupLeader" ||
          item.name == "groupMembers"
        ) {
          item.data = that.checkUserlist;
        }
      });
      that.checkRandomItemDialogItems.map(item => {
        if (
          item.name == "groupLeader" ||
          item.name == "deputyGroupLeader" ||
          item.name == "groupMembers"
        ) {
          item.data = that.checkUserlist;
        }
      });
    });
  },
  //获取抽查项目列表
  getCheckItemsList() {
    let that = this;
    this.$getData(
      this.$api["queryuseAbleInspectionItem_randomCheckItems"],
      {},
      true
    ).then(xhr => {
      that.checkItems = that.$globalFnc.arrayToFormDropdown(
        xhr.data,
        "name",
        "chkDefItemId"
      );
      that.addRandomItemDialogItems.map(item => {
        if (item.name == "chkDefItemId") {
          item.data = that.checkItems;
        }
      });
      that.updateRandomItemDialogItems.map(item => {
        if (item.name == "chkDefItemId") {
          item.data = that.checkItems;
        }
      });
      that.checkRandomItemDialogItems.map(item => {
        if (item.name == "chkDefItemId") {
          item.data = that.checkItems;
        }
      });
    });
  }
};
export default methods;
