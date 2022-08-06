<template>
  <main class="main-layout-container"></main>
  <section>
    <task-filter />
  </section>
  <button @click="addTask" class="btn btn-warning">Add Task</button>
  <task-list
    @removed="removeTask"
    @details="showDetails"
    v-if="tasks"
    :tasks="tasks"
  />
</template>

<script>
  import taskList from '../cmps/task-list.vue'
  import taskEdit from '../views/task-edit.vue'
  import taskDetails from '../views/task-details.vue'
  import taskFilter from '../cmps/task-filter.vue'

  export default {
    name: 'TaskApp',
    components: {
      taskList,
      taskEdit,
      taskFilter,
      taskDetails,
    },
    data() {
      return {}
    },
    methods: {
      removeTask(taskId) {
        this.$store.dispatch({type: 'removeTask', id: taskId})
      },
      addTask() {
        this.$router.push(`/task/edit`)
      },
      showDetails(taskId) {
        this.$router.push(`/task/${taskId}`)
      },
      setFilter(filterBy) {
        this.$store.dispatch({type: 'filter', filterBy})
      },
    },
    computed: {
      tasks() {
        return this.$store.getters.tasks
      },
    },
    unmounted() {},
  }
</script>
