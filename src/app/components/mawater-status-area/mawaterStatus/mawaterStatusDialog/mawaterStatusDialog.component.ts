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
import { CommonService } from '../../../../services/common.service';
import { MawaterStatus } from '../../../../models/mawaterStatus';

@Component({
  selector: 'app-mawaterStatusDialog',
  templateUrl: './mawaterStatusDialog.component.html',
  styleUrls: ['./mawaterStatusDialog.component.css'],
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass,FormsModule],
  standalone: true,
})
export class MawaterStatusDialogComponent implements OnInit {

  mawaterStatus: MawaterStatus = {
    statusId: uuid(), statusName: "", statusArabicName: "",
    isActive: true
  };
  dbPath = "/mawaterStatus";
  mawaterStatusService = inject(CommonService);
  mawaterStatusForm = this.fb.group({
    statusName: ['', Validators.required],
    statusArabicName: ['', Validators.required],
  });


  constructor(
    public dialogStatus: MatDialogRef<MawaterStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStatusById(this.data.id);
  }

  onSubmit() {
    debugger; 
    if (this.mawaterStatusForm.valid) {
      this.mawaterStatus = Object.assign(this.mawaterStatus, this.mawaterStatusForm.value);
      if(!this.data.id){
        this.mawaterStatusService.saveData(this.mawaterStatus,this.dbPath);
      }
      else{
        this.mawaterStatusService.updateData(this.data.id, this.mawaterStatus,this.dbPath);
      }
      this.dialogStatus.close();
    }
  }
  
  getStatusById(key:string){
    debugger;
    this.mawaterStatusService.getData(key,this.dbPath).pipe(take(1)).subscribe((doc: any) => {
      console.log(doc);
      this.mawaterStatus = doc;
    });
  }

}
