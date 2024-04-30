import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {TaskManagerService} from "../service/task-manager.service";
import {catchError} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UserConfirmationComponent} from "../user-confirmation/user-confirmation.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'description', 'duedate', 'action'];
  dataSource: any = [];
  displayAddViewEditComponent: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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

  addTask(): void {
    this.displayAddViewEditComponent = true;
  }

  hideAddViewEditComponent($event: boolean): void {
    this.displayAddViewEditComponent = $event;
  }
}
