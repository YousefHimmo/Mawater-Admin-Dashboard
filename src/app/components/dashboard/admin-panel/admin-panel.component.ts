import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css'],
    standalone: true,
    imports: [NgClass, NgIf, RouterModule, NavbarComponent, SidebarComponent]
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
