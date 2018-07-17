<template>
  <div class="order-detail-item-remark">
    <H2 title="备注"></H2>
    <ul>
      <li>
        <div class="label">
          <h5>其他</h5>
          <span>2018.9.22 20:08:00</span>
        </div>
        <p>aa222aa啊啊啊啊</p>
      </li>
      <li>
        <div class="label">
          <h5>其他</h5>
          <span>2018.9.22 20:08:00</span>
        </div>
        <p>aa222aa啊啊啊啊</p>
      </li>
      <li>
        <div class="label">
          <h5>其他</h5>
          <span>2018.9.22 20:08:00</span>
        </div>
        <p>aa222aa啊啊啊啊</p>
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
  padding: 0 e(36px);
  padding-bottom:e(137px);
  ul {
    padding-top:e(24px);
  }
  li {
    background: RGBA(229, 242, 255, 1);
    border-radius:e(8px);
    padding:e(36px);
    margin-bottom:e(24px);
  }
  .label {
    display: flex;
  }
  h5, span {
    font-weight: normal;
    font-size:e(24px);
  }
  h5 {
    margin-bottom:e(16px);
  }
  p {
    font-size:e(24px);
    line-height:e(36px);
  }
}
.add-remark {
  height:e(118px);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: RGBA(229, 242, 255, 1);
  border-radius:e(8px);
  color: $main;
  i {
    font-size:e(30px);
    margin-bottom:e(6px);
  }
}
</style>
