import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  title = 'admin-mawater-qatar';
  ngOnInit(): void {
    if (localStorage.getItem('isDark') == '1'){
      document.body.classList.add('dark');
    }
    else{
      document.body.classList.remove('dark');
    }
  }
}

