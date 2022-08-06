import { taskService } from '../../services/task.service.js';

export default {
  state: {
    tasks: null,
    filterBy: null,
    isLoading: false,
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setTasks(state, { tasks }) {
      state.tasks = tasks;
    },
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading;
    },
    removeTask(state, { id }) {
      const idx = state.tasks.findIndex((task) => task._id === id);
      state.tasks.splice(idx, 1);
    },
    saveTask(state, { task }) {
      const idx = state.tasks.findIndex(
        (currTask) => currTask._id === task._id
      );
      if (idx !== -1) state.tasks.splice(idx, 1, task);
      else state.tasks.unshift(task);
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
  },
  actions: {
    async loadTasks({ commit, state }) {
      // commit({type: 'setIsLoading', isLoading: true});
      try {
        var tasks = await taskService.query(state.filterBy);
        commit({ type: 'setTasks', tasks });
      } catch (err) {
        console.error('Cannot Load tasks', err);
        throw err;
      }
      // finally {
      //   commit({type: 'setIsLoading', isLoading: false});
      // }
    },
    async saveTask({ commit }, { task }) {
      try {
        const savedTask = await taskService.save(task)
        commit({ type: 'saveTask', task: savedTask })
      } catch (err) {
        console.error('Cannot save task', err);
        throw err;
      }
    },
    async removeTask({ commit }, { id }) {
      try {
        await taskService.remove(id);
        commit({ type: 'removeTask', id });
      } catch (err) {
        console.error('Cannot remove task', err);
        throw err;
      }
    },
    async getTaskById(context, { taskId }) {
      try {
        return await taskService.getById(taskId);
      } catch (err) {
        console.log(err);
      }
    },
    filter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadTasks' });
    },
  },
};
