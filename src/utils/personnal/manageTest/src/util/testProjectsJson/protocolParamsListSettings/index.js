/**
 * eqpjson.clrw-lt :协议名称
 * eqpjson.clrw-lt.paramList: 协议参数列表
 * eqpjson.clrw-lt.paramList.obj:{
 *  paramName:""参数字段名称,
 *  paramDesc:""参数字段中文描述,
 *  paramRange:""参数值范围,
 *  paramRequired:""参数值必填性：true必填，false:非必填，高级全部非必填,
 *  paramDefault:""参数默认值",
 * }
 */

const eqpjson = {
  "clrw-lt": {
    paramList: [
      {
        paramName: "LT_NUM",
        paramDesc: "串口彩灯主机彩灯数量",
        paramRange: "0-1024",
        paramRequired: "true",
        paramDefault: "144"
      },
      {
        paramName: "LT_TYPE",
        paramDesc: "串口彩灯主机灯带类型",
        paramRange: "1-16",
        paramRequired: "true",
        paramDefault: "2"
      },
      {
        paramName: "LT_PORT",
        paramDesc: "串口彩灯主机端口号",
        paramRange: "0-30",
        paramRequired: "true",
        paramDefault: "0"
      },
      {
        paramName: "LT_GROUPADDR",
        paramDesc: "串口彩灯主机组地址",
        paramRange: "0-1024",
        paramRequired: "true",
        paramDefault: "0"
      },
      {
        paramName: "LT_DEVICEADDR",
        paramDesc: "串口彩灯主机设备地址",
        paramRange: "0-4096",
        paramRequired: "true",
        paramDefault: "0"
      }
    ]
  },
  "c-mode": {
    paramList: [
      {
        paramName: "OMRON_UNIT_NO",
        paramDesc: "ormon单元地址",
        paramRange: "0-30",
        paramRequired: "true",
        paramDefault: "0"
      }
    ]
  },
  modbus: {
    paramList: [
      {
        paramName: "MODBUS_UNIT_ID",
        paramDesc: "Modbus从站地址号",
        paramRange: "1-240",
        paramRequired: "true",
        paramDefault: "1"
      },
      {
        paramName: "MODBUS_ON_BUS_CONTROLLER",
        paramDesc: "Modbus总线型设备",
        paramRange: "true/false",
        paramRequired: "false",
        paramDefault: "false"
      },
      {
        paramName: "FORCE_HANDLER_CHANNEL_TYPE",
        paramDesc: "Modbus通道类型",
        paramRange: "SERIAL/TCPIP",
        paramRequired: "true",
        paramDefault: "TCPIP"
      },
      {
        paramName: "MODBUS_PARALLEL_QUERY_NUM",
        paramDesc: "Modbus查询并发数(高级)",
        paramRange: "1-65536",
        paramRequired: "false",
        paramDefault: "1"
      },
      {
        paramName: "MODBUS_MAX_READ_COILS",
        paramDesc: "Modbus线圈批量读取限制数(高级)",
        paramRange: "1-2000",
        paramRequired: "false",
        paramDefault: "2000"
      },
      {
        paramName: "MODBUS_MAX_READ_DISCRETE_INPUTS",
        paramDesc: "Modbus离散输入批量读取限制数(高级)",
        paramRange: "1-2000",
        paramRequired: "false",
        paramDefault: "2000"
      },
      {
        paramName: "MODBUS_MAX_READ_HOLDING_REGISTERS",
        paramDesc: "Modbus保持寄存器批量读取限制数(高级)",
        paramRange: "1-125",
        paramRequired: "false",
        paramDefault: "125"
      },
      {
        paramName: "MODBUS_MAX_READ_INPUT_REGISTERS",
        paramDesc: "Modbus输入寄存器批量读取限制数(高级)",
        paramRange: "1-125",
        paramRequired: "false",
        paramDefault: "125"
      },
      {
        paramName: "MODBUS_MAX_WRITE_COILS",
        paramDesc: "Modbus线圈批量写入限制数(高级)",
        paramRange: "1-1968",
        paramRequired: "false",
        paramDefault: "1968"
      },
      {
        paramName: "MODBUS_MAX_WRITE_HOLDING_REGISTERS",
        paramDesc: "Modbus保持寄存器批量写入限制数(高级)",
        paramRange: "1-123",
        paramRequired: "false",
        paramDefault: "123"
      },
      {
        paramName: "MODBUS_FORCE_SINGLE_WRITE",
        paramDesc: "强制采用单点写入(高级)",
        paramRange: "true/false",
        paramRequired: "false",
        paramDefault: "false"
      },
      {
        paramName: "MODBUS_FORCE_MULTIPLE_WRITE",
        paramDesc: "强制采用多点写入(高级)",
        paramRange: "true/false",
        paramRequired: "false",
        paramDefault: "false"
      }
    ]
  },
  "gi-beibo": {
    paramList: [
      {
        paramName: "BEIBO_ADDR",
        paramDesc: "贝博粮情控制器分机号",
        paramRange: "1-240",
        paramRequired: "true",
        paramDefault: "1"
      },
      {
        paramName: "LAYER_NUM",
        paramDesc: "贝博粮情控制器电缆层数",
        paramRange: "正整数",
        paramRequired: "true",
        paramDefault: "4"
      }
    ]
  },
  "oh-id": {
    paramList: [
      {
        paramName: "OHID_ADDR",
        paramDesc: "ohid设备地址",
        paramRange: "0-255",
        paramRequired: "true",
        paramDefault: "0"
      },
      {
        paramName: "CHANNEL_BASE_ADDR",
        paramDesc: "ohid通道地址",
        paramRange: "0-255",
        paramRequired: "true",
        paramDefault: "200"
      },
      {
        paramName: "CHANNEL_COUNT",
        paramDesc: "ohid通道数量",
        paramRange: "正整数",
        paramRequired: "true",
        paramDefault: "15"
      }
    ]
  },
  "xicheng-jx": {
    paramList: []
  },
  "gi-jhtcp": {
    paramList: [
      {
        paramName: "JH_TCP_NO",
        paramDesc: "佳华RTU主机TCP编号值",
        paramRange: "1-240",
        paramRequired: "true",
        paramDefault: "1"
      }
    ]
  },
  "gi-jhrtu": {
    paramList: [
      {
        paramName: "JH_RTU_NO",
        paramDesc: "佳华RTU主机RTU编号值",
        paramRange: "1-240",
        paramRequired: "true",
        paramDefault: "1"
      }
    ]
  },
  s7: {
    paramList: [
      {
        paramName: "MAX_AMQ_CALLING",
        paramDesc: "最大主动调用并发(高级)",
        paramRange: ">0(正整数)",
        paramRequired: "false",
        paramDefault: "1"
      },
      {
        paramName: "MAX_AMQ_CALLED",
        paramDesc: "最大被动调用并发(高级)",
        paramRange: ">0(正整数)",
        paramRequired: "false",
        paramDefault: "1"
      },
      {
        paramName: "PDU_SIZE",
        paramDesc: "协议数据单元长度(高级)",
        paramRange: ">0(正整数)",
        paramRequired: "false",
        paramDefault: "240"
      }
    ]
  }
};
export default eqpjson;
