<template>
  <div class="v-picker">

    <VFormLabel :label="label"
      :warn="warn"/>

    <div class="input-container">
      <p :class="{placeholder: placeholder}"
        @click="showPicker">{{ value || $attrs['default-value'] || $attrs.placeholder }}</p>
      <i class="iconfont icon-bottomnew"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: "VPicker",
  props: {
    label: String,
    list: {
      type: Array
    },
    defaultVal: {
      default: 0
    },
    // 选择器标题
    title: {
      default: ""
    },
    // 是否必填项, 传入值为未填写必填项时的警告语
    required: String
  },
  created() {
    this.init();
  },
  data() {
    return {
      value: "",
      warn: "",
      picker: null,
      timer: null
    };
  },
  computed: {
    placeholder() {
      let placeholder = this.$attrs.placeholder;
      return placeholder && !this.value && !this.$attrs["default-value"];
    }
  },
  methods: {
    init() {
      this.picker = this.$createPicker({
        title: this.title,
        data: this.list,
        onSelect: (value, index, text) => {
          console.log("value, index, text:_____", value, index, text);
          this.value = text.join("");
          this.$emit("select", value);
        },
        onCancel: () => {}
      });
    },
    showPicker() {
      this.picker.show();
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
      } else {
        return true;
      }
    }
  }
};
</script>
<style lang="scss">
.v-picker {
  .label {
    display: flex;
    align-items: flex-end;
    padding-top: e(35px);
    padding-bottom: e(24px);
    label {
      font-size: e(24px);
      color: #999;
      margin-right: e(8px);
    }
    p {
      color: #f5594e;
      font-size: e(20px);
    }
  }
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
.v-picker-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 22;
  background: #fff;
  box-shadow: 0 0 e(30px) 0 rgba(0, 0, 0, 0.3);
  padding-bottom: e(36px);
  header {
    margin-bottom: e(36px);
    div {
      height: e(98px);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    p {
      width: e(200px);
      height: e(98px);
      line-height: e(98px);
      display: flex;
      align-items: center;
    }
  }
  .horizon-bar {
    background: #eee;
  }
  h5 {
    font-size: e(32px);
    text-align: center;
    flex: 1;
  }
  .close-btn {
    flex: none;
    padding-left: e(36px);
    i {
      color: #999;
      font-size: e(20px);
    }
  }
  .save-btn {
    justify-content: flex-end;
    flex: none;
    padding-right: e(36px);
    span {
      display: block;
      width: e(120px);
      height: e(48px);
      line-height: e(48px);
      border: 1px solid $main;
      border-radius: e(8px);
      color: $main;
      font-size: e(24px);
      text-align: center;
    }
  }
}
</style>
