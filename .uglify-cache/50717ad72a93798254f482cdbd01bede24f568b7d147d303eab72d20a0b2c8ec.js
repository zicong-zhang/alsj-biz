{"source":"webpackJsonp([9],{LF0d:function(t,e,r){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var n={render:function(){var t=this.$createElement,e=this._self._c||t;return e(\"div\",{staticClass:\"edit-contract-item-upload\"},[e(\"v-form-label\",{attrs:{label:this.$attrs.label,warn:this.$attrs.warn}}),this._v(\" \"),e(\"v-upload\",{attrs:{files:this.$attrs.files,width:160}})],1)},staticRenderFns:[]};var a={name:\"EditContract\",components:{UploadContract:r(\"C7Lr\")({name:\"EditContractItemUpload\",data:function(){return{}}},n,!1,function(t){r(\"MrNo\")},null,null).exports},data:function(){return{payTypeList:[{text:\"线上付款\",value:1},{text:\"线下付款\",value:2}],orderAmount:\"\",contractList:[]}},methods:{}},o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(\"div\",{staticClass:\"edit-contract\"},[r(\"v-header\",{attrs:{title:\"录入合同信息\"}}),t._v(\" \"),r(\"i\",{staticClass:\"gap\"}),t._v(\" \"),r(\"v-form\",[r(\"v-picker\",{attrs:{label:\"付款方式\",title:\"付款方式\",list:[t.payTypeList],placeholder:\"请选择付款方式\",required:\"未选择付款方式\"}}),t._v(\" \"),r(\"v-input\",{attrs:{label:\"订单金额\",required:\"未输入金额\",placeholder:\"请输入定制合同金额\",max:\"10\"},model:{value:t.orderAmount,callback:function(e){t.orderAmount=e},expression:\"orderAmount\"}},[r(\"span\",{staticClass:\"order-amount\"},[t._v(\"元\")])]),t._v(\" \"),r(\"VDatePicker\",{attrs:{label:\"预计完成生产日期 \",required:\"未选择日期\",placeholder:\"请选择日期\"}}),t._v(\" \"),r(\"VDatePicker\",{attrs:{label:\"预计送货安装日期  \",required:\"未选择日期\",placeholder:\"请选择日期\"}}),t._v(\" \"),r(\"UploadContract\",{attrs:{files:t.contractList,label:\"上传定制合同 \",required:\"上传定制合同后，才进行订单款项的结算\"}})],1)],1)},staticRenderFns:[]};var s=r(\"C7Lr\")(a,o,!1,function(t){r(\"nTvg\")},null,null);e.default=s.exports},MrNo:function(t,e,r){var n=r(\"jZCt\");\"string\"==typeof n&&(n=[[t.i,n,\"\"]]),n.locals&&(t.exports=n.locals);r(\"FIqI\")(\"5671d714\",n,!0,{})},jZCt:function(t,e,r){(t.exports=r(\"UTlt\")(!1)).push([t.i,\"\\n.edit-contract-item-upload .upload-component {\\n  margin: 0 -0.48rem;\\n}\\n\",\"\"])},nTvg:function(t,e,r){var n=r(\"qGjM\");\"string\"==typeof n&&(n=[[t.i,n,\"\"]]),n.locals&&(t.exports=n.locals);r(\"FIqI\")(\"7f5a937e\",n,!0,{})},qGjM:function(t,e,r){(t.exports=r(\"UTlt\")(!1)).push([t.i,\"\\n.edit-contract {\\n  height: 100%;\\n  background: #39f;\\n}\\n.edit-contract .v-form {\\n    background: #fff;\\n    padding: 0 0.48rem;\\n    padding-bottom: 0.48rem;\\n}\\n.edit-contract .order-amount {\\n    font-size: 0.32rem;\\n    color: #c7c7c7;\\n    position: absolute;\\n    right: 0.32rem;\\n    top: 50%;\\n    -webkit-transform: translateY(-50%);\\n       -moz-transform: translateY(-50%);\\n        -ms-transform: translateY(-50%);\\n         -o-transform: translateY(-50%);\\n            transform: translateY(-50%);\\n}\\n.edit-contract .upload-wrapper {\\n    padding-top: 0.13333rem;\\n}\\n\",\"\"])}});"}