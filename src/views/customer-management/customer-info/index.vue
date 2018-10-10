<template>
  <div class="view-customer-info">
    <v-header title="客户详情" />

    <div class="content">
      <v-scroll :enabled="nextOrderList"
        :on-refresh="init"
        :on-load="getCustomerOrder">
        <div class="scroll-container">

          <div class="customer-label">
            <v-img :src="customerInfo.avatar"
              error-type="user" />
            <div class="customer-info">
              <h4>
                <span>{{ customerInfo.name }}</span>
                <img v-if="customerInfo.sex === 1"
                  src="~~img/customer/man.png" />
                <img v-if="customerInfo.sex === 2"
                  src="~~img/customer/woman.png" />
              </h4>
              <p v-if="customerInfo.type === 1"
                key="pf"
                class="label-pf">平台客户</p>
              <p v-else
                key="no-pf"
                class="label-pf label-no-pf">非平台客户</p>
            </div>
            <p class="talk-btn">在线沟通</p>
          </div>
          <i class="gap"></i>
          <div class="base-info">
            <h3>基本信息</h3>
            <div class="infos">
              <v-cell label="客户手机"
                align="left"
                :value="customerInfo.mobile | phone" />
              <v-cell label="联系地址"
                align="left"
                line="1"
                :value="customerInfo.address" />
              <v-cell label="登记时间"
                align="left"
                :value="customerInfo.createDate" />
              <v-cell label="登记人员"
                align="left"
                :value="customerInfo.createUserNickname" />
              <v-cell label="备注信息"
                align="left"
                line="3"
                :value="customerInfo.remark || '无'" />
            </div>
          </div>
          <i class="gap"></i>
          <div class="related-order">
            <OrderListItem v-for="item in orderList"
              :key="item.id"
              :item="item" />
          </div>
        </div>
      </v-scroll>
    </div>
    <p class="create-order-btn"
      @click="toCreateOrder">＋开单</p>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { vibrate } from '../../../tools/plus.js';
import OrderListItem from '~views/order/order-list/order-list-item';

export default {
  name: 'view-customer-info',
  components: {
    OrderListItem
  },
  data() {
    return {
      errorLogo: require('~img/placeholder_user.png'),
      customerInfo: {},
      pageNum: 1,
      customerId: '',
      orderList: [],
      nextOrderList: true
    };
  },
  watch: {
    nextOrderList(newVal) {
      // console.log('nextOrderList:_____', newVal);
    }
  },
  created() {
    this.customerId = this.$route.query.id;
    this.init();
  },
  mounted() {
  },
  methods: {
    ...mapActions(['getCustomerInfo', 'getOrderListByCustomer']),
    init() {
      this.pageNum = 1;
      this.nextOrderList = true;
      console.log('this.orderList:_____', this.orderList);
      return Promise.all([this.getInfo(), this.aa()]);
    },
    getInfo() {
      return this.getCustomerInfo(this.customerId).then((res) => {
        this.customerInfo = res.data.merchantCustomer;
      });
    },
    aa() {
      return this.getCustomerOrder();
    },
    getCustomerOrder() {
      if (this.nextOrderList) {
        return this.getOrderListByCustomer({
          customerId: this.customerId,
          pageNum: this.pageNum
        }).then((res) => {
          if (this.pageNum === 1) this.orderList = [];
          const { list, next } = res.data;
          this.pageNum++;
          console.log('this.orderList:_____', this.orderList);
          this.orderList = this.orderList.concat(list);
          this.$nextTick(() => {
            this.nextOrderList = next;
          });
        });
      }
    },
    // 开单
    toCreateOrder() {
      this.$utils.go({
        name: 'order-edit-create-order',
        query: {
          customerId: this.customerId,
          linkmanAddress: this.customerInfo.address,
          linkmanGender: this.customerInfo.sex,
          linkmanName: this.customerInfo.name,
          linkmanPhone: this.customerInfo.mobile,
          orderType: this.customerInfo.type
        }
      });
    }
  }
};
</script>
<style lang="scss">
.view-customer-info {
  display: flex;
  flex-flow: column;
  .content {
    height: calc(100% - 88px - 88px);
    overflow: hidden;
  }
  .customer-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 144px;
    background: linear-gradient(to right, #2985ff, #3dadff);
    padding: 0 36px;
    .v-img {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      margin-right: 16px;
    }
    .customer-info {
      flex: 1;
      font-size: 30px;
      color: #fff;
      overflow: hidden;
      h4 {
        display: flex;
        margin-right: 16px;
        margin-bottom: 12px;
      }
      span {
        font-weight: normal;
        @include over(1);
      }
      img {
        width: 22px;
        height: 22px;
        margin-left: 4px;
      }
      p {
        width: 108px;
        line-height: 28px;
        border-radius: 4px;
        text-align: center;
        font-size: 20px;
        background: #e5fff2;
        color: #32ab6e;
      }
      .label-no-pf {
        background: #fff1f0;
        color: #f5594e;
      }
    }
  }
  .talk-btn {
    width: 120px;
    height: 40px;
    line-height: 40px;
    border: 1px solid rgba(240, 244, 247, 1);
    border-radius: 8px;
    text-align: center;
    color: #fff;
  }
  .base-info {
    background: #fff;
    padding: 0 36px;
    padding-bottom: 32px;
    h3 {
      height: 88px;
      line-height: 88px;
      font-size: 32px;
      border-bottom: 1px solid #eaeaea;
      padding-left: 12px;
      margin-bottom: 12px;
      position: relative;
      &:before {
        content: '';
        width: 4px;
        height: 28px;
        background: #333;
        border-radius: 4px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .create-order-btn {
    line-height: 88px;
    background: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    font-size: 30px;
    font-weight: bold;
    color: $main;
    text-align: center;
    position: relative;
    z-index: 2;
  }
}
</style>
