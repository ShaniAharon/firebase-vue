import { firebaseService } from './firebase.service.js'

export const taskService = {
  query,
  getById: getTaskById,
  save: saveTask,
  remove: removeTask,
  getEmptyTask,
}


async function query(filterBy = {}) {
  return firebaseService.queryData(filterBy)
}

async function getTaskById(taskId) {
  return firebaseService.getEntityById(taskId)
}

async function saveTask(task) {
  return firebaseService.saveEntity(task)
}

async function removeTask(taskId) {
  return firebaseService.removeEntity(taskId)
}

function getEmptyTask() {
  return {
    title: '',
    description: '',
    importance: 1,
    createdAt: Date.now() + '',
    doneAt: null,
    status: ''
  }
}
