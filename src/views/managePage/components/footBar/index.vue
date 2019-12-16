<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <footBar :footBarSettings="footBarSettings" />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：
              <pre>
                <code>
                  &lt;footBar :footBarSettings="footBarSettings" />
                  footBarSettings: [
                    {
                      footerItem:{
                        itemSeprator: "|",
                        itemList: [
                          {
                            itemName: "mainTopLogo",
                            link: "#/managePage/components/mainTopLogo"
                          },
                          {
                            itemName: "friendlink",
                            link: "#/managePage/components/friendlink"
                          },
                          {
                            itemName: "paragraph",
                            link: "#/managePage/components/paragraph"
                          }
                        ]
                      }
                    },
                    {
                      footerItem:{
                        itemList: [
                          {
                            itemName: "版权所有: 杭州安鸿科技股份有限公司前端开发项目组"
                          },
                          {
                            itemName: "技术支持：杭州安鸿科技股份有限公司"
                          }
                        ]
                      }
                    }
                  ],
                </code>
              </pre>
            </p>
          </li>
          <li>
            <tableList
              :tablelistSettings="tablelistSettings"
            />
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import footBar from "@/components/footBar";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/footBarMng/tableData.json";

export default {
  name: "footBarMng",
  components: {
    footBar,
    tableList
  },
  data() {
    return {
      /**
       * footBar 基本数据配置
       */
      footBarSettings: [
        {
            itemSeprator: "|",
            itemList: [
              {
                itemName: "mainTopLogo",
                link: "#/managePage/components/mainTopLogo"
              },
              {
                itemName: "friendlink",
                link: "#/managePage/components/friendlink"
              },
              {
                itemName: "paragraph",
                link: "#/managePage/components/paragraph"
              }
            ]
        },
        {
            itemList: [
              {
                itemName: "版权所有: 杭州安鸿科技股份有限公司前端开发项目组"
              },
              {
                itemName: "技术支持：杭州安鸿科技股份有限公司"
              }
            ]
        }
      ],
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
    };
  }
};
</script>
