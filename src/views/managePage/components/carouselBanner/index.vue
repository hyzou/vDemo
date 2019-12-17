<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <carouselBanner :carouselSrcs="carouselOpt" />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：</p>
            <pre>
                <code>
                  &lt;carouselBanner :carouselSrcs="carouselOpt" />
                  carouselOpt: {
                    carouselSrcs: [
                      {
                        href: "",
                        alt: "示例图片1",
                        picSrc: imgUrl,
                        fit: "contain" // fill/contain/cover/none/scale-down参考下方描述
                      },
                      {
                        href: "http://www.baidu.com",
                        alt: "示例图片2",
                        picSrc: imgUrl2
                      }
                    ],
                    height: "250px",
                    indicatorPosition: "outside"
                  },
                </code>
              </pre>
          </li>
          <li>
            <img src="@/assets/fitParams.png" />
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
import carouselBanner from "@/components/carouselBanner";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/carouselBannerMng/tableData.json";
// 引入本地图片
import imgUrl from "@/assets/logo.png";
import imgUrl2 from "@/assets/register_bg_bak2.png";

export default {
  name: "carouselBannerMng",
  components: {
    carouselBanner,
    tableList
  },
  data() {
    return {
      /**
       * carouselOpt 轮播图配置
       */
      carouselOpt: {
        carouselSrcs: [
          {
            href: "",
            alt: "示例图片1",
            picSrc: imgUrl,
            fit: "contain"
          },
          {
            href: "http://www.baidu.com",
            alt: "示例图片2",
            picSrc: imgUrl2
          }
        ],
        height: "250px",
        indicatorPosition: "outside"
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
