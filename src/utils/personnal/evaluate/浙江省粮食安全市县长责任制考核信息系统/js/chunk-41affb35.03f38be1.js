(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-41affb35"],{"0996":function(e,t,a){"use strict";var l={name:"indexAssignment",props:{indexConfigForm:{type:Object,default:function(){return{year:"",targetScore:"",cityName:"",assessmentContent:"",assessmentTarget:"",assessmentTargetTask:"",assessmentItems:"",scoreStandard:"",provinceLeadDepartment:"",provinceCoordinationDepartment:"",cityCoordinationDepartment:"",cityLeadDepartment:"",implementProgress:"",officeImplementProgress:"",departmentImplementProgress:"",officeDisabled:!1,departmentDisabled:!1}}}},methods:{saveData:function(){return this.indexConfigForm}}},s=(a("1cd9"),a("2877")),n=Object(s.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"width100"},[a("el-row",{staticClass:"table-row-height",staticStyle:{"border-top":"1px #DCDFE6 dashed"}},[a("el-col",{staticClass:"row-title",attrs:{span:5}},[e._v("\n      年度：\n    ")]),a("el-col",{attrs:{span:7}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.year,callback:function(t){e.$set(e.indexConfigForm,"year",t)},expression:"indexConfigForm.year"}})]],2),a("el-col",{staticClass:"row-title",attrs:{span:5}},[e._v("\n      城市:\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:7}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.cityName,callback:function(t){e.$set(e.indexConfigForm,"cityName",t)},expression:"indexConfigForm.cityName"}})]],2)],1),a("el-row",{staticClass:"table-row-height"},[a("el-col",{staticClass:"row-title textAlignCenter",attrs:{span:5}},[e._v("\n      考核内容：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:19}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.assessmentContent,callback:function(t){e.$set(e.indexConfigForm,"assessmentContent",t)},expression:"indexConfigForm.assessmentContent"}})]],2)],1),a("el-row",{staticClass:"table-row-height"},[a("el-col",{staticClass:"row-title textAlignCenter",attrs:{span:5}},[e._v("\n      重点考核事项：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:19}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.assessmentItems,callback:function(t){e.$set(e.indexConfigForm,"assessmentItems",t)},expression:"indexConfigForm.assessmentItems"}})]],2)],1),a("el-row",{staticClass:"table-row-height"},[a("el-col",{staticClass:"row-title textAlignCenter",attrs:{span:5}},[e._v("\n      考核指标：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:19}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.assessmentTarget,callback:function(t){e.$set(e.indexConfigForm,"assessmentTarget",t)},expression:"indexConfigForm.assessmentTarget"}})]],2)],1),a("el-row",{staticClass:"table-row-height"},[a("el-col",{staticClass:"row-title textAlignCenter",attrs:{span:5}},[e._v("\n      年度考核目标任务：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:19}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.assessmentTargetTask,callback:function(t){e.$set(e.indexConfigForm,"assessmentTargetTask",t)},expression:"indexConfigForm.assessmentTargetTask"}})]],2)],1),a("el-row",{staticClass:"table-row-textarea-height"},[a("el-col",{staticClass:"row-title-textarea textAlignCenter",attrs:{span:5}},[e._v("\n      评分标准：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:19}},[[a("el-input",{attrs:{disabled:!0,type:"textarea",rows:4},model:{value:e.indexConfigForm.scoreStandard,callback:function(t){e.$set(e.indexConfigForm,"scoreStandard",t)},expression:"indexConfigForm.scoreStandard"}})]],2)],1),e.indexConfigForm.isDistribute?e._e():a("el-row",{staticClass:"table-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:5}},[e._v("\n      指标分值：\n    ")]),a("el-col",{attrs:{span:7}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.targetScore,callback:function(t){e.$set(e.indexConfigForm,"targetScore",t)},expression:"indexConfigForm.targetScore"}})]],2),a("el-col",{staticClass:"row-title",attrs:{span:5}},[e._v("\n      责任单位:\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:7}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.cityLeadDepartment,callback:function(t){e.$set(e.indexConfigForm,"cityLeadDepartment",t)},expression:"indexConfigForm.cityLeadDepartment"}})]],2)],1),e.indexConfigForm.isDepartment?a("el-row",{staticClass:"table-row-textarea-height"},[a("el-col",{staticClass:"row-title-textarea",attrs:{span:5}},[e._v("\n      局落实进展情况：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:19}},[[a("el-input",{attrs:{disabled:e.indexConfigForm.departmentDisabled,type:"textarea",rows:4},model:{value:e.indexConfigForm.departmentImplementProgress,callback:function(t){e.$set(e.indexConfigForm,"departmentImplementProgress",t)},expression:"indexConfigForm.departmentImplementProgress"}})]],2)],1):e._e(),e.indexConfigForm.isDepartment&&!e.indexConfigForm.departmentDisabled?a("el-row",{staticClass:"table-row-textarea-height"},[a("el-col",{staticClass:"row-title-textarea",attrs:{span:5}},[e._v("\n      局落实依据：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:19}},[[a("el-upload",{ref:"fileUpd",staticClass:"upload-demo row-title-area",attrs:{action:"123","auto-upload":!1,"show-file-list":!1}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[a("em",{staticClass:"el-icon-plus"}),e._v("上传附件\n          ")])],1)]],2)],1):e._e(),e.indexConfigForm.isOffice?a("el-row",{staticClass:"table-row-textarea-height"},[a("el-col",{staticClass:"row-title-textarea",attrs:{span:5}},[e._v("\n      处落实进展情况：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:19}},[[a("el-input",{attrs:{disabled:e.indexConfigForm.officeDisabled,type:"textarea",rows:4},model:{value:e.indexConfigForm.officeImplementProgress,callback:function(t){e.$set(e.indexConfigForm,"officeImplementProgress",t)},expression:"indexConfigForm.officeImplementProgress"}})]],2)],1):e._e(),e.indexConfigForm.isOffice&&!e.indexConfigForm.officeDisabled?a("el-row",{staticClass:"table-row-textarea-height"},[a("el-col",{staticClass:"row-title-textarea",attrs:{span:5}},[e._v("\n      处落实依据：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:19}},[[a("el-upload",{ref:"fileUpd",staticClass:"upload-demo row-title-area",attrs:{action:"123","auto-upload":!1,"show-file-list":!1}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[a("em",{staticClass:"el-icon-plus"}),e._v("上传附件\n          ")])],1)]],2)],1):e._e(),e.indexConfigForm.isDistribute?a("el-row",{staticClass:"table-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:5}},[e._v("\n      省牵头部门：\n    ")]),a("el-col",{attrs:{span:7}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.provinceLeadDepartment,callback:function(t){e.$set(e.indexConfigForm,"provinceLeadDepartment",t)},expression:"indexConfigForm.provinceLeadDepartment"}})]],2),a("el-col",{staticClass:"row-title",attrs:{span:5}},[e._v("\n      省配合部门：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:7}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.provinceCoordinationDepartment,callback:function(t){e.$set(e.indexConfigForm,"provinceCoordinationDepartment",t)},expression:"indexConfigForm.provinceCoordinationDepartment"}})]],2)],1):e._e(),e.indexConfigForm.isDistribute?a("el-row",{staticClass:"table-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:5}},[e._v("\n      市牵头部门：\n    ")]),a("el-col",{attrs:{span:7}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.cityLeadDepartment,callback:function(t){e.$set(e.indexConfigForm,"cityLeadDepartment",t)},expression:"indexConfigForm.cityLeadDepartment"}})]],2),a("el-col",{staticClass:"row-title",attrs:{span:5}},[e._v("\n      市配合部门：\n    ")]),a("el-col",{staticClass:"borderRight",attrs:{span:7}},[[a("el-input",{attrs:{disabled:!0,type:"input"},model:{value:e.indexConfigForm.cityCoordinationDepartment,callback:function(t){e.$set(e.indexConfigForm,"cityCoordinationDepartment",t)},expression:"indexConfigForm.cityCoordinationDepartment"}})]],2)],1):e._e(),e.indexConfigForm.isDistribute?a("el-row",{staticClass:"table-row-height"},[a("el-col",{staticClass:"row-title",attrs:{span:5}},[e._v("\n      指标分派说明：\n    ")]),a("el-col",{staticClass:"borderRight",staticStyle:{color:"red"},attrs:{span:19}},[e._v("\n      请各市县根据自身实际情况落实市县级牵头部门及配合部门，未要求与国家牵头及配合部门做一致性对应关系。\n    ")])],1):e._e()],1)},[],!1,null,"0876afa6",null);t.a=n.exports},1096:function(e){e.exports=[{type:"date",label:"年度",name:"year",span:8,dateType:"year"},{type:"select",label:"考核内容",width:"170px",multiple:!1,placeHolder:"请选择",filterable:!0,name:"assessmentContent",data:[{value:"1",label:"一、确保耕地面积基本稳定、质量不下降，粮食生产稳定发展,粮食可持续生产能力不断增强"},{value:"2",label:"二、保护种粮积极性，财政对扶持粮食生产和流通的投入合理增长，提高种粮比较收益，落实粮食收购政策，不出现卖粮难问题"},{value:"3",label:"三、落实地方粮食储备，增强粮食仓储能力，加强监督管理，确保地方储备粮数量真实、质量安全"},{value:"4",label:"四、完善粮食调控和监管体系，保障粮食市场供应和价格基本稳定，不出现脱销断档，维护粮食市场秩序。完善粮食应急保障体系，及时处置突发事件，确保粮食应急供应"},{value:"5",label:"五、加强耕地污染防治，提高粮食质量安全检验监测能力和超标粮食处置能力，禁止不符合食品安全标准的粮食流入口粮市场"},{value:"6",label:"六、按照保障粮食安全的要求，落实农业、粮食等相关行政主管部门的职责任务，确保责任落实、人员落实"}],span:8},{type:"select",label:"重点考核事项",width:"170px",multiple:!1,placeHolder:"请选择",filterable:!0,name:"assessmentItems",data:[{value:"1",label:"（一）保护耕地"},{value:"2",label:"（二）提高粮食生产能力"}],span:8},{type:"select",label:"考核指标",multiple:!1,placeHolder:"请选择",filterable:!0,name:"assessmentTarget",data:[{value:"1",label:"1.耕地保有量；基本农田保护"},{value:"2",label:"2.耕地质量保护与提升；耕地质量监测网络"},{value:"3",label:"3.耕地质量等级情况"},{value:"4",label:"4.粮食生产科技水平"},{value:"5",label:"5.粮食种植面积；粮食总产量"},{value:"6",label:"6.产粮大县等粮食核心产区和育制种大县建设"},{value:"7",label:"7.高标准农田建设"},{value:"8",label:"8.农田水利设施建设；农业节水重大工程建设"},{value:"9",label:"9.落实粮食补贴政策"},{value:"10",label:"10.培育新型粮食生产经营主体及社会化服务体系"},{value:"11",label:"11.执行收购政策；安排收购网点"},{value:"12",label:"12.组织落实收购资金"},{value:"13",label:"13.仓储物流设施建设"},{value:"14",label:"14.仓储设施维修改造升级"},{value:"15",label:"15.落实国有粮食仓储物流设施保护制度"},{value:"16",label:"16.落实地方粮食储备；完善轮换管理和库存监管机制"},{value:"17",label:"17.落实储备费用、利息补贴和轮换补贴"},{value:"18",label:"18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备"},{value:"19",label:"19.维护粮食市场秩序，确保粮食市场基本稳定"},{value:"20",label:"20.落实粮食流通统计制度；加强粮食市场监测，及时发布粮食市场信息"},{value:"21",label:"21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业"},{value:"22",label:"22.耕地土壤污染防治"},{value:"23",label:"23.粮食生产禁止区划定"},{value:"24",label:"24.严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制"},{value:"25",label:"25.粮食质量安全监管机构及质量监测机构建设；粮食质量安全监管执法装备配备及检验监测业务经费保障；库存粮油质量监管"},{value:"26",label:"26.非产区及时足额安排粮食风险基金；粮食风险基金使用管理"},{value:"27",label:"27.保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制"}],span:8},{type:"select",label:"年度考核目标任务",width:"170px",multiple:!1,placeHolder:"请选择",filterable:!0,name:"assessmentTargetTask",data:[{value:"1",label:"1.耕地保有量；基本农田保护"},{value:"2",label:"2.耕地质量保护与提升；耕地质量监测网络"},{value:"3",label:"3.耕地质量等级情况"},{value:"4",label:"4.粮食生产科技水平"},{value:"5",label:"5.粮食种植面积；粮食总产量"},{value:"6",label:"6.产粮大县等粮食核心产区和育制种大县建设"},{value:"7",label:"7.高标准农田建设"},{value:"8",label:"8-1农田水利设施建设；农业节水重大工程建设"},{value:"9",label:"8-2农田水利设施建设；农业节水重大工程建设"},{value:"10",label:"8-3农田水利设施建设；农业节水重大工程建设"},{value:"11",label:"9.落实粮食补贴政策"},{value:"12",label:"10.培育新型粮食生产经营主体及社会化服务体系"},{value:"13",label:"11.执行收购政策；安排收购网点"},{value:"14",label:"12.组织落实收购资金"},{value:"15",label:"13.仓储物流设施建设"},{value:"16",label:"14-1仓储设施维修改造升级"},{value:"17",label:"14-2仓储设施维修改造升级"},{value:"18",label:"14-3仓储设施维修改造升级"},{value:"19",label:"14-4仓储设施维修改造升级"},{value:"20",label:"15.落实国有粮食仓储物流设施保护制度"},{value:"21",label:"16.落实地方粮食储备；完善轮换管理和库存监管机制"},{value:"22",label:"17.落实储备费用、利息补贴和轮换补贴"},{value:"23",label:"18.粮油供应网络建设；政策性粮食联网交易；完善粮食应急预案；粮食应急供应、加工网点及配套系统建设；落实成品粮油储备"},{value:"24",label:"19.维护粮食市场秩序，确保粮食市场基本稳定"},{value:"25",label:"20.落实粮食流通统计制度；加强粮食市场监测，及时发布粮食市场信息"},{value:"26",label:"21.深化国有粮食企业改革；发展混合所有制粮食经济；培育主食产业化龙头企业"},{value:"27",label:"22.耕地土壤污染防治"},{value:"28",label:"23.粮食生产禁止区划定"},{value:"29",label:"24-1严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制"},{value:"30",label:"24-2严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制"},{value:"31",label:"24-3严格实行粮食质量安全监管和责任追究制度；建立超标粮食处置长效机制"},{value:"32",label:"25.粮食质量安全监管机构及质量监测机构建设；粮食质量安全监管执法装备配备及检验监测业务经费保障；库存粮油质量监管"},{value:"33",label:"26.非产区及时足额安排粮食风险基金；粮食风险基金使用管理"},{value:"34",label:"27-1保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制"},{value:"35",label:"27-2保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制"},{value:"36",label:"27-3保障粮食安全各环节工作力量；细化农业、粮食等相关行政主管部门的责任，建立健全责任追究机制"}],span:8},{type:"select",label:"状态",width:"170px",multiple:!1,placeHolder:"请选择",filterable:!0,name:"status",data:[{value:"0",label:"无落实进展"},{value:"1",label:"有进展未查阅"},{value:"2",label:"有进展已查阅"}],span:8},{type:"date",label:"落实日期",name:"time",span:8,dateType:"daterange",dateRangeSeparator:"至",dateStartPlaceholder:"开始日期",dateEndPlaceholder:"结束日期",format:"yyyy-MM-dd",valueFormat:"yyyy-MM-dd"}]},"1cd9":function(e,t,a){"use strict";var l=a("b8cc");a.n(l).a},8515:function(e){e.exports=[{prop:"consultStatus",lable:"状态",propType:"statusDot"},{prop:"year",lable:"年度"},{prop:"assessmentTargetTask",lable:"年度考核目标任务"},{prop:"scoreStandard",lable:"评分标准"},{prop:"targetScore",lable:"分值"},{prop:"provinceLeadDepartment",lable:"省牵头部门"},{prop:"cityLeadDepartment",lable:"市牵头部门"},{prop:"implementProgress",lable:"落实进展情况"},{prop:"implementProgressDate",lable:"落实日期"},{prop:"option",lable:"操作",propType:"operateBtns",width:"150px"}]},"97a6":function(e){e.exports=[{flag:"save",size:"",icon:"",label:"立即查找",styleType:"primary"},{flag:"clear",size:"",icon:"",label:"清除",styleType:"primary"}]},b8cc:function(e,t,a){}}]);