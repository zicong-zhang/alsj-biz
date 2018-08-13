<template>
  <div
    class="v-picker"
    v-if="isShow"
  >
    <v-cover @click="onCancel" />
    <div class="v-picker-container">
      <van-picker
        :show-toolbar="showToolBar"
        :title="title"
        :columns="columns"
        :value-key="key"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </div>
    </div>
</template>

<script>
export default {
  name: "v-v-picker",
  data() {
    return {
      columns: [
        {
          values: [
            {
              text: "杭州",
              val: 123
            },
            {
              text: "aa",
              val: 33333
            }
          ]
        },
        {
          values: [
            {
              text: "啊啊啊啊",
              val: 4444
            },
            {
              text: "阿斯顿",
              val: 66666
            }
          ]
        }
      ],
      title: "选择年份",
      isShow: true,
      key: "",
      showToolBar: false,
      cancel: '',
      confirm: ''
    };
  },
  methods: {
    onCancel() {
      this.$toast("cancel");
      this.isShow = false;
       if (typeof this.cancel === 'function') this.cancel();
    },
    onConfirm(value, idx) {
      console.log("value:_____", value);
      this.$toast(`当前值：${value}, 当前索引：${idx}`);
      if (typeof this.confirm === 'function') this.confirm(value, idx);
    }
  }
};
</script>
<style lang="scss">
.v-picker {
  .van-picker {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
  }
  .van-picker__toolbar {
    font-size: 32px;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    color: $main;
    padding: 0 36px;
  }
  .van-picker-column__item--selected {
    color: #333;
  }
}
</style>
