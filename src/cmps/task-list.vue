<template>
  <section class="task-list flex flex-col items-start gap-1">
    <main class="flex items-start gap-2">
      <task-preview
        v-for="task in tasks"
        :key="task._id"
        :task="task"
        @remove="removeTask"
        @detail="taskDetails"
      />
    </main>
  </section>
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
