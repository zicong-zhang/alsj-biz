<template>
  <div class="view-sale-rank">
    <v-header title="销售排行榜" />

    <!-- 本月销售冠军 -->
    <div class="sale-champion">

      <!-- 背景 -->
      <img v-if="!championInfo.nickname"
        src="~~img/sale-rank/img_champion_grey.png"
        key="sale-rank-championInfo-none-bg" />
      <img v-else
        src="~~img/sale-rank/img_champion.png"
        key="sale-rank-championInfo-has-bg" />

      <div v-if="!championInfo.nickname"
        key="sale-rank-championInfo-none">
        <p>本月销售冠军将会在这里显示</p>
        <h3>冠军促单可及，继续加油！</h3>
      </div>
      <div v-else
        key="sale-rank-championInfo-has">
        <h4>·本月销售冠军·</h4>
        <h2 class="common-rmb">{{ championInfo.amount }}</h2>
        <h3>{{ championInfo.nickname }}</h3>
      </div>
    </div>

    <!-- 业绩排行 -->
    <div class="performance-rank rank-list">
      <div class="title">
        <h3>业绩排行</h3>
        <p>
          <span :class="{active: performanceMonth === 0}"
            @click="changeMonth('performanceMonth', 0)">本月</span>
          <i></i>
          <span :class="{active: performanceMonth === 1}"
            @click="changeMonth('performanceMonth', 1)">上月</span>
        </p>
      </div>
      <ul v-if="performanceList.length !== 0"
        key="performanceList-has">
        <li v-for="(item, idx) in performanceList"
          :key="'performanceList' + idx">
          <h5>{{ item.nickname }}</h5>
          <p ref="performanceList"></p>
          <span>{{ $utils.formatNum(item.amount, 2) }}</span>
        </li>
      </ul>
      <EmptyModule v-else
        key="performanceList-none" />
    </div>

    <!-- 开单排行 -->
    <div class="bill-rank rank-list">
      <div class="title">
        <h3>
          <span>开单排行</span>
          <span>(新订单)</span>
        </h3>
        <p>
          <span :class="{active: billMonth === 0}"
            @click="changeMonth('billMonth', 0)">本月</span>
          <i></i>
          <span :class="{active: billMonth === 1}"
            @click="changeMonth('billMonth', 1)">上月</span>
        </p>
      </div>
      <ul v-if="billList.length !== 0"
        key="billList-has">
        <li v-for="item in billList"
          :key="'billList' + item.staffId">
          <h5>{{ item.nickname }}</h5>
          <p ref="billList"></p>
          <span>{{ $utils.formatNum(item.amount, 2) }}</span>
        </li>
      </ul>
      <EmptyModule v-else
        key="billList-none" />
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex';
import EmptyModule from './sale-rank-item-empty';
import { getPerformanceRank, getBillRank, getCurrentMonthSaleChampion } from '~apis/worker';

export default {
  name: 'sale-champion',
  components: {
    EmptyModule,
  },
  data() {
    return {
      championInfo: {}, // 销售冠军信息
      // 月份切换 0 本月 1 上月
      performanceMonth: 0,
      billMonth: 0,
      // 排行列表
      performanceList: [], // 业绩列表
      billList: [], // 开单列表
      currentMonth: 1,
      date: {},
    };
  },
  computed: {
    ...mapState({
      merchantId: state => state.root.storeId,
    }),
  },
  watch: {
    performanceMonth(newVal) {
      const month = this.date.month;
      this.currentMonth = newVal === 0 ? month : month - 1;
      this.getPerformanceRank();
    },
    billMonth(newVal) {
      const month = this.date.month;
      this.currentMonth = newVal === 0 ? month : month - 1;
      this.getBillRank();
    },
  },
  created() {
    this.date = this.$utils.getDate('current');
    this.currentMonth = this.date.month;
    this.init();
  },
  methods: {
    init() {
      this.getChampionInfo();
      this.getPerformanceRank();
      this.getBillRank();
    },
    // 设置排行榜每人占比
    changeItem(list, name) {
      list.forEach((item, idx) => {
        this.setTtemWidth(item.amount, name, idx);
      });
    },
    // 设置排行榜占比长度
    setTtemWidth(amount, name, idx) {
      const firstItem = this[name][0];
      const scale = firstItem ? amount / firstItem.amount : 0;

      const refList = this.$refs[name];
      const width = refList[0].clientWidth;
      if (idx !== 0) {
        // 第一行固定为100%宽度
        refList[idx].style.width = this.$rem(width * scale * 2);
      } // *2 因为2倍图
    },
    // 改变选择月份
    changeMonth(name, idx) {
      if (this[name] !== idx) this[name] = idx;
    },
    // 设置请求参数
    setReq() {
      const req = {
        merchantId: this.merchantId,
        year: this.date.year,
        month: this.currentMonth,
      };
      return req;
    },
    // 获取业绩排行
    getPerformanceRank() {
      getPerformanceRank(this.setReq()).then(res => {
        const list = res.data.list;
        this.performanceList = list;
        this.$nextTick(() => this.changeItem(list, 'performanceList'));
      });
    },
    // 获取开单排行
    getBillRank() {
      getBillRank(this.setReq()).then(res => {
        const list = res.data.list;
        this.billList = list;
        this.$nextTick(() => this.changeItem(list, 'billList'));
      });
    },
    // 获取销售冠军信息
    getChampionInfo() {
      getCurrentMonthSaleChampion(this.merchantId).then(res => {
        this.championInfo = res.data.rankBO || {};
      });
    },
  },
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
    p {
      font-size: 20px;
      padding-top: 30px;
      margin-bottom: 16px;
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
          content: '';
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
      height: 36px;
      display: flex;
      align-items: center;
      padding-bottom: 36px;
      &:first-child {
        p {
          width: 100%;
          background: linear-gradient(to right, #f87566, #f23e36);
        }
        span {
          color: $red;
        }
      }
      p {
        height: 24px;
        background: linear-gradient(to right, #3dadff, #2985ff);
        border-radius: 24px;
        margin-right: 16px;
        transition: width 0.5s;
      }
      span {
        flex: none;
        color: $main;
      }
      h5 {
        flex: none;
        width: 90px;
        height: 36px;
        line-height: 36px;
        font-size: 20px;
        box-sizing: border-box;
        @include over(1);
        padding-top: 4px;
        margin-right: 36px;
      }
    }
  }
}
</style>
