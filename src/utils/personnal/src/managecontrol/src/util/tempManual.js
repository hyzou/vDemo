var tempManual = {};
/* 初始化顶部各设备类型切换列表 */
tempManual.device = [
    {
        key: 'air_cond',
        value: '空调控制',
        isActive: true
    }
];
/* 定义所有类型设备所对应按钮信息 */
tempManual.buttons = {
    air_cond: [
        {
            value: '启动',
            type: 3,
            urlkey: 'airCondition/open',
            isDisabled: false
        },
        {
            value: '设定',
            type: 2,
            urlkey: 'airCondition/set',
            isDisabled: false
        },
        {
            value: '停止',
            type: 0,
            urlkey: 'airCondition/close',
            isDisabled: false
        }
    ]
};
/* 定义所有类型设备状态列表 */
tempManual.status = {
    air_cond: [
        {
            value: '关',
            type: 0,
            disabledBtn : [1,2]
        },
        {
            value: '开',
            type: 1,
            disabledBtn : [0]
        },
        {
            value: '异常',
            type: 2,
            disabledBtn : [0,1,2]
        }
    ]
};
/* socket和设备接口字段对应关系 */
tempManual.relations = [
    {
        key: 'airConditions',
        value: 'air_cond'
    }
];
/* plc状态 c/0:程控 c/1:柜控 p/0:通风 p/1:气调*/
tempManual.plcStatus = {
    controlMode : 0,
    processStatus : 1
}
export default tempManual;