import { Component, Inject, OnInit, inject } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {NgClass} from '@angular/common';
import { take } from 'rxjs';
import { PaymentFeature } from '../../../../models/paymentFeature';
import { CommonService } from '../../../../services/common.service';


@Component({
  selector: 'app-paymentFeature-dialog',
  templateUrl: './paymentFeature-dialog.component.html',
  styleUrls: ['./paymentFeature-dialog.component.css'],
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass,FormsModule],
  standalone: true,
})
export class PaymentFeatureDialogComponent implements OnInit {

  paymentFeature: PaymentFeature = {
    paymentFeatureId: uuid(), paymentFeatureName: "", paymentFeatureArabicName: "",
  };
  dbPath = "/paymentFeature";
  paymentFeatureService = inject(CommonService);
  paymentFeatureForm = this.fb.group({
    paymentFeatureName: ['', Validators.required],
    paymentFeatureArabicName: ['', Validators.required],
  });


  constructor(
    public dialogStatus: MatDialogRef<PaymentFeatureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStatusById(this.data.id);
  }

  onSubmit() {
    debugger; 
    if (this.paymentFeatureForm.valid) {
      this.paymentFeature = Object.assign(this.paymentFeature, this.paymentFeatureForm.value);
      if(!this.data.id){
        this.paymentFeatureService.saveData(this.paymentFeature,this.dbPath);
      }
      else{
        this.paymentFeatureService.updateData(this.data.id, this.paymentFeature,this.dbPath);
      }
      this.dialogStatus.close();
    }
  }
  
  getStatusById(key:string){
    debugger;
    this.paymentFeatureService.getData(key,this.dbPath).pipe(take(1)).subscribe((doc: any) => {
      console.log(doc);
      this.paymentFeature = doc;
    });
  }

}
