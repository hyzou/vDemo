<template>
  <div class="manualControl">
    <ahheader :headerOption="headerOption" />
    <div v-show="!noDataStatus">
      <modalSwitchGroup :currentStatus="currentStatus" />
      <template v-if="manualType == 'temperature'">
        <div class="weather-box">
          <div>大气温度：
            <span>{{weatherStationData.temperature?weatherStationData.temperature:'—'}}℃</span></div>
          <div>大气湿度：
            <span>{{weatherStationData.humidity?weatherStationData.humidity:'—'}}%</span>
          </div>
        </div>
      </template>
      <topControllerGroup
          :topButtonsArray="topButtonsArray"
          @topNavTap="menuTap"
      />
      <detailDeviceGroup
          :showData="showData"
          :supportDescriptor="supportDescriptor"
          @deviceCheck="switchWindowTap"
      />
      <bottomButtonsGroup
          v-show="currentStatus.controlMode == plcNeedStatus.controlMode &&
         currentStatus.processStatus == plcNeedStatus.processStatus && changeStateFlag"
          :bottomButtonsArray="bottomButtonsArray"
          @bottomBtnOperate="actionMethodsTap"
      />
      <changeStateOnce
          v-show="(currentStatus.controlMode != plcNeedStatus.controlMode ||
         currentStatus.processStatus != plcNeedStatus.processStatus) && changeStateFlag"
          @onceChangeStatus="switchControlTap"
      />
    </div>
    <noData v-show="noDataStatus" />
  </div>
</template>

<script>
import {MessageBox, Toast} from 'mint-ui';
import ahheader from '@/components/ahheader.vue';
import modalSwitchGroup from '@/components/modalSwitchGroup.vue';
import topControllerGroup from '@/components/topControllerGroup.vue';
import detailDeviceGroup from '@/components/detailDeviceGroup.vue';
import bottomButtonsGroup from '@/components/bottomButtonsGroup.vue';
import changeStateOnce from '@/components/changeStateOnce.vue';
import noData from '@/components/noData.vue';
import Socket from '@/util/socketJs';
import ventManual from '@/util/ventManual';
import tempManual from '@/util/tempManual';
import gasManual from '@/util/gasManual';

export default {
    name: 'manualControl',
    components: {
        ahheader,
        modalSwitchGroup,
        topControllerGroup,
        detailDeviceGroup,
        bottomButtonsGroup,
        changeStateOnce,
        noData
    },
    data () {
        return {
            /* 用户登录信息 */
            tokenId: '',
            userName: '',
            storePointId: '',
            storeHouseId: '',
            /* 头部导航配置信息 */
            headerOption: {},
            /* 初始化所有设备信息列表 */
            defaultData: {},
            /* 初始化顶部各设备类型切换列表 */
            topButtonsArray: [],
            /* 初始化底部按钮列表 */
            bottomButtonsArray: [],
            /* 定义所有类型设备所对应按钮信息 */
            allButtonsList: {},
            /* 初始化当前类型设备状态列表 */
            currentEqpStatus: [],
            /* 定义所有类型设备状态列表 */
            allStatusList: {},
            /* 初始化显示设备信息列表 */
            showData: [],
            /* 初始化当前仓房所处模式 c/0:程控 c/1:柜控 p/0:通风 p/1:气调 */
            currentStatus: {
                controlMode: 1,
                processStatus: 1
            },
            /* plc设备Id */
            plcDeviceId: null,
            /* 操作仓房需要的状态 */
            plcNeedStatus: {},
            /* 是否显示底部按钮组 */
            changeStateFlag: true,
            /* 初始化数据显示列表状态，接口数据列表是否为空 */
            noDataStatus: true,
            /* socket和设备接口字段对应关系 */
            relations: [],
            /* socket对象 */
            subscribeDeviceState: null,
            subscribeDeviceStateUpdate: null,
            subscribeHouseDeviceStateUpdate: null,
            subscribeHouseDeviceState: null,
            /* stompClient进程对象 */
            websocketObj: null,
            stompClient: null,
            /* 勾选当前选项，控制底部按钮事件 */
            checkedStatusStr: '',
            /* 手动控制类型*/
            manualType: '',
            /* 仓房支持的设备*/
            supportDescriptor: {},
            /*气象站数据*/
            weatherStationData: {}
        };
    },
    watch: {
        showData: {
            handler (newVal, oldVal) {
                // this.bottomButtonsArray.forEach (function($btn) {
                //     $btn.isDisabled = false;
                // });
            },
            deep: true
        }
    },
    mounted () {
        this.setHeaderOption ();
        this.setDeviceOption ();
        this.getStoreHouseDevice ();
    },
    methods: {
        /* 标题部分处理 */
        setHeaderOption () {
            let that = this;
            let type = {
                'ventilate': '智能通风',
                'temperature': '智能控温',
                'gas': '智能气调',
                'circular': '环流熏蒸'
            };
            this.manualType = that.$route.query.manualType;
            let houseName = that.$route.query.storeHouseName;
            if (this.manualType) {
                houseName += type[this.manualType];
            }
            this.headerOption = {
                title: houseName,
                routePath: '/choseHouse'
            };
        },
        /* 通过不同类型生成不同设备列表 */
        setDeviceOption () {
            switch (this.manualType) {
                case 'ventilate' : {
                    this.topButtonsArray = ventManual.device;
                    this.allButtonsList = ventManual.buttons;
                    this.allStatusList = ventManual.status;
                    this.relations = ventManual.relations;
                    this.plcNeedStatus = ventManual.plcStatus;
                    this.defaultData = setDeviceDefaultData (this.allButtonsList);
                    break;
                }
                case 'temperature' : {
                    this.topButtonsArray = tempManual.device;
                    this.allButtonsList = tempManual.buttons;
                    this.allStatusList = tempManual.status;
                    this.relations = tempManual.relations;
                    this.plcNeedStatus = tempManual.plcStatus;
                    this.defaultData = setDeviceDefaultData (this.allButtonsList);
                    break;
                }
                case 'circular':
                case 'gas' : {
                    this.topButtonsArray = gasManual.device;
                    this.allButtonsList = gasManual.buttons;
                    this.allStatusList = gasManual.status;
                    this.relations = gasManual.relations;
                    this.plcNeedStatus = gasManual.plcStatus;
                    this.defaultData = setDeviceDefaultData (this.allButtonsList);
                    break;
                }
                default:
                    break;
            }

            function setDeviceDefaultData (device) {
                let obj = {};
                let deviceList = JSON.parse (JSON.stringify (device));
                for (let key in deviceList) {
                    obj[key] = [];
                }
                return obj;
            }
        },
        /* 获取当前设备列表信息 */
        getStoreHouseDevice () {
            const that = this;
            let data = that.$store.state.userInfo;
            data.storePointId = that.$store.state.pointInfo.storePointId;
            data.storeHouseId = that.$route.query.storeHouseId;
            that
                .$http (that.$api.getStoreHouseDevice (), data, true)
                .then (function(xhr) {
                    if (xhr.deviceDisplayList && xhr.deviceDisplayList.length > 0) {
                        that.noDataStatus = false;
                        xhr.deviceDisplayList.map (function(item) {
                            item.isChecked = false;
                            item.controllerStatus = '';
                            for (let key in that.allStatusList) {
                                if (item.deviceType == key) {
                                    item.statusList = that.allStatusList[key];
                                }
                            }
                            for (let key in that.defaultData) {
                                if (item.deviceType == key) {
                                    that.defaultData[item.deviceType].push (item);
                                }
                            }
                            if (item.deviceType == 'plc') {
                                that.plcDeviceId = item.deviceId;
                            }
                        });
                        that.topButtonsArray.map (function(item) {
                            if (item.isActive) {
                                that.bottomButtonsArray = JSON.parse (JSON.stringify (that.allButtonsList[item.key]));
                                that.currentEqpStatus = that.allStatusList[item.key];
                                that.showData = JSON.parse (
                                    JSON.stringify (that.defaultData[item.key])
                                );
                                let arr = [];
                                that.showData.forEach (function(data) {
                                    arr.push ('z');
                                });
                                that.checkedStatusStr = arr.join ('#');
                            }
                        });
                        that.socketConnect ();
                    }
                    if (xhr.deviceDescriptorList && xhr.deviceDescriptorList.length > 0 && that.manualType == 'temperature') {
                        xhr.deviceDescriptorList.map (function(item) {
                            if (item.deviceType == 'air_cond') {
                                item.supportProperties.map (function(support) {
                                    that.supportDescriptor[support] = true;
                                });
                            }
                        });
                    }
                });
        },
        /* 获取设备状态回调 */
        setSubscribeFunc (response) {
            var data = JSON.parse (response.body);
            this.updatePlcDevice (data);
            this.updateDeviceStatus (data);
            this.updateRealTimeData (data);
            if(this.manualType == 'temperature'){
                this.updateWeatherStation(data)
            }
        },
        /* 一键切换当前控制状态 c/0:程控 c/1:柜控 p/0:通风 p/1:气调*/
        switchControlTap () {
            let that = this;
            if (this.currentStatus.controlMode !== this.plcNeedStatus.controlMode) {
                if (this.plcNeedStatus.controlMode === 0 && this.currentStatus.controlMode == 1) { //切换到柜控
                    switchPlcHttp ('switchToProgram', '程控/柜控切换');
                }
                if (this.plcNeedStatus.controlMode === 1 && this.currentStatus.controlMode == 0) { //切换到程控
                    switchPlcHttp ('switchToPanel', '程控/柜控切换');
                }
            }
            if (this.currentStatus.processStatus !== this.plcNeedStatus.processStatus) {
                if (this.plcNeedStatus.processStatus === 0 && this.currentStatus.processStatus == 1) { //切换到气调模式
                    switchPlcHttp ('switchProcessToVent', '通风/气调模式切换');
                }
                if (this.plcNeedStatus.processStatus === 1 && this.currentStatus.processStatus == 0) { //切换到通风模式
                    switchPlcHttp ('switchProcessToAirRegulate', '通风/气调模式切换');
                }
            }

            function switchPlcHttp (type, msg) {
                let data = {
                    deviceId: that.plcDeviceId,
                    tokenId: that.$store.state.userInfo.tokenId,
                    userName: that.$store.state.userInfo.userName,
                    storePointId: that.$store.state.pointInfo.storePointId,
                    storeHouseId: that.$route.query.storeHouseId
                };
                that.$http (that.$api.switchPlcOperation (type), data)
                    .then (xhr => {
                        if (xhr && xhr.success === true) {
                            Toast ({
                                message: msg + '成功'
                            });
                        } else {
                            Toast ({
                                message: xhr.msg
                            });
                        }
                    });
            }
        },
        /* 切换控制设备信息，仓窗控制，通风口控制等 */
        menuTap: function(idx, key) {
            let that = this;
            this.activekey = key;
            if (this.topButtonsArray[idx].isActive) {
                return;
            }
            this.topButtonsArray.forEach (function(item) {
                item.isActive = false;
            });
            this.topButtonsArray[idx].isActive = !this.topButtonsArray[idx].isActive;
            this.showData = JSON.parse (JSON.stringify (that.defaultData[key]));
            this.currentEqpStatus = this.allStatusList[key];
            this.bottomButtonsArray = JSON.parse (JSON.stringify (that.allButtonsList[key]));
            that.checkedStatusStr = '';
            let arr = [];
            this.showData.forEach (function() {
                arr.push ('z');
            });
            that.checkedStatusStr = arr.join ('#');
        },
        /* 点选/取消当前仓窗/通风口/风机等勾选状态 */
        switchWindowTap (index, status) {
            this.showData[index].isChecked = !this.showData[index].isChecked;
            let arr = this.checkedStatusStr.split ('#');
            if (this.showData[index].isChecked) {
                arr[index] = status;
            } else {
                arr[index] = 'z';
            }
            this.checkedStatusStr = arr.join ('#');
            this.setBottomBtnStatus ();
        },
        setBottomBtnStatus () {
            let that = this,
                activeflag;
            that.bottomButtonsArray.forEach (function($btn) {
                $btn.isDisabled = false;
            });
            that.topButtonsArray.map (function(item) {
                if (item.isActive) {
                    activeflag = item.key;
                    return false;
                }
            });
            let statusList = that.allStatusList[activeflag];
            for (let i = 0; i <= statusList.length; i++) {
                if (statusList[i] && that.checkedStatusStr.indexOf (statusList[i].type) > -1) {
                    statusList[i].disabledBtn.map (function(btn) {
                        that.bottomButtonsArray[btn].isDisabled = true;
                    });
                }
            }
        },
        /* 底部操作按钮 */
        actionMethodsTap (msg) {
            if (msg.isDisabled) {
                return false;
            }
            let that = this,
                checkedWindow = [],
                postdata = {
                    data: {
                        tokenId: that.$store.state.userInfo.tokenId,
                        userName: that.$store.state.userInfo.userName,
                        storePointId: that.$store.state.pointInfo.storePointId,
                        storeHouseId: that.$route.query.storeHouseId
                    }
                };
            that.showData.map (function(item) {
                if (item.isChecked) {
                    checkedWindow.push (item.deviceId);
                }
            });
            postdata.data.deviceIds = checkedWindow;
            if (postdata.data.deviceIds.length == 0) {
                Toast ({
                    message: '请选择需要操作的设备'
                });
                return false;
            }
            if (this.manualType === 'temperature' && msg.type == 2 && this.supportDescriptor.set == true) {
                MessageBox.prompt ('', {
                    message: '请输入空调设定温度值',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValidator: (val) => {
                        return (Number (val) !== NaN && val >= 16 && val <= 30);
                    },
                    inputErrorMessage: '温度值范围为16℃ - 30℃'
                }).then ((action) => {
                    if (action.action === 'confirm' && action.value) {     //确认的回调
                        postdata.data.extValue = action.value;
                        that.excuteUserOperate (msg.urlkey, postdata.data);
                    }
                }).catch (action => {
                    if (action === 'cancel') {     //取消的回调
                        return false;
                    }
                });
            } else {
                that.excuteUserOperate (msg.urlkey, postdata.data);
            }
        },
        /*执行用户操作*/
        excuteUserOperate (url, data) {
            let that = this;
            that.$http (that.$api.doDeviceOperation (url), data)
                .then (function(xhr) {
                    that.showData.map (function(showItem) {
                        showItem.isChecked = false;
                    });
                    that.bottomButtonsArray.forEach (function($btn) {
                        $btn.isDisabled = false;
                    });
                    that.checkedStatusStr = '';
                    let arr = [];
                    that.showData.forEach (function() {
                        arr.push ('z');
                    });
                    that.checkedStatusStr = arr.join ('#');
                    if (xhr.success) {
                        Toast ({
                            message: '操作成功！'
                        });
                    } else {
                        Toast ({
                            message: xhr.msg
                        });
                    }
                });
        },
        /*更新plc状态*/
        updatePlcDevice (data) {
            let updateDefaultData,
                that = this;
            if (data && data.wrapped && data.wrapped.plcResult) {
                let plcStatus = data.wrapped.plcResult.plcs[0];
                this.currentStatus = plcStatus.value;
            } else if (data instanceof Array) {
                updateDefaultData = data;
                updateDefaultData.forEach (function(item) {
                    if (item.deviceType == 'plc') {
                        if (item.propertyName == 'controlModeSwitch') {
                            that.currentStatus.controlMode = item.newValue;
                        }
                        if (item.propertyName == 'processControl') {
                            that.currentStatus.processStatus = item.newValue;
                        }
                    }
                });
            }
        },
        /*气象站数据更新*/
        updateWeatherStation(data){
            let that = this;
            if (data.wrapped && data.wrapped['weatherStationResult']){
                if (data.wrapped['weatherStationResult']['weatherStations']) {
                    that.weatherStationData = data.wrapped['weatherStationResult']['weatherStations'];
                }
                if (that.weatherStationData instanceof Array) {
                    that.weatherStationData = that.weatherStationData[0].value;
                } else if (that.weatherStationData.value) {
                    that.weatherStationData = that.weatherStationData.value;
                }
            }
        },
        /*设备定时状态更新*/
        updateDeviceStatus (data) {
            let updateDefaultData,
                that = this;
            if (data.wrapped) {
                for (let result in data.wrapped) {
                    if (!result instanceof Object) {
                        continue;
                    }
                    updateDefaultData = data.wrapped[result];
                    that.relations.forEach (function(relation) {
                        if (!updateDefaultData[relation.key]) {
                            return;
                        }
                        updateDefaultData[relation.key].forEach (function(item) {
                            if (!that.defaultData[relation.value]) {
                                return;
                            }
                            that.defaultData[relation.value].forEach (function($item) {
                                if (item.deviceId == $item.deviceId) {
                                    $item.controllerStatus = item.value;
                                }
                            });
                            that.showData.forEach (function($shwoItem) {
                                if ($shwoItem.deviceId == item.deviceId) {
                                    $shwoItem.controllerStatus = item.value;
                                }
                            });
                        });
                    });
                }
            }
        },
        //实时数据更新
        updateRealTimeData: function(data) {
            let updateDefaultData,
                that = this;
            if (data instanceof Array) {
                updateDefaultData = data;
                updateDefaultData.forEach (function(item) {
                    that.showData.forEach (function($item) {
                        if ($item.deviceId == item.deviceId && item.propertyName === 'status') {
                            $item.controllerStatus.status = item.newValue;
                        }
                    });
                    let typeList = [];
                    for (let key in that.defaultData) {
                        typeList.push (key);
                    }
                    typeList.map (function(deviceType) {
                        if (item.deviceType == deviceType ) {
                            that.defaultData[item.deviceType].forEach (function($item) {
                                if (item.deviceId == $item.deviceId && item.propertyName === 'status') {
                                    $item.controllerStatus.status = item.newValue;
                                }
                            });
                        }
                    });
                });
            }
        },
        socketConnect () {
            let that = this;
            Socket.socketConnect ({
                url: that.$api.socketMain ().url,
                userName: that.$store.state.userInfo.userName,
                callback (stompClient) {
                    that.stompClient = stompClient;
                    let storePointId = that.$store.state.pointInfo.storePointId;
                    let userName = that.$store.state.userInfo.userName;
                    let storeHouseId = that.$route.query.storeHouseId;
                    //订阅初次获取各设备当前状态
                    that.subscribeDeviceState = Socket.openSubscribe ({
                        stompClient: that.stompClient,
                        url: that.$api.getUserDeviceState (userName, storePointId, storeHouseId).url,
                        callback: function(response) {
                            that.setSubscribeFunc (response);
                        }
                    });
                    //订阅各设备状态
                    that.subscribeDeviceStateUpdate = Socket.openSubscribe ({
                        stompClient: that.stompClient,
                        url: that.$api.getDeviceState (storePointId, storeHouseId).url,
                        callback: function(response) {
                            that.setSubscribeFunc (response);
                        }
                    });
                    //
                    that.subscribeHouseDeviceStateUpdate = Socket.openSubscribe ({
                        stompClient: that.stompClient,
                        url: that.$api.getRealTimeDeviceState (storePointId, storeHouseId).url,
                        callback: function(response) {
                            that.setSubscribeFunc (response);
                        }
                    });
                    //
                    that.subscribeHouseDeviceState = Socket.openSubscribe ({
                        stompClient: that.stompClient,
                        url: that.$api.getStorePointRealTime (storePointId).url,
                        callback: function(response) {
                            that.setSubscribeFunc (response);
                        }
                    });
                }
            });
        }
    },
    beforeDestroy () {
        /* 生命周期结束，关闭socket */
        let subscribeArray = [];
        if (this.subscribeDeviceState) {
            subscribeArray.push (this.subscribeDeviceState);
        }
        if (this.subscribeDeviceStateUpdate) {
            subscribeArray.push (this.subscribeDeviceStateUpdate);
        }
        if (this.subscribeHouseDeviceStateUpdate) {
            subscribeArray.push (this.subscribeHouseDeviceStateUpdate);
        }
        if (this.subscribeHouseDeviceState) {
            subscribeArray.push (this.subscribeHouseDeviceState);
        }
        Socket.closeSubscribe (subscribeArray);
    }
};
</script>
<style lang="less" scoped>
  .weather-box {
    background: #fff;
    padding: 0 0.5rem;
    font-size: 14px;

    div {
      display: inline-block;
      width: 48%;
    }
  }
</style>

