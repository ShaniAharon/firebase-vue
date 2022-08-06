<template>
  <main v-if="!isLoading" class="main-layout-container flex-col">
    <section class="flex action-container space-between">
      <task-filter @filtered="setFilter" />
      <button @click="addTask" class="add-btn btn btn-warning">Add Task</button>
    </section>
    <task-list
      @removed="removeTask"
      @details="showDetails"
      v-if="tasks"
      :tasks="tasks"
    />
  </main>
  <div class="loading" v-else>
    <img src="../assets/img/whale.gif" alt="" />
  </div>
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
      isLoading() {
        return this.$store.getters.isLoading
      },
    },
    unmounted() {},
  }
</script>
