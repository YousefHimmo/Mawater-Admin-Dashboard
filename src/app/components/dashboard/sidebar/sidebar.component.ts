import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
// import { SvgIconComponent, SvgIconRegistryService, provideAngularSvgIcon } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [NgClass, NgIf, RouterModule],
  // providers: [SvgIconRegistryService],
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('sideBar', { static: true }) sideBar: ElementRef| any;
  route = inject(Router);
  authService = inject(AuthService);
  constructor() { }

  ngOnInit() {
  }
  logout(){
    localStorage.removeItem('isLoggedIn');
    this.route.navigateByUrl("/login");
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    if (width < 768) {
      this.sideBar.nativeElement.classList.add('close');
    } else {
      this.sideBar.nativeElement.classList.remove('close');
    }
  }
}