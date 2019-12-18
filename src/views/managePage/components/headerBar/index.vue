<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <headerBar :headInfos="headerBarSettings" />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            1.组件配置项如下：
            <pre>
                <code>
                  &lt;headerBar :headInfos="headerBarSettings" />
                  headerBarSettings: {
                    title: "管理员",
                    operate: {
                      showLogout: true
                    },
                    style: {
                      color: "#fff",
                      background: "#005192",
                      height: "60px",
                      "line-height": "60px",
                      "font-weight": "500",
                      "font-size": "20px"
                    },
                    logoStyle: {
                      showImg: false,
                      style:{
                        width:"150px",
                        height: "100%"
                      },
                      fit: "fit", //fill/contain/cover/none/scale-down 详情参考carouselBanner
                      imgSrc: imgUrl,
                      imgTitle: ""
                    }
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
import headerBar from "@/components/headerBar";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/headerBarMng/tableData.json";
// 引入本地图片
import imgUrl from "@/assets/logo.png";

export default {
  name: "headerBarMng",
  components: {
    headerBar,
    tableList
  },
  data() {
    return {
      /**
       * headerBar 基本数据配置
       */
      headerBarSettings: {
        title: "管理员",
        operate: {
          showLogout: true
        },
        style: {
          color: "#fff",
          background: "#005192",
          height: "60px",
          "line-height": "60px",
          "font-weight": "500",
          "font-size": "20px"
        },
        logoStyle: {
          showImg: false,
          style: {
            width: "150px",
            height: "100%"
          },
          fit: "fit", //fill/contain/cover/none/scale-down 详情参考carouselBanner
          imgSrc: imgUrl,
          imgTitle: ""
        }
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
