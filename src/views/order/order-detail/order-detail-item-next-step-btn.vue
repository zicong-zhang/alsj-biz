<template>
  <div class="order-detail-item-next-step-btn" @click="nextStep">
    <p>{{ text }}</p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'OrderDetailItemNextStepBtn',
  computed: {
    ...mapGetters([
      'orderDetailStatus' // 订单状态
    ]),
    text() {
      let txt = '';
      switch(this.orderDetailStatus) {
        case 1:
          txt = '完成量尺';
          break;
        case 2:
          txt = '确认设计方案';
          break;
        case 3:
          txt = '签订合同';
          break;
        case 4:
          txt = '完成复尺';
          break;
        case 5:
          txt = '完成下单';
          break;
        case 6:
          txt = '完成生产';
          break;
        case 7:
          txt = '完成送货安装';
          break;
        case 8:
          txt = '完成量尺8';
          break;
      }
      return txt;
    }
  },
  methods: {
    ...mapActions(['updateOrderDetailStatus']), // 更新订单进度
    // 下一步
    nextStep() {
      let txt = '';
      // 进行不同弹窗
      switch(this.orderDetailStatus) {
        case 1:
          txt = '完成量尺';
          break;
        case 2:
          txt = '确认设计方案';
          break;
        case 3:
          txt = '签订合同';
          return this.toEditContract();
        case 4:
          txt = '完成复尺';
          break;
        case 5:
          txt = '完成下单';
          break;
        case 6:
          txt = '完成生产';
          break;
        case 7:
          txt = '完成送货安装';
          break;
        case 8:
          txt = '完成量尺8';
          break;
      }
      this.updateOrderDetailStatus().then(() => {
        this.$toast(txt);
      })
    },
    // 去录入合同信息
    toEditContract() {
      this.$store.commit('TURN', 'on');
      this.$router.push({
        name: 'order-edit-contract'
      })
    }
  }
}
</script>
<style lang="scss">
.order-detail-item-next-step-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98px;
  background: linear-gradient(to right, #3DADFF, #2985FF);
  font-size: 32px;
  color: #fff;
  letter-spacing: 1px;
  /* position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10; */
}
</style>
