<template>
  <div class="detailPage">
    <horizenTopBanner :bannerSrc="bannerSrc" />
    <section class="home-mainbord">
      <el-row class="mb20">
        <el-breadcrumb
          class="bread-crumb"
          separator-class="el-icon-arrow-right"
        >
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row class="mb30">
        <el-col :span="5">
          <el-menu
            :default-active="type"
            :active="type"
            class="el-menu-vertical-demo textAlignCenter"
            background-color="#005192"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              class="mo_item"
              index="01"
              @click="setType('01', '交易规则')"
            >
              <span slot="title">交易规则</span>
            </el-menu-item>
            <el-menu-item
              class="mo_item"
              index="02"
              @click="setType('02', '交易指南')"
            >
              <span slot="title">交易指南</span>
            </el-menu-item>
            <el-menu-item
              class="mo_item"
              index="03"
              @click="setType('03', '交易流程')"
            >
              <span slot="title">交易流程</span>
            </el-menu-item>
            <el-menu-item
              class="mo_item"
              index="04"
              @click="setType('04', '入市指南')"
            >
              <span slot="title">入市指南</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="19" class="pl20">
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
import card from "@/components/card";
import pagination from "@/components/pagination";
export default {
  name: "helpPage",
  components: {
    horizenTopBanner,
    card,
    pagination
  },
  data() {
    return {
      /**
       * pagination1 分页器基本数据配置
       */
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      cardInfos: {
        cardlistTitle: "交易规则",
        // cardlistOperation: "更多>>",
        cardType: "01",
        cardlistsArray: []
      },
      bannerSrc:
        "http://www.zjlyjy.com/portalPkg/page/images/bg-index-info.jpg",
      page: 1,
      type: "01"
    };
  },
  methods: {
    handleDetailItemTap(id) {
      this.$router.push({
        path: "/informationsPage/informationDetailPage",
        query: {
          id: id,
          title: "帮助中心",
          type: this.type,
          isHelp: "true",
          page: this.page
        }
      });
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getPagePortalNews();
    },
    setType(type, title) {
      this.type = type;
      this.cardInfos.cardlistTitle = title;
      this.cardInfos.cardType = type;
      this.getPagePortalNews();
    },
    getPagePortalNews() {
      let filter = {
          field: "type",
          value: this.type,
          op: "equal"
        },
        filterArray = [{ field: "status", value: "published", op: "equal" }];
      filterArray.push(filter);
      let that = this,
        postdata = {
          page: that.page,
          rows: 10,
          filterRules: JSON.stringify(filterArray)
        };
      that.$http(that.$api.pagePortalNews(), postdata).then(xhr => {
        if (xhr.rows && xhr.rows.length > 0) {
          xhr.rows.map(item => {
            item.showTime = that.$globalFnc.dateStampFormat(item.extd1);
          });
        }
        that.cardInfos.cardlistsArray = xhr.rows;
        that.paginationSettings.totalNumbers = xhr.total;
      });
    }
  },
  beforeMount() {
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    if (this.$route.query.page) {
      this.page = this.$route.query.page;
    }
  },
  mounted() {
    this.getPagePortalNews();
  }
};
</script>
