import { Component, Inject, OnInit, inject } from '@angular/core';
import { v4 as uuid } from 'uuid';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import {NgClass} from '@angular/common';
import { take } from 'rxjs';
import { City } from '../../../models/city';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-city-dialog',
  standalone: true,
  templateUrl: './city-dialog.component.html',
  styleUrl: './city-dialog.component.css',
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass,FormsModule],
})
export class CityDialogComponent implements OnInit {
  city: City = {
    cityId: uuid(), cityName: "", cityArabicName: "", countryId: "1",
    isActive: true
  };
  dbPath = "/city";
  cityService = inject(CommonService);
  cityForm = this.fb.group({
    cityName: ['', Validators.required],
    cityArabicName: ['', Validators.required],
  });

  constructor(
    public dialogCity: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCityById(this.data.id);
  }

  onSubmit() {
    debugger; 
    if (this.cityForm.valid) {
      this.city = Object.assign(this.city, this.cityForm.value);
      if(!this.data.id){
        this.cityService.saveData(this.city,this.dbPath);
      }
      else{
        this.cityService.updateData(this.data.id, this.city,this.dbPath);
      }
      this.dialogCity.close();
    }
  }
  
  getCityById(key:string){
    debugger;
    this.cityService.getData(key,this.dbPath).pipe(take(1)).subscribe((doc: any) => {
      console.log(doc);
      this.city = doc;
    });
  }
}
