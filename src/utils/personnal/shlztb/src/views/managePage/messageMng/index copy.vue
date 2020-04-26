<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-row>
            <el-col class="mb20" :span="24">
              <commonTitleWithBorder :title="titles.searchTitel" />
            </el-col>
            <el-col class="mb20" :span="24">
              <el-input type="textarea" :rows="8" v-model="message"></el-input>
            </el-col>
            <el-col class="mb20" :span="24">
              <el-select
                v-model="value"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择要发送信息的会员"
              >
                <el-option
                  v-for="item in memberlist"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col>
              <el-button type="success" @click="postMsg">发送信息</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
export default {
  name: "messageMng",
  components: {
    commonTitleWithBorder
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "查询条件"
      },
      value: [],
      message: "",
      memberlist: []
    };
  },
  methods: {
    postMsg() {
      if (!this.message || this.value.length < 1) {
        this.$message.error("请完善短信内容及接收人后再发送消息");
        return false;
      }
      this.$message.success("消息已成功发送");
      this.value = [];
      this.message = "";
    }
  },
  mounted() {
    let that = this;
    // 获取会员列表
    that
      .$getData("PortalDropdownlist", {
        _refKey: "member",
        memType: 3,
        _noCache: "true"
      })
      .then(data => {
        let allmember = {
          value: "all",
          text: "所有会员"
        };
        data.unshift(allmember);
        that.memberlist = data;
      });
  }
};
</script>
