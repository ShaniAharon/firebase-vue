import { createStore } from 'vuex';
import taskStore from './modules/task-store.js';

const store = createStore({
  strict: true,
  modules: {
    taskStore,
  },
});

export default store;
