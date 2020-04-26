<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <tabCard class="tab-container" :tabSettings="tabSettings" />
        <div class="table-container">
          <commonTitleWithBorder :title="titles.tableTitle" />
          <el-row>
            <el-col :span="12" :offset="6">
              <idCard :data="accountInfo" />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import tabCard from "@/components/tabCard";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import idCard from "@/components/idCard";

export default {
  name: "accountQuery",
  components: {
    tabCard,
    commonTitleWithBorder,
    idCard
  },
  data() {
    return {
      // tab数据设置
      tabSettings: {
        tabCardType: "card",
        tabCardData: [
          {
            label: "账户查询",
            name: "accountQuery"
          }
        ]
      },
      //标题管理
      titles: {
        tableTitle: "我的账户"
      },
      // 账户信息
      accountInfo: {
        title: "交易代表信息",
        icon: "el-icon-user-solid",
        data: [
          {
            key: "虚拟账户",
            flag: "no",
            value: ""
          },
          {
            key: "交易金(元)",
            flag: "num",
            value: ""
          },
          {
            key: "锁定金(元)",
            flag: "numLock",
            value: ""
          },
          {
            key: "可用金(元)",
            flag: "useNum",
            value: ""
          }
        ]
      }
    };
  },
  methods: {
    /* 获取账户信息 */
    getMyAccontInfo() {
      let that = this;
      that.$http(that.$api.getMyAccontInfo(), {}, true).then(xhr => {
        if (xhr) {
          xhr.data.useNum =
            parseFloat(xhr.data.num) - parseFloat(xhr.data.numLock);
          that.accountInfo.data.map(item => {
            item.value = xhr.data[item.flag];
          });
        }
      });
    }
  },
  mounted() {
    this.getMyAccontInfo();
  }
};
</script>
