import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AdsComponent } from "../ads/ads.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [AdsComponent]
})
export class HomeComponent implements OnInit {

  ngOnInit() {
   
  }

}
