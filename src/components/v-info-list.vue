<template>
  <li :class="{'v-info-list': true, left: align === 'left'}">
    <h5>{{ label }}</h5>
    <p @click="clickValue">{{ value }}</p>
  </li>
</template>

<script>
export default {
  name: "VInfoList",
  props: {
    label: {
      type: String
    },
    value: {
      type: String
    },
    align: {
      type: String
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
  align-items: center;
  line-height: r(48px);
}
.left {
  justify-content: flex-start;
}
h5 {
  flex: none;
  min-width: r(100px);
  color: #999;
  font-weight: normal;
  font-size: r(24px);
  margin: 0;
  margin-right: r(22px);
}
p {
  max-width: 80%;
  font-size: r(24px);
  line-height: r(48px);
  @include over(1);
}
</style>
