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
        <li v-for="(value, key, idx) in orderProgress"
          :key="value.id"
          :class="{finish: value.finish, doing: idx === orderDetailStatus}">
          <div>
            <h5>{{ value.name }}</h5>
            <i :class="{ dot: true, iconfont: true, 'icon-index-gou': value.finish && idx !== 0}"></i>
            <p v-if="value.orderStatus">
              <span v-html="replaceBr(value.createDate)"></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "OrderDetailItemProgress",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      orderProgress: state => state.OrderDetailModule.orderProgress
    }),
    ...mapGetters(['orderDetailStatus']),
    progress() {
      return;
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === "order-list" && to.name === 'order-detail') {
        console.log('33333333333333:_____', 33333333333333);
        this.getProgreess('route');
      }
    }
  },
  created() {
    this.getProgreess('created');
  },
  methods: {
    ...mapActions(["getOrderDetailProgress"]),
    replaceBr(date = "") {
      return date.replace(/\s/, "<br />").replace(/\-/g, ".");
    },
    getProgreess(a) {
      console.log('22222222:_____', a);
      this.$store.dispatch("getOrderDetailProgress");
    }
  }
};
</script>
<style lang="scss" scoped>
.order-detail-item-progress {
  background: linear-gradient(to right, #2985ff, #3dadff);
  margin-bottom: e(16px);
}
.title {
  display: flex;
  justify-content: space-between;
  color: #fff;
  border-bottom: e(1px) solid #fff;
  line-height: e(82px);
  margin: 0 e(36px);
  // padding-top: e(34px);
  // padding-bottom: e(24px);
  i {
    font-size: e(22px);
    &:first-child {
      margin-right: e(6px);
    }
  }
  p {
    flex: 1;
    line-height: e(82px);
    font-size: e(24px);
  }
}
.progress {
  width: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  ul {
    display: flex;
    width: e(1484px);
    padding: 0 e(76px);
    padding-top: e(97px);
    padding-bottom: e(105px);
  }
  li {
    flex: none;
    width: e(183px);
    &:last-child {
      width: e(16px);
      div {
        &:before {
          display: none;
        }
      }
    }
  }
  div {
    width: e(16px);
    height: e(16px);
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
      width: e(180px);
      height: e(4px);
      background: rgba(0, 0, 0, 0.2);
    }
  }
  h5,
  p {
    position: absolute;
    left: 50%;
    bottom: e(40px);
    transform: translate(-50%, 0);
    text-align: center;
    width: e(118px);
    color: #fff;
    font-size: e(24px);
    font-weight: normal;
    margin: 0;
  }
  p {
    font-size: e(20px);
    line-height: e(28px);
    bottom: auto;
    top: e(36px);
  }
  .finish {
    div {
      &:before {
        background: #fff;
      }
    }
  }
  .doing {
    i {
      box-shadow: 0 0 0 e(8px) rgba(255, 255, 255, 0.2);
    }
  }
}
.dot {
  display: block;
  width: e(16px);
  height: e(16px);
  background: #fff;
  border-radius: 50%;
  font-size: e(32px);
  position: relative;
  &:before {
    background: $main;
    border-radius: 50%;
    // border: e(2px) solid #fff;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
