import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskManagerService} from "../service/task-manager.service";
import {catchError} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UserConfirmationComponent} from "../user-confirmation/user-confirmation.component";
import {Router} from "@angular/router";
import {ActionMode} from "../shared/ActionMode";
import {Task} from "../model/task";
import {AddViewEditTaskComponent} from "../add-view-edit-task/add-view-edit-task.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'description', 'duedate', 'action'];
  dataSource: Task[] = [];
  displayAddViewEditComponent: boolean = false;
  mode: string | undefined;
  selectedTask: Task = new Task();
  actionTitle: string = 'Add New Task';
  buttonName: string = 'Save';

  @ViewChild('addViewEditTaskComponent')
  addViewEditTask: AddViewEditTaskComponent | undefined;

  constructor(
    private taskManagerService: TaskManagerService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.retrieveTaskList();
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth_token');
  }

  retrieveTaskList(): void {
    this.taskManagerService.getAllTasks().pipe(
      catchError(error => {
        this.router.navigate(['/login']);
        throw error;
      })
    ).subscribe(
      result => {
        if (result != undefined) {
          this.dataSource = result;
        }
      }
    );
  }

  onDelete(element: { id: any; }) {
    const userConfirmation = this.dialog.open(UserConfirmationComponent, {
      disableClose: true,
      width: '40%',
      data: {
        task_id: element.id
      }
    });
    userConfirmation.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onAddButtonClick(): void {
    this.actionTitle = 'Add New Task';
    this.buttonName = 'Save';
    this.mode = ActionMode.ADD;
    this.displayAddViewEditComponent = true;

    setTimeout(() => {
      if (this.addViewEditTask) {
        this.addViewEditTask.clearTaskData();
      }
    });
  }

  hideAddViewEditComponent($event: boolean): void {
    this.displayAddViewEditComponent = $event;
  }

  onEditButtonClicked(task: Task): void {
    this.buttonName = 'Update';
    this.actionTitle = 'Edit Task';
    this.mode = ActionMode.EDIT;
    this.selectedTask = task;
    this.displayAddViewEditComponent = true;
    setTimeout(() => {
      if (this.addViewEditTask) {
        this.addViewEditTask.setTaskData();
      }
    });
  }

  closeAddEditWindow() {
    this.displayAddViewEditComponent = false;
  }
}
