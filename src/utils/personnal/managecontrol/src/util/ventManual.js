var ventManual = {};
/* 初始化顶部各设备类型切换列表 */
ventManual.device = [
    {
        key: 'window',
        value: '仓窗控制',
        isActive: true
    },
    {
        key: 'vent',
        value: '通风口控制',
        isActive: false
    },
    {
        key: 'w_fan',
        value: '仓窗风机控制',
        isActive: false
    },
    {
        key: 'v_fan',
        value: '通风口风机控制',
        isActive: false
    }
];
/* 定义所有类型设备所对应按钮信息 */
ventManual.buttons = {
    window: [
        {
            value: '打开',
            type: 1,
            urlkey: 'window/open',
            isDisabled: false
        },
        {
            value: '关闭',
            type: 0,
            urlkey: 'window/close',
            isDisabled: false
        },
        {
            value: '暂停',
            type: 2,
            urlkey: 'window/stop',
            isDisabled: false
        }
    ],
    w_fan: [
        {
            value: '打开',
            type: 1,
            urlkey: 'windowFan/open',
            isDisabled: false
        },
        {
            value: '关闭',
            type: 0,
            urlkey: 'windowFan/close',
            isDisabled: false
        }
    ],
    vent: [
        {
            value: '打开',
            type: 1,
            urlkey: 'vent/open',
            isDisabled: false
        },
        {
            value: '关闭',
            type: 0,
            urlkey: 'vent/close',
            isDisabled: false
        },
        {
            value: '暂停',
            type: 2,
            urlkey: 'vent/stop',
            isDisabled: false
        }
    ],
    v_fan: [
        {
            value: '正转',
            type: 3,
            urlkey: 'ventFan/openForward',
            isDisabled: false
        },
        {
            value: '关闭',
            type: 0,
            urlkey: 'ventFan/stop',
            isDisabled: false
        },
        {
            value: '反转',
            type: 4,
            urlkey: 'ventFan/openReverse',
            isDisabled: false
        }
    ]
};
/* 定义所有类型设备状态列表 */
ventManual.status = {
    window: [
        {
            value: '全关',
            type: 0,
            disabledBtn : [1]
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
            value: '全开',
            type: 3,
            disabledBtn : [0]
        },
        {
            value: '暂停',
            type: 4,
            disabledBtn : [2]
        },
        {
            value: '异常',
            type: 5,
            disabledBtn : [0,1,2]
        }
    ],
    w_fan: [
        {
            value: '关闭',
            type: 0,
            disabledBtn : [1]
        },
        {
            value: '打开',
            type: 1,
            disabledBtn : [0]
        },
        {
            value: '异常',
            type: 2,
            disabledBtn : [0,1]
        }
    ],
    vent: [
        {
            value: '全关',
            type: 0,
            disabledBtn : [1,2]
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
            value: '全开',
            type: 3,
            disabledBtn : [0,2]
        },
        {
            value: '暂停',
            type: 4,
            disabledBtn : [2]
        },
        {
            value: '异常',
            type: 5,
            disabledBtn : [0,1,2]
        }
    ],
    v_fan: [
        {
            value: '关闭',
            type: 0,
            disabledBtn : [1]
        },
        {
            value: '正转',
            type: 1,
            disabledBtn : [0]
        },
        {
            value: '反转',
            type: 2,
            disabledBtn : [2]
        },
        {
            value: '异常',
            type: 3,
            disabledBtn : [0,1,2]
        }
    ]
};
/* socket和设备接口字段对应关系 */
ventManual.relations = [
    {
        key: 'windows',
        value: 'window'
    },
    {
        key: 'windowFans',
        value: 'w_fan'
    },
    {
        key: 'vents',
        value: 'vent'
    },
    {
        key: 'ventFans',
        value: 'v_fan'
    }
];
/* plc状态 c/0:程控 c/1:柜控 p/0:通风 p/1:气调*/
ventManual.plcStatus = {
    controlMode : 0,
    processStatus : 0
}
export default ventManual;