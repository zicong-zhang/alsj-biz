<template>
  <div class="view-customer-info">
    <v-header title="客户详情" />

    <div class="content">
      <v-scroll :listen="orderList">
        <div class="scroll-container">

          <div class="customer-label">
            <img v-lazy="{
              src: customerInfo.avatar,
              loading: errorLogo,
              error: errorLogo
            }" />
            <div class="customer-info">
              <h4>
                <span>{{ customerInfo.nickname }}</span>
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
                class="label-pf label-no-pf">平台客户</p>
            </div>
            <p class="talk-btn">在线沟通</p>
          </div>
          <i class="gap"></i>
          <div class="base-info">
            <h3>基本信息</h3>
            <div class="infos">
              <v-infoList label="客户手机"
                align="left"
                :value="customerInfo.mobile" />
              <v-infoList label="联系地址"
                align="left"
                line="1"
                :value="customerInfo.address" />
              <v-infoList label="登记时间"
                align="left"
                :value="customerInfo.createDate" />
              <v-infoList label="登记人员"
                align="left"
                :value="customerInfo.createUserNickname" />
              <v-infoList label="备注信息"
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
          <p class="create-order-btn">＋开单</p>
        </div>
      </v-scroll>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import OrderListItem from "~views/order/order-list/order-list-item";
export default {
  name: "view-customer-info",
  components: {
    OrderListItem
  },
  data() {
    return {
      errorLogo: require("~img/placeholder_user.png"),
      customerInfo: {},
      pageNum: 1,
      customerId: "",
      orderList: []
    };
  },
  created() {
    this.customerId = this.$route.query.id;
    this.getInfo();
    this.getCustomerOrder();
  },
  methods: {
    ...mapActions(["getCustomerInfo", "getOrderListByCustomer"]),
    getInfo() {
      this.getCustomerInfo(this.customerId).then(res => {
        this.customerInfo = res.data.merchantCustomer;
      });
    },
    getCustomerOrder() {
      this.getOrderListByCustomer({
        customerId: this.customerId,
        pageNum: this.pageNum
      }).then(res => {
        this.orderList = res.data.list;
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
    height: calc(100% - 88px);
    overflow: hidden;
  }
  .customer-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 144px;
    background: linear-gradient(to right, #2985ff, #3dadff);
    padding: 0 36px;
    img {
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
        background: #FFF1F0;
        color: #F5594E;
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
        content: "";
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
    font-size: 30px;
    font-weight: bold;
    color: $main;
    text-align: center;
  }
}
</style>
