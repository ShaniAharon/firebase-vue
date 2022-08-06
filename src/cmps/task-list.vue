<template>
  <section class="task-list container-layout column">
    <task-preview
      v-for="task in tasks"
      :key="task._id"
      :task="task"
      @remove="removeTask"
    />
  </section>
</template>
<script>
  import taskPreview from './task-preview.vue'

  export default {
    name: 'TaskList',
    props: ['tasks'],
    emits: ['removed', 'showDetails'],
    components: {
      taskPreview,
    },
    data() {
      return {}
    },
    created() {},
    methods: {
      removeTask(projId) {
        this.$emit('removed', projId)
      },
    },
    computed: {},
    unmounted() {},
  }
</script>
<style></style>
