<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="16">
        <formGroup
          :formGroupSettings="formGroupSettings"
          @formGroupSubmit="handleFormButtons"
          @linkSelect="handleSelectChange"
        />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li><p>1.以上为表单简单示例，具体调用情况可查看代码。</p></li>
          <li>
            <p>2.单个表单项配置情况如下所示：</p>
            <pre>
              <code>
                &lt;formGroup
                  :formGroupSettings="formGroupSettings"
                  @formGroupSubmit="handleFormButtons" //表单按钮回调
                  @linkSelect="handleSelectChange" //表单带有change属性的回调，用于表单联动
                />
                formGroupSettings: {
                  // 是否全屏显示，true:全屏，按钮位于下方；false:占据容器5/6，按钮位于右侧
                  fullScreen: true,
                  // 表单项配置
                  formGroupList: [{
                    "type": "select",  //表单类型，可供选择类型：input,select,transfer等，详见下面列表
                    "label": "会员类型",  //表单名称
                    "name": "memType",  //表单提交时name名称
                    "data": [ //selece下拉框中数据
                      {
                        "value": "3",  //下拉框下拉项保存的值
                        "label": "会员" //下拉框显示字段名
                      }
                    ],
                    "span": 12,  //每个表单项占据单元格个数，总宽为24
                    "filterable": true,  //是否可筛选下拉数据，true:可筛选
                    "linkName": "", //更改当前表单触发联动，配置该项需在组件上注明回调函数: @linkSelect="handleSelectChange"
                    "width": "200px", //每个表单项label宽度
                    "disabled": true //表单是否禁用，true：禁用（不可编辑），false：激活（可编辑）
                  }],
                  // 表单值初始化
                  formGroupValues: {},
                  // 表单配置按钮信息,按钮配置信息同operateButtonsGroup
                  formButtonList: [
                    {
                      "flag": "save",
                      "size": "",
                      "icon": "",
                      "label": "注册",
                      "styleType": "primary",
                      "postUrl": "addRegisterMember"
                    }
                  ],
                  // 表单各项校验规则
                  rules: {
                    loginPassword: [
                      { 
                        required: true, 
                        message: "请填写密码", 
                        trigger: "blur"
                      }
                    ],
                  }
                },
              </code>
            </pre>
          </li>
          <li><p>3.配置项参数详情表：</p></li>
          <li>
            <tableList :tablelistSettings="tablelistSettings" />
          </li>
          <li><p>4.参数type(表单类型)详情表：</p></li>
          <li>
            <tableList :tablelistSettings="typelistSettings" />
            <p>使用inputTable：需要初始化字段为空数组</p>
            <pre>
              <code>
                formGroupSettings: {
                  fullScreen: true,
                  formGroupTypeUpload: true, //表明表单中有文件上传功能，点击按钮直接返回formdata
                  formGroupTypeUploadName: "uploadName", //做文件上传时，文件流的name值，一定要设置
                  formGroupList: formGroupList,
                  formGroupValues: {
                    scoreListStr:[] //<span class="text-danger">重要！！！</span>
                  },
                  formButtonList: buttonlist
                },
                //配置项中使用inputTable配置项
                {
                  "type": "inputTable",
                  "label": "综合分评定规则",
                  "name": "<span class="text-danger">scoreListStr</span>",
                  "hideItem": false,
                  "span": 24,
                  "width": "150px",
                  "useType": "add", //是否显示添加和删除按钮
                  "headers": [ //必填项，key与下面tableItems里面的字段对应，输入框默认为textarea,使用数字可设置"inputType": "number"
                    {
                      "title": "打分项",
                      "key": "itemName",
                      "disabled": false
                    },
                    {
                      "title": "评分标准",
                      "key": "itemStandard",
                      "disabled": false
                    },
                    {
                      "title": "分值",
                      "key": "itemScore",
                      "disabled": false,
                      "inputType": "number"
                    }
                  ],
                  "tableItems": { //初始化项目字段，必填
                    "itemName": "",
                    "itemStandard": "",
                    "itemScore": ""
                  }
                },

              </code>
            </pre>
            <p>上传功能：</p>
            <pre>
              <code>
                formGroupSettings: {
                  fullScreen: true,
                  formGroupTypeUpload: true, //表明表单中有文件上传功能，点击按钮直接返回formdata
                  formGroupTypeUploadName: "uploadName", //做文件上传时，文件流的name值，一定要设置
                  formGroupList: formGroupList,
                  formGroupValues: {},
                  formButtonList: buttonlist
                },
                //对应的上传接口需要把isMuti字段设为true
                apiInterface.upload = function(muti) {
                  var p = {
                    url: "upload",
                    method: "post",
                    isMuti: muti
                  };
                  return p;
                };
              </code>
            </pre>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import formGroup from "@/components/formGroup";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import formBtnList from "@/utils/formSettingsJson/formGroup/formBtns.json";
import formItemslist from "@/utils/formSettingsJson/formGroup/formItems.json";
import tableData from "@/utils/formSettingsJson/formGroup/tableData.json";
import typeData from "@/utils/formSettingsJson/formGroup/typeData.json";
// 配置校验规则引入
import dialogFormRules from "@/utils/formRulesJson/formGroup/dialogRule";

export default {
  name: "formGroupPage",
  components: {
    formGroup,
    tableList
  },
  data() {
    return {
      /**
       * formGroup 表单组配置
       */
      formGroupSettings: {
        // 是否全屏显示，true:全屏，按钮位于下方；false:占据容器5/6，按钮位于右侧
        fullScreen: true,
        // 表单项配置
        formGroupList: formItemslist,
        // 表单值初始化
        formGroupValues: {
          scoreListStr: []
        },
        // 表单各项校验规则
        formButtonList: formBtnList,
        // 表单各项校验规则
        rules: dialogFormRules.rule
      },
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: tableData,
        tableSettingOptions: {
          tooltipEffect: "dark",
          border: true,
          headerOptions: tableHeaderOpts
        }
      },
      typelistSettings: {
        tableDatas: typeData,
        tableSettingOptions: {
          tooltipEffect: "dark",
          border: true,
          headerOptions: tableHeaderOpts
        }
      }
    };
  },
  methods: {
    /* 表单按钮点击事件 */
    handleFormButtons(flag, data) {
      //do something
      console.log(flag, "flag");
      console.log(data, "data");
    },
    /* handleSelectChange */
    handleSelectChange(linkName, data) {
      console.log(linkName, "linkName");
      console.log(data, "data");
    }
  }
};
</script>
