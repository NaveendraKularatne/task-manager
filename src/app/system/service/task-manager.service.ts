import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RestURL} from "../shared/RestURL";
import {TaskManagerModel} from "../model/task-manager.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTasks(headers?: HttpHeaders): Observable<any> {
    return this.httpClient.get<any>(RestURL.getAllTasks, { headers }).pipe();
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
