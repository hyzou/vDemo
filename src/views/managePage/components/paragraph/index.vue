<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <paragraph :paragraph="paragraphSettings" />
        <paragraph :paragraph="paragraphSettingsNew" />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：</p>
            <pre>
                <code>
                  &lt;paragraph :paragraph="paragraphSettings" />
                  paragraphSettings: {
                    title: "标题",
                    several: <span class="text-danger">true</span>,
                    text: "&lt;span class='text-danger'>前端&lt;/span>采用前后端分离的方式进行开发，我们使用vue2.0框架",
                    textArray: [
                      "&lt;span class='text-danger'>前端&lt;/span>采用前后端分离的方式进行开发，我们使用vue2.0框架",
                      "前端采用前后端分离的方式进行开发，我们使用vue2",
                      "前端采用前后端分离的方式进行开发，我们使用vue2"
                    ]
                  },

                  
                  &lt;paragraph :paragraph="paragraphSettingsNew" />
                  paragraphSettingsNew: {
                    title: "标题",
                    several: <span class="text-danger">false</span>,
                    text: "&lt;span class='text-danger'>前端&lt;/span>采用前后端分离的方式&lt;/br>进行开发，我们使用vue2.0框架",
                    textArray: [
                      "&lt;span class='text-danger'>前端&lt;/span>采用前后端分离的方式进行开发，我们使用vue2.0框架",
                      "前端采用前后端分离的方式进行开发，我们使用vue2",
                      "前端采用前后端分离的方式进行开发，我们使用vue2"
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
import paragraph from "@/components/paragraph";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/paragraphMng/tableData.json";

export default {
  name: "paragraphMng",
  components: {
    paragraph,
    tableList
  },
  data() {
    return {
      /**
       * paragraph 基本数据配置
       */
      paragraphSettings: {
        title: "标题",
        text:
          "<span class='text-danger'>前端</span>采用前后端分离的方式进行开发，我们使用vue2.0框架",
        several: true,
        textArray: [
          "<span class='text-danger'>前端</span>采用前后端分离的方式进行开发，我们使用vue2.0框架",
          "前端采用前后端分离的方式进行开发，我们使用vue2",
          "前端采用前后端分离的方式进行开发，我们使用vue2"
        ]
      },
      paragraphSettingsNew: {
        title: "标题",
        text:
          "<span class='text-danger'>前端</span>采用前后端分离的方式</br>进行开发，我们使用vue2.0框架",
        several: false,
        textArray: [
          "<span class='text-danger'>前端</span>采用前后端分离的方式进行开发，我们使用vue2.0框架",
          "前端采用前后端分离的方式进行开发，我们使用vue2",
          "前端采用前后端分离的方式进行开发，我们使用vue2"
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
