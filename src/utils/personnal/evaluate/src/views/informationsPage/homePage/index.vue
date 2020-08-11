<template>
  <div class="home pt30 overflowXhYa indexHomePage">
    <section class="home-mainbord">
      <el-row :gutter="40" class="mb30">
        <template v-for="info in infolist">
          <el-col class="mb30" :span="12" :key="info.cardType">
            <card
              :cardlistsData="info"
              @detailOperateTap="handleDetailOperate"
              @detailItemTap="handleDetailItemTap"
            />
          </el-col>
        </template>
      </el-row>
    </section>
    <el-dialog
      v-if="dialogShowInfoDialogSettings.dialogShowInfoVisible"
      width="70%"
      :title="dialogShowInfoDialogSettings.title"
      :visible.sync="dialogShowInfoDialogSettings.dialogShowInfoVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <showInfo
        style="min-height:500px"
        :mainData="dialogShowInfoDialogSettings.showInfoData"
      />
    </el-dialog>
  </div>
</template>

<script>
// 组件引入
import card from "@/components/card";
import showInfo from "../infosManage/allInfos/workReports/showInfoPage";

// 配置数据引入
export default {
  name: "home",
  components: {
    card,
    showInfo
  },
  data() {
    return {
      dialogShowInfoDialogSettings: {
        title: "",
        dialogShowInfoVisible: false,
        showInfoData: {}
      },
      titlesManage: {
        workReports: "工作简报",
        notification: "通知公告",
        dataDownload: "资料下载",
        dynamic: "各地动态",
        inspectionFile: "考核文件",
        inspectionReport: "考核通报"
      },
      infolist: [],
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
    handleDetailOperate(type) {
      this.$router.push({
        path: "/informationsPage/infosManage/allInfos/" + type
      });
    },
    /* 点击card组件具体条目 */
    handleDetailItemTap(item) {
      this.dialogShowInfoDialogSettings.title = this.titlesManage[
        item.subColumn
      ];
      this.dialogShowInfoDialogSettings.dialogShowInfoVisible = true;
      this.dialogShowInfoDialogSettings.showInfoData = item;
    },
    /**
     * 获取信息列表数据
     */
    getAllInfosData() {
      let allInfoslist = this.$store.getters["app/allInfosList"];
      for (let key in this.titlesManage) {
        let infoObj = {
          cardlistTitle: this.titlesManage[key],
          cardlistOperation: "更多>>",
          cardType: key,
          cardlistsArray: [],
          cardItemParams: {
            main: "title",
            subMain: "formatAddTime"
          }
        };
        allInfoslist.map(allInfo => {
          allInfo.formatAddTime = allInfo.addTime.substr(5, 11);
          if (allInfo.subColumn == key) {
            infoObj.cardlistsArray.push(allInfo);
          }
        });
        this.infolist.push(infoObj);
      }
    }
  },
  mounted() {
    this.getAllInfosData();
  }
};
</script>
