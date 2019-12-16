<template>
  <div class="detailPage">
    <horizenTopBanner :bannerSrc="bannerSrc" />
    <section class="home-mainbord">
      <el-row>
        <el-breadcrumb
          class="bread-crumb"
          separator-class="el-icon-arrow-right"
        >
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>联系我们</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row>
        <el-col :span="24">
          <paragraph :paragraph="paragraph" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import horizenTopBanner from "@/components/horizenTopBanner";
import paragraph from "@/components/paragraph";

export default {
  name: "contractUs",
  components: {
    horizenTopBanner,
    paragraph
  },
  data() {
    return {
      bannerSrc:
        "http://www.zjlyjy.com/portalPkg/page/images/bg-index-info.jpg",
      paragraph: {
        paragraph: false,
        text: "<p style=\"color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; font-size: medium; white-space: normal; line-height: 24px; text-indent: 43px;\"><span style=\"font-size: 16px; font-family: 宋体;\">杭州粮油物流中心批发交易市场有限公司位于杭州市余杭区良渚镇勾庄,东临京杭大运河,北临绕城公路,西临衢州路,南临宣杭铁路新线,水、铁、公交通便捷。市场占地面积约128亩，主体预示着天时、地利、人和大气的圆形建筑，建有330间粮油现货交易营业用房及5000平米的仓储设施，独立的油罐储存区，电子商务交易大厅等；同时还附建有铁路、码头、公路设施的配套，可实现粮油现货年交易量150万吨，是浙江省最大的粮食市场，也是国内领先的集粮食批发交易、仓储加工、物流配送、电子商务于一体的大型粮食物流中心。</span></p><p style=\"color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; font-size: medium; white-space: normal; line-height: 24px; text-indent: 43px;\"><span style=\"font-size: 16px; font-family: 宋体;\">市场以原国家重点粮食市场--杭州江南粮油批发市场的搬迁为主体，已有来自黑龙江、辽宁、吉林、江苏、安徽、河南、山东、江西、河北、内蒙等150余家粮食主产区商户入场经营，通过粮食现货交易和网络交易相结合的形式，向浙江省各地市及杭州市周边县市、广西、福建等地销售，打造了集粮食批发交易、仓储服务、物流配送、电子商务于一体的大型粮食集散中心。</span></p><p style=\"color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; font-size: medium; white-space: normal;\"><br/></p><p><br/></p>",
      }
    };
  },
  methods: {
    getPagePortalNews() {
      let that = this,
        postdata = {
          page: 1,
          rows: 7
        };
      that.$http(that.$api.pagePortalNews(), postdata).then(xhr => {
        if (xhr.rows && xhr.rows.length > 0) {
          that.paragraph.text = xhr.rows[0].content;
        }
      });
    }
  },
  mounted() {
    // this.getPagePortalNews();
  }
};
</script>
