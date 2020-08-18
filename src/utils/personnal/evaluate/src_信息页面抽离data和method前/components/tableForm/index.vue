<template>
  <div>
    <el-row>
      <el-col
        :span="24"
        class="textAlignCenter mt20 mb10"
        style="font-size: 22px"
        >局自评工作表单</el-col
      >
    </el-row>
    <el-row>
      <el-col :span="24" class="textAlignCenter mt10 tableForm-title"
        >年度考核（评分点）基本信息</el-col
      >
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">年度:</el-col>
      <el-col :span="8">{{ tableFormData.year }}</el-col>
      <el-col :span="4" class="row-title">城市</el-col>
      <el-col :span="8">{{ tableFormData.cityName }}</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">考核内容:</el-col>
      <el-col :span="20">{{ tableFormData.assessmentContent }}</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">重点考核事项:</el-col>
      <el-col :span="20">{{ tableFormData.assessmentItems }}</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">考核指标:</el-col>
      <el-col :span="20">{{ tableFormData.assessmentTargetTask }}</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">年度考核目标:</el-col>
      <el-col :span="20">{{ tableFormData.assessmentTarget }}</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">评分标准:</el-col>
      <el-col :span="20">{{ tableFormData.scoreStandard }}</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">市牵头部门:</el-col>
      <el-col :span="8">{{ tableFormData.cityLeadDepartment }}</el-col>
      <el-col :span="4" class="row-title">市配合部门</el-col>
      <el-col :span="8">{{ tableFormData.cityCoordinationDepartment }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="textAlignCenter tableForm-title"
        >市级自评配合部门意见</el-col
      >
    </el-row>
    <el-row class="tableForm-row-height textAlignCenter">
      <el-col :span="8" class="row-title">市配合部门:</el-col>
      <el-col :span="8" class="row-title">市配合意见</el-col>
      <el-col :span="8" class="row-title">市配合材料</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="8">{{ tableFormData.cityCoordinationDepartment }}</el-col>
      <el-col :span="8">{{ tableFormData.opinion }}</el-col>
      <el-col :span="8">{{ tableFormData.material }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="textAlignCenter tableForm-title"
        >市级自评牵头部门自评工作</el-col
      >
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">指标分数:</el-col>
      <el-col :span="8">{{ tableFormData.targetScore }}</el-col>
      <el-col :span="4" class="row-title">自评分:</el-col>
      <el-col :span="8">{{ tableFormData.selfScore }}</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">打分依据:</el-col>
      <el-col :span="20">
        <template>
          <el-button size="small" type="primary">
            <em class="el-icon-download"></em>下载附件
          </el-button>
        </template>
      </el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">减分原因:</el-col>
      <el-col :span="20" class="">{{ tableFormData.reason }}</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">整改措施:</el-col>
      <el-col :span="20" class="">{{ tableFormData.measures }}</el-col>
    </el-row>
    <el-row class="tableForm-row-height">
      <el-col :span="4" class="row-title">自评人:</el-col>
      <el-col :span="8">{{ tableFormData.selfName }}</el-col>
      <el-col :span="4" class="row-title">审核人:</el-col>
      <el-col :span="8">{{ tableFormData.checkName }}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    tableFormData: Object
  }
};
</script>

<style scoped></style>
