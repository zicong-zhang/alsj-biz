<template>
  <div class="v-picker">

    <v-form-label v-if="label"
      :label="label"
      :warn="warn" />

    <div class="input-container">
      <p :class="{placeholder: placeholder}"
        @click="showPicker">{{ value || $attrs['default-value'] || $attrs.placeholder }}</p>
      <i class="iconfont icon-bottomnew"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: 'v-picker',
  props: {
    label: String,
    list: {
      type: Array,
      default: () => [
        {
          values: [
            {
              text: '杭州',
              val: 123,
            },
            {
              text: 'aa',
              val: 33333,
            },
          ],
        },
        {
          values: [
            {
              text: '啊啊啊啊',
              val: 4444,
            },
            {
              text: '阿斯顿',
              val: 66666,
            },
          ],
        },
      ],
    },
    value: {
      type: String,
    },
    defaultVal: {
      default: 0,
    },
    // 选择器标题
    title: {
      default: '',
    },
    // 是否必填项, 传入值为未填写必填项时的警告语
    required: String,
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
    },
  },
  created() {},
  data() {
    return {
      warn: '',
      picker: null,
      timer: null,
    };
  },
  computed: {
    placeholder() {
      const placeholder = this.$attrs.placeholder;
      return placeholder && !this.value && !this.$attrs['default-value'];
    },
  },
  methods: {
    init() {
      /* this.picker = this.$createPicker({
        title: this.title,
        data: this.list,
        onSelect: (value, index, text) => {
          console.log("value, index, text:_____", value, index, text);
          this.value = text.join("");
          this.$emit("select", value);
        },
        onCancel: () => {}
      }); */
    },
    showPicker() {
      this.$Picker({
        label: this.label,
        list: this.list,
        title: this.title,
        onConfirm: this.onConfirm,
        onCancel: this.onCancel,
      });
    },
    showWarn() {
      this.warn = false;
      this.$nextTick(() => {});
      this.timer = setTimeout(() => {
        this.warn = this.required;
        clearTimeout(this.timer);
        this.timer = null;
      }, 100);
      return false;
    },
    validator() {
      if (this.required) {
        return this.value ? true : this.showWarn();
      }
      return true;
    },
  },
};
</script>
<style lang="scss">
.v-picker {
  .label {
    display: flex;
    align-items: flex-end;
    padding-top: 35px;
    padding-bottom: 24px;
    label {
      font-size: 24px;
      color: #999;
      margin-right: 8px;
    }
    p {
      color: #f5594e;
      font-size: 20px;
    }
  }
  .input-container {
    color: #333;
    position: relative;
    p {
      display: block;
      width: 100%;
      height: 72px;
      line-height: 72px;
      font-size: 24px;
      background: #f5f5f5;
      box-sizing: border-box;
      border: 1px solid transparent;
      border-radius: 8px;
      transition: all 0.2s;
      padding: 0 24px;
    }
    i {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 30px;
      color: #c7c7c7;
    }
  }
  .cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
    background: rgba(0, 0, 0, 0.6);
  }
  .placeholder {
    color: #c7c7c7;
  }
}
/* .v-picker-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 22;
  background: #fff;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
  padding-bottom: 36px;
  header {
    margin-bottom: 36px;
    div {
      height: 98px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    p {
      width: 200px;
      height: 98px;
      line-height: 98px;
      display: flex;
      align-items: center;
    }
  }
  .horizon-bar {
    background: #eee;
  }
  h5 {
    font-size: 32px;
    text-align: center;
    flex: 1;
  }
  .close-btn {
    flex: none;
    padding-left: 36px;
    i {
      color: #999;
      font-size: 20px;
    }
  }
  .save-btn {
    justify-content: flex-end;
    flex: none;
    padding-right: 36px;
    span {
      display: block;
      width: 120px;
      height: 48px;
      line-height: 48px;
      border: 1px solid $main;
      border-radius: 8px;
      color: $main;
      font-size: 24px;
      text-align: center;
    }
  }
} */
</style>
