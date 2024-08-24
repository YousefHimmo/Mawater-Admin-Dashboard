import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { map } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { MatSort } from '@angular/material/sort';
import { CarColorDialogComponent } from '../car-color-dialog/car-color-dialog.component';
import { CarColor } from '../../../models/carColor';

@Component({
  selector: 'app-car-color',
  templateUrl: './car-color.component.html',
  styleUrls: ['./car-color.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  providers: [],
})
export class CarColorComponent implements OnInit , OnDestroy {
  dbPath = '/color';
  colors: CarColor[] = [];
  cityService = inject(CommonService);
  displayedColumns: string[] = ['colorArabicName', 'colorName', 'actions'];
  dataSource: MatTableDataSource<CarColor> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    debugger;
    this.getAllColors();
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
    this.dialog.open(CarColorDialogComponent, {
      data: { id: id },
      width: '600px',
    });
  }

  getAllColors() {
    this.cityService
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
        this.colors = data;
        this.dataSource = new MatTableDataSource<CarColor>(data);
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
