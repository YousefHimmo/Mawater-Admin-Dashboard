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
import { Banner } from '../../../models/banner';


@Component({
  selector: 'app-banner-dialog',
  templateUrl: './banner-dialog.component.html',
  styleUrls: ['./banner-dialog.component.css'],
  standalone: true,
  imports: [ MatDialogTitle,MatDialogContent,ReactiveFormsModule,NgClass, FormsModule],
})
export class BannerDialogComponent implements OnInit {
  dbPath = '/banner';
  banner:Banner = {
    bannerId: uuid(),
    bannerImage: '',
  };
  selectedFile = null;
  src = '';
  fileUploads?: any[];
  base64 = uuid();
  folderName = '/banner';
  pathUrl = this.folderName;
  currentFileUpload?: FileUpload;
  percentage = 0;
  bannerService = inject(CommonService);
  showFileError = false;
  constructor(
    public dialogBanner: MatDialogRef<BannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
  
  }
  onSubmit() {
    debugger;
    if(this.src){
      this.upload();
      this.banner.bannerImage = this.base64;
      if (!this.data.id) {
        this.bannerService.saveData(this.banner, this.dbPath);
      } 
      this.showFileError = true;
      this.dialogBanner.close();
    }
    else{
      this.showFileError = true;
    }
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
        this.bannerService
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
}
