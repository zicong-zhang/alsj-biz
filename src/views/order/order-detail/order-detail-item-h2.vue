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
  height: r(94px);
  background: #fff;
  border-bottom: r(2px) solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    line-height: r(94px);
    font-size: r(32px);
    color: #333;
    padding-left: r(14px);
    position: relative;
    &:before {
      content: "";
      width: r(4px);
      height: r(28px);
      border-radius: r(4px);
      background: #333;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &>span {
    display: block;
    width: r(100px);
    height: r(94px);
    line-height: r(94px);
    text-align: right;
  }
  i {
    font-size: r(22px);
    color: #c7c7c7;
  }
}
</style>
