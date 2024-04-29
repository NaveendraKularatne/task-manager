import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TaskManagerService} from "../Service/task-manager.service";
import {catchError, finalize} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UserConfirmationComponent} from "../user-confirmation/user-confirmation.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'description', 'duedate', 'action'];
  dataSource: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private taskManagerService: TaskManagerService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.taskManagerService.getAllTasks().pipe(
      catchError(error => {
        alert('Error in getting tasks list');
        throw error;
      }),
      finalize(() => {
        }
      )
    ).subscribe(
      result => {
        if (result != undefined) {
          this.dataSource = result;
        }
      }
    )
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


    // if (confirm('Are you sure you want to delete this item?')) {
    //   this.taskManagerService.deleteTaskById(element.id).subscribe({
    //     next: (res) => {
    //       this.dataSource = this.dataSource.filter((item: { id: any; }) => item.id !== element.id);
    //       console.log('Item deleted successfully!');
    //     },
    //     error: (err) => console.error('Error deleting item: ', err)
    //   });
    // }
  }
}
