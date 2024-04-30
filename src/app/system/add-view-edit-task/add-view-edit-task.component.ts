import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-view-edit-task',
  templateUrl: './add-view-edit-task.component.html',
  styleUrls: ['./add-view-edit-task.component.scss']
})
export class AddViewEditTaskComponent implements OnInit {
  task_title = new FormControl(Validators.required);
  task_description = new FormControl(undefined, Validators.required);
  minDate!: Date;
  date!: Date;
  formattedDate!: string | null;
  headerName: string = 'Add new task';
  buttonName: string = 'Update';
  title: any = 'Update the title';

  @Output()
  cancelButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private datePipe: DatePipe) {
    const current = new Date();
    this.minDate = new Date(current.getFullYear(), current.getMonth(), current.getDate());
  }


  ngOnInit(): void {
    this.task_title.setValue(this.title);
  }

  test() {
    console.log(this.date)
    this.formattedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd')
    console.log(this.formattedDate)
  }

  cancel() {
    this.cancelButtonClick.emit(false);
  }
}
