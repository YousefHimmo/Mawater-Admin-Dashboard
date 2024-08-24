import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatSidenavModule, FormsModule, CommonModule],
})
export class NavbarComponent implements OnInit {
  @ViewChild('menuBar', { static: true }) menuBar: ElementRef | any;
  @ViewChild('sideBar', { static: true }) sideBar: ElementRef | any;

  items: any[] | undefined;

  selectedItem: any;

  suggestions: any[] | any;

  theamValue = false;

  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = [...Array(10).keys()].map(
      (item) => event.query + '-' + item
    );
  }
  constructor() {}
  isSearchFormShown = false;
  ngOnInit() {
    if (localStorage.getItem('isDark') == '1') {
      this.theamValue = true
    } else {
      this.theamValue = false
    }
  }

  toggleTheme(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      localStorage.setItem('isDark', '1');
      document.body.classList.add('dark');
    } else {
      localStorage.setItem('isDark', '0');
      document.body.classList.remove('dark');
    }
  }

  toggleSearchForm(event: Event) {
    if (window.innerWidth < 576) {
      event.preventDefault();
      this.isSearchFormShown = !this.isSearchFormShown;
    }
  }

  toggleSidebar() {
    this.sideBar.nativeElement.classList.toggle('close');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    if (width < 768) {
      this.sideBar.nativeElement.classList.add('close');
    } else {
      this.sideBar.nativeElement.classList.remove('close');
    }
    if (width > 576) {
      this.isSearchFormShown = false;
    }
  }
}
