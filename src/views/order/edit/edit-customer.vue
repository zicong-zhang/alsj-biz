<template>
  <div class="order-edit-customer">
    <v-header title="客户信息">
      <p class="save btn"
        slot="right-one"
        @click="submit">
        <span>保存</span>
      </p>
    </v-header>

    <div class="form">
      <i class="gap"></i>
      <v-form ref="form">

        <!-- 客户姓名 -->
        <v-input v-model="linkmanName"
          label="客户姓名"
          placeholder="输入客户姓名"
          max="15"
          replace="cn"
          required="客户姓名不能为空"
          :rule="rules.linkmanName" />

        <!-- 联系电话 -->
        <v-input v-model="linkmanPhone"
          label="联系电话"
          placeholder="输入客户联系电话"
          max="11"
          replace="number"
          :rule="rules.linkmanPhone" />

        <!-- 性别 -->
        <v-picker label="性别"
          :list="[genderList]"
          :index="linkmanGender"
          :default-value="sex"
          @select="selectSex"
          title="选择性别" />

        <!-- 详细地址 -->
        <v-input v-model="linkmanAddress"
          label="详细地址"
          placeholder="输入详细地址"
          required="请输入详细地址"
          max="30" />

        <!-- 客户预算 -->
        <v-input v-model="linkmanBudget"
          label="客户预算"
          :placeholder="0"
          required="请输入客户预算"
          max="10"
          replace="number">
          <span class="linkmanBudget">元</span>
        </v-input>
      </v-form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

const rules = {
  linkmanName: [
    {
      regExp: "name",
      warn: "请输入中文名"
    }
  ],
  linkmanPhone: [
    {
      regExp: "phone",
      warn: "请输入正确的11位手机号"
    }
  ]
};
const genderList = [
  {
    value: "1",
    text: "男"
  },
  {
    value: "2",
    text: "女"
  }
];
export default {
  name: "OrderEditCustomer",
  data() {
    return {
      linkmanName: "",
      linkmanPhone: "",
      linkmanGender: '男',
      linkmanAddress: "",
      linkmanBudget: '',
      rules,
      genderList,
      isShowPicker: false
    };
  },
  computed: {
    ...mapGetters(['orderInfo', 'orderId']),
    sex() {
      return (this.linkmanGender ? this.genderList[this.linkmanGender - 1].text : '1');
    }
  },
  created() {
    let {
      linkmanAddress,
      linkmanBudget,
      linkmanGender,
      linkmanName,
      linkmanPhone
    } = this.orderInfo;
    console.log('this.orderInfo', this.orderInfo)
    this.linkmanName = linkmanName;
    this.linkmanGender = linkmanGender;
    this.linkmanPhone = linkmanPhone;
    this.linkmanAddress = linkmanAddress;
    this.linkmanBudget = linkmanBudget || '';
  },
  mounted() {},
  methods: {
    ...mapActions(['updateCustomerInfo']),
    // 选择器回调
    selectSex(item) {
      this.linkmanGender = item[0];
    },
    submit() {
      let pass = this.$refs.form.submit();
      if (pass) {
        this.updateCustomerInfo({
          linkmanAddress: this.linkmanAddress,
          linkmanBudget: this.linkmanBudget,
          linkmanGender: this.linkmanGender,
          linkmanName: this.linkmanName,
          linkmanPhon: this.linkmanPhone,
          orderId: this.orderId,
        }).then(() => {
          this.$utils.back(this);
        })
      }
    }
  }
};
</script>
<style lang="scss">
.order-edit-customer {
  display: flex;
  flex-flow: column;
  height: 100%;
  background: #fff;
  .save {
    left: auto;
    right: 0;
    padding-right: 36px;
    span {
      display: block;
      width: 120px;
      font-size: 24px;
      line-height: 44px;
      color: $main;
      text-align: center;
      border: 1px solid $main;
      border-radius: 8px;
    }
  }
  .form {
    flex: 1;
    background: #fff;
    position: relative;
    & > div {
      padding: 0 36px;
    }
  }
  .linkmanBudget {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    color: #c7c7c7;
    font-size: 24px;
  }
}
</style>
