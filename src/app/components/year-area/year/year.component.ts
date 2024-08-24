import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { map } from 'rxjs';
import {ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { MatSort } from '@angular/material/sort';
import { Year } from '../../../models/year';
import { YearDialogComponent } from '../year-dialog/year-dialog.component';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,MatPaginatorModule],
  providers: [] 
})
export class YearComponent implements OnInit , OnDestroy{

  dbPath = "/year";
  year: Year[] = [];
  yearService = inject(CommonService);
  displayedColumns: string[] = ['yearArabicName', 'yearName','actions'];
  dataSource: MatTableDataSource<Year> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator| any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    debugger;
    this.getAllYears();
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

  openDialog(id:string) {
    debugger;
    this.dialog.open(YearDialogComponent, {
      data: {id: id},
       width: '600px',
    })
  }
  
  getAllYears() {
    this.yearService
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
        this.year = data;
        this.dataSource = new MatTableDataSource<Year>(data);
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
  
}
