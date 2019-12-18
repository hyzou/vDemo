<template>
  <div class="table-container">
    <el-row>
      <el-col :span="10">
        <img src="@/assets/dictionary.png" alt="" width="100%" />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>
              1.项目采用vue2.6+vue-cli3.9+vuex+vue-router生成，目录结构如左图，src为主要源码，存放页面组件等信息，其他文件无特殊需求无须经常改动，暂不作介绍。
            </p>
          </li>
          <li>
            <p>
              2.项目启动：初次启动需安装依赖yarn
              install(已安装node,vue,yarn的情况下)，依赖安装完成，执行yarn
              serve,启动本地服务，本地调试完成，启动yarn build进行项目打包部署。
            </p>
          </li>
          <li>
            <p>
              3.项目基于<span class="text-danger">elementUI</span
              >,如果有不明确的地方， 可以参考<span class="text-danger"
                >elementUI</span
              >进行比对， 功能扩展和新组件封装都依赖<span class="text-danger"
                >elementUI</span
              >,
              <span class="text-danger">暂不考虑其他前端ui框架。</span>
            </p>
          </li>
          <li>
            <p>
              4.<span class="text-danger">为了统一方法，方便后续维护管理</span>
              ，所有前端开发人员都一致使用本文档的基本配置
              <span class="text-danger"
                >（vue,vue-cli,vuex,vue-router,element-ui）</span
              >
              ，未经讨论不要使用其他版本及框架，
              具体配置参考package.json，方便后续人员跨项目维护。
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <ul class="contentText">
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
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/pageSet/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/pageSet/tableData.json";

export default {
  name: "pageSet",
  components: {
    tableList
  },
  data() {
    return {
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
