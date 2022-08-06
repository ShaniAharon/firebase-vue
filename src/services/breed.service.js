import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

const KEY = 'taskDB';

export const taskService = {
  query,
  getById,
  remove,
  save,
  getEmptyTask,
};

_createTasks();

console.log('process.env.VITE_SOME_KEY', import.meta.env.VITE_SOME_KEY);

async function query() {
  try {
    return await storageService.query(KEY);
  } catch (e) {
    console.error(e)
  }
}

async function getById(id) {
  try {
    return await storageService.get(KEY, id);
  } catch (e) {
    console.error(e)
  }
}

async function remove(id) {
  try {
    return await storageService.remove(KEY, id);
  } catch (e) {
    console.error(e)
  }
}

async function save(task) {
  try {
    const savedTask = task._id
      ? await storageService.put(KEY, task)
      : await storageService.post(KEY, task);
    return savedTask;
  } catch (e) {
    console.error(e)
  }
}

function getEmptyTask(name = '', price = 100) {
  return {
    _id: '',
    name,
    price,
    createdAt: Date.now(),
    reviews: ['good', 'great', 'fine'],
  };
}

// Create Test Data:
function _createTasks() {
  let tasks = JSON.parse(localStorage.getItem(KEY));
  if (!tasks || !tasks.length) {
    tasks = []
    for (let i = 0; i < 20; i++) {
      tasks.push(_createTask('Apple'))
    }
    localStorage.setItem(KEY, JSON.stringify(tasks));
  }
  return tasks;
}

function _createTask(name) {
  const task = getEmptyTask(name, utilService.getRandomInt(80, 300));
  task._id = utilService.makeId();
  return task;
}
