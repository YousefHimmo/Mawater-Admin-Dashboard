import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { GetImagePath } from '../../../Common/getImagePath';
import { Banner } from '../../../models/banner';
import { BannerDialogComponent } from '../banner-dialog/banner-dialog.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule],
})
export class BannerComponent implements OnInit, OnDestroy {
  banners: Banner[] = [];
  dbPath = '/banner';
  bannerService = inject(CommonService);
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllBanners();
  }

  openDialog(id: string) {
    debugger;
    this.dialog.open(BannerDialogComponent, {
      data: { id: id },
      width: '600px',
    });
  }

  getAllBanners() {
    this.bannerService
      .getAllData(this.dbPath)
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
        const mappedData = data.map((item) => {
          item.bannerMappedImage = GetImagePath.getBannerImage(item.bannerImage);
          return item;
        });
        this.banners = mappedData;
      });
  }

  onDeleteBanner(id?: string,bannerImage?:string) {
    debugger;
    if (id && bannerImage) {
      const filePath = this.dbPath + `/${bannerImage}`;
      console.log("file",filePath)
      this.bannerService.deleteDocumentAndFile(this.dbPath, id, filePath).then(() => {
      }).catch(error => {
      });
    }
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
