<template>
  <div class="table-container">
    <el-row>
      <el-col :span="10">
        <img src="@/assets/nameRules.png" alt="" width="100%" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>
              1.data中定义的变量，命名时应注意:
            </p>
            <dl class="contentText-tips pl30">
              <dt>
                ① 如果是<span class="text-danger">组件配置变量</span
                >，命名方式为：组件名+"Settings"，配置类变量放前面；
              </dt>
              <dt>
                ②
                <span class="text-danger">普通变量</span>
                名称用英文名称并做好注释，放于配置类变量的后面。
              </dt>
            </dl>
          </li>
          <li>
            <p>
              2.methods中定义的函数，命名时应注意:
            </p>
            <dl class="contentText-tips pl30">
              <dt>
                ① 如果是<span class="text-danger"
                  >鼠标或者键盘动作触发类函数</span
                >，命名方式为："handle"+要触发的功能（英文名称），并做好注释，如"handleTableBtn"；
              </dt>
              <dt>
                ② 如果是<span class="text-danger">接口请求类函数</span
                >，统一命名方式为："http"+需获取的列表（英文名称），如"httpGetTableData"；
              </dt>
              <dt>
                ③ <span class="text-danger">接口数据处理函数</span>
                命名方式为："deal"+列表名称（英文），如"dealTableData"。
              </dt>
              <dt>
                <span class="text-danger">*注意：</span>
                摆放位置为动作类在前，接口请求类在后，接口数据处理类放最后。
              </dt>
            </dl>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "nameRules",
  data() {
    return {
      tableDefaultData: {
        data: [
          {
            itemName: "qwe",
            itemStandard: "ww",
            itemScore: "2"
          }
        ],
        type: "inputTable",
        label: "综合分评定规则",
        name: "scoreListStr",
        hideItem: false,
        span: 24,
        width: "150px",
        useType: "add",
        headers: [
          {
            title: "打分项",
            key: "itemName",
            disabled: false
          },
          {
            title: "评分标准",
            key: "itemStandard",
            disabled: false
          },
          {
            title: "分值",
            key: "itemScore",
            disabled: false,
            inputType: "number"
          }
        ],
        tableItems: {
          itemName: "",
          itemStandard: "",
          itemScore: ""
        }
      }
    };
  }
};
</script>
