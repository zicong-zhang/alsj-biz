<template>
  <div class="view-customer-list">
    <v-header title="客户"/>
    <div class="content">

    </div>
  </div>
</template>
<script>
export default {
  name: 'view-customer-list',
  
}
</script>
<style lang="scss">
.view-customer-list {
  display: flex;
  flex-flow: column;
  .content {
    flex:  1;
    @include scroll(y);
  }
}
</style>
