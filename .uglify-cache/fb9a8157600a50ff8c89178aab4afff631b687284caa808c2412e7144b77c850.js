{"source":"webpackJsonp([15],{\"0u31\":function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});var i=t(\"KH7x\"),a=t.n(i),r=t(\"aA9S\"),o=t.n(r),l=t(\"4YfN\"),s=t.n(l),d=t(\"9rMa\"),c={name:\"view-edit-create-order\",data:function(){return{customerId:\"\",linkmanAddress:\"\",linkmanGender:\"\",linkmanName:\"\",linkmanPhone:\"\",orderType:\"\",sexText:\"\",sexList:[{values:[{text:\"男\",value:1},{text:\"女\",value:2}]}]}},created:function(){this.init()},methods:s()({},Object(d.mapActions)([\"createOrder\"]),{init:function(){var e=this.$route.query;o()(this.$data,e),this.sexText=1==e.linkmanGender?\"男\":\"女\"},selectSex:function(e){var n=a()(e,1)[0];this.sexText=n.text,this.linkmanGender=n.value},submit:function(){var e=this;this.createOrder({customerId:this.customerId,linkmanAddress:this.linkmanAddress,linkmanGender:this.linkmanGender,linkmanName:this.linkmanName,linkmanPhone:this.linkmanPhone,orderType:this.orderType}).then(function(n){e.$utils.go({name:\"order-detail\",query:{id:n.data.order.id}},\"replace\")})}})},m={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t(\"div\",{staticClass:\"view-edit-create-order\"},[t(\"v-header\",{attrs:{title:\"开单\"}}),e._v(\" \"),t(\"i\",{staticClass:\"gap\"}),e._v(\" \"),t(\"div\",{staticClass:\"content\"},[t(\"v-form\",{staticClass:\"form\"},[t(\"v-input\",{attrs:{label:\"联系人信息(必填)\",placeholder:\"请输入联系人姓名\",max:\"12\"},model:{value:e.linkmanName,callback:function(n){e.linkmanName=n},expression:\"linkmanName\"}}),e._v(\" \"),t(\"v-input\",{attrs:{placeholder:\"请输入联系人手机号码\",max:\"11\"},model:{value:e.linkmanPhone,callback:function(n){e.linkmanPhone=n},expression:\"linkmanPhone\"}}),e._v(\" \"),t(\"v-picker\",{attrs:{placeholder:\"请选择客户性别\",value:e.sexText,list:e.sexList,\"on-confirm\":e.selectSex}}),e._v(\" \"),t(\"v-input\",{attrs:{label:\"安装地址(必填)\",placeholder:\"请输入详细地址\",max:\"50\"},model:{value:e.linkmanAddress,callback:function(n){e.linkmanAddress=n},expression:\"linkmanAddress\"}})],1),e._v(\" \"),t(\"p\",{staticClass:\"create-order-btn\",on:{click:e.submit}},[e._v(\"确认开单\")])],1)],1)},staticRenderFns:[]};var f=t(\"C7Lr\")(c,m,!1,function(e){t(\"49cd\")},null,null);n.default=f.exports},\"49cd\":function(e,n,t){var i=t(\"FM42\");\"string\"==typeof i&&(i=[[e.i,i,\"\"]]),i.locals&&(e.exports=i.locals);t(\"FIqI\")(\"431573c8\",i,!0,{})},FM42:function(e,n,t){(e.exports=t(\"UTlt\")(!1)).push([e.i,\"\\n.view-edit-create-order {\\n  display: -webkit-box;\\n  display: -webkit-flex;\\n  display: -moz-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -webkit-flex-flow: column;\\n     -moz-box-orient: vertical;\\n     -moz-box-direction: normal;\\n      -ms-flex-flow: column;\\n          flex-flow: column;\\n}\\n.view-edit-create-order .gap {\\n    -webkit-box-flex: 0;\\n    -webkit-flex: none;\\n       -moz-box-flex: 0;\\n        -ms-flex: none;\\n            flex: none;\\n}\\n.view-edit-create-order .content {\\n    -webkit-box-flex: 1;\\n    -webkit-flex: 1;\\n       -moz-box-flex: 1;\\n        -ms-flex: 1;\\n            flex: 1;\\n    display: -webkit-box;\\n    display: -webkit-flex;\\n    display: -moz-box;\\n    display: -ms-flexbox;\\n    display: flex;\\n    -webkit-box-orient: vertical;\\n    -webkit-box-direction: normal;\\n    -webkit-flex-flow: column;\\n       -moz-box-orient: vertical;\\n       -moz-box-direction: normal;\\n        -ms-flex-flow: column;\\n            flex-flow: column;\\n    -webkit-box-pack: justify;\\n    -webkit-justify-content: space-between;\\n       -moz-box-pack: justify;\\n        -ms-flex-pack: justify;\\n            justify-content: space-between;\\n}\\n.view-edit-create-order .form {\\n    background: #fff;\\n    padding: 0 0.48rem;\\n    padding-bottom: 0.53333rem;\\n}\\n.view-edit-create-order .v-input,\\n  .view-edit-create-order .v-picker {\\n    margin-bottom: 0.32rem;\\n}\\n.view-edit-create-order .create-order-btn {\\n    line-height: 1.30667rem;\\n    background: -webkit-gradient(linear, left top, right top, from(#2985ff), to(#3dadff));\\n    background: -webkit-linear-gradient(left, #2985ff, #3dadff);\\n    background: -moz- oldlinear-gradient(left, #2985ff, #3dadff);\\n    background: linear-gradient(to right, #2985ff, #3dadff);\\n    color: #fff;\\n    font-size: 0.42667rem;\\n    text-align: center;\\n}\\n\",\"\"])}});"}