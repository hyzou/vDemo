(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-748a886e"],{"022c":function(t){t.exports=[{prop:"assessmentTarget",lable:"年度考核目标任务"},{prop:"scoreStandard",lable:"评分标准"},{prop:"targetScore",lable:"分值"},{prop:"selfScore",lable:"自评分"},{prop:"reason",lable:"减分原因"},{prop:"measures",lable:"整改措施"},{prop:"cityLeadDepartment",lable:"市级牵头部门"},{prop:"cityCoordinationDepartment",lable:"市级配合部门"}]},"0f44":function(t){t.exports=[{type:"date",label:"年度",name:"year",dateType:"year",span:12,width:"150px"},{type:"select",label:"是否开启",name:"enable",span:12,width:"150px",data:[{value:"1",label:"启用"},{value:"0",label:"不启用"}]},{type:"date",label:"牵头部门开启时间",name:"leadStartTime",dateType:"date",span:12,width:"150px"},{type:"date",label:"牵头部门截至时间",name:"leadEndTime",dateType:"date",span:12,width:"150px"},{type:"date",label:"配合部门开启时间",name:"coordinationStartTime",dateType:"date",span:12,width:"150px"},{type:"date",label:"配合部门截至时间",name:"coordinationEndTime",dateType:"date",span:12,width:"150px"}]},"2f50":function(t){t.exports=[{flag:"search",size:"",icon:"",label:"立即查找",styleType:"primary",postUrl:"addRegisterMember"},{flag:"reset",size:"",icon:"",label:"清  除",styleType:"",postUrl:"addRegisterMember"}]},"45bf":function(t,e,a){"use strict";a.r(e);a("ac6a"),a("456d");var s=a("5c25"),l=a("2f50"),i=a("668c"),o=a("022c"),r=a("0f44"),n=a("8e98"),p=a("9c1b"),m=a("e6aa"),c={year:[{required:!0,message:"请选择年份",trigger:"blur"}],enable:[{required:!0,message:"请选择是否开启",trigger:"blur"}],leadStartTime:[{required:!0,message:"牵头部门开启时间",trigger:"blur"}],leadEndTime:[{required:!0,message:"牵头部门截至时间",trigger:"blur"}],coordinationStartTime:[{required:!0,message:"配合部门开启时间",trigger:"blur"}],coordinationEndTime:[{required:!0,message:"配合部门截至时间",trigger:"blur"}]},d={cityLeadDepartmentId:[{required:!0,message:"市牵头部门不能为空",trigger:"blur"}]},b=a("e776"),g={name:"index",props:{tableFormData:Object}},u=a("2877"),h=Object(u.a)(g,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("el-col",{staticClass:"textAlignCenter mt20 mb10",staticStyle:{"font-size":"22px"},attrs:{span:24}},[t._v("局自评工作表单")])],1),a("el-row",[a("el-col",{staticClass:"textAlignCenter mt10 tableForm-title",attrs:{span:24}},[t._v("年度考核（评分点）基本信息")])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("年度:")]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.year))]),a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("城市")]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.cityName))])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("考核内容:")]),a("el-col",{attrs:{span:20}},[t._v(t._s(t.tableFormData.assessmentContent))])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("重点考核事项:")]),a("el-col",{attrs:{span:20}},[t._v(t._s(t.tableFormData.assessmentItems))])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("考核指标:")]),a("el-col",{attrs:{span:20}},[t._v(t._s(t.tableFormData.assessmentTargetTask))])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("年度考核目标:")]),a("el-col",{attrs:{span:20}},[t._v(t._s(t.tableFormData.assessmentTarget))])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("评分标准:")]),a("el-col",{attrs:{span:20}},[t._v(t._s(t.tableFormData.scoreStandard))])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("市牵头部门:")]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.cityLeadDepartment))]),a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("市配合部门")]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.cityCoordinationDepartment))])],1),a("el-row",[a("el-col",{staticClass:"textAlignCenter tableForm-title",attrs:{span:24}},[t._v("市级自评配合部门意见")])],1),a("el-row",{staticClass:"tableForm-row-height textAlignCenter"},[a("el-col",{staticClass:"row-title",attrs:{span:8}},[t._v("市配合部门:")]),a("el-col",{staticClass:"row-title",attrs:{span:8}},[t._v("市配合意见")]),a("el-col",{staticClass:"row-title",attrs:{span:8}},[t._v("市配合材料")])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.cityCoordinationDepartment))]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.opinion))]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.material))])],1),a("el-row",[a("el-col",{staticClass:"textAlignCenter tableForm-title",attrs:{span:24}},[t._v("市级自评牵头部门自评工作")])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("指标分数:")]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.targetScore))]),a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("自评分:")]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.selfScore))])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("打分依据:")]),a("el-col",{attrs:{span:20}},[[a("el-button",{attrs:{size:"small",type:"primary"}},[a("em",{staticClass:"el-icon-download"}),t._v("下载附件\n        ")])]],2)],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("减分原因:")]),a("el-col",{attrs:{span:20}},[t._v(t._s(t.tableFormData.reason))])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("整改措施:")]),a("el-col",{attrs:{span:20}},[t._v(t._s(t.tableFormData.measures))])],1),a("el-row",{staticClass:"tableForm-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("自评人:")]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.selfName))]),a("el-col",{staticClass:"row-title",attrs:{span:4}},[t._v("审核人:")]),a("el-col",{attrs:{span:8}},[t._v(t._s(t.tableFormData.checkName))])],1)],1)},[],!1,null,"2168221a",null).exports,v=a("452f"),f={name:"index",components:{formGroup:b.a,tableForm:h,Status:v.a},data:function(){return{totalScore:0,totalSelfScore:0,suggestSetFormItems:{fullScreen:!1,formGroupList:s,formGroupValues:{},formButtonList:l},tableSettings:{tableDatas:[],tableSettingOptions:{ref:"target",tooltipEffect:"dark",rowKey:"assessmentId",border:!0,headerOptions:i,isShowIndex:!0,showIndexHeader:"序号"}},paginationSettings:{currentPage:1,layout:"total, prev, pager, next, jumper",totalNumbers:0},dialogFormSettingsSelfEvaluation:{width:"800px",dialogFormTitle:"市局自评设置",dialogType:"form",dialogFormVisible:!1,dialogFormItems:{formGroupList:r,formGroupValues:{year:"2019",enable:"1"},formButtonList:n,rules:c}},dialogPreviewExportSetting:{width:"70%",title:"预览以及导出",dialogFormVisible:!1},dialogPreviewExportVisible:!1,previewTableSettings:{dialogFormClassName:"min",tableDatas:[],tableSettingOptions:{ref:"target",tooltipEffect:"dark",rowKey:"assessmentId",border:!0,headerOptions:o,isShowIndex:!1}},dialogSelfEvaluationVisible:!1,tableFormData:{},dialogFormSettingsAssessmentDistribute:{width:"70%",dialogFormVisible:!1,dialogFormTitle:"分配",dialogType:"form",dialogFormItems:{formGroupList:p,formGroupValues:{},formButtonList:m,rules:d}}}},methods:{handleSearchFormBtn:function(){},handleTableRowButton:function(t,e){"distribute"===e.type?(this.dialogFormSettingsAssessmentDistribute.dialogFormVisible=!0,this.dialogFormSettingsAssessmentDistribute.dialogFormItems.formGroupValues=t):"preview"===e.type&&(this.tableFormData={},this.dialogSelfEvaluationVisible=!0,this.tableFormData=t)},handleAssessmentDistribute:function(t,e){var a=this;this.dialogFormSettingsAssessmentDistribute.dialogFormVisible=!1,"save"===t.flag&&(this.tableSettings.tableDatas.map(function(t){if(t.assessmentId===e.assessmentId){var s=a.$store.getters["user/userIdForName"];return t.cityLeadDepartment=s[e.cityLeadDepartmentId],t.cityCoordinationDepartment=s[e.cityCoordinationDepartmentId],t=Object.assign({},t,e),a.$store.dispatch("assessment/commitAssessmentInfo",t).then(function(){a.setTableList()}),t}}),this.setTableList())},handleSelfEvaluation:function(){this.dialogFormSettingsSelfEvaluation.dialogFormVisible=!0,this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupValues={};var t=this.$store.getters["assessment/getAssessmentOpen"];t&&Object.keys(t).length>0?this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupValues=t:this.dialogFormSettingsSelfEvaluation.dialogFormItems.formGroupValues={year:"2019",enable:"1"}},handleOpenSelfEvaluation:function(t,e){this.dialogFormSettingsSelfEvaluation.dialogFormVisible=!1,"save"===t.flag&&this.$store.dispatch("assessment/commitAssessmentOpen",e)},handleSubmitSelfEvaluationResult:function(){var t=this,e=0;this.tableSettings.tableDatas.forEach(function(t){"incomplete"===t.status&&e++}),e>0?this.$confirm("上报列表有未完成内容，您确定提交给省级考核办吗？提交后只能查看,不能再作任何修改！","上报",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(e){console.log(e);var a=t.$store.getters["assessment/getAssessmentList"];a.map(function(t){return t.status="reported"}),t.$store.dispatch("assessment/commitAssessmentInfo",a).then(function(){t.setTableList()})}).catch():this.$confirm("您确定提交给省级考核办吗？提交后只能查看,不能再作任何修改！","上报",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(e){console.log(e);var a=t.$store.getters["assessment/getAssessmentList"];a.map(function(t){return t.status="reported"}),t.$store.dispatch("assessment/commitAssessmentInfo",a).then(function(){t.setTableList()})}).catch()},handlePaginationPagenumber:function(){},handleSizeChange:function(){},handlePreviewExport:function(){this.dialogPreviewExportVisible=!0,this.previewTableSettings.tableDatas=this.tableSettings.tableDatas},handleDialogTableExport:function(){},setTableList:function(){var t=this;this.totalScore=0,this.totalSelfScore=0;var e=this.$store.getters["assessment/getAssessmentResult"],a=this.$store.getters["assessment/getAssessmentList"];a.map(function(a){return t.totalScore+=parseFloat(a.targetScore,2),t.totalSelfScore+=parseFloat(a.selfScore?a.selfScore:0,2),a.operateBtns=[],e[a.assessmentId]&&e[a.assessmentId].citySelf&&(a.selfName=e[a.assessmentId].citySelf.selfName,a.checkName=e[a.assessmentId].citySelf.checkName,"incomplete"==a.status&&(a.status="complete")),e[a.assessmentId]&&e[a.assessmentId].cityOpinion&&(a.opinion=e[a.assessmentId].cityOpinion.opinion,a.material=e[a.assessmentId].cityOpinion.material),a.cityLeadDepartmentId||"reported"===a.status||a.operateBtns.push({styleType:"primary",type:"distribute",text:"分配"}),a.operateBtns.push({styleType:"text",type:"preview",text:"查看"}),a}),this.tableSettings.tableDatas=[],this.tableSettings.tableDatas=a,this.paginationSettings.totalNumbers=this.tableSettings.tableDatas.length}},mounted:function(){this.setTableList();var t=this.$store.getters["assessment/getAssessmentList"],e=this.suggestSetFormItems.formGroupList;this.suggestSetFormItems.formGroupList=this.$globalFnc.setFilterFormData(t,JSON.parse(JSON.stringify(e)))}},w=Object(u.a)(f,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pt10 pr10 pl10 width100"},[a("el-col",{staticClass:"mb20",attrs:{span:24}},[a("commonTitleWithBorder",{attrs:{title:"查询条件"}})],1),a("el-col",{staticClass:"mb20",attrs:{span:24}},[a("formGroup",{attrs:{formGroupSettings:t.suggestSetFormItems},on:{formGroupSubmit:t.handleSearchFormBtn}})],1),a("el-row",{staticClass:"mb10"},[a("el-col",{attrs:{span:6}},[a("commonTitleWithBorder",{attrs:{title:"列表信息"}})],1),a("el-col",{staticClass:"textAlignRight",attrs:{span:18}},[a("el-button",{attrs:{type:"primary"},on:{click:t.handlePreviewExport}},[t._v("预览及导出")]),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSelfEvaluation}},[t._v("开启局自评")]),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmitSelfEvaluationResult}},[t._v("自评结果上报")])],1)],1),a("el-col",{staticClass:"lheight40",attrs:{span:24}},[t._v("\n    状态提醒："),a("Status",{attrs:{status:"incomplete"}}),t._v("未完成\n    "),a("Status",{staticClass:"ml10",attrs:{status:"complete"}}),t._v("已完成\n    "),a("Status",{staticClass:"ml10",attrs:{status:"reported"}}),t._v("已上报\n    "),a("span",{staticClass:"ml20"},[t._v("\n      评分点分值合计 ("+t._s(t._f("toDecimal2")(t.totalScore))+") 分，自评分共计(\n      "+t._s(t._f("toDecimal2")(t.totalSelfScore))+"\n      )分\n    ")])],1),a("tableList",{attrs:{tablelistSettings:t.tableSettings},on:{handleTableRowButton:t.handleTableRowButton}}),a("pagination",{attrs:{paginationSettings:t.paginationSettings},on:{handlePaginationPagenumber:t.handlePaginationPagenumber,handlePaginationPagesize:t.handleSizeChange}}),t.dialogFormSettingsSelfEvaluation.dialogFormVisible?a("dialogForm",{attrs:{dialogFormSettings:t.dialogFormSettingsSelfEvaluation},on:{handleDialogForm:t.handleOpenSelfEvaluation}}):t._e(),t.dialogFormSettingsAssessmentDistribute.dialogFormVisible?a("dialogForm",{attrs:{dialogFormSettings:t.dialogFormSettingsAssessmentDistribute},on:{handleDialogForm:t.handleAssessmentDistribute}}):t._e(),t.dialogPreviewExportVisible?a("el-dialog",{attrs:{title:"预览及导出",visible:t.dialogPreviewExportVisible,width:"80%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":!0},on:{"update:visible":function(e){t.dialogPreviewExportVisible=e}}},[a("el-row",{staticClass:"mb10"},[a("el-col",{staticClass:"textAlignCenter",staticStyle:{"font-size":"24px"},attrs:{span:22}},[t._v("杭州市2019年度落实粮食安全市县长责任制自查评分表")]),a("el-col",{staticClass:"textAlignRight",attrs:{span:2}},[a("el-button",{attrs:{type:"primary"},on:{click:t.handleDialogTableExport}},[t._v("导出")])],1)],1),a("tableList",{attrs:{tablelistSettings:t.previewTableSettings}})],1):t._e(),t.dialogSelfEvaluationVisible?a("el-dialog",{attrs:{title:"查看",visible:t.dialogSelfEvaluationVisible,width:"80%","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":!0},on:{"update:visible":function(e){t.dialogSelfEvaluationVisible=e}}},[a("tableForm",{attrs:{tableFormData:t.tableFormData}})],1):t._e()],1)},[],!1,null,"a2e95512",null);e.default=w.exports},"5c25":function(t){t.exports=[{type:"select",label:"考核内容",name:"assessmentContent",span:8,width:"150px",data:[{label:"目标1",value:"targetId1"},{label:"目标2",value:"targetId2"},{label:"目标3",value:"targetId3"}]},{type:"select",label:"重点考核事项",name:"assessmentItems",span:8,width:"150px",data:[{label:"目标1",value:"targetId1"},{label:"目标2",value:"targetId2"},{label:"目标3",value:"targetId3"}]},{type:"select",label:"考核指标",name:"assessmentTarget",span:8,width:"150px",data:[{label:"目标1",value:"targetId1"},{label:"目标2",value:"targetId2"},{label:"目标3",value:"targetId3"}]},{type:"select",label:"年度考核目标任务",name:"assessmentTargetTask",span:8,width:"150px",data:[{label:"目标1",value:"targetId1"},{label:"目标2",value:"targetId2"},{label:"目标3",value:"targetId3"}]},{type:"select",label:"完成状态",name:"status",span:8,width:"150px",data:[{label:"已完成",value:"complete"},{label:"未完成",value:"incomplete"},{label:"已上报",value:"reported"}]},{type:"select",label:"是否失分",name:"reduceScore",span:8,width:"150px",data:[{label:"是",value:"Y"},{label:"否",value:"N"}]}]},"668c":function(t){t.exports=[{prop:"status",propType:"statusDot",lable:"状态",width:"50px"},{prop:"assessmentTarget",lable:"年度考核目标任务"},{prop:"scoreStandard",lable:"评分标准"},{prop:"targetScore",lable:"分值",width:"70px"},{prop:"provinceLeadDepartment",lable:"省牵头部门"},{prop:"provinceCoordinationDepartment",lable:"省配合部门"},{prop:"selfScore",lable:"自评分",width:"70px"},{prop:"reason",lable:"减分原因"},{prop:"measures",lable:"整改措施"},{prop:"cityLeadDepartment",lable:"市牵头部门"},{prop:"cityCoordinationDepartment",lable:"市配合部门"},{prop:"operateBtns",lable:"操作",propType:"operateBtns",width:"150px"}]},"8e98":function(t){t.exports=[{flag:"cancle",label:"取消",styleType:""},{flag:"save",label:"保存",styleType:"primary"}]},"9c1b":function(t){t.exports=[{type:"inputHidden",label:"数据id",name:"assessmentId",span:24,width:"150px"},{type:"input",label:"年度",name:"year",span:12,width:"150px",disabled:!0},{type:"input",label:"城市",name:"cityName",span:12,width:"150px",disabled:!0},{type:"input",label:"考核内容",name:"assessmentContent",span:24,width:"150px",disabled:!0},{type:"input",label:"重点考核事项",name:"assessmentItems",span:24,width:"150px",disabled:!0},{type:"input",label:"考核目标",name:"assessmentTarget",span:24,width:"150px",disabled:!0},{type:"input",label:"年度考核目标任务",name:"assessmentTargetTask",span:24,width:"150px",disabled:!0},{type:"textarea",label:"评分标准",name:"scoreStandard",span:24,width:"150px",disabled:!0,rows:4},{type:"select",label:"市级牵头部门",name:"cityLeadDepartmentId",span:12,multiple:!1,placeHolder:"请选择",filterable:!1,width:"150px",data:[{label:"杭州市农业农村局",value:"1002"},{label:"杭州市商务局",value:"1003"}]},{type:"select",label:"市级配合部门",name:"cityCoordinationDepartmentId",span:12,multiple:!1,placeHolder:"请选择",filterable:!1,width:"150px",data:[{label:"杭州市农业农村局",value:"1002"},{label:"杭州市商务局",value:"1003"}]}]},e6aa:function(t){t.exports=[{flag:"cancle",label:"取消",styleType:""},{flag:"save",label:"保存",styleType:"primary"}]}}]);