import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Ads } from '../../../models/ads';
import { filter, map } from 'rxjs';
import { GetImagePath } from '../../../Common/getImagePath';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.css',
  standalone : true,
  imports:[CommonModule]
})
export class AdsComponent implements OnInit{
  dbPath = "/ADS";
  ads: Ads[] = [];
  adsService = inject(CommonService);

  ngOnInit(): void {
   this.getAds();
  }

  getAds() {
    debugger;
    this.adsService
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
        data.map((item) => {
          item.mainImagePath = GetImagePath.getAdsImage(item.mainImage);
          return item;
        });
        this.ads = data.filter(v=>v.isActive === false)
        .filter(v=>v.status !== 2);
      });
  }

  onUpdateAds(ads : Ads){
    ads.isActive = true;
    ads.status = 1;
    console.log(ads);
    this.adsService.updateData(ads.id,ads,this.dbPath);
    alert("Confirm successfully");
  }

  onRejectClick(ads : Ads){
    ads.status = 2;
    console.log(ads);
    this.adsService.updateData(ads.id,ads,this.dbPath);
    alert("Rejected");
  }

  getStatusName(statusNumber: number): string {
    debugger;
    switch (statusNumber) {
      case 0:
        return 'In Active';
      case 1:
        return 'Active';
      case 2:
        return 'Rejected';
      case 4:
        return 'Pending';
      default:
        return 'Unknown Status';
    }
  }
}
