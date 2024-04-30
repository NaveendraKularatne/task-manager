import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Task} from "../model/task";
import {ActionMode} from "../shared/ActionMode";

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

  task_title = new FormControl('', Validators.required);
  task_description = new FormControl('', Validators.required);
  minDate!: Date;
  date: Date | null = null;
  formattedDate!: string | null;


  constructor(private datePipe: DatePipe) {
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

}
