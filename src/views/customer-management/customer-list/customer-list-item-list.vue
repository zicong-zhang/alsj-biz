<template>
  <div class="customer-list-item-list">

  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'customer-list-item-list',
  data() {
    return {
      nextPage: true
    }
  },
  created() {
    /* TODO
      下拉加载更多
     */
    this.getCustomerList()
      .then((res) => {
        console.log('res:_____', res);
      })
  },
  methods: {
    ...mapActions(['getCustomerList'])
  }
}
</script>
