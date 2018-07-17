<template>
  <div class="order-detail-item-h2">
    <h3>{{ title }}</h3>
    <span>
      <slot></slot>
    </span>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: "OrderDetailItemH2",
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.order-detail-item-h2 {
  height: e(94px);
  background: #fff;
  border-bottom: e(2px) solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    line-height: e(94px);
    font-size: e(32px);
    color: #333;
    padding-left: e(14px);
    position: relative;
    &:before {
      content: "";
      width: e(4px);
      height: e(28px);
      border-radius: e(4px);
      background: #333;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &>span {
    display: block;
    width: e(100px);
    height: e(94px);
    line-height: e(94px);
    text-align: right;
  }
  i {
    font-size: e(22px);
    color: #c7c7c7;
  }
}
</style>
