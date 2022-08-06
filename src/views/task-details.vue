<template>
  <div v-if="isShow && task" @click="closeModal" class="modal">
    <form @submit.prevent class="form-details">
      <h1>{{ task?.label }} task details</h1>
      {{ task }}
      <div class="img-container">
        <img class="details-img" v-if="task" :src="showTask" alt="" />
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'TaskDetails',
    components: {},
    data() {
      return {
        task: null,
        isShow: true,
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
        this.isShow = true
      },
      closeModal() {
        this.$emit('closeDetails')
      },
    },
    computed: {
      //opt 2 use computed for the taskId
      taskId() {
        return this.$route.params.taskId
      },
      showTask() {
        console.log(this.task)
        return this.task.imgUrl
      },
    },
    //opt1 use the param specf as the func
    //   watch: {
    //     '$route.params.taskId'(id) {
    //       console.log('Changed to', id);
    //       this.loadTask();
    //     },
    //   },
    //opt 2
    watch: {
      // when the computed taskId run the watch handler also run
      taskId: {
        handler() {
          this.loadTask()
        },
        immediate: true, //to also run the watch on the start / run eagerly
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
