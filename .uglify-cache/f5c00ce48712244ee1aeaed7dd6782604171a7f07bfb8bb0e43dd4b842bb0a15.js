{"source":"webpackJsonp([15],{\"3JIc\":function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});var r=t(\"KH7x\"),a=t.n(r),i=t(\"aA9S\"),l=t.n(i),o=t(\"4YfN\"),s=t.n(o),m=t(\"9rMa\"),d={linkmanName:[{regExp:\"name\",warn:\"请输入中文名\"}],linkmanPhone:[{regExp:\"phone\",warn:\"请输入正确的11位手机号\"}]},c=[{values:[{value:\"1\",text:\"男\"},{value:\"2\",text:\"女\"}]}],u={name:\"OrderEditCustomer\",data:function(){return{linkmanName:\"\",linkmanPhone:\"\",linkmanGender:\"\",linkmanAddress:\"\",linkmanBudget:\"\",rules:d,genderList:c,isShowPicker:!1,sexText:\"\"}},computed:s()({},Object(m.mapGetters)([\"orderInfo\",\"orderId\"])),created:function(){l()(this.$data,this.orderInfo),this.sexText=1===this.linkmanGender?\"男\":\"女\"},mounted:function(){},methods:s()({},Object(m.mapActions)([\"updateCustomerInfo\"]),{selectSex:function(e){var n=a()(e,1)[0];this.sexText=n.text,this.linkmanGender=n.value},submit:function(){var e=this;this.$refs.form.submit()&&this.updateCustomerInfo({linkmanAddress:this.linkmanAddress,linkmanBudget:this.linkmanBudget,linkmanGender:this.linkmanGender,linkmanName:this.linkmanName,linkmanPhon:this.linkmanPhone,orderId:this.orderId}).then(function(){e.$utils.back()})}})},f={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t(\"div\",{staticClass:\"order-edit-customer\"},[t(\"v-header\",{attrs:{title:\"客户信息\"}},[t(\"p\",{staticClass:\"save btn\",attrs:{slot:\"right-one\"},on:{click:e.submit},slot:\"right-one\"},[t(\"span\",[e._v(\"保存\")])])]),e._v(\" \"),t(\"div\",{staticClass:\"form\"},[t(\"i\",{staticClass:\"gap\"}),e._v(\" \"),t(\"v-form\",{ref:\"form\"},[t(\"v-input\",{attrs:{label:\"客户姓名\",placeholder:\"输入客户姓名\",max:\"15\",replace:\"cn\",required:\"客户姓名不能为空\",rule:e.rules.linkmanName},model:{value:e.linkmanName,callback:function(n){e.linkmanName=n},expression:\"linkmanName\"}}),e._v(\" \"),t(\"v-input\",{attrs:{label:\"联系电话\",placeholder:\"输入客户联系电话\",max:\"11\",replace:\"number\",rule:e.rules.linkmanPhone},model:{value:e.linkmanPhone,callback:function(n){e.linkmanPhone=n},expression:\"linkmanPhone\"}}),e._v(\" \"),t(\"v-picker\",{attrs:{label:\"性别\",value:e.sexText,list:e.genderList,\"on-confirm\":e.selectSex}}),e._v(\" \"),t(\"v-input\",{attrs:{label:\"详细地址\",placeholder:\"输入详细地址\",required:\"请输入详细地址\",max:\"30\"},model:{value:e.linkmanAddress,callback:function(n){e.linkmanAddress=n},expression:\"linkmanAddress\"}}),e._v(\" \"),t(\"v-input\",{attrs:{label:\"客户预算\",placeholder:0,required:\"请输入客户预算\",max:\"10\",replace:\"number\"},model:{value:e.linkmanBudget,callback:function(n){e.linkmanBudget=n},expression:\"linkmanBudget\"}},[t(\"span\",{staticClass:\"linkmanBudget\"},[e._v(\"元\")])])],1)],1)],1)},staticRenderFns:[]};var k=t(\"C7Lr\")(u,f,!1,function(e){t(\"BwhW\")},null,null);n.default=k.exports},BwhW:function(e,n,t){var r=t(\"HAbt\");\"string\"==typeof r&&(r=[[e.i,r,\"\"]]),r.locals&&(e.exports=r.locals);t(\"FIqI\")(\"7f118f66\",r,!0,{})},HAbt:function(e,n,t){(e.exports=t(\"UTlt\")(!1)).push([e.i,\"\\n.order-edit-customer {\\n  display: -webkit-box;\\n  display: -webkit-flex;\\n  display: -moz-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -webkit-flex-flow: column;\\n     -moz-box-orient: vertical;\\n     -moz-box-direction: normal;\\n      -ms-flex-flow: column;\\n          flex-flow: column;\\n  height: 100%;\\n  background: #fff;\\n}\\n.order-edit-customer .save {\\n    left: auto;\\n    right: 0;\\n    padding-right: 0.48rem;\\n}\\n.order-edit-customer .save span {\\n      display: block;\\n      width: 1.6rem;\\n      font-size: 0.32rem;\\n      line-height: 0.58667rem;\\n      color: #39f;\\n      text-align: center;\\n      border: 0.01333rem solid #39f;\\n      border-radius: 0.10667rem;\\n}\\n.order-edit-customer .form {\\n    -webkit-box-flex: 1;\\n    -webkit-flex: 1;\\n       -moz-box-flex: 1;\\n        -ms-flex: 1;\\n            flex: 1;\\n    background: #fff;\\n    position: relative;\\n}\\n.order-edit-customer .form > div {\\n      padding: 0 0.48rem;\\n}\\n.order-edit-customer .linkmanBudget {\\n    position: absolute;\\n    right: 0.32rem;\\n    top: 50%;\\n    -webkit-transform: translateY(-50%);\\n       -moz-transform: translateY(-50%);\\n        -ms-transform: translateY(-50%);\\n         -o-transform: translateY(-50%);\\n            transform: translateY(-50%);\\n    color: #c7c7c7;\\n    font-size: 0.32rem;\\n}\\n\",\"\"])}});"}