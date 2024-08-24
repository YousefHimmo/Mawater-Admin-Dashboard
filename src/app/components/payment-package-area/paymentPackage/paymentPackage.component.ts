import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { PaymentPackage } from '../../../models/paymentPackage';
import { PaymentPackageDialogComponent } from '../paymentPackage-dialog/paymentPackage-dialog.component';

@Component({
  selector: 'app-paymentPackage',
  templateUrl: './paymentPackage.component.html',
  styleUrls: ['./paymentPackage.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  providers: [],
})
export class PaymentPackageComponent implements OnInit , OnDestroy {
String(arg0: string|undefined): string {
throw new Error('Method not implemented.');
}

  dbPath = '/paymentPackage';
  paymentPackages: PaymentPackage[] = [];
  paymentPackageService = inject(CommonService);
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    debugger;
    this.getPaymentPackages();
  }

  openDialog(id?: string) {
    debugger;
    this.dialog.open(PaymentPackageDialogComponent, {
      data: { id: id },
      width: '600px',
    });
  }

  getPaymentPackages() {
    this.paymentPackageService
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
        console.log(data);
        this.paymentPackages = data;
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
