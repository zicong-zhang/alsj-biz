<template>
  <div class="v-dialog">

    <!-- 遮罩 -->
    <div class="v-dialog-cover"
      v-show="show"></div>

    <!-- 窗体 -->
    <transition name="show-dialog">
      <div class="v-dialog-wrapper"
        v-if="show">
        <h4>{{ title }}</h4>
        <p class="v-dialog-content">{{ content }}</p>
        <div class="handler-btn">
          <p class="v-dialog-cancel"
            v-if="showCancel"
            @click="onCancel">取消</p>
          <p class="v-dialog-confirm"
            @click="onConfirm">确定</p>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'v-dialog',
  props: {
    show: {
      default: false,
      type: Boolean
    },
    // 标题
    title: String,
    // 内容
    content: {
      required: true,
      type: [String, Number]
    },
    // 是否展示取消按钮
    'show-cancel': {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    // 关闭
    onColse() {
      this.$emit('close');
    },
    // 取消
    onCancel() {
      this.$emit('cancel');
    },
    // 确定
    onConfirm() {
      this.$emit('confirm');
    }
  }
};
</script>

<style lang="scss">
.v-dialog-cover {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.6);
}
.v-dialog-wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 30;
  transform: translate(-50%, -50%);
  width: 560px;
  background: #fff;
  border-radius: 8px;
  h4 {
    height: 90px;
    line-height: 90px;
    font-size: 32px;
    font-weight: bold;
    color: $main;
    text-align: center;
    border-radius: 8px 8px 0 0;
    background: $bg;
  }
}
.v-dialog-content {
  line-height: 48px;
  text-align: justify;
  font-size: 32px;
  padding: 0 44px;
  padding-top: 56px;
  margin-bottom: 64px;
}
.handler-btn {
  height: 97px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    flex: 1;
    line-height: 97px;
    color: #999;
    font-size: 32px;
    text-align: center;
    &:first-child {
      border-right: 1px solid #eaeaea;
    }
  }
  .v-dialog-confirm {
    color: $main;
  }
}
</style>
