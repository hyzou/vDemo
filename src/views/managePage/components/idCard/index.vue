<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <idCard :data="idcardSettings" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：</p>
            <pre>
              <code>
                &lt;idCard :data="idcardSettings" />
                idcardSettings:{
                  title: "个人信息",
                  icon: "el-icon-user-solid",
                  data: [
                    {
                      key: {
                        span: 3,
                        text: "姓名"
                      },
                      value: {
                        span: 6,
                        text: "zhy"
                      },
                    },
                    {
                      key:  {
                        span: 6,
                        text: "联系电话："
                      },
                      value: {
                        span: 6,
                        text: "123456879"
                      }
                    },
                    {
                      key:  {
                        span: 6,
                        text: "手机："
                      },
                      value: {
                        span: 6,
                        text: "123465798"
                      }
                    },
                    {
                      key:  {
                        span: 6,
                        text: "电子邮箱："
                      },
                      value: {
                        span: 6,
                        text: "123@163.com"
                      }
                    }
                  ]
                },
              </code>
            </pre>
          </li>
          <li>
            <tableList :tablelistSettings="tablelistSettings" />
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import idCard from "@/components/idCard";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/idCardMng/tableData.json";

export default {
  name: "idCardMng",
  components: {
    idCard,
    tableList
  },
  data() {
    return {
      /**
       * idcard 基本数据配置
       */
      idcardSettings: {
        title: "个人信息",
        icon: "el-icon-user-solid",
        data: [
          {
            key: {
              span: 3,
              text: "姓名"
            },
            value: {
              span: 6,
              text: "zhy"
            }
          },
          {
            key: {
              span: 6,
              text: "联系电话："
            },
            value: {
              span: 6,
              text: "123456879"
            }
          },
          {
            key: {
              span: 6,
              text: "手机："
            },
            value: {
              span: 6,
              text: "123465798"
            }
          },
          {
            key: {
              span: 6,
              text: "电子邮箱："
            },
            value: {
              span: 6,
              text: "123@163.com"
            }
          }
        ]
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
      }
    };
  }
};
</script>
