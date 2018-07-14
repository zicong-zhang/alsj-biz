<template>
  <div class="order-detail-item-progress">
    <div class="title">
      <i class="iconfont icon-icon_my_orrders"></i>
      <p>
        <span>订单：</span>8555883654789</p>
      <i class="iconfont icon-rightBtn"></i>
    </div>
    <div class="progress">
      <ul>
        <li v-for="(val, key, idx) in progressList"
          :key="key"
          :class="{active: idx < info.orderStatus, doing: idx == info.orderStatus}">
          <div>
            <h5>{{ val.name }}</h5>
            <i :class="{ dot: true, iconfont: true, 'icon-index-gou': idx < info.orderStatus && idx !== 0}"></i>
            <p v-if="idx < info.orderStatus">
              <span v-html="replaceBr(val.date)"></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "OrderDetailItemProgress",
  data() {
    return {
      active: 3,
      progressList: {
        createDate: {
          name: "创建订单",
          date: ""
        },
        gagueMeasure: {
          name: "上门量尺",
          date: ""
        },
        design: {
          name: "设计方案",
          date: ""
        },
        signContract: {
          name: "签订合同",
          date: ""
        },
        repeatMeasure: {
          name: "复尺",
          date: ""
        },
        placeOrder: {
          name: "下单",
          date: ""
        },
        make: {
          name: "生产",
          date: ""
        },
        install: {
          name: "送货安装",
          date: ""
        },
        orderFinsih: {
          name: "订单已完成",
          date: ""
        }
      }
    };
  },
  computed: {
    ...mapState({
      info: state => state.OrderDetailModule.orderInfo
    })
  },
  methods: {
    replaceBr(date = "") {
      return date.replace(/\s/, "<br />").replace(/\-/g, ".");
    }
  }
};
</script>
<style lang="scss" scoped>
.order-detail-item-progress {
  background: linear-gradient(to right, #2985ff, #3dadff);
  margin-bottom: r(16px);
}
.title {
  display: flex;
  justify-content: space-between;
  color: #fff;
  border-bottom: 1px solid #fff;
  line-height: r(82px);
  margin: 0 r(36px);
  // padding-top: r(34px);
  // padding-bottom: r(24px);
  i {
    font-size: r(22px);
    &:first-child {
      margin-right: r(6px);
    }
  }
  p {
    flex: 1;
    line-height: r(82px);
    font-size: r(24px);
  }
}
.progress {
  width: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  ul {
    display: flex;
    width: r(1484px);
    padding: 0 r(76px);
    padding-top: r(97px);
    padding-bottom: r(105px);
  }
  li {
    flex: none;
    width: r(183px);
    &:last-child {
      width: r(16px);
      div {
        &:before {
          display: none;
        }
      }
    }
  }
  div {
    width: r(16px);
    height: r(16px);
    background: #fff;
    border-radius: 50%;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(100%, -50%);
      display: block;
      width: r(180px);
      height: r(4px);
      background: rgba(0, 0, 0, 0.2);
    }
  }
  h5,
  p {
    position: absolute;
    left: 50%;
    bottom: r(40px);
    transform: translate(-50%, 0);
    text-align: center;
    width: r(118px);
    color: #fff;
    font-size: r(24px);
    font-weight: normal;
    margin: 0;
  }
  p {
    font-size: r(20px);
    line-height: r(28px);
    bottom: auto;
    top: r(36px);
  }
  .active {
    div {
      &:before {
        background: #fff;
      }
    }
  }
  .doing {
    i {
      box-shadow: 0 0 0 r(8px) rgba(255, 255, 255, 0.2);
    }
  }
}
.dot {
  display: block;
  width: r(16px);
  height: r(16px);
  background: #fff;
  border-radius: 50%;
  font-size: r(32px);
  position: relative;
  &:before {
    background: $main;
    border-radius: 50%;
    // border: r(2px) solid #fff;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
