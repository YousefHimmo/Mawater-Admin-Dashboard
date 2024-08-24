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
import { NgClass } from '@angular/common';
import { map, take } from 'rxjs';
import { MawaterType } from '../../../../models/mawaterType';
import { CommonService } from '../../../../services/common.service';
import { Mawater } from '../../../../models/mawater';
@Component({
  selector: 'app-mawaterType-dialog',
  templateUrl: './mawaterType-dialog.component.html',
  styleUrls: ['./mawaterType-dialog.component.css'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
  ],
  standalone: true,
})
export class MawaterTypeDialogComponent implements OnInit {
  mawaterType: MawaterType = {
    mTypeId: uuid(),
    mTypeName: '',
    mTypeArabicName: '',
    mawaterId: '',
    isActive: true,
  };

  dbPath = '/mawaterType';
  mawaters: Mawater[] = [];
  dbMawaterPath = '/mawater';
  mawaterTypeService = inject(CommonService);
  mawaterTypeForm = this.fb.group({
    mTypeName: ['', Validators.required],
    mTypeArabicName: ['', Validators.required],
    mawaterId : ['', Validators.required],
  });

  constructor(
    public dialogStatus: MatDialogRef<MawaterTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.id) this.getMawaterTypeById(this.data.id);
    this. getAllMawaters();
  }

  onSubmit() {
    debugger;
    if (this.mawaterTypeForm.valid) {
      this.mawaterType = Object.assign(
        this.mawaterType,
        this.mawaterTypeForm.value
      );
      if (!this.data.id) {
        this.mawaterTypeService.saveData(this.mawaterType, this.dbPath);
      } else {
        this.mawaterTypeService.updateData(
          this.data.id,
          this.mawaterType,
          this.dbPath
        );
      }
      this.dialogStatus.close();
    }
  }

  getMawaterTypeById(key: string) {
    debugger;
    this.mawaterTypeService
      .getData(key, this.dbPath)
      .pipe(take(1))
      .subscribe((doc: any) => {
        console.log(doc);
        this.mawaterType = doc;
        this.mawaterTypeForm.setValue({
          mTypeName:this.mawaterType.mTypeName,
          mTypeArabicName:this.mawaterType.mTypeArabicName,
          mawaterId:this.mawaterType.mawaterId,
        })
      });
  }

  getAllMawaters() {
    this.mawaterTypeService
      .getAllData(this.dbMawaterPath)
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c) => ({
            id: c.payload.doc.id,

            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.mawaters = data;
      });
  }
}
