<template>
  <div class="task-preview flex space-between">
    <div class="info flex">
      <h5>{{ formatPrice }}</h5>
      <div class="img-placeholder"></div>
      <h5 class="item-name">{{ task.name }}</h5>
    </div>
    <div class="btn-container">
      <button>
        <!-- <img src="../assets/list-img.png" alt="" /> -->
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'TaskPreview',
    props: ['task'],
    emits: ['remove'],
    components: {},
    data() {
      return {}
    },
    created() {},
    methods: {
      removeTask() {
        this.$emit('remove', this.task._id)
      },
    },
    computed: {
      formatPrice() {
        return (this.task.price + '').slice(0, 1)
      },
    },
    unmounted() {},
  }
</script>
