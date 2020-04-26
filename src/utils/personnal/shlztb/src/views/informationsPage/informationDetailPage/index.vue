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
      <section v-if="files && files.length > 0" class="friendLink pb20 pt10">
        <div class="home-mainbord">
          <h2>已传附件：</h2>
          <ul class="clearfix">
            <li
              class="floatLeft mt10 mb10 mr20"
              v-for="(item, index) in files"
              :key="index"
            >
              <a
                target="_blank"
                :href="$global.newsFileDownloadUrl + item.fileId"
                class="item"
                >{{ item.fileName }}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import horizenTopBanner from "@/components/horizenTopBanner";
import paragraph from "@/components/paragraph";

export default {
  name: "detailPage",
  components: {
    horizenTopBanner,
    // formGroup,
    paragraph
  },
  data() {
    return {
      bannerSrc:
        "http://www.zjlyjy.com/portalPkg/page/images/bg-index-info.jpg",
      paragraph: {
        title: "",
        text: ""
      },
      files: []
    };
  },
  methods: {
    getPagePortalNews() {
      let filter = {
          field: "sysId",
          value: this.$route.query.id,
          op: "equal"
        },
        filterArray = [];
      filterArray.push(filter);
      let that = this,
        postdata = {
          filterRules: JSON.stringify(filterArray)
        };
      that.$http(that.$api.pagePortalDetailNews(), postdata).then(xhr => {
        that.paragraph.title = xhr.data.title || "";
        that.paragraph.text = xhr.data.content || "";
        that.files = xhr.data.files || [];
      });
    }
  },
  mounted() {
    this.getPagePortalNews();
  }
};
</script>
