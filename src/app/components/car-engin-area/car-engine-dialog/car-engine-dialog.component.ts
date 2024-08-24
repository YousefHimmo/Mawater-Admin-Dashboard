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
import { EngineCapacity } from '../../../models/engineCapacity';


@Component({
  selector: 'app-car-engine-dialog',
  templateUrl: './car-engine-dialog.component.html',
  styleUrls: ['./car-engine-dialog.component.css'],
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass,FormsModule],
  standalone: true,
})
export class CarEngineDialogComponent implements OnInit {
  engine: EngineCapacity = {
    capacityId: uuid(), capacityName: "", capacityArabicName: "",
    isActive: true
  };
  dbPath = "/engineCapacity";
  engineService = inject(CommonService);
  engineForm = this.fb.group({
    capacityName: ['', Validators.required],
    capacityArabicName: ['', Validators.required],
  });


  constructor(
    public dialogCity: MatDialogRef<CarEngineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEngineById(this.data.id);
  }

  onSubmit() {
    debugger; 
    if (this.engineForm.valid) {
      this.engine = Object.assign(this.engine, this.engineForm.value);
      if(!this.data.id){
        this.engineService.saveData(this.engine,this.dbPath);
      }
      else{
        this.engineService.updateData(this.data.id, this.engine,this.dbPath);
      }
      this.dialogCity.close();
    }
  }
  
  getEngineById(key:string){
    debugger;
    this.engineService.getData(key,this.dbPath).pipe(take(1)).subscribe((doc: any) => {
      console.log(doc);
      this.engine = doc;
    });
  }

}
