<template>
  <div class="view-customer-list">
    <v-header title="客户"/>
    <div class="content">
      <customer-list />
    </div>
  </div>
</template>
<script>
import customerList from './customer-list-item-list';

export default {
  name: 'view-customer-list',
  components: {
    customerList,
  },
};
</script>
<style lang="scss">
.view-customer-list {
  display: flex;
  flex-flow: column;
  .content {
    flex:  1;
    overflow: hidden;
  }
}
</style>
