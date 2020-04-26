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
        // cardlistOperation: "更多>>",
        cardType: "03",
        cardlistsArray: []
      }
    };
  },
  methods: {
    handleDetailItemTap(id, flag) {
      if (flag) {
        this.getFilesDownload(id);
        return false;
      }
      this.$router.push({
        path: "/informationsPage/informationDetailPage",
        query: {
          id: id,
          title: this.$route.query.title,
          type: this.$route.query.type
        }
      });
    },
    getFilesDownload(id) {
      window.open(this.$global.downloadUrl + "?sysId=" + id);
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      if (this.$route.query.type == "100") {
        this.getPortalFiles(num);
      } else {
        this.getPagePortalNews(num);
      }
    },
    getPagePortalNews(page) {
      let filter = {
          field: "type",
          value: this.$route.query.type,
          op: "equal"
        },
        filterArray = [
          {
            field: "status",
            value: "published",
            op: "equal"
          }
        ];
      filterArray.push(filter);
      let that = this,
        postdata = {
          page: page,
          rows: 10,
          // type: this.$route.query.type
          filterRules: JSON.stringify(filterArray)
        };
      that.$http(that.$api.pagePortalNews(), postdata).then(xhr => {
        xhr.rows.map(item => {
          item.showTime = that.$globalFnc.dateStampFormat(item.extd1, "ymd");
        });
        that.cardInfos.cardlistsArray = xhr.rows;
        that.paginationSettings.totalNumbers = xhr.total;
      });
    },
    getPortalFiles(page) {
      let that = this,
        postdata = {
          page: page,
          rows: 10
        };
      that.$http(that.$api.portalFiles(), postdata).then(xhr => {
        xhr.rows.map(item => {
          item.title = item.file.fileName;
          item.downloadFlag = "true";
          item.showTime = "[下载]";
        });
        that.cardInfos.cardlistsArray = xhr.rows;
        that.paginationSettings.totalNumbers = xhr.total;
      });
    }
  },
  mounted() {
    if (this.$route.query.type == "100") {
      this.getPortalFiles(1);
    } else {
      this.getPagePortalNews(1);
    }
  }
};
</script>
