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
import { MawaterStructure } from '../../../models/mawaterStructure';
import { MawaterStatusDialogComponent } from '../../mawater-status-area/mawaterStatus/mawaterStatusDialog/mawaterStatusDialog.component';
import { PaymentFeature } from '../../../models/paymentFeature';
import { PaymentFeatureDialogComponent } from './paymentFeature-dialog/paymentFeature-dialog.component';
@Component({
  selector: 'app-paymentFeature',
  templateUrl: './paymentFeature.component.html',
  styleUrls: ['./paymentFeature.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
})
export class PaymentFeatureComponent implements OnInit , OnDestroy{
  dbPath = '/paymentFeature';
  paymentFeatures: PaymentFeature[] = [];
  paymentFeatureService = inject(CommonService);
  displayedColumns: string[] = [
    'paymentFeatureName',
    'paymentFeatureArabicName',
    'actions',
  ];
  dataSource: MatTableDataSource<PaymentFeature> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    debugger;
    this.getAllPaymentFeatures();
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
    this.dialog.open(PaymentFeatureDialogComponent, {
      data: { id: id },
       width: '600px',
    });
  }

  getAllPaymentFeatures() {
    this.paymentFeatureService
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
        this.paymentFeatures = data;
        this.dataSource = new MatTableDataSource<PaymentFeature>(data);
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }

}
