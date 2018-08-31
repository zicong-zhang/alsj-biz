<template>
  <div class="view-customer-info">
    <v-header title="客户详情" />
    <div class="content">
      <div class="customer-label">
        <img src="~~img/placeholder_user.png" />
        <div class="customer-info">
          <h4>
            <span>苏睿</span>
            <img src="~~img/customer/man.png" />
          </h4>
          <p class="label">平台客户</p>
        </div>
        <p class="talk-btn">在线沟通</p>
      </div>
      <div class="base-info">
        <h3>基本信息</h3>
        <div class="infos">
          <v-infoList label="客户手机"
            value="133 3239 2929" />
          <v-infoList label="联系地址"
            value="广东省广州市黄埔区科学大道科汇金谷一街16号" />
          <v-infoList label="登记时间"
            value="2018-02-11 09:33:20" />
          <v-infoList label="登记人员"
            value="陈晓春" />
          <v-infoList label="备注信息"
            value="最多八十字的备注啊啊最多八十字的备注啊啊最多八十字的备注啊啊最多八十字的备注啊啊最多八十字的备注啊啊最多八十字的备注啊啊最多八十字的备注啊啊最多八十字的备注啊啊" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "view-customer-info",
  data() {
    return {};
  }
};
</script>
