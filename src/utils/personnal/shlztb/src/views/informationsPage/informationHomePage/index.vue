<template>
  <div class="home">
    <carouselTopBanner :carouselSrcs="carouselOpt" />
    <section class="home-mainbord">
      <el-row :gutter="40" class="mb30">
        <el-col :span="16" class="mo_fullWidth">
          <card
            :cardlistsData="cards.mainNotice"
            @detailOperateTap="handleDetailOperate"
            @detailItemTap="handleDetailItemTap"
          />
        </el-col>
        <el-col id="firstAnchor" :span="8" class="mo_login">
          <loginZone @signUpEvent="handleSignUp" />
        </el-col>
      </el-row>
      <el-row class="mb30">
        <el-col :span="24">
          <carouselTopBanner :carouselSrcs="adOpt" />
        </el-col>
      </el-row>
      <el-row :gutter="40" class="mb30">
        <el-col :span="12" class="mo_fullWidth">
          <card
            :cardlistsData="cards.dealAnnouncement"
            @detailOperateTap="handleDetailOperate"
            @detailItemTap="handleDetailItemTap"
          />
        </el-col>
        <el-col :span="12" class="mo_fullWidth">
          <card
            :cardlistsData="cards.dealResult"
            @detailOperateTap="handleDetailOperate"
            @detailItemTap="handleDetailItemTap"
          />
        </el-col>
      </el-row>
      <el-row :gutter="40" class="mb30">
        <el-col :span="12" class="mo_fullWidth">
          <card
            :cardlistsData="cards.introductionOfClient"
            @detailOperateTap="handleDetailOperate"
            @detailItemTap="handleDetailItemTap"
          />
        </el-col>
        <el-col :span="12" class="mo_fullWidth">
          <card
            :cardlistsData="cards.dataDownload"
            @detailOperateTap="handleDetailOperate"
            @detailItemTap="handleDetailItemTap"
          />
        </el-col>
      </el-row>
    </section>
    <section class="friendLink pb20 pt10">
      <div class="home-mainbord">
        <h2>友情链接</h2>
        <ul class="clearfix">
          <li
            class="floatLeft mt10 mb10 mr20"
            v-for="(item, index) in friendlinkArr"
            :key="index"
          >
            <a target="_blank" :href="item.href" class="item">
              <img
                class="displayBlock"
                :src="item.imgSrc"
                alt=""
                :title="item.imgTitle"
                width="155"
                height="40"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// 组件引入
import carouselTopBanner from "@/components/carouselTopBanner";
import card from "@/components/card";
import loginZone from "@/components/loginZone";

// 配置数据引入
import dialogFormRules from "@/utils/formRulesJson/membershipRegistration/dialogRule";
export default {
  name: "home",
  components: {
    carouselTopBanner,
    card,
    loginZone
  },
  data() {
    return {
      friendlinkArr: [],
      carouselOpt: {
        carouselSrcs: [],
        height: "250px",
        indicatorPosition: "outside"
      },
      adOpt: {
        carouselSrcs: [],
        height: "80px",
        indicatorPosition: "none"
      },
      carouselSrcs: [],
      adSrcs: [],
      cards: {
        mainNotice: {
          cardlistTitle: "重要通知",
          cardlistOperation: "更多>>",
          cardType: "01",
          cardlistsArray: []
        },
        dealAnnouncement: {
          cardlistTitle: "交易公告",
          cardlistOperation: "更多>>",
          cardType: "02",
          cardlistsArray: []
        },
        dealResult: {
          cardlistTitle: "交易结果",
          cardlistOperation: "更多>>",
          cardType: "03",
          cardlistsArray: []
        },
        introductionOfClient: {
          cardlistTitle: "优质供应商介绍",
          cardlistOperation: "更多>>",
          cardType: "04",
          cardlistsArray: []
        },
        dataDownload: {
          cardlistTitle: "资料下载",
          cardlistOperation: "更多>>",
          cardType: "100",
          cardlistsArray: []
        }
      },
      menuRoutes: [],
      /**
       * dialog 内置form表单对话框基本数据配置
       */
      dialogFormSettings: {
        dialogFormTitle: "",
        dialogFormVisible: false,
        dialogFormItems: {
          formItemSpan: 12,
          formGroupList: [],
          formGroupValues: {},
          formButtonList: [],
          rules: dialogFormRules.rule
        }
      }
    };
  },
  methods: {
    /* 点击card组件头部操作按钮 */
    handleDetailOperate(type, title) {
      this.$router.push({
        path: "/informationsPage/informationDetailListPage",
        query: {
          type: type,
          title: title
        }
      });
    },
    /* 点击card组件具体条目 */
    handleDetailItemTap(id, flag, fileId, title, type) {
      if (flag) {
        this.getFilesDownload(id);
        return false;
      }
      this.$router.push({
        path: "/informationsPage/informationDetailPage",
        query: {
          id: id,
          type: type,
          title: title
        }
      });
    },
    /* 获取交易信息列表 */
    getPagePortalNews(type, name) {
      let filter = {
          field: "type",
          value: type,
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
          page: 1,
          rows: 7,
          // type: type
          // filterRules: encodeURIComponent(JSON.stringify(filterArray))
          filterRules: JSON.stringify(filterArray)
        };
      that.$http(that.$api.pagePortalNews(), postdata).then(xhr => {
        xhr.rows.map(item => {
          item.showTime = that.$globalFnc.dateStampFormat(item.extd1, "ymd");
        });
        that.cards[name].cardType = type;
        that.cards[name].cardlistsArray = xhr.rows;
      });
    },
    /* 获取轮播图列表 */
    getCarouselPictures(type) {
      let that = this,
        postdata = {
          page: 1,
          rows: 1000,
          filterRules: JSON.stringify([
            {
              field: "type",
              value: type,
              op: "equal"
            }
          ])
        };
      that.$http(that.$api.carouselPictures(), postdata).then(xhr => {
        let picArr = [];
        if (xhr.rows && xhr.rows.length > 0) {
          xhr.rows.map(row => {
            if (row.files && row.files.length > 0) {
              row.files = that.$globalFnc.fileFormat(
                row.files,
                "imgPhotoViewUrl",
                "viewPic"
              );
              row.files.map(file => {
                let picObj = {};
                picObj.href = row.href;
                picObj.alt = file.fileName;
                picObj.picSrc = file.imgSrc;
                picArr.push(picObj);
              });
            }
          });
        }
        if (type == "01") {
          that.carouselOpt.carouselSrcs = picArr;
        }
        if (type == "02") {
          that.adOpt.carouselSrcs = picArr;
        }
        //console.log(xhr);
      });
    },
    /* 获取广告列表 */
    advertisementList() {
      let that = this,
        postdata = {
          page: 1,
          rows: 10
        };
      that.$http(that.$api.advertisementList(), postdata).then(() => {
        //console.log(xhr);
      });
    },
    /* 获取友情链接列表 */
    friendLinkList() {
      let that = this,
        postdata = {
          page: 1,
          rows: 10
        };
      that.$http(that.$api.friendLinkList(), postdata).then(xhr => {
        if (xhr.rows && xhr.rows.length > 0) {
          xhr.rows.map(row => {
            row.imgTitle = row.name;
            if (row.file) {
              let fileArr = [];
              fileArr.push(row.file);
              row.files = that.$globalFnc.fileFormat(
                fileArr,
                "imgPhotoViewUrl",
                "viewPic"
              );
              row.imgSrc = row.files[0].imgSrc;
            }
          });
          that.friendlinkArr = xhr.rows;
        }
      });
    },
    /* 获取交易资料列表 */
    getPortalFiles() {
      let that = this,
        postdata = {
          page: 1,
          rows: 7
        };
      that.$http(that.$api.portalFiles(), postdata).then(xhr => {
        xhr.rows.map(item => {
          item.title = item.file.fileName;
          item.downloadFlag = "true";
          item.showTime = "[下载]";
        });
        that.cards.dataDownload.cardlistsArray = xhr.rows;
      });
    },
    /* 下载文件 */
    getFilesDownload(id) {
      window.open(this.$global.downloadUrl + "?sysId=" + id);
    },
    /* 会员注册 */
    handleSignUp() {
      // this.dialogFormSettings.dialogFormVisible = true;
      // this.dialogFormSettings.dialogType = "form";
      // this.dialogFormSettings.dialogFormTitle = "会员注册";
      // this.dialogFormSettings.dialogFormItems.formGroupList = dialogAddFormItemslist;
      // this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /*注册提交*/
    handleDialogForm(btn, data) {
      let that = this,
        postdata = {};
      postdata = data;
      that.$http(that.$api[btn.postUrl](), postdata, true).then(xhr => {
        if (xhr.success) {
          this.dialogFormSettings.dialogFormVisible = false;
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        }
      });
    }
  },
  mounted() {
    this.getPagePortalNews("06", "mainNotice", "重要通知");
    this.getPagePortalNews("07", "dealAnnouncement", "交易公告");
    this.getPagePortalNews("08", "dealResult", "交易结果");
    this.getPagePortalNews("09", "introductionOfClient", "优质供应商介绍");
    this.getCarouselPictures("01");
    this.getCarouselPictures("02");
    // this.advertisementList();
    this.friendLinkList();
    this.getPortalFiles();
  }
};
</script>
