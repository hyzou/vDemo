(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-263ce1d8"],{"01f9":function(t,e,a){"use strict";var o=a("2d00"),r=a("5ca1"),n=a("2aba"),s=a("32e9"),i=a("84f2"),l=a("41a0"),c=a("7f20"),u=a("38fd"),p=a("2b4c")("iterator"),d=!([].keys&&"next"in[].keys()),m="@@iterator",f="keys",h="values",v=function(){return this};t.exports=function(t,e,a,y,g,b,C){l(a,e,y);var S,P,T,q=function(t){if(!d&&t in _)return _[t];switch(t){case f:return function(){return new a(this,t)};case h:return function(){return new a(this,t)}}return function(){return new a(this,t)}},x=e+" Iterator",I=g==h,$=!1,_=t.prototype,O=_[p]||_[m]||g&&_[g],k=O||q(g),N=g?I?q("entries"):k:void 0,L="Array"==e&&_.entries||O;if(L&&(T=u(L.call(new t)),T!==Object.prototype&&T.next&&(c(T,x,!0),o||"function"==typeof T[p]||s(T,p,v))),I&&O&&O.name!==h&&($=!0,k=function(){return O.call(this)}),o&&!C||!d&&!$&&_[p]||s(_,p,k),i[e]=k,i[x]=v,g)if(S={values:I?k:q(h),keys:b?k:q(f),entries:N},C)for(P in S)P in _||n(_,P,S[P]);else r(r.P+r.F*(d||$),e,S);return S}},"38fd":function(t,e,a){var o=a("69a8"),r=a("4bf8"),n=a("613b")("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),o(t,n)?t[n]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},"41a0":function(t,e,a){"use strict";var o=a("2aeb"),r=a("4630"),n=a("7f20"),s={};a("32e9")(s,a("2b4c")("iterator"),function(){return this}),t.exports=function(t,e,a){t.prototype=o(s,{next:r(1,a)}),n(t,e+" Iterator")}},"80c0":function(t,e,a){"use strict";a.r(e);a("cadf"),a("ac4d"),a("ac6a");var o={name:"addEquipment",components:{myheader:function(){return a.e("chunk-2325facc").then(a.bind(null,"8c2e"))},mySelect:function(){return a.e("chunk-2d0f0109").then(a.bind(null,"9b7a"))}},data:function(){return{saveCannotClick:!1,requiredFormKey:[{key:"controllerName",formName:"分机名"},{key:"connectionType",formName:"连接类型"},{key:"protocolType",formName:"协议类型"}],showSerial:!1,headerOptionSettings:{hideleft:!1,title:"设备分机",routePath:this.$route.query.eqpId?"home":"selectEqumentType"},connectTpyeOptionSettings:{cellTitle:"连接类型",cellIcon:"",cellValue:"请选择▼",valueKey:"label",slots:[{flex:1,values:this.$store.getters.connectTpyeDatas,className:"slot1",textAlign:"center",defaultIndex:0}]},serialPortOptionSettings:{cellTitle:"串口",cellIcon:"",cellValue:"请选择▼",valueKey:"label",slots:[{flex:1,values:this.$store.getters.serialPortDatas,className:"slot1",textAlign:"center",defaultIndex:0}]},protocolOptionSettings:{cellTitle:"协议类型",cellIcon:"",cellValue:"请选择▼",valueKey:"label",slots:[{flex:1,values:this.$store.getters.protocolDatas[this.$route.query.testType],className:"slot1",textAlign:"center",defaultIndex:0}]},formdata:{storePointId:this.$store.getters.userInfo.storePointId,controllerId:this.$route.query.eqpId?this.$route.query.eqpId:"",channelParameter:"",testType:this.$route.query.testEquipment,controllerName:"",connectionType:"tcp",connectTpye_dsc:"",serialPort:"",serialPort_dsc:"",host:"",port:"",protocolType:"",protocol_dsc:"",protocolParameter:{},controllerType:this.$route.query.testType},paramlist:[],controllerId:this.$route.query.eqpId?this.$route.query.eqpId:"",protocolParams:null}},methods:{handleCommentFocus:function(){this.saveCannotClick=!0},handleGetConnectTpyeValue:function(t){var e=this;e.formdata.connectionType=t[0].value,e.connectTpyeOptionSettings.cellValue=t[0].label+"▼",e.formdata.connectTpye_dsc=t[0].label,e.formdata.serialPort=this.$store.getters.serialPortDatas[0].value},handleGetProtocolValue:function(t){var e=this;setTimeout(function(){e.formdata.protocolType=t[0].value,e.protocolOptionSettings.cellValue=t[0].label+"▼",e.formdata.protocol_dsc=t[0].label,e.formdata.protocolParameter={},e.paramlist=e.$store.getters.protocolParamsDatas[t[0].value].paramList,e.paramlist.map(function(t){e.protocolParams&&e.protocolParams[t.paramName]?e.formdata.protocolParameter[t.paramName]=e.protocolParams[t.paramName]:e.formdata.protocolParameter[t.paramName]||(e.formdata.protocolParameter[t.paramName]="")})},100)},handleGetSerialPortValue:function(t){var e=this;e.formdata.serialPort=t[0].value,e.serialPortOptionSettings.cellValue=t[0].label+"▼",e.formdata.serialPort_dsc=t[0].label},handleSaveEqpInfo:function(t){var e=this,a="",o={};for(var r in this.formdata.protocolParameter)this.formdata.protocolParameter[r]||delete this.formdata.protocolParameter[r];var n=!0,s=!1,i=void 0;try{for(var l,c=this.paramlist[Symbol.iterator]();!(n=(l=c.next()).done);n=!0){var u=l.value;if(!this.formdata.protocolParameter[u.paramName]&&"true"==u.paramRequired)return this.$messagebox.alert("请完善必填项","提示"),!1}}catch(b){s=!0,i=b}finally{try{n||null==c.return||c.return()}finally{if(s)throw i}}var p=!0,d=!1,m=void 0;try{for(var f,h=this.requiredFormKey[Symbol.iterator]();!(p=(f=h.next()).done);p=!0){var v=f.value;if(!this.formdata[v.key])return this.$messagebox.alert("请完善必填项","提示"),!1}}catch(b){d=!0,m=b}finally{try{p||null==h.return||h.return()}finally{if(d)throw m}}if(this.formdata.controllerType=this.$route.query.testType,"serial"==this.formdata.connectionType){if(this.formdata.host="localhost",this.formdata.port=this.formdata.serialPort,!this.formdata.port)return this.$messagebox.alert("请完善必填项","提示"),!1}else{if(!this.formdata.port||!this.formdata.host)return this.$messagebox.alert("请完善必填项","提示"),!1;var y=/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,g=/^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;if(!y.test(this.formdata.port))return this.$messagebox.alert("端口号只能填写数字","提示"),!1;if(!g.test(this.formdata.host))return this.$messagebox.alert("IP地址格式校验不通过","提示"),!1}this.$route.query.eqpId?(a=this.$api.updateControllerConfig,o.controllerId=this.$route.query.eqpId,o.testControllerDto=this.formdata):(a=this.$api.saveControllerConfig,o=this.formdata),this.$postData(a,o).then(function(a){if("save"==t)e.$router.push("home");else{var o=JSON.parse(JSON.stringify(e.$route.query));o.eqpId||(o.eqpId=a.data),e.$router.push({path:"equipmentList",query:o})}})},getControllerConfig:function(){var t=this;this.$postData(this.$api.getControllerConfig,{controllerId:this.$route.query.eqpId,storePointId:this.$store.getters.userInfo.storePointId}).then(function(e){e.data.controllerId=t.$route.query.eqpId?t.$route.query.eqpId:"",e.data.channelParameter="",t.protocolParams=e.data.testControllerDto.protocolParameter,t.formdata=e.data.testControllerDto,t.controllerId=e.data.controllerId,"serial"===t.formdata.connectionType&&(t.formdata.serialPort=t.formdata.port,t.formdata.port="");for(var a=0;a<t.connectTpyeOptionSettings.slots[0].values.length;a++)if(t.connectTpyeOptionSettings.slots[0].values[a].value==t.formdata.connectionType){t.connectTpyeOptionSettings.slots[0].defaultIndex=a;break}for(var o=0;o<t.serialPortOptionSettings.slots[0].values.length;o++)if(t.serialPortOptionSettings.slots[0].values[o].value==t.formdata.serialPort){t.serialPortOptionSettings.slots[0].defaultIndex=o;break}for(var r=0;r<t.protocolOptionSettings.slots[0].values.length;r++)if(t.protocolOptionSettings.slots[0].values[r].value==t.formdata.protocolType){t.protocolOptionSettings.slots[0].defaultIndex=r;break}setTimeout(function(){t.saveCannotClick=!1},500)})}},watch:{formdata:{handler:function(){this.saveCannotClick=!0},deep:!0}},mounted:function(){var t=this;this.$route.query.eqpId?this.getControllerConfig():setTimeout(function(){t.saveCannotClick=!1},500)}},r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"manage"},[a("myheader",{attrs:{myheaderOption:t.headerOptionSettings}}),t._v(" "),a("div",{staticClass:"bgfff"},[a("div",{staticClass:"positionRel"},[a("span",{staticClass:"positionAbs text-danger symbolRequired"},[t._v("*")]),t._v(" "),a("mt-field",{attrs:{label:"分机名",placeholder:"请输入分机名"},model:{value:t.formdata.controllerName,callback:function(e){t.$set(t.formdata,"controllerName",e)},expression:"formdata.controllerName"}})],1),t._v(" "),a("div",{staticClass:"positionRel"},[a("span",{staticClass:"positionAbs text-danger symbolRequired"},[t._v("*")]),t._v(" "),a("mySelect",{attrs:{mySelectOption:t.connectTpyeOptionSettings},on:{myselectChange:t.handleGetConnectTpyeValue}})],1),t._v(" "),a("div",{staticClass:"positionRel"},[a("span",{staticClass:"positionAbs text-danger symbolRequired"},[t._v("*")]),t._v(" "),a("mySelect",{directives:[{name:"show",rawName:"v-show",value:"tcp"!==t.formdata.connectionType,expression:"formdata.connectionType !== 'tcp'"}],attrs:{mySelectOption:t.serialPortOptionSettings},on:{myselectChange:t.handleGetSerialPortValue}})],1),t._v(" "),a("div",{staticClass:"positionRel"},[a("span",{staticClass:"positionAbs text-danger symbolRequired"},[t._v("*")]),t._v(" "),a("mt-field",{directives:[{name:"show",rawName:"v-show",value:"tcp"==t.formdata.connectionType,expression:"formdata.connectionType == 'tcp'"}],attrs:{label:"IP地址",placeholder:"请输入分机地址"},model:{value:t.formdata.host,callback:function(e){t.$set(t.formdata,"host",e)},expression:"formdata.host"}})],1),t._v(" "),a("div",{staticClass:"positionRel"},[a("span",{staticClass:"positionAbs text-danger symbolRequired"},[t._v("*")]),t._v(" "),a("mt-field",{directives:[{name:"show",rawName:"v-show",value:"tcp"==t.formdata.connectionType,expression:"formdata.connectionType == 'tcp'"}],attrs:{label:"端口",placeholder:"请输入端口"},model:{value:t.formdata.port,callback:function(e){t.$set(t.formdata,"port",e)},expression:"formdata.port"}})],1),t._v(" "),a("div",{staticClass:"positionRel"},[a("span",{staticClass:"positionAbs text-danger symbolRequired"},[t._v("*")]),t._v(" "),a("mySelect",{attrs:{mySelectOption:t.protocolOptionSettings},on:{myselectChange:t.handleGetProtocolValue}})],1),t._v(" "),t._l(t.paramlist,function(e){return a("div",{key:e.paramName,staticClass:"positionRel"},["true"==e.paramRequired?a("span",{staticClass:"positionAbs text-danger symbolRequired"},[t._v("\n        *\n      ")]):t._e(),t._v(" "),a("mt-field",{attrs:{label:e.paramDesc,placeholder:"请输入"},nativeOn:{"!focus":function(e){return t.handleCommentFocus(e)}},model:{value:t.formdata.protocolParameter[e.paramName],callback:function(a){t.$set(t.formdata.protocolParameter,e.paramName,a)},expression:"formdata.protocolParameter[param.paramName]"}})],1)})],2),t._v(" "),a("div",{staticClass:"largeBtnContainer mt10 mb10"},[a("mt-button",{attrs:{size:"large",type:"primary",disabled:!t.saveCannotClick},nativeOn:{click:function(e){return t.handleSaveEqpInfo("save")}}},[t._v("\n      保存并返回\n    ")])],1),t._v(" "),a("div",{staticClass:"largeBtnContainer"},[a("mt-button",{attrs:{size:"large",type:"primary"},nativeOn:{click:function(e){return t.handleSaveEqpInfo("test")}}},[t._v("\n      下一步\n    ")])],1)],1)},n=[],s=a("2455"),i=!1,l=null,c=null,u=null,p=Object(s["a"])(o,r,n,i,l,c,u);e["default"]=p.exports},"9c6c":function(t,e,a){var o=a("2b4c")("unscopables"),r=Array.prototype;void 0==r[o]&&a("32e9")(r,o,{}),t.exports=function(t){r[o][t]=!0}},ac4d:function(t,e,a){a("3a72")("asyncIterator")},ac6a:function(t,e,a){for(var o=a("cadf"),r=a("0d58"),n=a("2aba"),s=a("7726"),i=a("32e9"),l=a("84f2"),c=a("2b4c"),u=c("iterator"),p=c("toStringTag"),d=l.Array,m={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},f=r(m),h=0;h<f.length;h++){var v,y=f[h],g=m[y],b=s[y],C=b&&b.prototype;if(C&&(C[u]||i(C,u,d),C[p]||i(C,p,y),l[y]=d,g))for(v in o)C[v]||n(C,v,o[v],!0)}},cadf:function(t,e,a){"use strict";var o=a("9c6c"),r=a("d53b"),n=a("84f2"),s=a("6821");t.exports=a("01f9")(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,a=this._i++;return!t||a>=t.length?(this._t=void 0,r(1)):r(0,"keys"==e?a:"values"==e?t[a]:[a,t[a]])},"values"),n.Arguments=n.Array,o("keys"),o("values"),o("entries")},d53b:function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}}}]);