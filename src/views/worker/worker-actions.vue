<template>
  <div class="home-actions">
    <h3>常用功能</h3>
    <ul>
      <li>
        <img src="~~img/home/icon_workbench_wallet@2x.png" />
        <p>我的钱包</p>
      </li>
      <li @click="toCustomerManagement">
        <img src="~~img/home/icon_workbench_customer@2x.png" />
        <p>客户管理</p>
      </li>
      <!-- <li>
        <img src="~~img/home/icon_workbench_chart@2x.png" />
        <p>效率报表</p>
      </li> -->
      <!-- <li>
        <img src="~~img/home/icon_workbench_market@2x.png" />
        <p>营销中心</p>
      </li> -->
      <li @click="toStaffList">
        <img src="~~img/home/icon_workbench_wallet@2x.png" />
        <p>店员管理</p>
      </li>
      <li @click="toProductCenter">
        <img src="~~img/home/icon_workbench_staff@2x.png" />
        <p>产品中心</p>
      </li>
      <!-- <li>
        <img src="~~img/home/icon_workbench_cases@2x.png" />
        <p>案例中心</p>
      </li> -->
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HomeActions',
  methods: {
    toCustomerManagement() {
      this.$utils.go({
        name: 'customer-list',
      });
    },
    toProductCenter() {
      this.$utils.go({
        name: 'product-center',
      });
    },
    toStaffList() {
      this.$utils.go({
        name: 'staff-list',
      });
    },
  },
};
</script>
<style lang="scss">
.home-actions {
  background: #fff;
  padding: 0 r(36px);
  padding-top: r(33px);
  h3 {
    position: relative;
    font-size: r(32px);
    padding-left: r(16px);
    margin-bottom: r(36px);
    &:before {
      content: "";
      width: r(4px);
      height: r(28px);
      background: #333;
      border-radius: r(4px);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  ul {
    display: flex;
    flex-flow: wrap;
  }
  li {
    width: 25%;
    text-align: center;
    font-size: r(24px);
    margin-bottom: r(38px);
  }
  img {
    width: r(96px);
    height: r(96px);
    margin-bottom: r(16px);
  }
}
</style>
