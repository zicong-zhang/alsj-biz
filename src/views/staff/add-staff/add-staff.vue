<template>
  <div class="view-add-staff flex">
    <v-header title="添加店员" />
    <div class="centent">
      <div class="qr-code-container">
        <img src="~~img/staff/icon_addShopAssistant_boss.png" />
        <h2>店长二维码</h2>
        <p>使用微信、QQ、支付宝等APP扫码加入店铺</p>
        <div class="qr-code"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'view-add-staff',
  data() {
    return {

    }
  },
}
</script>
<style lang="scss">
.view-add-staff {
  background: $main !important;
}
</style>
