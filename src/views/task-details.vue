<template>
  <section class="task-details gap-2" v-if="task">
    <h1>Todo Details</h1>
    <div class="inner-txt flex-col">
      <p>
        <span class="fw-bold clr-teal uppercase">id: </span>
        {{ task._id }}
      </p>
      <p>
        <span class="fw-bold clr-teal uppercase">title: </span>
        {{ task.title }}
      </p>
      <p>
        <span class="fw-bold clr-teal uppercase">Description: </span>
        {{ task.description }}
      </p>
      <p>
        <span class="fw-bold clr-teal uppercase">importance: </span>
        {{ task.importance }}
      </p>
      <p>
        <span class="fw-bold clr-teal uppercase">Status: </span>
        {{ task.status }}
      </p>
      <p>
        <span class="fw-bold clr-teal uppercase">is done: </span>
        {{ task.status ? 'true' : 'false' }}
      </p>
    </div>
    <button @click="goBack" class="btn btn-warning">go back</button>
  </section>
</template>

<script>
  export default {
    name: 'TaskDetails',
    components: {},
    data() {
      return {
        task: null,
      }
    },
    created() {},
    methods: {
      async loadTask() {
        if (!this.taskId) return // prevent the run of the watcher when change route
        const task = await this.$store.dispatch({
          type: 'getTaskById',
          taskId: this.taskId,
        })
        this.task = task
      },
      goBack() {
        this.$router.push('/')
      },
    },
    computed: {
      taskId() {
        return this.$route.params.taskId
      },
    },
    watch: {
      // when the computed taskId run the watch handler also run
      taskId: {
        handler() {
          this.loadTask()
        },
        immediate: true, //run the watch on the start / run eagerly
      },
    },
    unmounted() {},
  }
</script>

<style>
  .main-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* margin: 0 auto; */
  }
</style>
