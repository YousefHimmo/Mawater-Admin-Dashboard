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
import { Year } from '../../../models/year';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-year-dialog',
  templateUrl: './year-dialog.component.html',
  styleUrls: ['./year-dialog.component.css'],
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass,FormsModule],
  standalone: true,
})
export class YearDialogComponent implements OnInit {

  year: Year = {
    yearId: uuid(), yearName: "", yearArabicName: "",
    isActive: true
  };
  
  dbPath = "/year";
  yearService = inject(CommonService);
  yearForm = this.fb.group({
    yearName: ['', Validators.required],
    yearArabicName: ['', Validators.required],
  });

  constructor(
    public dialogStatus: MatDialogRef<YearDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getyearById(this.data.id);
  }

  onSubmit() {
    debugger; 
    if (this.yearForm.valid) {
      this.year = Object.assign(this.year, this.yearForm.value);
      if(!this.data.id){
        this.yearService.saveData(this.year,this.dbPath);
      }
      else{
        this.yearService.updateData(this.data.id, this.year,this.dbPath);
      }
      this.dialogStatus.close();
    }
  }
  
  getyearById(key:string){
    debugger;
    this.yearService.getData(key,this.dbPath).pipe(take(1)).subscribe((doc: any) => {
      console.log(doc);
      this.year = doc;
    });
  }

}
