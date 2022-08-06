import { firebaseService } from './firebase.service.js'

export const taskService = {
  query,
  getById: getTaskById,
  save: saveTask,
  remove: removeTask,
  getEmptyTask,
}

const collection = 'todo'

async function query() {
  return firebaseService.query(collection)
}

async function getTaskById(taskId) {
  return firebaseService.getEntityById(collection, taskId)
}

async function saveTask(task) {
  return firebaseService.saveEntity(collection, task)
}

async function removeTask(taskId) {
  return firebaseService.removeEntity(collection, taskId)
}

function getEmptyTask() {
  return {
    txt: '',
    importance: 0,
    isDone: false,
  }
}
