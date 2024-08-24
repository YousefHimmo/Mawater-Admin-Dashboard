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
import { MawaterStructure } from '../../../models/mawaterStructure';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-mawaterStructure-dialog',
  templateUrl: './mawaterStructure-dialog.component.html',
  styleUrls: ['./mawaterStructure-dialog.component.css'],
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule,NgClass,FormsModule],
  standalone: true,
})
export class MawaterStructureDialogComponent implements OnInit {

  mawaterStructure: MawaterStructure = {
    structureId: uuid(), structureName: "", structureArabicName: "",
    isActive: true
  };
  dbPath = "/mawaterStructure";
  mawaterStructureService = inject(CommonService);
  mawaterStructureForm = this.fb.group({
    structureName: ['', Validators.required],
    structureArabicName: ['', Validators.required],
  });


  constructor(
    public dialogStatus: MatDialogRef<MawaterStructureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStatusById(this.data.id);
  }

  onSubmit() {
    debugger; 
    if (this.mawaterStructureForm.valid) {
      this.mawaterStructure = Object.assign(this.mawaterStructure, this.mawaterStructureForm.value);
      if(!this.data.id){
        this.mawaterStructureService.saveData(this.mawaterStructure,this.dbPath);
      }
      else{
        this.mawaterStructureService.updateData(this.data.id, this.mawaterStructure,this.dbPath);
      }
      this.dialogStatus.close();
    }
  }
  
  getStatusById(key:string){
    debugger;
    this.mawaterStructureService.getData(key,this.dbPath).pipe(take(1)).subscribe((doc: any) => {
      console.log(doc);
      this.mawaterStructure = doc;
    });
  }

}
