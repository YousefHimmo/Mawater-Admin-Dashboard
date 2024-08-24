import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { CarTransmissionDialogComponent } from '../carTransmission-dialog/carTransmission-dialog.component';
import { CommonService } from '../../../services/common.service';
import { CarTransmission } from '../../../models/carTransmission';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-carTransmission',
  templateUrl: './carTransmission.component.html',
  styleUrls: ['./carTransmission.component.css'],
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule],
  providers: [CommonService],
  standalone: true,
})
export class CarTransmissionComponent implements OnInit,OnDestroy {
  carTransmistions: CarTransmission[] = [];
  commonService = inject(CommonService);
  path = '/carTransmission';
  displayedColumns: string[] = ['transArabicName', 'transName', 'actions'];

  dataSource: MatTableDataSource<CarTransmission> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator| any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllCarTransmitions(this.path);
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
    this.dialog.open(CarTransmissionDialogComponent, {
      data: { id: id },
       width: '600px',
    });
  }

  getAllCarTransmitions(dbPath: string) {
    debugger;
    this.commonService
      .getAllData(dbPath)
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
        console.log(data);
        this.carTransmistions = data;
        this.dataSource = new MatTableDataSource<CarTransmission>(data);
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
