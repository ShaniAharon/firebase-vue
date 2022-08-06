<template>
  <article class="task flex flex-col gap-1 p-3">
    <h3 class="task__txt clr-teal uppercase">{{ task.title }}</h3>
    <p>
      <span class="fw-bold">Created At: </span>
      {{ formatTime }}
    </p>
    <div class="btn-group actions">
      <button class="btn btn-primary" @click="showDetails">details</button>
      <button class="btn btn-info" @click="editTask">edit</button>
      <button class="btn btn-danger" @click="removeTask">delete</button>
    </div>
  </article>
</template>
<script>
  export default {
    name: 'TaskPreview',
    props: ['task'],
    emits: ['remove', 'detail'],
    components: {},
    data() {
      return {}
    },
    created() {},
    methods: {
      removeTask() {
        this.$emit('remove', this.task._id)
      },
      showDetails() {
        this.$emit('detail', this.task._id)
      },
      editTask() {
        this.$router.push(`/task/edit/${this.task._id}`)
      },
    },
    computed: {
      formatPrice() {
        return (this.task.price + '').slice(0, 1)
      },
      formatTime() {
        return new Date(+this.task.createdAt).toLocaleString()
      },
    },
    unmounted() {},
  }
</script>
