<template>
  <section
    class="filter-container space-between main-layout-container flex align-center g-1"
  >
    <div class="search flex align-center g-1">
      <input
        type="text"
        class="input-search"
        v-model="filterBy.txt"
        placeholder="Search "
        @input="setFilter"
      />
    </div>
  </section>
</template>

<script>
  import {utilService} from '../services/util.service.js'
  export default {
    name: 'task-filter',
    emits: ['filtered'],
    data() {
      return {
        filterBy: {
          txt: '',
        },
      }
    },
    created() {
      this.setFilter = utilService.debounce(this.setFilter, 400)
    },
    methods: {
      setFilter() {
        console.log('this.filterBy', this.filterBy)
        this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
      },
    },
  }
</script>

<style></style>
