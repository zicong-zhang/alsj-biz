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
        <li v-for="(item, idx) in progressList"
          :key="idx"
          :class="{active: idx < active, doing: idx == active}">
          <div>
            <h5>{{ item.name }}</h5>
            <i></i>
            <p v-if="idx < active">
              <span v-html="replaceBr(item.date)"></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "OrderDetailItemProgress",
  data() {
    return {
      active: 3,
      progressList: [
        {
          name: "创建订单",
          date: "2018-05-14 00:00:00"
        },
        {
          name: "上门量尺",
          date: ""
        },
        {
          name: "设计方案",
          date: ""
        },
        {
          name: "签订合同",
          date: ""
        },
        {
          name: "复尺",
          date: ""
        },
        {
          name: "下单",
          date: ""
        },
        {
          name: "生产",
          date: ""
        },
        {
          name: "送货安装",
          date: ""
        },
        {
          name: "订单已完成",
          date: ""
        }
      ]
    };
  },
  methods: {
    replaceBr(date = "") {
      return date.replace(/\s/, "<br />").replace(/\-/g, '.');
    }
  }
};
</script>
<style lang="scss" scoped>
.order-detail-item-progress {
  background: linear-gradient(to right, #2985ff, #3dadff);
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
  i {
    display: block;
    width: r(16px);
    height: r(16px);
    background: #fff;
    border-radius: 50%;
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
</style>
