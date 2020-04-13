var gasManual = {};
/* 初始化顶部各设备类型切换列表 */
gasManual.device = [
    {
        key: 'valve',
        value: '阀门控制',
        isActive: true
    },
    {
        key: 'c_fan',
        value: '环流风机控制',
        isActive: false
    }
];
/* 定义所有类型设备所对应按钮信息 */
gasManual.buttons = {
    valve: [
        {
            value: '开阀',
            type: 2,
            urlkey: 'valve/open',
            isDisabled: false
        },
        {
            value: '关阀',
            type: 0,
            urlkey: 'valve/close',
            isDisabled: false
        },
        {
            value: '暂停',
            type: 100,
            urlkey: 'valve/stop',
            isDisabled: false
        }
    ],
    c_fan: [
        {
            value: '运行',
            type: 1,
            urlkey: 'circularFan/open',
            isDisabled: false
        },
        {
            value: '停止',
            type: 0,
            urlkey: 'circularFan/close',
            isDisabled: false
        }
    ]
};
/* 定义所有类型设备状态列表 */
gasManual.status = {
    valve: [
        {
            value: '全关',
            type: 0,
            disabledBtn : [1,2]
        },
        {
            value: '全开',
            type: 3,
            disabledBtn : [0,2]
        },
        {
            value: '正打开',
            type: 1,
            disabledBtn : [0]
        },
        {
            value: '正关闭',
            type: 2,
            disabledBtn : [1]
        },
        {
            value: '暂停',
            type: 4,
            disabledBtn : [2]
        },
        {
            value: '异常',
            type: 100,
            disabledBtn : [0,1,2]
        }
    ],
    c_fan: [
        {
            value: '开',
            type: 1,
            disabledBtn : [0]
        },
        {
            value: '关',
            type: 0,
            disabledBtn : [1]
        },
        {
            value: '异常',
            type: 2,
            disabledBtn : [0,1]
        }
    ]
};
/* socket和设备接口字段对应关系 */
gasManual.relations = [
    {
        key: 'valves',
        value: 'valve'
    },
    {
        key: 'circularFans',
        value: 'c_fan'
    }
];
/* plc状态 c/0:程控 c/1:柜控 p/0:通风 p/1:气调*/
gasManual.plcStatus = {
    controlMode : 0,
    processStatus : 1
}
export default gasManual;