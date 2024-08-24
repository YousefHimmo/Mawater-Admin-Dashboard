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
import { CommonService } from '../../../services/common.service';
import { CarColor } from '../../../models/carColor';

@Component({
  selector: 'app-car-color-dialog',
  templateUrl: './car-color-dialog.component.html',
  styleUrls: ['./car-color-dialog.component.css'],
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass,FormsModule],
  standalone: true,
})
export class CarColorDialogComponent implements OnInit {
  color: CarColor = {
    colorId: uuid(), colorName: "", colorArabicName: "",
    isActive: true
  };
  dbPath = "/color";
  colorService = inject(CommonService);
  colorForm = this.fb.group({
    colorName: ['', Validators.required],
    colorArabicName: ['', Validators.required],
  });


  constructor(
    public dialogCity: MatDialogRef<CarColorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getColorById(this.data.id);
  }

  onSubmit() {
    debugger; 
    if (this.colorForm.valid) {
      this.color = Object.assign(this.color, this.colorForm.value);
      if(!this.data.id){
        this.colorService.saveData(this.color,this.dbPath);
      }
      else{
        this.colorService.updateData(this.data.id, this.color,this.dbPath);
      }
      this.dialogCity.close();
    }
  }
  
  getColorById(key:string){
    debugger;
    this.colorService.getData(key,this.dbPath).pipe(take(1)).subscribe((doc: any) => {
      console.log(doc);
      this.color = doc;
    });
  }

}
