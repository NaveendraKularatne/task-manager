const mainURL = 'http://localhost:8080/';

export const RestURL = {
  getAllTasks           : mainURL + 'api/tasks',
  addTask               : mainURL + 'api/tasks/add',
  updateTaskById        : mainURL + 'api/tasks/update',
  deleteTaskById        : mainURL + 'api/tasks/delete'
}
