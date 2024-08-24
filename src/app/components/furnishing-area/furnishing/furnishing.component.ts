import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { map } from 'rxjs';
import { v4 as uuid } from 'uuid';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { MatSort } from '@angular/material/sort';
import { Furnishing } from '../../../models/furnishing';
import { FurnishingDialogComponent } from './furnishing-dialog/furnishing-dialog.component';

@Component({
  selector: 'app-furnishing',
  templateUrl: './furnishing.component.html',
  styleUrls: ['./furnishing.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,MatPaginatorModule],
  providers: [] 
})
export class FurnishingComponent implements OnInit , OnDestroy {
  dbPath = "/furnishing";
  furnishings: Furnishing[] = [];
  furnishingService = inject(CommonService);
  displayedColumns: string[] = ['furnishingArabicName', 'furnishingName','actions'];
  dataSource: MatTableDataSource<Furnishing> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator| any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    debugger;
    this.getAllFurnishings();
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
    this.dialog.open(FurnishingDialogComponent, {
      data: {id: id},
       width: '600px',
    })
  }
  
  getAllFurnishings() {
    this.furnishingService
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
        this.furnishings = data;
        this.dataSource = new MatTableDataSource<Furnishing>(data);
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
