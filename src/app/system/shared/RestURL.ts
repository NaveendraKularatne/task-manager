const mainURL = 'http://localhost:8080/api';

export const RestURL = {
  login                 : mainURL + '/auth/login',
  getAllTasks           : mainURL + '/tasks',
  addTask               : mainURL + '/tasks',
  updateTaskById        : mainURL + '/tasks/update',
  deleteTaskById        : mainURL + '/tasks/delete'
}
