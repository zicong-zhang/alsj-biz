<template>
  <div class="edit-house-type">

    <VHeader title="户型信息">
      <p class="save btn"
        slot="right-one"
        @click="submit">
        <span>保存</span>
      </p>
    </VHeader>

    <i class="gap"></i>
    <VForm ref="form">
      <!-- 小区 -->
      <VInput v-model="linkmanHouseType"
        label="所在小区"
        placeholder="输入客户所在的小区"
        replace="all"
        max="10" />

      <!-- 户型 -->
      <VPicker label="户型"
        :list="residenceList"
        :default-value="linkmanResidence"
        @select="selectResidence"
        placeholder="请选择户型"
        title="选择户型" />

      <!-- 面积 -->
      <VInput v-model="measurement"
        label="面积"
        placeholder="0"
        replace="number"
        max="5">
        <span class="measurement">㎡</span>
      </VInput>

    </VForm>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

const residenceList = [
  [
    {
      text: "一房",
      value: "一房"
    },
    {
      text: "二房",
      value: "二房"
    },
    {
      text: "三房",
      value: "三房"
    },
    {
      text: "四房",
      value: "四房"
    },
    {
      text: "五房",
      value: "五房"
    }
  ],
  [
    {
      text: "一厅",
      value: "一厅"
    },
    {
      text: "二厅",
      value: "二厅"
    },
    {
      text: "三厅",
      value: "三厅"
    }
  ]
];

export default {
  name: "EditHouseType",
  data() {
    return {
      linkmanHouseType: "",
      linkmanResidence: "",
      measurement: "",
      residenceList
    };
  },
  computed: {
    ...mapGetters(["orderInfo", 'orderId'])
  },
  created() {
    Object.assign(this.$data, this.orderInfo);
  },
  methods: {
    ...mapActions(["updateHouseTypeInfo"]),
    selectResidence(value) {
      this.linkmanResidence = value.join("");
    },
    submit() {
      this.updateHouseTypeInfo({
        linkmanHouseType: this.linkmanHouseType,
        linkmanResidence: this.linkmanResidence,
        measurement: this.measurement,
        orderId: this.orderId
      }).then(data => {
        alert('修改成功');
        this.$utils.back(this);
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.edit-house-type {
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
  .v-form {
    background: #fff;
    padding: 0 36px;
    padding-bottom: 36px;
  }
  .measurement {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    color: #c7c7c7;
    font-size: 24px;
  }
}
</style>
