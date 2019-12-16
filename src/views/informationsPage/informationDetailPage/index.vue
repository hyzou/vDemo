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
          <el-breadcrumb-item
            v-if="$route.query.title && $route.query.isHelp != 'true'"
            :to="{
              path:
                '/informationsPage/informationDetailListPage?type=' +
                $route.query.type +
                '&title=' +
                $route.query.title
            }"
            >{{ $route.query.title }}</el-breadcrumb-item
          >
          <el-breadcrumb-item
            v-if="$route.query.title && $route.query.isHelp == 'true'"
            :to="{
              path:
                '/informationsPage/helpPage?type=' +
                $route.query.type +
                '&page=' +
                $route.query.page
            }"
            >{{ $route.query.title }}</el-breadcrumb-item
          >
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row class="card-content">
        <el-col :span="24">
          <paragraph :paragraph="paragraph" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import horizenTopBanner from "@/components/horizenTopBanner";
import paragraph from "@/components/paragraph";

export default {
  name: "detailPage",
  components: {
    horizenTopBanner,
    paragraph
  },
  data() {
    return {
      bannerSrc:
        "http://www.zjlyjy.com/portalPkg/page/images/bg-index-info.jpg",
      paragraph: {
        title: "标题",
        text: "内容123132123123123123123123"
      }
    };
  }
};
</script>
