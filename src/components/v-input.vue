<template>
  <div :class="{'v-input': true, 'v-input-focus': isFocus}">
    <div class="label">
      <label v-if="label">{{ label }}</label>
      <transition name="input-warn">
        <p v-show="warn">{{ warn }}</p>
      </transition>
    </div>
    <div class="input-container">
      <input type="text"
        :value="value"
        :placeholder="$attrs.placeholder"
        :maxlength="max"
        @input="onInput"
        @focus="focus"
        @blur="blur" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * TODO
 * validator 方法，传入的规则数组子项 >= 2 时，如何处理
 */
export default {
  name: "VInput",
  model: {
    prop: "value",
    event: "input"
  },
  inheritAttrs: false,
  props: {
    // 绑定值
    value: {
      type: String,
      required: true
    },
    // 最大长度
    max: {
      required: true
    }, // 验证规则
    rule: Array,
    // 替换匹配的字符
    replace: String,
    // 标签
    label: String,
    // 是否必填项
    required: String
  },
  created() {},
  data() {
    return {
      warn: false,
      isFocus: false,
      timer: null
    };
  },
  computed: {
    // 替换字符串规则
    replaceRule() {
      if (this.replace) return new RegExp(this.replace, "g");
    }
  },
  methods: {
    focus() {
      this.isFocus = true;
      this.$emit('focus');
    },
    showWarn(txt) {
      this.warn = false;
      this.$nextTick(() => {});
      this.timer = setTimeout(() => {
        this.warn = txt;
        clearTimeout(this.timer);
        this.timer = null;
      }, 100);
    },
    onInput(e) {
      let value = e.target.value;

      // 限制输入
      if (this.replace) {
        value = value.replace(this.replaceRule, "");
        e.target.value = value.replace(this.replaceRule, "");
      }
      this.$emit("input", value.trim());
    },
    //获取验证正则
    getValidatorRegExp(rule) {
      let regExp = null;
      switch (rule) {
        case "name":
          regExp = /^[\u4E00-\u9FA5]+$/;
          break;
        case "phone":
          regExp = /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8})$/;
          break;
        default:
          regExp = rule; // 自定义正则
          break;
      }
      return regExp;
    },
    blur(e) {
      this.$emit('blur', e);
      this.isFocus = false;
      let value = e.target.value;

      if (this.required && !value.trim()) {
        this.showWarn(this.required);
        return;
      }
      if (this.rule) this.validator(value);
    },
    // 验证
    validator(value) {
      let warn = false;
      for (let item of this.rule) {
        warn = !this.getValidatorRegExp(item.regExp).test(value);
        // 如果正则不通过，则停止循环，并抛出警告
        if (warn) {
          this.showWarn(item.warn);
          break;
        } else {
          this.warn = "";
        }
      }
      return this.warn;
    }
  }
};
</script>
<style lang="scss">
.v-input {
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
  input {
    display: block;
    width: 100%;
    height: e(72px);
    font-size: e(24px);
    color: #333;
    background: #f5f5f5;
    box-sizing: border-box;
    border: e(1px) solid transparent;
    border-radius: e(8px);
    transition: all 0.2s;
    padding: 0 e(24px);
  }
  .input-container {
    position: relative;
  }
}
.v-input-focus {
  input {
    border: e(1px) solid $main;
    background: $bg;
    transition: all 0.2s;
  }
}


</style>
