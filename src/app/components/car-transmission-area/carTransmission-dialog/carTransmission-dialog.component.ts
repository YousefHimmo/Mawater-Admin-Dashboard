import { NgClass } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { take } from 'rxjs';
import { CarTransmission } from '../../../models/carTransmission';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-carTransmission-dialog',
  templateUrl: './carTransmission-dialog.component.html',
  styleUrls: ['./carTransmission-dialog.component.css'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
  ],
  standalone : true
})
export class CarTransmissionDialogComponent implements OnInit {
  private dbPath = '/carTransmission';
  carTransmission: CarTransmission = {
    transArabicName: '',
    transId: uuid(),
    transName: '',
    isActive: true
  };
  commonService = inject(CommonService);
  carTransmissionForm = this.fb.group({
    transName: ['', Validators.required],
    transArabicName: ['', Validators.required],
  });

  constructor(
    public dialogCarTransmition: MatDialogRef<CarTransmissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategoryById(this.data.id);
  }

  onSubmit() {
    debugger;
    if (this.carTransmissionForm.valid) {
      this.carTransmission = Object.assign(this.carTransmission, this.carTransmissionForm.value);
      if (!this.data.id) {
        this.commonService.saveData(this.carTransmission,this.dbPath);
      } else {
        this.commonService.updateData(this.data.id, this.carTransmission,this.dbPath);
      }
      this.dialogCarTransmition.close();
    }
  }

  getCategoryById(key: string) {
    debugger;
    this.commonService
      .getData(key,this.dbPath)
      .pipe(take(1))
      .subscribe((doc: any) => {
        console.log(doc);
        this.carTransmission = doc;
      });
  }

}
