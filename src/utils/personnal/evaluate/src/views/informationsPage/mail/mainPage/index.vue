<template>
  <div class="pt10 pr10 pl10 width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
    </el-row>
    <el-row>
      <el-col class="mb20" :span="24">
        <formGroup :formGroupSettings="mailFormItems" />
      </el-col>
    </el-row>

    <el-row class="mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <el-button type="primary">预览及导出</el-button>
        <el-button type="primary">标记已读</el-button>
        <el-button type="primary">标记未读</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">彻底删除</el-button>
      </el-col>
    </el-row>
    <tableList :tablelistSettings="tableSettings" />
    <pagination :paginationSettings="paginationSettings" />
  </div>
</template>

<script>
import mailFormItems from "@/utils/formSettingsJson/informationsPage/mail/mailFormItems.json";
import handleSearchFormBtn from "@/utils/formSettingsJson/informationsPage/mail/mailFormBtns.json";
import mailTableHeader from "@/utils/formSettingsJson/informationsPage/mail/mailTableHeader.json";

import mailList from "@/utils/testJson/mail";

export default {
  name: "mail",
  components: {},
  data() {
    return {
      // 搜索栏
      mailFormItems: {
        fullScreen: false,
        formGroupList: mailFormItems,
        formGroupValues: {
          topic: "",
          receiveName: "",
          sendTime: ""
        },
        formButtonList: handleSearchFormBtn
      },
      tableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "mail",
          tooltipEffect: "dark",
          rowKey: "mailId",
          border: true,
          headerOptions: mailTableHeader,
          isShowIndex: true,
          showIndexHeader: "序号",
          isMultipleTable: true
        }
      },
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      }
    };
  },
  methods: {},
  mounted() {
    this.tableSettings.tableDatas = mailList;
    this.paginationSettings.totalNumbers = mailList.length;
  },
  watch: {
    $route: function(to) {
      this.$forceUpdate();
    }
  }
};
</script>
