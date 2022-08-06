import { createRouter, createWebHistory } from 'vue-router';
import taskApp from '../views/task-app.vue';
import taskDetails from '../views/task-details.vue';
import taskEdit from '../views/task-edit.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: taskApp,
    },
    {
      path: '/task/edit/:taskId?',
      component: taskEdit,
    },
    {
      path: '/task/:taskId',
      component: taskDetails,
    },
  ],
});

export default router;
