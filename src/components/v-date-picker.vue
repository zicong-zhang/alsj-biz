<template>
  <div class="v-date-picker">

    <v-form-label :label="label"
      :warn="warn"/>

    <div class="input-container">
      <p :class="{placeholder: placeholder}"
        @click="showPicker">{{ $attrs['default-value'] || $attrs.placeholder }}</p>
      <i class="icon i-bottom"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VDatePicker',
  props: {
    // 标签
    label: String,
    // 是否必填项, 传入值为未填写必填项时的警告语
    required: String,
    // 选择器标题
    title: {
      default: ''
    },
    // 警告文案
    warn: String,
    // 设置当前选择的日期
    current: {
      default: ''
    }
  },
  data() {
    return {
      datePicker: null
    };
  },
  computed: {
    placeholder() {
      const placeholder = this.$attrs.placeholder;
      return placeholder && !this.value && !this.$attrs['default-value'];
    }
  },
  created() {
    this.init();
    console.log('this.$attrs:_____', this.$attrs);
  },
  methods: {
    init() {
      const time = new Date();
      const maxYear = time.getFullYear() + 2;
      const maxMmonth = time.getMonth() + 1;
      const maxDay = time.getDate();

      this.datePicker = this.$createDatePicker({
        title: this.title,
        min: new Date(),
        max: new Date(maxYear, maxMmonth, maxDay),
        value: this.current || new Date(),
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      });
    },
    selectHandle(date, selectedVal, selectedText) {
      this.$createDialog({
        type: 'warn',
        content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(
          ', ',
        )} <br/> - text: ${selectedText.join(' ')}`,
        icon: 'cubeic-alert'
      }).show();
    },
    cancelHandle() {
      this.$createToast({
        type: 'correct',
        txt: 'Picker canceled',
        time: 1000
      }).show();
    },
    showPicker() {
      this.datePicker.show();
    }
  }
};
</script>
<style lang="scss">
.v-date-picker {
  .input-container {
    color: #333;
    position: relative;
    p {
      display: block;
      width: 100%;
      height: e(72px);
      line-height: e(72px);
      font-size: e(24px);
      background: #f5f5f5;
      box-sizing: border-box;
      border: e(1px) solid transparent;
      border-radius: e(8px);
      transition: all 0.2s;
      padding: 0 e(24px);
    }
    i {
      position: absolute;
      right: e(24px);
      top: 50%;
      transform: translateY(-50%);
      font-size: 30px;
      color: #c7c7c7;
    }
    .placeholder {
      color: #c7c7c7;
    }
  }
}
</style>
