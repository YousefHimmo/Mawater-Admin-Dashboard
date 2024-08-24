import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { MatSort } from '@angular/material/sort';
import { CarEngineDialogComponent } from '../car-engine-dialog/car-engine-dialog.component';
import { EngineCapacity } from '../../../models/engineCapacity';

@Component({
  selector: 'app-car-engine',
  templateUrl: './car-engine.component.html',
  styleUrls: ['./car-engine.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
})
export class CarEngineComponent implements OnInit , OnDestroy {
  dbPath = '/engineCapacity';
  engineCapacity: EngineCapacity[] = [];
  engineCapacityService = inject(CommonService);
  displayedColumns: string[] = [
    'capacityArabicName',
    'capacityName',
    'actions',
  ];
  dataSource: MatTableDataSource<EngineCapacity> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    debugger;
    this.getAllEngines();
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
    this.dialog.open(CarEngineDialogComponent, {
      data: { id: id },
      width: '600px',
    });
  }

  getAllEngines() {
    this.engineCapacityService
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
        this.engineCapacity = data;
        this.dataSource = new MatTableDataSource<EngineCapacity>(data);
      });
  }
  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
