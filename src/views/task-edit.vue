<template>
  <section v-if="taskToEdit" class="center form-center">
    <h1>{{ formTitle }}</h1>
    <form @submit.prevent="save">
      <div class="inputbox">
        <input type="text" v-model="taskToEdit.name" placeholder="title" />
      </div>
      <div class="inputbox">
        <input
          class=""
          type="number"
          v-model="taskToEdit.price"
          placeholder="price"
        />
      </div>
      <div class="inputbox">
        <button class="btn btn-black">Save</button>
      </div>
    </form>
  </section>
</template>

<script>
  import {taskService} from '../services/task.service.js'

  export default {
    name: 'TaskEdit',
    components: {},
    data() {
      return {
        taskToEdit: null,
      }
    },
    async created() {
      const taskId = this.taskId
      if (taskId) {
        const task = await this.$store.dispatch({
          type: 'getTaskById',
          taskId,
        })
        this.taskToEdit = task
      } else {
        this.taskToEdit = taskService.getEmptyTask()
      }
    },
    methods: {
      async save() {
        await this.$store.dispatch({
          type: 'saveTask',
          task: this.taskToEdit,
        })
        this.$router.push('/')
      },
    },
    computed: {
      formTitle() {
        return this.taskId ? 'Edit task' : 'Add task'
      },
      taskId() {
        return this.$route.params.taskId
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
  }
</style>
