import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Task} from "../model/task";
import {ActionMode} from "../shared/ActionMode";
import {TaskManagerService} from "../service/task-manager.service";
import {catchError} from "rxjs";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-view-edit-task',
  templateUrl: './add-view-edit-task.component.html',
  styleUrls: ['./add-view-edit-task.component.scss']
})
export class AddViewEditTaskComponent implements OnInit {

  @Input()
  mode: string | undefined;

  @Input()
  selectedTask: Task = new Task();

  @Input()
  actionTitle!: string;

  @Input()
  buttonName: string = 'Update';

  @Output()
  cancelButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  reloadTaskList: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  closeAddEditWindow: EventEmitter<boolean> = new EventEmitter<boolean>();

  task_title = new FormControl('', Validators.required);
  task_description = new FormControl('', Validators.required);
  minDate!: Date;
  date: Date | null = null;
  formattedDate!: string | null;
  displayTitleError: boolean = false;
  validationMsgTitleError: string = 'Title is required';
  displayDueDateError: boolean = false;
  validationMsgDueDateError: string = 'Due date is required';

  constructor(private datePipe: DatePipe, private taskService: TaskManagerService) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    if (this.mode === ActionMode.EDIT) {
      this.setTaskData();
    }
  }

  changeDateFormat() {
    this.formattedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')
  }

  cancel() {
    this.cancelButtonClick.emit(false);
  }

  setTaskData(): void {
    this.task_title.setValue(this.selectedTask.title);
    this.task_description.setValue(this.selectedTask.description);
    this.date = new Date(this.selectedTask.duedate);
    this.changeDateFormat();
  }

  clearTaskData(): void {
    this.task_title.setValue(null);
    this.task_description.setValue(null);
    this.date = null;
  }

  addOrUpdateTask() {
    this.displayTitleError = false;
    this.displayDueDateError = false;
    if (this.mode === ActionMode.ADD) {
      const newTask: Task = new Task();
      if (this.task_title.value) {
        newTask.title = this.task_title.value;
      } else {
        this.displayTitleError = true;
      }

      if (this.task_description.value) {
        newTask.description = this.task_description.value;
      }

      if (this.date) {
        newTask.duedate = this.date;
      } else {
        this.displayDueDateError = true;
      }
      this.taskService.addTask(newTask).pipe(
        catchError(error => {
          throw error;
        })
      ).subscribe(
        result => {
          if (result != undefined) {
            Swal.fire({
              title: "Task Added!",
              text: "Task Added Successfully!",
              icon: "success"
            });
            this.clearTaskData();
            this.reloadTaskList.emit();
            this.closeAddEditWindow.emit(true);
          }
        }
      );
    }
  }
}
