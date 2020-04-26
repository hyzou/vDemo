<template>
  <div class="idcard">
    <el-row>
      <el-col :span="24" class="idcard-seprator">
        <el-col class="idcard-iconbox" :span="6">
          <i :class="data.icon"></i>
        </el-col>
        <el-col :span="18">
          <el-row v-for="(item, index) in data.data" :key="index">
            <el-col :span="8" class="idcard-key">{{ item.key }}</el-col>
            <el-col :span="16" class="idcard-value">{{ item.value }}</el-col>
          </el-row>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "idCard",
  props: {
    data: Object
  }
};
</script>
