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
        text: ""
      }
    };
  },
  methods: {
    getPagePortalNews() {
      let filter = {
          field: "type",
          value: "05",
          op: "equal"
        },
        filterArray = [];
      filterArray.push(filter);
      let that = this,
        postdata = {
          page: 1,
          rows: 7,
          filterRules: JSON.stringify(filterArray)
        };
      that.$http(that.$api.pagePortalNews(), postdata).then(xhr => {
        if (xhr.rows && xhr.rows.length > 0) {
          that.paragraph.text = xhr.rows[0].content;
        }
      });
    }
  },
  mounted() {
    this.getPagePortalNews();
  }
};
</script>
