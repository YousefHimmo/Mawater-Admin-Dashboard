import { NgClass } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
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
import { ImageService } from '../../../services/image.service';
import { GetImagePath } from '../../../Common/getImagePath';
@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
  ],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.css',
})
export class CategoryDialogComponent {
  dbPath = "/category";
  category: Category = {
    categoryName: '', categoryArabicName: '', categoryImage: '', categoryId: uuid(),
    isActive: true , sortNumber : 0
  };
  selectedFile = null;
  src = '';
  fileUploads?: any[];
  base64 = uuid();
  currentFileUpload?: FileUpload;
  percentage = 0;
  folderName = '/categories_images'
  pathUrl = this.folderName;
  categoryService = inject(CommonService);
  imageService = inject(ImageService);

  categoryForm = this.fb.group({
    categoryName: ['', Validators.required],
    categoryArabicName: ['', Validators.required],
    sortNumber : [0,Validators.required],
  });

  constructor(
    public dialogCity: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    debugger;
    if(this.data.id)
      this.getCategoryById(this.data.id);
  }

  onSubmit() {
    debugger;
    if (this.categoryForm.valid) {
      this.upload();
      this.category.categoryImage = this.base64;
      this.category = Object.assign(this.category, this.categoryForm.value);
      if (!this.data.id) {
        this.categoryService.saveData(this.category,this.dbPath);
      } else {
        this.categoryService.updateData(this.data.id, this.category,this.dbPath);
      }
      this.dialogCity.close();
    }
  }

  getCategoryById(key: string) {
    debugger;
    this.categoryService
      .getData(key,this.dbPath)
      .pipe(take(1))
      .subscribe((doc: any) => {
        console.log(doc);
        this.src = GetImagePath.getCategoryImage(doc.categoryImage);
        this.category = doc;
        //this.src =  this.commonService.getFile(this.category.categoryImage) ;
      }
    )
  }

  onFileSelected(event: any): void {
    debugger;
    this.selectedFile = event.target.files[0] ?? null;
    this.src = URL.createObjectURL(event.target.files[0]);
  }

  // onFileSelected(e: any) {
  //   const reader = new FileReader();
  //   if(e.target.files && e.target.files.length) {
  //     const imgfile = e.target.files[0];
  //     this.selectedFile = imgfile;
  //     reader.readAsDataURL(imgfile);
  //     reader.onload = async () => {
  //       await this.imageService.resizeImage(reader.result as string).then((resolve: any) => {
  //         this.src = resolve;
  //         this.categoryForm.patchValue({
  //           imgSrc: resolve
  //         });
  //       });
  //     };
  //   }
  // }

  upload(): void {
    if (this.selectedFile) {
      const file: File | null = this.selectedFile;
      this.selectedFile = null;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.categoryService.pushFileToStorage(this.currentFileUpload,this.base64,this.folderName).subscribe(
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
}
