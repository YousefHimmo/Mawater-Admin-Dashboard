import {Component,ElementRef,Inject,OnDestroy,OnInit,ViewChild,inject} from '@angular/core';
import { v4 as uuid } from 'uuid';
import {MAT_DIALOG_DATA,MatDialogContent,MatDialogRef,MatDialogTitle} from '@angular/material/dialog';
import {FormBuilder,Validators,ReactiveFormsModule,FormsModule,FormControl} from '@angular/forms';
import { NgClass } from '@angular/common';
import { map, take } from 'rxjs';
import { CommonService } from '../../../services/common.service';
import { PaymentPackage } from '../../../models/paymentPackage';
import { AddRemoveFeatrue } from '../../../Enums/addRemoveFeatrue.enum';
import { PaymentFeature } from '../../../models/paymentFeature';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-paymentPackage-dialog',
  templateUrl: './paymentPackage-dialog.component.html',
  styleUrls: ['./paymentPackage-dialog.component.css'],
  standalone: true,
  imports: [ MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass, FormsModule,MatSelectModule],
})
export class PaymentPackageDialogComponent implements OnInit, OnDestroy {
  @ViewChild('table') table!: ElementRef;
  FeaturesValid: boolean = true;
  
  paymentPackage: PaymentPackage = {
    paymentPackageId: uuid(),
    paymentArabicName: '',
    paymentPackageName: '',
    paymentPackagePrice: 0,
    paymentPackageDescription: '',
    paymentPackageFeatures: ['']
  };

  dbPath = '/paymentPackage';
  dbPathPaymentFeature = '/paymentFeature';

  paymentFeatures: PaymentFeature[] = [];
  paymentPackageService = inject(CommonService);

  features = new FormControl('');

  paymentPackageForm = this.fb.group({
    paymentPackageName: ['', Validators.required],
    paymentArabicName: ['', Validators.required],
    paymentPackagePrice: [0, Validators.required],
    paymentPackageDescription: ['', Validators.required],
    paymentPackageFeatures: [''],
  });

  enum: typeof AddRemoveFeatrue = AddRemoveFeatrue;

  constructor(
    public dialogpaymentPackage: MatDialogRef<PaymentPackageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.id){
     this.getPaymentPackageId(this.data.id);
    }  
    this.getPaymentFeatures();
  }

  onSubmit() {
    debugger;
    if (this.paymentPackageForm.valid) {
      this.paymentPackage = Object.assign(
        this.paymentPackage,
        this.paymentPackageForm.value
      );

      var data = this.features.value as unknown as string[];
      this.paymentPackage.paymentPackageFeatures = data;

      if (!this.data.id) {
        this.paymentPackageService.saveData(this.paymentPackage, this.dbPath);
      } else {
        this.paymentPackageService.updateData(
          this.data.id,
          this.paymentPackage,
          this.dbPath
        );
      }
      this.dialogpaymentPackage.close();
    }
  }

  getPaymentPackageId(key: string) {
    console.log(key);
    console.log(this.dbPath);
    this.paymentPackageService
      .getData(key, this.dbPath)
      .pipe(take(1))
      .subscribe((doc: any) => {
        console.log(doc);
        this.paymentPackage = doc;
        this.paymentPackageForm.setValue({
          paymentPackageName :  this.paymentPackage.paymentPackageName,
          paymentArabicName : this.paymentPackage.paymentArabicName,
          paymentPackageDescription : this.paymentPackage.paymentPackageDescription,
          paymentPackagePrice : this.paymentPackage.paymentPackagePrice,
          paymentPackageFeatures : ''
        });
        this.features = new FormControl(this.paymentPackage.paymentPackageFeatures)
      });
  }

  getPaymentFeatures() {
    this.paymentPackageService
      .getAllData(this.dbPathPaymentFeature)
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
        this.paymentFeatures = data;
      });
  }

  getData() {
    const data = this.features;
    console.log(data.value);
  }

  ngOnDestroy(): void {
    this.dialogpaymentPackage.close();
  }
}
