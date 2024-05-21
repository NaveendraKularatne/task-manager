import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RestURL} from "../shared/RestURL";
import {Task} from "../model/task";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTasks(): Observable<any> {
    return this.httpClient.get<any>(RestURL.getAllTasks);
  }

  addTask(taskManagerModel: Task) {
    return this.httpClient.post<any>(RestURL.addTask, taskManagerModel)
  }

  updateTaskById(id: number, taskManagerModel: Task) {
    return this.httpClient.put<any>(RestURL.updateTaskById + '/' + id, taskManagerModel)
  }

  deleteTaskById(id: String) {
    return this.httpClient.delete<any>(RestURL.deleteTaskById + '/' + id)
  }
}
