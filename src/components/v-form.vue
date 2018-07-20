<template>
  <div class="v-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VForm',
  methods: {
    // 调用子组件的验证方法
    submit() {
      let pass = false;
      this.$children.forEach(item => {
        console.log(':_____', item.validator());
        if (item.validator) pass = item.validator();
      });

      return pass;
    }

  }
}
</script>
