<template>
  <section class="filter-container flex align-center">
    <div class="search task-filter flex align-center g-1">
      <input
        type="text"
        class="input-search"
        ref="searchInput"
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
      this.filterBy.txt = this.$store.getters.filterBy?.txt || ''
      this.setFilter = utilService.debounce(this.setFilter, 400)
    },
    mounted() {
      this.$refs.searchInput.focus()
    },
    methods: {
      setFilter() {
        this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
      },
    },
  }
</script>
