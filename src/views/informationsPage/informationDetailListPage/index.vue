<template>
  <div class="detailPage">
    <horizenTopBanner :bannerSrc="bannerSrc" />
    <section class="home-mainbord">
      <el-row class="card-content mb20">
        <el-breadcrumb
          class="bread-crumb"
          separator-class="el-icon-arrow-right"
        >
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row class="card-content">
        <el-col :span="24">
          <card
            :cardlistsData="cardInfos"
            @detailItemTap="handleDetailItemTap"
          />
          <pagination
            :paginationSettings="paginationSettings"
            @handlePaginationPagenumber="handlePaginationPagenumber"
          />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import horizenTopBanner from "@/components/horizenTopBanner";
// import breadCrumb from "@/components/breadCrumb";
import card from "@/components/card";
import pagination from "@/components/pagination";

export default {
  name: "detailPage",
  components: {
    horizenTopBanner,
    card,
    pagination
  },
  data() {
    return {
      /**
       * pagination 分页器基本数据配置
       */
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 410
      },
      bannerSrc:
        "http://www.zjlyjy.com/portalPkg/page/images/bg-index-info.jpg",
      cardInfos: {
        cardlistTitle: this.$route.query.title,
        cardType: "03",
        cardlistsArray: [
          {
            title: "第一条",
            time: "2019-12-12",
            otherParam: "其他数据1"
          },
          {
            title: "第二条",
            time: "2019-12-13",
            otherParam: "其他数据2"
          }
        ],
        cardItemParams: {
          main: "title",
          subMain: "otherParam"
        }
      }
    };
  },
  methods: {
    handleDetailItemTap(item) {
      this.$router.push({
        path: "/informationsPage/informationDetailPage",
        query: {
          id: item.sysId,
          title: this.$route.query.title,
          type: this.$route.query.type
        }
      });
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      console.log(num);
    }
  }
};
</script>
