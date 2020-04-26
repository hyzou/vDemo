<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('biddingControlSpecial')"
        >
          <i class="el-icon-arrow-left"></i>
          返回招投标控制台
        </el-link>
      </el-col>
      <el-col :span="24">
        <div class="table-container">
          <template v-if="pageType == '10' || pageType == '11'">
            <el-row class="mb20" :span="24" :gutter="20">
              <el-col :span="8">
                <div class="mb20 consoleStyle" style="background:#3A9CF6;">
                  <div>距离结束倒计时</div>
                  <div>{{ timedown }}</div>
                </div>
                <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col class="textAlignCenter" :span="12">
                    <el-button type="primary" @click="handleShowOnlineMembers"
                      >查看在线会员</el-button
                    >
                  </el-col>
                  <el-col class="textAlignCenter" :span="12">
                    <el-button type="primary" @click="handlePostNotice"
                      >发临时通知</el-button
                    >
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="16">
                <el-row class="mb20" :span="24" :gutter="20">
                  <el-col :span="8">
                    <div class="consoleStyle" style="background:#6DC485;">
                      <div>开始时间</div>
                      <div>{{ projectInfo.tradeBegintime }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="consoleStyle" style="background:#5E98E1;">
                      <div>结束时间</div>
                      <div>{{ projectInfo.tradeEndtime }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="consoleStyle" style="background:#EEA850;">
                      <div>专场状态</div>
                      <!-- <div>{{projectInfo.text}}</div> -->
                      <div>交易中</div>
                    </div>
                  </el-col>
                </el-row>
                <el-col :span="24">
                  <commonTitleWithBorder
                    :title="titles.notice"
                    style="margin-left:-20px;margin-top:-8px;"
                  />
                </el-col>
                <el-input
                  class="noticebox"
                  type="textarea"
                  v-model="noticebox"
                ></el-input>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-row
              v-if="mainTarget && mainTarget.name"
              class="mb20"
              :span="24"
              :gutter="20"
            >
              <el-col :span="8">
                <div class="mb20 consoleStyle" style="background:#E6746C;">
                  <div>
                    <!-- {{ mainTarget.sysAddtime }}&nbsp; -->
                    {{ mainTarget.project.name }}
                  </div>
                  <div>标的号：{{ mainTarget.no }}</div>
                </div>
                <table class="symTable">
                  <tr>
                    <td>品名</td>
                    <td>{{ mainTarget.name }}</td>
                  </tr>
                  <tr>
                    <td>数量</td>
                    <td>{{ mainTarget.num }}</td>
                  </tr>
                </table>
              </el-col>
              <el-col :span="8">
                <div class="mb20 consoleStyle" style="background:#3A9CF6;">
                  <div>距离结束倒计时</div>
                  <div>{{ timedown }}</div>
                </div>
                <table class="symTable symTable-mini">
                  <tr>
                    <td>倒计时</td>
                    <td class="bigFont positionRel">
                      {{ delayState }}{{ pauseState }}{{ delayTimer }}
                      <!-- <div class="operateBtnGroup"> -->
                      <!-- icon="el-icon-video-pause"v-show="showpause"circle -->
                      <el-button
                        v-show="showpause"
                        class="operateBtnGroup operatePause"
                        type="warning"
                        size="mini"
                        @click="handlePauseTimer(mainTarget.sysId)"
                        >暂停</el-button
                      >
                      <!-- icon="el-icon-video-play"v-show="!showpause"circle -->
                      <el-button
                        v-show="!showpause"
                        class="operateBtnGroup operateStart"
                        type="primary"
                        size="mini"
                        @click="handleRestartTimer(mainTarget.sysId)"
                        >开始</el-button
                      >
                      <!-- </div> -->
                    </td>
                  </tr>
                  <tr>
                    <td>最新价(元/单位)</td>
                    <td class="bigFont">{{ mainTarget.latestPrice }}</td>
                  </tr>
                </table>

                <el-row type="flex" class="row-bg mt10" justify="space-between">
                  <el-col class="textAlignCenter" :span="12">
                    <el-button type="primary" @click="handleShowOnlineMembers"
                      >查看在线会员</el-button
                    >
                  </el-col>
                  <el-col class="textAlignCenter" :span="12">
                    <el-button type="primary" @click="handlePostNotice"
                      >发临时通知</el-button
                    >
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row class="mb20" :span="24" :gutter="20">
                  <el-col :span="8">
                    <div class="consoleStyle" style="background:#6DC485;">
                      <div>开始时间</div>
                      <div style="font-size:12px;">
                        {{ mainTarget.project.tradeBegintime }}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="consoleStyle" style="background:#5E98E1;">
                      <div>结束时间</div>
                      <div style="font-size:12px;">
                        {{ mainTarget.project.tradeEndtime }}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="consoleStyle" style="background:#EEA850;">
                      <div>专场状态</div>
                      <div>{{ mainTarget.processStatus.text }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-col :span="24">
                  <commonTitleWithBorder
                    :title="titles.notice"
                    style="margin-left:-20px;margin-top:-8px;"
                  />
                </el-col>
                <el-input
                  class="noticebox"
                  type="textarea"
                  v-model="noticebox"
                ></el-input>
              </el-col>
            </el-row>
          </template>
          <el-col :span="24" class="mb20">
            <!-- <commonTitleWithBorder :title="titles.tableTitle" /> -->
            <el-col :span="6">
              <commonTitleWithBorder :title="titles.tableTitle" />
            </el-col>
            <el-col :span="18" v-if="pageType !== '10' && pageType !== '11'">
              <operateButtonsGroup
                class="textAlignRight"
                :operateButtonsSettings="operateButtonsSettings"
                @handleOperateButton="handleOperateButton"
              />
            </el-col>
          </el-col>
          <tableList
            :tablelistSettings="tablelistSettings"
            @handleTableRowButton="handleTableRowButton"
            @handleTableItem="handleTableItem"
          />
        </div>
      </el-col>
    </el-row>
    <dialogForm
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
    />
    <el-dialog
      :title="onlineDialog.title"
      :visible.sync="onlineDialog.dialogShow"
      width="50%"
    >
      <el-table :data="onlineDialog.data" style="width: 100%">
        <el-table-column prop="loginName" label="登录用户名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="会员名称" width="180">
        </el-table-column>
        <el-table-column prop="hostIP" label="Ip地址"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import dialogForm from "@/components/dialog/dialogForm";
import { getToken } from "@/utils/auth";
// 配置数据引入
import tableOperationsBtnList from "@/utils/formSettingsJson/biddingControl/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/biddingControl/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/biddingControl/dialogFormItems.json";
import dialogViewFormItems from "@/utils/formSettingsJson/biddingTargetsMng/dialogViewFormItems.json";

export default {
  name: "biddingControl",
  components: {
    commonTitleWithBorder,
    operateButtonsGroup,
    tableList,
    dialogForm
  },
  data() {
    return {
      showpause: false,
      // 项目列表
      projectValue: "",
      projectlist: [],
      // 倒计时中文描述
      delayState: "",
      pauseState: "暂停中",
      // 倒计时
      delayTimer: "",
      endtimeline: "",
      timedown: "",
      // 页面展示标的详情
      mainTarget: {},
      // 挂牌模式显示专场信息
      projectInfo: {},
      // 临时通知信息列表
      noticebox: "",
      //标题管理
      titles: {
        notice: "招投标临时通知",
        tableTitle: "招标标的列表"
      },
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: tableOperationsBtnList
      },
      /**
       * dialog 在线会员dialog设置
       */
      onlineDialog: {
        dialogShow: false,
        title: "在线会员情况查看",
        data: []
      },
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          hasExpandContent: true,
          expandContent: "quoteList",
          expandContentLables: [
            {
              key: "biddername",
              value: "会员名称"
            },
            {
              key: "price",
              value: "报价"
            },
            {
              key: "updated",
              value: "报价时间"
            }
            // {
            // 	key: "selfscore",
            // 	value: "综合自评分"
            // },
          ],
          tooltipEffect: "dark",
          rowKey: "sysId",
          border: true,
          defaultExpandAll: false,
          headerOptions: tableHeaderOpts
        }
      },
      /**
       * dialog 内置form表单对话框基本数据配置
       */
      dialogFormSettings: {
        dialogFormTitle: "2",
        dialogFormVisible: false,
        dialogFormItems: {
          formItemSpan: 12,
          formGroupList: [],
          formGroupValues: {},
          formButtonList: []
        }
      },
      /* socket对象 */
      subscribeTimer: null,
      subscribeTraget: null,
      subscribeBidPrice: null,
      /* stompClient进程对象 */
      websocketObj: null,
      stompClient: null,
      pageType: this.$route.query.gptype,
      heartTimer: null
    };
  },
  methods: {
    /* operateButtons点击事件，彻底结束专场 */
    handleOperateButton() {
      this.$confirm("您正在执行彻底结束本专场操作，是否继续?", "提示", {
        confirmButtonText: "彻底结束",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let postdata = {
          totalEnd: "Y",
          sysId: this.$route.query.parentSysId
        };
        this.$http(this.$api.updateSingleProject(), postdata).then(xhr => {
          if (xhr.success) {
            this.$alert("本专场已结束", "操作成功！", {
              confirmButtonText: "确定",
              callback: () => {
                this.$router.push({ path: "biddingControlSpecial" });
              }
            });
          }
        });
      });
    },
    /* 发送临时通知 */
    handlePostNotice() {
      if (!this.noticebox) {
        this.$message.error("请填写通知内容再提交");
        return false;
      }
      let postdata = {
        projectId: this.$route.query.parentSysId,
        content: this.noticebox,
        url: "tradeSpecialList",
        title: "控制台临时通知"
      };
      this.$getData("pushConsoleMsg", postdata).then(xhr => {
        if (xhr.success) {
          this.noticebox = "";
          this.$message({
            message: "发送成功！",
            type: "success"
          });
        }
      });
    },
    /* 查看在线会员情况 */
    handleShowOnlineMembers() {
      let that = this,
        postdata = {
          projectId: this.$route.query.parentSysId
        };
      that.$http(that.$api.getOnlineMemberList(), postdata).then(xhr => {
        if (xhr.success) {
          that.onlineDialog.dialogShow = true;
          that.onlineDialog.data = xhr.data;
        }
      });
    },
    /* 暂停倒计时 */
    handlePauseTimer() {
      let postdata = {
        bidId: this.mainTarget.sysId
      };
      this.$http(this.$api.pauseConsoleFlow(), postdata).then(xhr => {
        if (xhr.success) {
          this.showpause = false;
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          // this.getDataList();
        }
      });
    },
    /* 重启倒计时 */
    handleRestartTimer() {
      let postdata = {
        bidId: this.mainTarget.sysId
      };
      this.$http(this.$api.restartConsoleFlow(), postdata).then(xhr => {
        if (xhr.success) {
          this.showpause = true;
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          // this.getDataList();
        }
      });
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "标的详情";
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
          that.dialogFormSettings.dialogFormItems.formButtonList = [];
          that.dialogFormSettings.dialogFormItems.formGroupValues = tabledata;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        }
      });
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this,
        postdata;
      if (type == "checkflow") {
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogFormTitle = "流程图查看";
        that.dialogFormSettings.dialogType = "image";
        that.dialogFormSettings.imgSrc =
          that.$global.flowPicUrl +
          "?processInstanceId=" +
          id +
          "&_jwt=" +
          getToken() +
          "&t=" +
          new Date().getTime();
      } else if (type == "start") {
        this.showpause = true;
        let dialogData,
          postdata = {};
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        postdata.sysId = dialogData.sysId;
        postdata.sysParentid = dialogData.sysParentid;
        postdata.businessKey = dialogData.businessKey;
        postdata.processDefinitionKey = dialogData.processDefinitionKey;
        postdata.delay = dialogData.delay;
        postdata.delayscreen = dialogData.delayscreen;
        that.$http(that.$api.startflowBidConsoleItem(), postdata).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.getDataList();
          }
        });
      } else if (type == "remove") {
        this.$confirm("您正在执行删除操作，是否继续?", "提示", {
          confirmButtonText: "继续删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postdata = {
            sysId: id
          };
          that.$http(that.$api.deleteBidTarget(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              that.getDataList();
            }
          });
        });
      } else {
        if (type == "complete") {
          if (id.userAction == "submit") {
            that.showpause = true;
          }
          that
            .$http(that.$api.flowBidConsoleItem(that.pageType), id)
            .then(xhr => {
              if (xhr.success) {
                that.$message({
                  message: "操作成功！",
                  type: "success"
                });
                that.getDataList();
              }
            });
        } else {
          if (type == "redirectAndFlow") {
            that
              .$http(that.$api.flowBidConsoleItem(that.pageType), id)
              .then(xhr => {
                if (xhr.success) {
                  that.$message({
                    message: "操作成功！",
                    type: "success"
                  });
                  that.$router.push({
                    path: id.path,
                    query: {
                      parentSysId: id.sysId,
                      gptype: id.gptype
                    }
                  });
                }
              });
          } else if (type == "redirect") {
            that.$router.push({
              path: id.path,
              query: {
                parentSysId: id.sysId,
                parentTaskId: id.taskId,
                parentProcessinstId: id.processinstId,
                gptype: id.gptype
              }
            });
          }
        }
      }
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "getDataList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取菜单数据列表信息 */
    getDataList(query) {
      let filterRules = [
        {
          field: "sysParentid",
          value: this.$route.query.parentSysId,
          op: "equal"
        }
      ];
      let that = this,
        postdata = {
          page: "1",
          rows: "10",
          filterRules: JSON.stringify(filterRules)
        };
      if (query && typeof query === "object") {
        Object.assign(postdata, query);
      }
      that
        .$http(that.$api.getBidConsoleList(that.pageType), postdata, true)
        .then(xhr => {
          if (xhr) {
            let tradeFlag = false;
            if (that.pageType == "10" || that.pageType == "11") {
              that.projectInfo = that.$vueCopy(xhr.data[0].project);
              that.projectInfo.countdownEndtime = that.$vueCopy(
                that.projectInfo.tradeEndtime
              );
              that.projectInfo.tradeBegintime = that.$globalFnc.dateStampFormat(
                that.projectInfo.tradeBegintime
              );
              that.projectInfo.tradeEndtime = that.$globalFnc.dateStampFormat(
                that.projectInfo.tradeEndtime
              );
              that.countdown(that.projectInfo.countdownEndtime);
            }
            xhr.data.map(item => {
              item.latestPrice = "";
              if (item.winQuoteid) {
                item.winQuoteScore = item.winQuote.price;
              }
              if (!item.propList || item.propList.length == 0) {
                item.propList = [
                  {
                    name: "",
                    code: "",
                    value: ""
                  }
                ];
              }
              item.propListStr = item.propList;
              // if (item.propList && item.propList.length > 0) {
              //   item.propListStr = item.propList;
              // }
              item.quoteList.map(quote => {
                quote.updatedfomate = new Date(
                  that.$globalFnc
                    .dateStampFormat(quote.updated)
                    .replace(new RegExp("-", "gm"), "/")
                ).getTime();
              });
              let latestData = Math.max.apply(
                Math,
                item.quoteList.map(input => {
                  return input.updatedfomate;
                })
              );
              item.quoteList.map(quote => {
                if (latestData == quote.updatedfomate) {
                  item.latestPrice = quote.price;
                }
                quote.updated = that.$globalFnc.dateStampFormat(quote.updated);
              });
              item.projectName = item.project.name;
              item.numUnit =
                item.num + (item.project.munit == "kg" ? "千克" : "吨");
              item.countdownEndtime = that.$vueCopy(item.project.tradeEndtime);
              item.sysAddtime = that.$globalFnc.dateStampFormat(
                item.sysAddtime
              );
              item.project.tradeBegintime = that.$globalFnc.dateStampFormat(
                item.project.tradeBegintime
              );
              item.project.tradeEndtime = that.$globalFnc.dateStampFormat(
                item.project.tradeEndtime
              );
              if (item.status == "waiting" || item.status == "trading") {
                tradeFlag = true;
                that.endtimeline = item.project.tradeEndtime;
                that.countdown(item.countdownEndtime);
                that.mainTarget = JSON.parse(JSON.stringify(item));
                if (item.status == "waiting") {
                  that.delayState = "准备";
                }
                if (item.status == "trading") {
                  that.delayState = "交易";
                }
              }
              let operateBtns = [];
              if (item.processinstId) {
                let operateBtnItem = {
                  id: item.processinstId,
                  text: "查看流程",
                  type: "checkflow"
                };
                operateBtns.push(operateBtnItem);
                if (item.userActiveTasks && item.userActiveTasks.length > 0) {
                  item.userActiveTasks.map(task => {
                    let taskObj = {
                      id: {
                        sysId: item.sysId,
                        taskId: task.id,
                        processinstId: item.processinstId
                      },
                      text: task.name
                    };
                    let hasOtherBtns = true;
                    if (task.formKey) {
                      if (task.formKey.indexOf("{") != -1) {
                        let formkeyObj = JSON.parse(task.formKey);
                        taskObj.type = formkeyObj.action;
                        taskObj.id.gptype = item.project.type;
                        if (task.name == "评标") {
                          taskObj.id.path =
                            "/managePage/biddingMng/biddingOpenMng/biddingApprove";
                        }
                        if (task.name == "定标") {
                          // taskObj.id.path = "biddingSure";
                          taskObj = {};
                          task.userTaskActions = [];
                        }
                      } else {
                        taskObj.type = task.formKey;
                        hasOtherBtns = false;
                      }
                      operateBtns.push(taskObj);
                    }
                    if (
                      hasOtherBtns &&
                      task.userTaskActions &&
                      task.userTaskActions.length > 0
                    ) {
                      task.userTaskActions.map(action => {
                        // if (action.value == "complete") {
                        let actionObj = {
                          id: {
                            sysId: item.sysId,
                            taskId: task.id,
                            processinstId: item.processinstId,
                            userAction: action.value
                          },
                          text: action.text,
                          needAction: true,
                          type: "complete"
                        };
                        operateBtns.push(actionObj);
                        // }
                      });
                    }
                  });
                }
              } else {
                if (that.pageType != "10" && that.pageType != "11") {
                  operateBtns = [
                    {
                      id: item.sysId,
                      text: "开始",
                      type: "start"
                    }
                  ];
                }
              }
              item.operateBtns = operateBtns;
              item.issuetimeFormat = that.$globalFnc.dateStampFormat(
                item.issuetime
              );
            });
            if (!tradeFlag) {
              that.mainTarget = {};
            }
            that.tablelistSettings.tableDatas = xhr.data;
          }
        });
    },
    /* 活动结束倒计时 */
    countdown(endtime) {
      let that = this;
      let endDate = new Date(
        that.$globalFnc
          .dateStampFormat(endtime)
          .replace(new RegExp("-", "gm"), "/")
      );
      let beginDate = new Date();
      if (endDate < beginDate) {
        this.timedown = "已结束";
        return false;
      }
      let totalSeconds = parseInt((endDate - beginDate) / 1000);
      let days = Math.floor(totalSeconds / (60 * 60 * 24));
      let modulo = totalSeconds % (60 * 60 * 24);
      let hours =
        Math.floor(modulo / (60 * 60)) > 9
          ? Math.floor(modulo / (60 * 60))
          : "0" + Math.floor(modulo / (60 * 60));
      modulo = modulo % (60 * 60);
      let minutes =
        Math.floor(modulo / 60) > 9
          ? Math.floor(modulo / 60)
          : "0" + Math.floor(modulo / 60);
      let seconds = modulo % 60 > 9 ? modulo % 60 : "0" + (modulo % 60);
      this.timedown =
        days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
      setTimeout(function() {
        that.countdown(endtime);
      }, 1000);
    },
    resetHeart() {
      this.showpause = true;
      this.pauseState = "";
      // clearTimeout(this.heartTimer);
      // this.heartTimer = setTimeout(() => {
      //   this.showpause = true;
      // }, 1300);
    },
    /* 计时器socket */
    getTimerSocket() {
      let that = this,
        socketUrl = "/_topic/console/timer";
      if (that.$global.websocketObj) {
        that.subscribeTimer = that.$global.stompClient.subscribe(
          socketUrl,
          function(response) {
            let retObj = JSON.parse(response.body);
            let content = JSON.parse(retObj.content);
            that.delayTimer = Math.ceil(content.ms / 1000);
            that.resetHeart();
          }
        );
      } else {
        that.$globalFnc.socketConnect().then(() => {
          that.subscribeTimer = that.$global.stompClient.subscribe(
            socketUrl,
            function(response) {
              let retObj = JSON.parse(response.body);
              let content = JSON.parse(retObj.content);
              that.delayTimer = Math.ceil(content.ms / 1000);
              that.resetHeart();
            }
          );
        });
      }
    },
    /* 刷新标的状态 */
    getTargetRefreshSocket() {
      let that = this,
        socketUrl = "/_topic/console/refresh";
      if (that.$global.websocketObj) {
        that.subscribeTraget = that.$global.stompClient.subscribe(
          socketUrl,
          function() {
            that.getDataList();
          }
        );
      } else {
        that.$globalFnc.socketConnect().then(() => {
          that.subscribeTraget = that.$global.stompClient.subscribe(
            socketUrl,
            function() {
              that.getDataList();
            }
          );
        });
      }
    },
    /* 刷新应价信息 */
    getBidUpdSocket() {
      let that = this,
        socketUrl = "/_topic/console/bid";
      if (that.$global.websocketObj) {
        that.subscribeBidPrice = that.$global.stompClient.subscribe(
          socketUrl,
          function() {
            that.getDataList();
          }
        );
      } else {
        that.$globalFnc.socketConnect().then(() => {
          that.subscribeBidPrice = that.$global.stompClient.subscribe(
            socketUrl,
            function() {
              that.getDataList();
            }
          );
        });
      }
    }
  },
  mounted() {
    let that = this;
    that.getDataList();
    that.getTimerSocket();
    that.getTargetRefreshSocket();
    that.getBidUpdSocket();

    that
      .$getData("PortalDropdownlist", {
        _refKey: "member",
        _noCache: "true",
        memType: "2"
      })
      .then(data => {
        let clientlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogEditFormItemslist.map(formItem => {
          if (formItem.name == "clientid") {
            formItem.data = clientlist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "project",
        _noCache: "true"
      })
      .then(data => {
        let projectlist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogEditFormItemslist.map(item => {
          if (item.name == "sysParentid") {
            item.data = projectlist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "sysParentid") {
            item.data = projectlist;
          }
        });
      });
  },
  beforeDestroy() {
    /* 生命周期结束，关闭socket */
    if (this.subscribeTimer) {
      this.subscribeTimer.unsubscribe();
    }
    if (this.subscribeTraget) {
      this.subscribeTraget.unsubscribe();
    }
    if (this.subscribeBidPrice) {
      this.subscribeBidPrice.unsubscribe();
    }
  }
};
</script>
