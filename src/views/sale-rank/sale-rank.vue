<template>
  <div class="view-sale-rank">
    <VHeader title="销售排行榜" />

    <!-- 本月销售冠军 -->
    <div class="sale-champion">
      <img src="~~img/sale-rank/img_champion.png" />
      <div>
        <h4>·本月销售冠军·</h4>
        <h2 class="common-rmb">3,800,000</h2>
        <h3>刘大师</h3>
      </div>
    </div>

    <!-- 业绩排行 -->
    <div class="performance-rank rank-list">
      <div class="title">
        <h3>业绩排行</h3>
        <p>
          <span :class="{active: 1}">本月</span>
          <i></i>
          <span>上月</span>
        </p>
      </div>
      <ul>
        <li v-for="item in performanceList"
          :key="item.id">
          <h5>{{ item.nickname }}</h5>
          <p :style="{width: (item.amount / performanceList[0].amount) * 100 + '%'}"></p>
          <span>{{ $utils.formatNum(item.amount, 2) }}</span>
        </li>
      </ul>
    </div>

    <!-- 开单排行 -->
    <div class="bill-rank rank-list">
      <div class="title">
        <h3>
          <span>开单排行</span>
          <span>(新订单)</span>
        </h3>
        <p>
          <span :class="{active: 1}">本月</span>
          <i></i>
          <span>上月</span>
        </p>
      </div>
      <ul>
        <li v-for="item in billList"
          :key="item.id">
          <h5>{{ item.nickname }}</h5>
          <p :style="{width: (item.amount / billList[0].amount) * 100 + '%'}"></p>
          <span>{{ $utils.formatNum(item.amount, 2) }}</span>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
import { mapState } from "vuex";
import { getPerformanceRank, getBillRank } from "~apis/worker";

export default {
  name: "sale-champion",
  data() {
    return {
      currentMonth: 1,
      performanceList: [], // 业绩列表
      billList: [], // 开单列表
      date: {}
    };
  },
  computed: {
    ...mapState({
      merchantId: state => state.root.storeId
    })
  },
  created() {
    this.date = this.$utils.getDate("current");
    this.getPerformanceRank();
    this.getBillRank();
  },
  methods: {
    setReq() {
      let req = {
        merchantId: this.merchantId,
        year: this.date.year,
        month: 7
      };
      return req;
    },
    // 获取业绩排行
    getPerformanceRank() {
      getPerformanceRank(this.setReq()).then(res => {
        this.performanceList = res.data.list;
      });
    },
    // 获取开单排行
    getBillRank() {
      getBillRank(this.setReq()).then(res => {
        this.billList = res.data.list;
      });
    }
  }
};
</script>
<style lang="scss">
.view-sale-rank {
  .sale-champion {
    position: relative;
    margin-bottom: 16px;
    img {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
      height: 328px;
    }
    div {
      position: relative;
      z-index: 1;
      height: 328px;
      box-sizing: border-box;
      color: #fff;
      padding-top: 178px;
      display: flex;
      flex-flow: column;
      align-items: center;
    }
    h2 {
      font-weight: bold;
      font-size: 48px;
      margin-bottom: 6px;
    }
    h3 {
      font-size: 32px;
    }
    h4 {
      font-size: 24px;
      margin-bottom: 24px;
    }
  }
  .rank-list {
    background: #fff;
    padding: 0 36px;
    margin-bottom: 16px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding: 32px 0;
      h3 {
        position: relative;
        font-size: 32px;
        font-weight: bold;
        padding-left: 12px;
        &:before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 28px;
          background: #333;
          border-radius: 4px;
        }
        span {
          &:first-child {
            font-weight: bold;
          }
          &:last-child {
            color: #999;
          }
        }
      }
      p {
        width: 130px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
      }
      i {
        display: block;
        width: 2px;
        height: 24px;
        background: #c7c7c7;
      }
      .active {
        color: $main;
      }
    }
    ul {
      padding-top: 36px;
    }
    li {
      display: flex;
      align-items: center;
      padding-bottom: 36px;
      &:first-child {
        p {
          background: linear-gradient(to right, #f87566, #f23e36);
        }
        span {
          color: $red;
        }
      }
      p {
        width: 50%;
        height: 24px;
        background: linear-gradient(to right, #3dadff, #2985ff);
        border-radius: 24px;
        margin-right: 16px;
      }
      span {
        display: block;
        width: 110px;
        flex: none;
        color: $main;
        text-align: right;
      }
      h5 {
        flex: none;
        width: 90px;
        @include over(1);
        margin-right: 36px;
      }
    }
  }
}
</style>
