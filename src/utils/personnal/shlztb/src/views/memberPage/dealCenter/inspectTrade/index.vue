<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <tabCard class="tab-container" :tabSettings="tabSettings" />
        <div class="table-container">
          <template v-if="pageType == '10' || pageType == '11'">
            <el-row class="mb20" :span="24" :gutter="20">
              <el-col :span="8">
                <div
                  class="mb20"
                  style="line-height:32px;font-size:16px;color:#fff;text-align:center;background:#3A9CF6;border-radius:4px;padding: 15px 0;"
                >
                  <div>距离结束倒计时</div>
                  <div>{{ timedown }}</div>
                </div>
              </el-col>
              <el-col :span="16">
                <el-row class="mb20" :span="24" :gutter="20">
                  <el-col :span="8">
                    <div
                      style="line-height:32px;font-size:16px;color:#fff;text-align:center;background:#6DC485;border-radius:4px;padding: 15px 0;"
                    >
                      <div>开始时间</div>
                      <div>{{ projectInfo.tradeBegintime }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div
                      style="line-height:32px;font-size:16px;color:#fff;text-align:center;background:#5E98E1;border-radius:4px;padding: 15px 0;"
                    >
                      <div>结束时间</div>
                      <div>{{ projectInfo.tradeEndtime }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div
                      style="line-height:32px;font-size:16px;color:#fff;text-align:center;background:#EEA850;border-radius:4px;padding: 15px 0;"
                    >
                      <div>专场状态</div>
                      <div>交易中</div>
                    </div>
                  </el-col>
                </el-row>
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
                <div
                  class="mb20"
                  style="line-height:32px;font-size:16px;color:#fff;text-align:center;background:#E6746C;border-radius:4px;padding: 15px 0;"
                >
                  <div>
                    <!-- {{ mainTarget.sysAddtime }}&nbsp; -->
                    {{ mainTarget.project.name }}
                  </div>
                  <div>标的号：{{ mainTarget.no }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div
                  class="mb20"
                  style="line-height:32px;font-size:16px;color:#fff;text-align:center;background:#3A9CF6;border-radius:4px;padding: 15px 0;"
                >
                  <div>距离结束倒计时</div>
                  <div>{{ timedown }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <el-row class="mb20" :span="24" :gutter="20">
                  <el-col :span="8">
                    <div
                      style="line-height:32px;font-size:16px;color:#fff;text-align:center;background:#6DC485;border-radius:4px;padding: 15px 0;"
                    >
                      <div>开始时间</div>
                      <div>{{ mainTarget.project.tradeBegintime }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div
                      style="line-height:32px;font-size:16px;color:#fff;text-align:center;background:#5E98E1;border-radius:4px;padding: 15px 0;"
                    >
                      <div>结束时间</div>
                      <div>{{ mainTarget.project.tradeEndtime }}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div
                      style="line-height:32px;font-size:16px;color:#fff;text-align:center;background:#EEA850;border-radius:4px;padding: 15px 0;"
                    >
                      <div>标的倒计时</div>
                      <div>{{ delayState }}{{ delayTimer }}</div>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
          <el-col :span="24">
            <commonTitleWithBorder :title="titles.tableTitle" />
          </el-col>
          <tableList
            :tablelistSettings="tablelistSettings"
            @handleTableRowButton="handleTableRowButton"
          />
        </div>
      </el-col>
    </el-row>
    <dialogForm
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
    />
  </div>
</template>

<script>
// 组件引入
import tabCard from "@/components/tabCard";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import tableList from "@/components/tableList";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/inspectTrade/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/inspectTrade/searchFormItems.json";
import tableHeaderOpts from "@/utils/formSettingsJson/inspectTrade/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/inspectTrade/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/inspectTrade/dialogEditFormBtns.json";

export default {
  name: "inspectTrade",
  components: {
    tabCard,
    commonTitleWithBorder,
    tableList,
    dialogForm
  },
  data() {
    return {
      // 倒计时中文描述
      delayState: "",
      // 倒计时
      delayTimer: "",
      endtimeline: "",
      timedown: "",
      // 页面展示标的详情
      mainTarget: null,
      // 挂牌模式显示专场信息
      projectInfo: {},
      // 临时通知信息列表
      noticebox: "",
      // tab数据设置
      tabSettings: {
        tabCardType: "card",
        tabCardData: [
          {
            label: "交易列表",
            name: "inspectTrade"
          }
        ]
      },
      //标题管理
      titles: {
        notice: "招投标临时通知",
        tableTitle: "我委托的交易列表"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        formItemSpan: 12,
        formGroupList: searchFormItemslist,
        formGroupValues: {},
        formButtonList: searchFormBtnList
      },
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          hasExpandContent: false,
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
            // 	key: "updated",
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
      /**
       * searchbar 记录搜索栏搜索记录
       */
      searchInfo: {},
      firstLoadFilter: [],
      /* socket对象 */
      subscribeTimer: null,
      subscribeTraget: null,
      subscribeBidPrice: null,
      /* stompClient进程对象 */
      websocketObj: null,
      stompClient: null,
      pageType: this.$route.query.gptype
    };
  },
  methods: {
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this;
      if (type == "bidPrice") {
        let dialogData = {},
          highPrice;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id) {
            dialogData.sysParentid = JSON.parse(JSON.stringify(itemdata.sysId));
            highPrice = itemdata.highestprice;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "price") {
            item.max = highPrice;
          }
        });
        that.dialogFormSettings.dialogFormTitle = "应价";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.searchInfo.page = num;
      this.getBidConsoleList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      let options = {
        doActionFncName: "getBidConsoleList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取可投标数据列表信息 */
    getBidConsoleList(query) {
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
              that.projectInfo = JSON.parse(
                JSON.stringify(xhr.data[0].project)
              );
              that.projectInfo.tradeBegintime = that.$globalFnc.dateStampFormat(
                that.projectInfo.tradeBegintime
              );
              that.projectInfo.tradeEndtime = that.$globalFnc.dateStampFormat(
                that.projectInfo.tradeEndtime
              );
              that.countdown(that.projectInfo.tradeEndtime);
            }
            xhr.data.map(item => {
              let latestData = Math.max.apply(
                Math,
                item.quoteList.map(input => {
                  return input.updated;
                })
              );
              item.quoteList.map(quote => {
                if (latestData == quote.updated) {
                  item.latestPrice = quote.price;
                }
                quote.updated = that.$globalFnc.dateStampFormat(quote.updated);
              });
              item.projectName = item.project.name;
              item.numUnit =
                item.num + (item.project.munit == "kg" ? "千克" : "吨");
              item.sysAddtime = that.$globalFnc.dateStampFormat(
                item.sysAddtime
              );
              item.project.tradeBegintime = that.$globalFnc.dateStampFormat(
                item.project.tradeBegintime
              );
              item.project.tradeEndtime = that.$globalFnc.dateStampFormat(
                item.project.tradeEndtime
              );
              // let operateBtns = [];
              // if(item.status=='trading'){
              //   operateBtns = [
              //     {
              //       id: item.sysId,
              //       text: "应价",
              //       type: "bidPrice"
              //     }
              //   ]
              // }
              // item.operateBtns = operateBtns;
              item.issuetimeFormat = that.$globalFnc.dateStampFormat(
                item.issuetime
              );
              if (item.status == "waiting" || item.status == "trading") {
                tradeFlag = true;
                that.mainTarget = JSON.parse(JSON.stringify(item));
                that.endtimeline = item.project.tradeEndtime;
                that.countdown(item.project.tradeEndtime);
                if (item.status == "waiting") {
                  that.delayState = "准备";
                }
                if (item.status == "trading") {
                  that.delayState = "交易";
                }
              }
            });
            if (!tradeFlag) {
              that.mainTarget = null;
            }
            that.tablelistSettings.tableDatas = xhr.data;
            // that.paginationSettings.totalNumbers = parseInt(xhr.total);
          }
        });
    },
    /* 获取标的数据详情 */
    gettradeInformationDetail(params) {
      let that = this;
      return new Promise(resolve => {
        that.$http(that.$api.tradeInformationDetail(), params).then(xhr => {
          resolve(xhr);
        });
      });
    },
    /* 活动结束倒计时 */
    countdown(endtime) {
      let that = this;
      // let endDate = new Date(
      //   endtime.substr(0, 19).replace(new RegExp("-", "gm"), "/")
      // );
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
      let hours = Math.floor(modulo / (60 * 60));
      modulo = modulo % (60 * 60);
      let minutes = Math.floor(modulo / 60);
      let seconds = modulo % 60;
      this.timedown =
        days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
      setTimeout(function() {
        that.countdown(endtime);
      }, 1000);
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
            that.getBidConsoleList();
          }
        );
      } else {
        that.$globalFnc.socketConnect().then(() => {
          that.subscribeTraget = that.$global.stompClient.subscribe(
            socketUrl,
            function() {
              that.getBidConsoleList();
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
            that.getBidConsoleList();
          }
        );
      } else {
        that.$globalFnc.socketConnect().then(() => {
          that.subscribeBidPrice = that.$global.stompClient.subscribe(
            socketUrl,
            function() {
              that.getBidConsoleList();
            }
          );
        });
      }
    }
  },
  mounted() {
    this.getBidConsoleList();
    // if (this.pageType != "10") {
    this.getTimerSocket();
    this.getTargetRefreshSocket();
    this.getBidUpdSocket();
    // }
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
