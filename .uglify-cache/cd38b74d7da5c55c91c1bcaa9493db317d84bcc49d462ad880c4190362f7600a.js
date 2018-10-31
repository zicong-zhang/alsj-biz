{"source":"webpackJsonp([14],{AvNU:function(t,n,e){var o=e(\"ynUk\");\"string\"==typeof o&&(o=[[t.i,o,\"\"]]),o.locals&&(t.exports=o.locals);e(\"FIqI\")(\"9b813ad0\",o,!0,{})},IH96:function(t,n,e){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});var o=e(\"4YfN\"),a=e.n(o),i=e(\"9rMa\"),u={name:\"performance-target\",data:function(){return{maxLength:10,year:2018,id:\"\",janAmount:\"\",fabAmount:\"\",marAmount:\"\",aprAmount:\"\",mayAmount:\"\",junAmount:\"\",julAmount:\"\",augAmount:\"\",sepAmount:\"\",octAmount:\"\",novAmount:\"\",decAmount:\"\",total:\"0\"}},created:function(){this.getDataList()},methods:a()({},Object(i.mapActions)([\"getOnePerformanceTargetList\",\"updatePerformTargetList\",\"getStoreSaleTarget\"]),{showDatePicker:function(){var t=this;this.$DatePicker({confirm:function(n){t.year=n.getFullYear(),t.getDataList()}})},getDataList:function(){var t=this;this.getOnePerformanceTargetList(this.year).then(function(n){var e=n.data.merchantGoalExt;t.id=e.id,t.total=e.totalGoalAmount,t.setAmount(e)})},setAmount:function(t){this.formatNum(\"janAmount\",t.janAmount||0),this.formatNum(\"fabAmount\",t.fabAmount||0),this.formatNum(\"marAmount\",t.marAmount||0),this.formatNum(\"aprAmount\",t.aprAmount||0),this.formatNum(\"mayAmount\",t.mayAmount||0),this.formatNum(\"junAmount\",t.junAmount||0),this.formatNum(\"julAmount\",t.julAmount||0),this.formatNum(\"augAmount\",t.augAmount||0),this.formatNum(\"sepAmount\",t.sepAmount||0),this.formatNum(\"octAmount\",t.octAmount||0),this.formatNum(\"novAmount\",t.novAmount||0),this.formatNum(\"decAmount\",t.decAmount||0)},limitInput:function(t){this[t]=this[t].toString().replace(/\\D/g,\"\").slice(0,8)},formatNum:function(t,n){var e=void 0!==n?n:this[t];return this[t]=this.$utils.numInsertSymbol(e),this[t]},unFormatNum:function(t){this[t]=this[t].replace(/\\D/g,\"\")},updateTargetData:function(){var t=this;this.updatePerformTargetList(this.$data).then(function(){t.getStoreSaleTarget().then(function(){t.$Toast(\"修改成功\"),t.$utils.back()})})},cancel:function(){this.$utils.back()}})},m={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e(\"div\",{staticClass:\"view-performance-target\"},[e(\"v-header\",{attrs:{title:\"业绩目标\"}}),t._v(\" \"),e(\"div\",{staticClass:\"content\"},[e(\"i\",{staticClass:\"gap\"}),t._v(\" \"),e(\"div\",{staticClass:\"container\"},[e(\"header\",[e(\"div\",{staticClass:\"select-year\",on:{click:t.showDatePicker}},[e(\"span\",[t._v(\"月份\")]),t._v(\" \"),e(\"span\",[t._v(\"(\"+t._s(t.year)+\")\")]),t._v(\" \"),e(\"i\",{staticClass:\"icon i-bottom\"})]),t._v(\" \"),e(\"p\",[t._v(\"计划业绩金额(元)\")])]),t._v(\" \"),e(\"div\",{staticClass:\"edit-plan-list\"},[e(\"ul\",[e(\"li\",[e(\"label\",[t._v(\"1月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.janAmount,expression:\"janAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.janAmount},on:{input:[function(n){n.target.composing||(t.janAmount=n.target.value)},function(n){t.limitInput(\"janAmount\")}],focus:function(n){t.unFormatNum(\"janAmount\")},blur:function(n){t.formatNum(\"janAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"2月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.fabAmount,expression:\"fabAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.fabAmount},on:{input:[function(n){n.target.composing||(t.fabAmount=n.target.value)},function(n){t.limitInput(\"fabAmount\")}],focus:function(n){t.unFormatNum(\"fabAmount\")},blur:function(n){t.formatNum(\"fabAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"3月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.marAmount,expression:\"marAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.marAmount},on:{input:[function(n){n.target.composing||(t.marAmount=n.target.value)},function(n){t.limitInput(\"marAmount\")}],focus:function(n){t.unFormatNum(\"marAmount\")},blur:function(n){t.formatNum(\"marAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"4月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.aprAmount,expression:\"aprAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.aprAmount},on:{input:[function(n){n.target.composing||(t.aprAmount=n.target.value)},function(n){t.limitInput(\"aprAmount\")}],focus:function(n){t.unFormatNum(\"aprAmount\")},blur:function(n){t.formatNum(\"aprAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"5月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.mayAmount,expression:\"mayAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.mayAmount},on:{input:[function(n){n.target.composing||(t.mayAmount=n.target.value)},function(n){t.limitInput(\"mayAmount\")}],focus:function(n){t.unFormatNum(\"mayAmount\")},blur:function(n){t.formatNum(\"mayAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"6月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.junAmount,expression:\"junAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.junAmount},on:{input:[function(n){n.target.composing||(t.junAmount=n.target.value)},function(n){t.limitInput(\"junAmount\")}],focus:function(n){t.unFormatNum(\"junAmount\")},blur:function(n){t.formatNum(\"junAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"7月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.julAmount,expression:\"julAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.julAmount},on:{input:[function(n){n.target.composing||(t.julAmount=n.target.value)},function(n){t.limitInput(\"julAmount\")}],focus:function(n){t.unFormatNum(\"julAmount\")},blur:function(n){t.formatNum(\"julAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"8月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.augAmount,expression:\"augAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.augAmount},on:{input:[function(n){n.target.composing||(t.augAmount=n.target.value)},function(n){t.limitInput(\"augAmount\")}],focus:function(n){t.unFormatNum(\"augAmount\")},blur:function(n){t.formatNum(\"augAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"9月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.sepAmount,expression:\"sepAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.sepAmount},on:{input:[function(n){n.target.composing||(t.sepAmount=n.target.value)},function(n){t.limitInput(\"sepAmount\")}],focus:function(n){t.unFormatNum(\"sepAmount\")},blur:function(n){t.formatNum(\"sepAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"10月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.octAmount,expression:\"octAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.octAmount},on:{input:[function(n){n.target.composing||(t.octAmount=n.target.value)},function(n){t.limitInput(\"octAmount\")}],focus:function(n){t.unFormatNum(\"octAmount\")},blur:function(n){t.formatNum(\"octAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"11月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.novAmount,expression:\"novAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.novAmount},on:{input:[function(n){n.target.composing||(t.novAmount=n.target.value)},function(n){t.limitInput(\"novAmount\")}],focus:function(n){t.unFormatNum(\"novAmount\")},blur:function(n){t.formatNum(\"novAmount\")}}})]),t._v(\" \"),e(\"li\",[e(\"label\",[t._v(\"12月\")]),e(\"input\",{directives:[{name:\"model\",rawName:\"v-model\",value:t.decAmount,expression:\"decAmount\"}],attrs:{type:\"text\",placeholder:\"0\"},domProps:{value:t.decAmount},on:{input:[function(n){n.target.composing||(t.decAmount=n.target.value)},function(n){t.limitInput(\"decAmount\")}],focus:function(n){t.unFormatNum(\"decAmount\")},blur:function(n){t.formatNum(\"decAmount\")}}})])])]),t._v(\" \"),e(\"div\",{staticClass:\"year-amount-total\"},[e(\"span\",[t._v(\"全年\")]),t._v(\" \"),e(\"p\",[t._v(t._s(t.formatNum(\"total\")))])])]),t._v(\" \"),e(\"i\",{staticClass:\"gap\"})]),t._v(\" \"),e(\"div\",{staticClass:\"handle-btns\"},[e(\"p\",{on:{click:t.cancel}},[t._v(\"取消\")]),t._v(\" \"),e(\"p\",{on:{click:t.updateTargetData}},[t._v(\"确定目标\")])])],1)},staticRenderFns:[]};var r=e(\"C7Lr\")(u,m,!1,function(t){e(\"AvNU\")},null,null);n.default=r.exports},ynUk:function(t,n,e){(t.exports=e(\"UTlt\")(!1)).push([t.i,\"\\n.view-performance-target {\\n  display: -webkit-box;\\n  display: -webkit-flex;\\n  display: -moz-box;\\n  display: -ms-flexbox;\\n  display: flex;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -webkit-flex-flow: column;\\n     -moz-box-orient: vertical;\\n     -moz-box-direction: normal;\\n      -ms-flex-flow: column;\\n          flex-flow: column;\\n}\\n.view-performance-target .content {\\n    -webkit-box-flex: 1;\\n    -webkit-flex: 1;\\n       -moz-box-flex: 1;\\n        -ms-flex: 1;\\n            flex: 1;\\n    overflow-y: scroll;\\n    -webkit-overflow-scrolling: touch;\\n}\\n.view-performance-target .content::-webkit-scrollbar {\\n      display: none;\\n}\\n.view-performance-target .content header {\\n      height: 1.09333rem;\\n      display: -webkit-box;\\n      display: -webkit-flex;\\n      display: -moz-box;\\n      display: -ms-flexbox;\\n      display: flex;\\n      -webkit-box-pack: justify;\\n      -webkit-justify-content: space-between;\\n         -moz-box-pack: justify;\\n          -ms-flex-pack: justify;\\n              justify-content: space-between;\\n      -webkit-box-align: center;\\n      -webkit-align-items: center;\\n         -moz-box-align: center;\\n          -ms-flex-align: center;\\n              align-items: center;\\n      font-size: 0.32rem;\\n      border-bottom: 0.02667rem solid rgba(0, 0, 0, 0.06);\\n      color: #999;\\n      margin: 0 0.48rem;\\n      margin-bottom: 0.32rem;\\n}\\n.view-performance-target .container {\\n    background: #fff;\\n}\\n.view-performance-target .select-year {\\n    height: 100%;\\n    line-height: 1.09333rem;\\n}\\n.view-performance-target .edit-plan-list {\\n    padding: 0 0.48rem;\\n}\\n.view-performance-target .edit-plan-list .empty input {\\n      color: #333;\\n}\\n.view-performance-target .edit-plan-list li {\\n      display: -webkit-box;\\n      display: -webkit-flex;\\n      display: -moz-box;\\n      display: -ms-flexbox;\\n      display: flex;\\n      -webkit-box-pack: justify;\\n      -webkit-justify-content: space-between;\\n         -moz-box-pack: justify;\\n          -ms-flex-pack: justify;\\n              justify-content: space-between;\\n      -webkit-box-align: center;\\n      -webkit-align-items: center;\\n         -moz-box-align: center;\\n          -ms-flex-align: center;\\n              align-items: center;\\n      padding-bottom: 0.32rem;\\n}\\n.view-performance-target .edit-plan-list label {\\n      font-size: 0.32rem;\\n}\\n.view-performance-target .edit-plan-list input {\\n      width: 7.46667rem;\\n      height: 0.96rem;\\n      background: #f5f5f5;\\n      border-radius: 0.10667rem;\\n      -moz-box-sizing: border-box;\\n           box-sizing: border-box;\\n      color: #39f;\\n      font-size: 0.32rem;\\n      text-align: right;\\n      padding: 0.26667rem 0.32rem;\\n}\\n.view-performance-target .edit-plan-list input::-webkit-input-placeholder {\\n        color: #333;\\n}\\n.view-performance-target .year-amount-total {\\n    height: 1.09333rem;\\n    display: -webkit-box;\\n    display: -webkit-flex;\\n    display: -moz-box;\\n    display: -ms-flexbox;\\n    display: flex;\\n    -webkit-box-pack: justify;\\n    -webkit-justify-content: space-between;\\n       -moz-box-pack: justify;\\n        -ms-flex-pack: justify;\\n            justify-content: space-between;\\n    -webkit-box-align: center;\\n    -webkit-align-items: center;\\n       -moz-box-align: center;\\n        -ms-flex-align: center;\\n            align-items: center;\\n    font-size: 0.32rem;\\n    border-top: 0.01333rem solid rgba(0, 0, 0, 0.06);\\n    margin: 0 0.48rem;\\n}\\n.view-performance-target .handle-btns {\\n    height: 1.30667rem;\\n    display: -webkit-box;\\n    display: -webkit-flex;\\n    display: -moz-box;\\n    display: -ms-flexbox;\\n    display: flex;\\n}\\n.view-performance-target .handle-btns p {\\n      -webkit-box-flex: 1;\\n      -webkit-flex: 1;\\n         -moz-box-flex: 1;\\n          -ms-flex: 1;\\n              flex: 1;\\n      line-height: 1.30667rem;\\n      text-align: center;\\n      font-size: 0.42667rem;\\n      background: #fff;\\n}\\n.view-performance-target .handle-btns p:last-child {\\n        color: #fff;\\n        background: -webkit-gradient(linear, right top, left top, from(#2985ff), to(#3dadff));\\n        background: -webkit-linear-gradient(right, #2985ff, #3dadff);\\n        background: -moz- oldlinear-gradient(right, #2985ff, #3dadff);\\n        background: linear-gradient(to left, #2985ff, #3dadff);\\n}\\n\",\"\"])}});"}