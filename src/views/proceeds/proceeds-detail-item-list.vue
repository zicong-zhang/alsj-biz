<template>
  <div class="proceeds-detail-item-list">
    <div class="container">
      <h2>实收明细</h2>
      <ul>
        <li v-for="item in list"
          :key="item.id">
          <i class="horizon-bar"></i>
          <div>
            <div class="description">
              <h3>收到({{ item.customerName }}) {{ item.remark }}</h3>
              <span>{{ (item.payDate || '').slice(5, 10) }}</span>
            </div>
            <div class="acount">
              <h4 class="retainage">+{{ $utils.formatNum(item.amount) }}</h4>
              <span>{{ item.staffName }}跟进</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'proceeds-detail-item-list',
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getAllDetail();
  },
  methods: {
    getAllDetail() {
      this.$http('/statistic/getAllReceiptItemList', {
        merchantId: 1,
        month: 6,
        pageNum: 1,
        pageSize: 40,
        year: 2018,
      }).then((res) => {
        this.list = res.data.list;
      });
    },
  },
};
</script>
<style lang="scss">
.proceeds-detail-item-list {
  flex: 1;
  @include scroll(y);
  h2 {
    background: #fff;
    font-size: 32px;
    font-weight: bold;
    padding: 32px 0;
    padding-left: 48px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: 36px;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      width: 4px;
      height: 28px;
      background: #333;
      border-radius: 4px;
    }
  }
  ul {
    background: #fff;
    padding: 0 36px;
  }
  li {
    & > div {
      display: flex;
      justify-content: space-between;
      padding: 32px 0;
    }
  }
  h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 18px;
  }
  h4 {
    font-size: 32px;
    color: $main;
    margin-bottom: 12px;
  }
  span {
    color: #999;
    font-size: 24px;
  }
  .horizon-bar {
    background: #e4e4e4;
  }
  .retainage {
    color: $red;
  }
  .acount {
    text-align: right;
  }
}
</style>
