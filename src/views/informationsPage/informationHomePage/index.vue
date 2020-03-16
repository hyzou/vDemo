<template>
  <div class="home">
    <carouselBanner :carouselSrcs="carouselOpt" />
    <section class="home-mainbord">
      <el-row :gutter="40" class="mb30">
        <el-col :span="16">
          <card
            :cardlistsData="cards"
            @detailOperateTap="handleDetailOperate"
            @detailItemTap="handleDetailItemTap"
          />
        </el-col>
        <el-col id="firstAnchor" :span="8">
          <loginZone />
        </el-col>
      </el-row>
      <el-row :gutter="40" class="mb30">
        <el-col :offset="16" :span="8">
          帐号密码：admin 000000 管理员端 <br />
          帐号密码：member 000000 会员端<br />
          帐号密码：client 000000 客户端
        </el-col>
      </el-row>
    </section>
    <section class="friendLink pb20 pt10">
      <el-row>
        <friendlink :friendlinkArr="friendlinkSettings" />
      </el-row>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// 组件引入
import carouselBanner from "@/components/carouselBanner";
import card from "@/components/card";
import loginZone from "@/components/loginZone";
import friendlink from "@/components/friendlink";
// 引入本地图片
import imgUrl from "@/assets/logo.png";
import imgUrl2 from "@/assets/register_bg_bak2.png";

// 配置数据引入
export default {
  name: "home",
  components: {
    carouselBanner,
    card,
    loginZone,
    friendlink
  },
  data() {
    return {
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
      cards: {
        cardlistTitle: "卡片标题",
        cardlistOperation: "更多>>",
        cardType: "04",
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
    handleDetailItemTap(item, title, type) {
      this.$router.push({
        path: "/informationsPage/informationDetailPage",
        query: {
          id: item.sysId,
          type: type,
          title: title
        }
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
        console.log(xhr);
        //do somethings ...
      });
    }
  },
  mounted() {
    // this.friendLinkList();
  }
};
</script>
