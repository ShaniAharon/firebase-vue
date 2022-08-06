<template>
  <header class="main-header flex">
    <div class="flex justify-between main-layout-container">
      <h1 @click="goHome" class="logo">
        <span class="clr-teal">mister</span>Firebase
      </h1>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'AppHeader',
    components: {},
    data() {
      return {}
    },
    created() {},
    methods: {
      goHome() {
        console.log('run')
        this.$router.push('/')
      },
    },
    computed: {},
    unmounted() {},
  }
</script>
<style></style>
