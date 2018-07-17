<template>
  <div class="order-edit-customer">
    <VHeader title="客户信息">
      <p class="save btn"
        slot="right-one"
        @click="submit">
        <span>保存</span>
      </p>
    </VHeader>

    <div class="form">
      <i class="gap"></i>
      <div>

        <!-- 客户姓名 -->
        <VInput v-model="name"
          label="客户姓名"
          placeholder="输入客户姓名"
          max="20"
          required="客户姓名不能为空"
          :rule="rules.name" />

        <!-- 联系电话 -->
        <VInput v-model="phone"
          label="联系电话"
          placeholder="输入客户联系电话"
          max="11"
          :rule="rules.phone" />

        <!-- 性别 -->
        <VPicker label="性别"
          :list="slots"
          @select="selectSex"
          placeholder="选择客户性别"
          title="选择性别" />

        <!-- 详细地址 -->
        <VInput v-model="address"
          label="详细地址"
          placeholder="输入详细地址"
          max="20"
          :rule="rules.name" />
          
        <!-- 客户预算 -->
        <VInput v-model="budget"
          label="客户预算"
          placeholder="输入客户预算"
          max="20"
          :rule="rules.name" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OrderEditCustomer",
  data() {
    return {
      name: "",
      phone: "",
      sex: "男",
      address: "",
      budget: "",
      linkmanGender: 0, // 默认0
      rules: {
        name: [
          {
            regExp: "name",
            warn: "请输入中文名"
          }
        ],
        phone: [
          {
            regExp: "phone",
            warn: "请输入正确的11位手机号"
          }
        ],
        sex: [
          {
            regExp: "sex",
            warn: ""
          }
        ],
        sex: [
          {
            regExp: "sex",
            warn: ""
          }
        ]
      },
      isShowPicker: false,
      slots: [
        {
          flex: 1,
          values: [
            {
              value: "男",
              key: "0"
            },
            {
              value: "女",
              key: "1"
            }
          ]
        }
      ]
    };
  },
  watch: {
    budget(newVal) {
      console.log("newVal:_____", newVal);
    }
  },
  mounted() {
    console.log("this.$children:_____", this.$children);
  },
  methods: {
    showPicker() {
      this.isShowPicker = true;
    },
    hidePicker() {
      this.isShowPicker = false;
    },
    pickChange(picker, valArr) {
      let { key, value } = valArr[0];
      this.sex = value;
      this.linkmanGender = key;
    },
    selectSex(item) {
      console.log("item:_____", item);
      this.sex = item.value;
    },
    submit() {}
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
    padding-right: e(36px);
    span {
      display: block;
      width: e(120px);
      font-size: e(24px);
      line-height: e(44px);
      color: $main;
      text-align: center;
      border: e(1px) solid $main;
      border-radius: e(8px);
    }
  }
  .form {
    flex: 1;
    position: relative;
    & > div {
      padding: 0 e(36px);
    }
  }
  .sex {
    i {
      position: absolute;
      right: e(24px);
      top: 50%;
      transform: translateY(-50%);
      color: #c7c7c7;
    }
  }
}
/* .picker-item {
  height:e(40px) !important;
  line-height:e(40px) !important;
} */
</style>
