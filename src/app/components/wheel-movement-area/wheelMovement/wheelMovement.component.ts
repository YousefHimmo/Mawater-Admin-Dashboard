import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { map } from 'rxjs';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { MatSort } from '@angular/material/sort';
import { WheelMovement } from '../../../models/wheelMovement';
import { WheelMovementDialogComponent } from '../wheelMovement-dialog/wheelMovement-dialog.component';

@Component({
  selector: 'app-wheelMovement',
  templateUrl: './wheelMovement.component.html',
  styleUrls: ['./wheelMovement.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  providers: [],
})
export class WheelMovementComponent implements OnInit , OnDestroy{
  dbPath = '/wheelMovement';
  wheelMovements: WheelMovement[] = [];
  wheelMovementService = inject(CommonService);
  displayedColumns: string[] = [
    'wheelMovementName',
    'wheelMovementArabicName',
    'actions',
  ];
  dataSource: MatTableDataSource<WheelMovement> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    debugger;
    this.getAllWheelMovements();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id: string) {
    debugger;
    this.dialog.open(WheelMovementDialogComponent, {
      data: { id: id },
       width: '600px',
    });
  }

  getAllWheelMovements() {
    this.wheelMovementService
      .getAllData(this.dbPath)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        debugger;
        this.wheelMovements = data;
        this.dataSource = new MatTableDataSource<WheelMovement>(data);
      });
  }
  
  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
