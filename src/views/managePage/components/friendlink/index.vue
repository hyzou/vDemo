<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <friendlink :friendlinkArr="friendlinkSettings" />
      </el-col>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：</p>
            <pre>
                <code>
                  &lt;friendlink :friendlinkArr="friendlinkSettings" />
                  friendlinkSettings: [
                    {
                      imgSrc:imgUrl,
                      imgTitle:"百度链接示例1",
                      imgStyle:{
                        width:"100px",
                        height: "30px"
                      },
                      imgFit: "fit", //fill/contain/cover/none/scale-down 详情参考carouselBanner
                      href:"http://www.baidu.com"
                    },
                    {
                      imgSrc:imgUrl2,
                      imgTitle:"百度链接示例2",
                      imgStyle:{
                        width:"100px",
                        height: "30px"
                      },
                      href:"http://www.baidu.com"
                    }
                  ],
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
import friendlink from "@/components/friendlink";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/friendlinkMng/tableData.json";
// 引入本地图片
import imgUrl from "@/assets/logo.png";
import imgUrl2 from "@/assets/register_bg_bak2.png";

export default {
  name: "friendlinkMng",
  components: {
    friendlink,
    tableList
  },
  data() {
    return {
      /**
       * friendlink 基本数据配置
       */
      friendlinkSettings: [
        {
          imgSrc: imgUrl,
          imgTitle: "百度链接示例1",
          imgStyle: {
            width: "100px",
            height: "30px"
          },
          imgFit: "fit", //fill/contain/cover/none/scale-down 详情参考carouselBanner
          href: "http://www.baidu.com"
        },
        {
          imgSrc: imgUrl2,
          imgTitle: "百度链接示例2",
          imgStyle: {
            width: "100px",
            height: "30px"
          },
          href: "http://www.baidu.com"
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
      }
    };
  }
};
</script>
