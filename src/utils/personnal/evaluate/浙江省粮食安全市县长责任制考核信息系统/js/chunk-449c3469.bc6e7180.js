(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-449c3469"],{"2f50":function(e){e.exports=[{flag:"search",size:"",icon:"",label:"立即查找",styleType:"primary",postUrl:"addRegisterMember"},{flag:"reset",size:"",icon:"",label:"清  除",styleType:"",postUrl:"addRegisterMember"}]},"5aab":function(e){e.exports=[{type:"inputHidden",label:"数据id",name:"assessmentId",span:24,width:"150px"},{type:"input",label:"年度",name:"year",span:12,width:"150px",disabled:!0},{type:"input",label:"城市",name:"cityName",span:12,width:"150px",disabled:!0},{type:"input",label:"考核内容",name:"assessmentContent",span:24,width:"150px",disabled:!0},{type:"input",label:"重点考核事项",name:"assessmentItems",span:24,width:"150px",disabled:!0},{type:"input",label:"考核目标",name:"assessmentTarget",span:24,width:"150px",disabled:!0},{type:"input",label:"年度考核目标任务",name:"assessmentTargetTask",span:24,width:"150px",disabled:!0},{type:"textarea",label:"评分标准",name:"scoreStandard",span:24,width:"150px",disabled:!0,rows:4},{type:"textarea",label:"处室配合意见",name:"officeOpinions",span:24,width:"150px",rows:3},{type:"upload",label:"配合材料",name:"officeMaterials",span:12,width:"150px",choseBtn:"上传文件"},{type:"elTreeSelect",label:"配合处室",name:"officeId",span:12,width:"150px",disabled:!0,props:{value:"orgId",label:"orgName",children:"children",choseOnlyLeaf:!1},data:[]},{type:"input",label:"意见填报人",name:"officeInputName",span:12,width:"150px"},{type:"input",label:"审核人",name:"officeCheckName",span:12,width:"150px"}]},"5c25":function(e){e.exports=[{type:"select",label:"考核内容",name:"assessmentContent",span:8,width:"150px",data:[{label:"目标1",value:"targetId1"},{label:"目标2",value:"targetId2"},{label:"目标3",value:"targetId3"}]},{type:"select",label:"重点考核事项",name:"assessmentItems",span:8,width:"150px",data:[{label:"目标1",value:"targetId1"},{label:"目标2",value:"targetId2"},{label:"目标3",value:"targetId3"}]},{type:"select",label:"考核指标",name:"assessmentTarget",span:8,width:"150px",data:[{label:"目标1",value:"targetId1"},{label:"目标2",value:"targetId2"},{label:"目标3",value:"targetId3"}]},{type:"select",label:"年度考核目标任务",name:"assessmentTargetTask",span:8,width:"150px",data:[{label:"目标1",value:"targetId1"},{label:"目标2",value:"targetId2"},{label:"目标3",value:"targetId3"}]},{type:"select",label:"完成状态",name:"status",span:8,width:"150px",data:[{label:"已完成",value:"complete"},{label:"未完成",value:"incomplete"},{label:"已上报",value:"reported"}]},{type:"select",label:"是否失分",name:"reduceScore",span:8,width:"150px",data:[{label:"是",value:"Y"},{label:"否",value:"N"}]}]},7105:function(e){e.exports=[{flag:"cancle",label:"取消",styleType:""},{flag:"save",label:"保存",styleType:"primary"}]},"77fb":function(e,t,a){"use strict";a.r(t);a("ac6a"),a("7f7f");var s=a("5c25"),i=a("2f50"),n=a("8f20"),o=a("5aab"),l=a("7105"),r={officeOpinions:[{required:!0,message:"处室配合意见不能为空",trigger:"blur"}],officeInputName:[{required:!0,message:"填报人不能为空",trigger:"blur"}],officeCheckName:[{required:!0,message:"审核人不能为空",trigger:"blur"}],officeId:[{required:!0,message:"配合处室不能为空",trigger:"blur"}]},p=a("e776"),d=a("452f"),m={name:"index",components:{formGroup:p.a,Status:d.a},data:function(){return{suggestSetFormItems:{fullScreen:!1,formGroupList:s,formGroupValues:{},formButtonList:i},tableSettings:{tableDatas:[],tableSettingOptions:{ref:"target",tooltipEffect:"dark",rowKey:"assessmentId",border:!0,headerOptions:n,isShowIndex:!0,showIndexHeader:"序号"}},paginationSettings:{currentPage:1,layout:"total, prev, pager, next, jumper",totalNumbers:0},dialogFormSettingsOfficeOpinion:{dialogFormVisible:!1,dialogFormTitle:"意见填写",dialogType:"form",dialogFormItems:{formGroupList:o,formGroupValues:{},formButtonList:l,rules:r}}}},methods:{handleSearchFormBtn:function(e,t){console.log(e,t)},handleTableRowButton:function(e,t){var a=this;"opinion"===t.type&&(this.dialogFormSettingsOfficeOpinion.dialogFormVisible=!0,this.dialogFormSettingsOfficeOpinion.dialogFormItems.formGroupList.map(function(e){return"officeId"===e.name&&(e.data=a.$store.getters["user/orgTree"]),e}),e.officeId=this.$store.getters["user/userInfos"].userId,this.dialogFormSettingsOfficeOpinion.dialogFormItems.formGroupValues=e)},handleDialogForm:function(e,t){var a=this,s=this;this.dialogFormSettingsOfficeOpinion.dialogFormVisible=!1,t.assessmentId&&this.$confirm("确认提交给上级部门处理？提交后将不能修改","提交",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(e){console.log(e),t.status="complete",a.$store.dispatch("assessment/commitAssessmentResult",{formData:t,action:"officeOpinion"}),s.$message({message:"提交成功",type:"success"}),a.setTableList()}).catch()},handlePaginationPagenumber:function(){},handleSizeChange:function(){},setTableList:function(){var e=this,t=this.$store.getters["user/userInfos"].userId,a=this.$store.getters["assessment/getAssessmentResult"];this.tableSettings.tableDatas=[],this.$store.getters["assessment/getAssessmentList"].forEach(function(s){if(s.operateBtns=[],s.officeCoordinationDepartmentId&&s.officeCoordinationDepartmentId==t){var i=a[s.assessmentId];i&&i.officeOpinion&&i.officeOpinion.officeOpinions?(s.officeOpinions=i.officeOpinion.officeOpinions,s.status="complete"):(s.status="incomplete",s.operateBtns.push({styleType:"primary",type:"opinion",text:"意见"})),e.tableSettings.tableDatas.push(s)}}),this.paginationSettings.totalNumbers=this.tableSettings.tableDatas.length}},mounted:function(){this.setTableList();var e=this.$store.getters["assessment/getAssessmentList"],t=this.suggestSetFormItems.formGroupList;this.suggestSetFormItems.formGroupList=this.$globalFnc.setFilterFormData(e,JSON.parse(JSON.stringify(t)))}},u=a("2877"),c=Object(u.a)(m,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pt10 pr10 pl10 width100"},[a("el-col",{staticClass:"mb20",attrs:{span:24}},[a("commonTitleWithBorder",{attrs:{title:"查询条件"}})],1),a("el-col",{staticClass:"mb20",attrs:{span:24}},[a("formGroup",{attrs:{formGroupSettings:e.suggestSetFormItems},on:{formGroupSubmit:e.handleSearchFormBtn}})],1),a("el-row",{staticClass:"mb10"},[a("el-col",{attrs:{span:6}},[a("commonTitleWithBorder",{attrs:{title:"列表信息"}})],1)],1),a("el-col",{staticClass:"lheight40",attrs:{span:24}},[e._v("\n    状态提醒："),a("Status",{attrs:{status:"incomplete"}}),e._v("未完成\n    "),a("Status",{staticClass:"ml10",attrs:{status:"complete"}}),e._v("已完成\n  ")],1),a("tableList",{attrs:{tablelistSettings:e.tableSettings},on:{handleTableRowButton:e.handleTableRowButton}}),a("pagination",{attrs:{paginationSettings:e.paginationSettings},on:{handlePaginationPagenumber:e.handlePaginationPagenumber,handlePaginationPagesize:e.handleSizeChange}}),e.dialogFormSettingsOfficeOpinion.dialogFormVisible?a("dialogForm",{attrs:{dialogFormSettings:e.dialogFormSettingsOfficeOpinion},on:{handleDialogForm:e.handleDialogForm}}):e._e()],1)},[],!1,null,"31e9d43b",null);t.default=c.exports},"8f20":function(e){e.exports=[{prop:"status",propType:"statusDot",lable:"状态",width:"50px"},{prop:"assessmentTarget",lable:"年度考核目标任务"},{prop:"scoreStandard",lable:"评分标准"},{prop:"targetScore",lable:"指标分值",width:"80px"},{prop:"cityLeadDepartment",lable:"市牵头部门"},{prop:"cityCoordinationDepartment",lable:"市配合部门"},{prop:"officeCoordinationDepartment",lable:"配合处室"},{prop:"officeOpinions",lable:"配合处室意见"},{prop:"operateBtns",lable:"操作",propType:"operateBtns",width:"150px"}]}}]);