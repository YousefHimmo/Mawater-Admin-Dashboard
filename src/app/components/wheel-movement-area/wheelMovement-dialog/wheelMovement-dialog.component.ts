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
import { WheelMovement } from '../../../models/wheelMovement';

@Component({
  selector: 'app-wheelMovement-dialog',
  templateUrl: './wheelMovement-dialog.component.html',
  styleUrls: ['./wheelMovement-dialog.component.css'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass,FormsModule],
})
export class WheelMovementDialogComponent implements OnInit {

  wheelMovement: WheelMovement = {
    wheelMovementId: uuid(), wheelMovementName: "", wheelMovementArabicName: ""
  };
  dbPath = "/wheelMovement";
  wheelMovementService = inject(CommonService);
  wheelMovementForm = this.fb.group({
    wheelMovementName: ['', Validators.required],
    wheelMovementArabicName: ['', Validators.required],
  });

  constructor(
    public dialogwheelMovement: MatDialogRef<WheelMovementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getWheelMovementyId(this.data.id);
  }

  onSubmit() {
    debugger; 
    if (this.wheelMovementForm.valid) {
      this.wheelMovement = Object.assign(this.wheelMovement, this.wheelMovementForm.value);
      if(!this.data.id){
        this.wheelMovementService.saveData(this.wheelMovement,this.dbPath);
      }
      else{
        this.wheelMovementService.updateData(this.data.id, this.wheelMovement,this.dbPath);
      }
      this.dialogwheelMovement.close();
    }
  }
  
  getWheelMovementyId(key:string){
    debugger;
    this.wheelMovementService.getData(key,this.dbPath).pipe(take(1)).subscribe((doc: any) => {
      console.log(doc);
      this.wheelMovement = doc;
    });
  }

}
