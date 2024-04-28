import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RestURL} from "../shared/RestURL";
import {TaskManagerModel} from "../model/task-manager.model";

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTasks() {
    return this.httpClient.get<any>(RestURL.getAllTasks)
  }

  addTask(taskManagerModel: TaskManagerModel) {
    return this.httpClient.post<any>(RestURL.addTask, taskManagerModel)
  }

  updateTaskById(id: String, taskManagerModel: TaskManagerModel) {
    return this.httpClient.put<any>(RestURL.updateTaskById + '/' + id, taskManagerModel)
  }

  deleteTaskById(id: String) {
    return this.httpClient.delete<any>(RestURL.deleteTaskById + '/' + id)
  }
}
