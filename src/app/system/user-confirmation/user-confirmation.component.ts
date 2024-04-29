import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TaskManagerService} from "../Service/task-manager.service";
import {catchError, finalize, tap} from "rxjs";

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.scss']
})
export class UserConfirmationComponent implements OnInit {
  disableConfirmBtn: boolean = false;
  user_message: string = 'Are you sure you want to delete this task?';
  afterResponse: boolean = false;

  constructor(
    private taskManagerService: TaskManagerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
  }

  deleteTaskById() {
    this.taskManagerService.deleteTaskById(this.data.task_id).subscribe({
      next: (res) => {
        this.user_message = 'Task deleted successfully!'
        this.afterResponse = true;
      },
      error: (err) => {
        this.user_message = 'Error in deleting task: ', err;
        this.afterResponse = true;
      }
    });
  }
}
