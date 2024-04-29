import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-view-edit-task',
  templateUrl: './add-view-edit-task.component.html',
  styleUrls: ['./add-view-edit-task.component.scss']
})
export class AddViewEditTaskComponent implements OnInit {
  task_title = new FormControl(undefined, Validators.required);

  constructor() { }

  ngOnInit(): void {
  }

}
