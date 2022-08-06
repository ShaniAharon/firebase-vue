<template>
  <section v-if="taskToEdit" class="task-edit">
    <h1>{{ taskToEdit._id ? 'Edit' : 'Add' }} Todo</h1>
    <div class="form-control">
      <label for="title" class="form-label"> Title </label>
      <input
        v-model="taskToEdit.title"
        id="title"
        class="form-input"
        type="text"
      />
    </div>
    <div class="form-control">
      <label for="description" class="form-label"> Description </label>
      <textarea
        v-model="taskToEdit.description"
        class="form-input"
        type="text"
        id="description"
      />
    </div>
    <div class="form-control">
      <label for="importance" class="form-label"> Importance </label>
      <input
        max="3"
        min="1"
        v-model="taskToEdit.importance"
        class="form-input"
        type="number"
        id="importance"
      />
    </div>
    <div class="form-control">
      <label for="status" class="form-label"> Status </label>
      <select
        id="status"
        name="status"
        v-model="taskToEdit.status"
        class="form-input"
      >
        <option>open</option>
        <option>in progress</option>
        <option>done</option>
      </select>
    </div>
    <div class="btn-group">
      <button @click="save" class="btn btn-success">save</button>
      <button @click="goBack" class="btn btn-danger">back</button>
    </div>
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
      goBack() {
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
