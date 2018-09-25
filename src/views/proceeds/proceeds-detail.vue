<template>
  <div class="proceeds-detail">
    <div class="container">
      <Header/>
      <Total/>
      <List/>
    </div>
  </div>
</template>

<script>
import Header from './proceeds-detail-item-header';
import Total from './proceeds-detail-item-total';
import List from './proceeds-detail-item-list';

export default {
  name: 'proceeds-detail',
  components: {
    Header,
    Total,
    List,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.proceeds-detail {
  & > .container {
    height: 100%;
    display: flex;
    flex-flow: column;
  }
}
</style>
