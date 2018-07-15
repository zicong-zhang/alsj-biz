<template>
  <div class="order-detail-item-remark">
    <H2 title="备注"></H2>
    <ul>
      <li>
        <div class="label">
          <h5>其他</h5>
          <span>2018.9.22 20:08:00</span>
        </div>
        <p>择浅灰色调作为主色调，然后用深浅不同的黄色作为亮色用在某一面墙上或者家具、织物上面，比如沙发、窗帘以及具有装饰性的开关插座等</p>
      </li>
      <li>
        <div class="label">
          <h5>其他</h5>
          <span>2018.9.22 20:08:00</span>
        </div>
        <p>择浅灰色调作为主色调，然后用深浅不同的黄色作为亮色用在某一面墙上或者家具、织物上面，比如沙发、窗帘以及具有装饰性的开关插座等</p>
      </li>
      <li>
        <div class="label">
          <h5>其他</h5>
          <span>2018.9.22 20:08:00</span>
        </div>
        <p>择浅灰色调作为主色调，然后用深浅不同的黄色作为亮色用在某一面墙上或者家具、织物上面，比如沙发、窗帘以及具有装饰性的开关插座等</p>
      </li>
    </ul>
    <p class="add-remark">
      <i class="iconfont icon-jiaru"></i>
      <span>添加备注</span>
    </p>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import { mapState } from "vuex";

export default {
  name: "OrderDetailItemRemark",
  components: {
    H2
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
.order-detail-item-remark {
  background: #fff;
  padding: 0 r(36px);
  padding-bottom: r(137px);
  ul {
    padding-top: r(24px);
  }
  li {
    background: RGBA(229, 242, 255, 1);
    border-radius: r(8px);
    padding: r(36px);
    margin-bottom: r(24px);
  }
  .label {
    display: flex;
  }
  h5, span {
    font-weight: normal;
    font-size: r(24px);
  }
  h5 {
    margin-bottom: r(16px);
  }
  p {
    font-size: r(24px);
    line-height: r(36px);
  }
}
.add-remark {
  height: r(118px);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: RGBA(229, 242, 255, 1);
  border-radius: r(8px);
  color: $main;
  i {
    font-size: r(30px);
    margin-bottom: r(6px);
  }
}
</style>
