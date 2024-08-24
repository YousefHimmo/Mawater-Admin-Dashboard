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
import { map, take } from 'rxjs';
import { Category } from '../../../models/category';
import { CommonService } from '../../../services/common.service';
import { FileUpload } from '../../../models/FileUpload';
import { Mawater } from '../../../models/mawater';
import { GetImagePath } from '../../../Common/getImagePath';

@Component({
  selector: 'app-mawater-dialog',
  templateUrl: './mawater-dialog.component.html',
  styleUrls: ['./mawater-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
  ],
})
export class MawaterDialogComponent implements OnInit {
  dbPath = '/mawater';
  dbCategoryPath="/category";
  mawater: Mawater = {
    mawaterId: uuid(),
    mawaterName: '',
    mawaterArabicName: '',
    mawaterImage: '',
    catergoryId: '',
  };
  selectedFile = null;
  src = '';
  fileUploads?: any[];
  base64 = uuid();
  currentFileUpload?: FileUpload;
  percentage = 0;
  folderName = '/mawater';
  pathUrl = this.folderName;
  mawaterService = inject(CommonService);
  mawaterForm = this.fb.group({
    mawaterName: ['', Validators.required],
    mawaterArabicName: ['', Validators.required],
    catergory : ['',Validators.required]
  });
  categories: Category[] = [];

  constructor(
    public dialogCity: MatDialogRef<MawaterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    debugger;
    if(this.data.id){
      this.getMawaterById(this.data.id);
    }
    this.getAllCategories();
  }

  onSubmit() {
    debugger;
    if (this.mawaterForm.valid) {
      this.upload();
      this.mawater.mawaterImage = this.base64;
      this.mawater = Object.assign(this.mawater, this.mawaterForm.value);
      if (!this.data.id) {
        this.mawaterService.saveData(this.mawater, this.dbPath);
      } else {
        this.mawaterService.updateData(this.data.id, this.mawater, this.dbPath);
      }
      this.dialogCity.close();
    }
  }

  getMawaterById(key: string) {
    debugger;
    this.mawaterService
      .getData(key, this.dbPath)
      .pipe(take(1))
      .subscribe((doc: any) => {
        this.src = GetImagePath.getMawaterImage(doc.mawaterImage);
        console.log(doc);
        this.mawater = doc;
        this.mawaterForm.setValue({
          mawaterName : this.mawater.mawaterName,
          mawaterArabicName : this.mawater.mawaterArabicName,
          catergory :this.mawater.catergoryId,
        })
      });
  }

  onFileSelected(event: any): void {
    debugger;
    this.selectedFile = event.target.files[0] ?? null;
    this.src = URL.createObjectURL(event.target.files[0]);
  }

  upload(): void {
    if (this.selectedFile) {
      const file: File | null = this.selectedFile;
      this.selectedFile = null;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.mawaterService
          .pushFileToStorage(
            this.currentFileUpload,
            this.base64,
            this.folderName
          )
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage ? percentage : 0);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  getAllCategories() {
    debugger
    this.mawaterService
      .getAllData(this.dbCategoryPath)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        console.log("categories",data);
        const mappedData = data.map((item) => {
          item.categoryImage = GetImagePath.getCategoryImage(item.categoryImage);
          return item;
        });
        console.log("mapped categories",mappedData);
        this.categories = mappedData;
      });
  }
}
