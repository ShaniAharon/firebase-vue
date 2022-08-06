<template>
  <main class="flex task-list items-start gap-2">
    <task-preview
      v-for="task in tasks"
      :key="task._id"
      :task="task"
      @remove="removeTask"
      @detail="taskDetails"
    />
  </main>
</template>
<script>
  import taskPreview from './task-preview.vue'

  export default {
    name: 'TaskList',
    props: ['tasks'],
    emits: ['removed', 'details'],
    components: {
      taskPreview,
    },
    data() {
      return {}
    },
    created() {},
    methods: {
      removeTask(taskId) {
        this.$emit('removed', taskId)
      },
      taskDetails(taskId) {
        this.$emit('details', taskId)
      },
    },
    computed: {},
    unmounted() {},
  }
</script>
<style></style>
