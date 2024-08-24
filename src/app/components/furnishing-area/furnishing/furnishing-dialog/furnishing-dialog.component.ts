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
import { Furnishing } from '../../../../models/furnishing';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-furnishing-dialog',
  templateUrl: './furnishing-dialog.component.html',
  styleUrls: ['./furnishing-dialog.component.css'],
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass,FormsModule],
  standalone: true,

})
export class FurnishingDialogComponent implements OnInit {

  furnishing: Furnishing = {
    furnishingId: uuid(), furnishingName: "", furnishingArabicName: "",
    isActive: true
  };
  dbPath = "/furnishing";
  furnishingService = inject(CommonService);
  furnishingForm = this.fb.group({
    furnishingName: ['', Validators.required],
    furnishingArabicName: ['', Validators.required],
  });


  constructor(
    public dialogFurnishing: MatDialogRef<FurnishingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getColorById(this.data.id);
  }

  onSubmit() {
    debugger; 
    if (this.furnishingForm.valid) {
      this.furnishing = Object.assign(this.furnishing, this.furnishingForm.value);
      if(!this.data.id){
        this.furnishingService.saveData(this.furnishing,this.dbPath);
      }
      else{
        this.furnishingService.updateData(this.data.id, this.furnishing,this.dbPath);
      }
      this.dialogFurnishing.close();
    }
  }
  
  getColorById(key:string){
    debugger;
    this.furnishingService.getData(key,this.dbPath).pipe(take(1)).subscribe((doc: any) => {
      console.log(doc);
      this.furnishing = doc;
    });
  }

}
