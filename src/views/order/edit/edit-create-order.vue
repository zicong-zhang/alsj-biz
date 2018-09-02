<template>
  <div class="view-edit-create-order">
    <v-header title="开单" />
    <i class="gap"></i>
    <div class="content">
      <v-form class="form">
        <v-input v-model="linkmanName"
          label="联系人信息(必填)"
          placeholder="请输入联系人姓名"
          max="12" />
        <v-input v-model="linkmanPhone"
          placeholder="请输入联系人手机号码"
          max="11" />
        <v-picker on-confirm="aa"
          placeholder="请选择客户性别" />
        <v-picker label="安装地址(必填)"
          on-confirm="aa"
          placeholder="请选择所在地区" />
        <v-input v-model="linkmanAddress"
          placeholder="请输入详细地址"
          max="50" />
      </v-form>
      <p class="create-order-btn">确认开单</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "view-edit-create-order",
  data() {
    return {
      customerId: "",
      linkmanAddress: "",
      linkmanGender: "",
      linkmanName: "",
      linkmanPhone: "",
      orderType: ""
    };
  },
  created() {},
  methods: {
    aa() {
      console.log("12323:_____", 12323);
    }
  }
};
</script>
<style lang="scss">
.view-edit-create-order {
  display: flex;
  flex-flow: column;
  .gap {
    flex: none;
  }
  .content {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .form {
    background: #fff;
    padding: 0 36px;
    padding-bottom: 40px;
  }
  .v-input,
  .v-picker {
    margin-bottom: 24px;
  }
  .create-order-btn {
    line-height: 98px;
    background: linear-gradient(to right, #2985ff, #3dadff);
    color: #fff;
    font-size: 32px;
    text-align: center;
  }
}
</style>
