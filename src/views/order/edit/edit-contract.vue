<template>
  <div class="edit-contract">

    <VHeader title="录入合同信息"></VHeader>

    <i class="gap"></i>

    <VForm>
      <!-- 付款方式 -->
      <VPicker label="付款方式"
        title="付款方式"
        :list="[payTypeList]"
        placeholder="请选择付款方式"
        required="未选择付款方式" />

      <!-- 订单金额 -->
      <VInput v-model="orderAmount"
        label="订单金额"
        required="未输入金额"
        placeholder="请输入定制合同金额"
        max="10">
        <span class="order-amount">元</span>
      </VInput>

      <!-- 预计完成生产日期  -->
      <VDatePicker label="预计完成生产日期 "
        required="未选择日期"
        placeholder="请选择日期" />

      <!-- 预计送货安装日期  -->
      <VDatePicker label="预计送货安装日期  "
        required="未选择日期"
        placeholder="请选择日期" />

        <!-- 上传定制合同  -->
        
    </VForm>
  </div>
</template>

<script>
export default {
  name: "EditContract",
  data() {
    // 付款方式选项
    const payTypeList = [
      {
        text: "线上付款",
        value: 1
      },
      {
        text: "线下付款",
        value: 2
      }
    ];
    return {
      payTypeList, // 付款方式选项
      orderAmount: ""
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.edit-contract {
  height: 100%;
  background: $main;

  .v-form {
    background: #fff;
    padding: 0 36px;
    padding-bottom: 36px;
  }
  .order-amount {
    font-size: 24px;
    color: #c7c7c7;
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
