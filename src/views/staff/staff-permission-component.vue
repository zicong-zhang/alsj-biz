<template>
  <div class="staff-permission-component">
    <h4 class="permission-item-title">{{ item.name }}</h4>
    <ul v-if="item.resourceList.length"
      key="staff-permission-component-has-resourceList">
      <li v-for="value in item.resourceList"
        :key="`staff-permission-component-resourceList-item${value.id}`">{{ value.name }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'staff-permission-component',
  props: {
    item: Object,
  },
};
</script>
<style lang="scss">
.staff-permission-component {
  margin-bottom: 24px;
  .permission-item-title {
    height: 78px;
    line-height: 78px;
    border-radius: 8px 8px 0 0;
    background: $main;
    color: #fff;
    font-size: 32px;
    padding: 0 24px;
  }
  li {
    line-height: 80px;
    background: #e5f2ff;
    color: #3380cc;
    font-size: 24px;
    padding: 0 24px;
    &:not(:last-child) {
      border-bottom: 1px solid #fff;
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
}
</style>
