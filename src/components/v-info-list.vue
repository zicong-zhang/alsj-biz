<template>
  <li :class="{'v-info-list': true, left: align === 'left'}">
    <h5>{{ label }}</h5>
    <p :style="{'-webkit-line-clamp': line}"
     @click="clickValue">{{ value }}</p>
  </li>
</template>

<script>
export default {
  name: "v-infoList",
  props: {
    // 左侧标题名
    label: {
      type: String
    },
    // 右侧
    value: {
      type: String
    },
    // 对齐方式
    align: {
      type: String
    },
    // 右侧行数
    line: {
      default: 1
    }
  },
  methods: {
    clickValue() {
      this.$emit("handler");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-info-list {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 12px;
}
.left {
  justify-content: flex-start;
}
h5 {
  flex: none;
  min-width: 100px;
  line-height: 36px;
  color: #999;
  font-weight: normal;
  font-size: 24px;
  margin: 0;
  margin-right: 22px;
}
p {
  max-width: 80%;
  font-size: 24px;
  line-height: 36px !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
