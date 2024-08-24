import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { map } from 'rxjs';
import { v4 as uuid } from 'uuid';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CityDialogComponent } from '../city-dialog/city-dialog.component';
import { City } from '../../../models/city';
import { CommonService } from '../../../services/common.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,MatPaginatorModule],
  providers: [] 
})

export class CityComponent implements OnInit , AfterViewInit , OnDestroy  {
  dbPath = "/city";
  cities: City[] = [];
  cityService = inject(CommonService);
  displayedColumns: string[] = ['cityName', 'cityArabicName','actions'];
  dataSource: MatTableDataSource<City> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator| any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    debugger;
    this.getAllCities();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id:string) {
    debugger;
    this.dialog.open(CityDialogComponent, {
      data: {id: id},
      width: '600px',
    })
  }
  
  getAllCities() {
    this.cityService
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
        debugger;
        this.cities = data;
        this.dataSource = new MatTableDataSource<City>(data);
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
