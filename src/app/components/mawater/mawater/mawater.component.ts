import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { map } from 'rxjs';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { Category } from '../../../models/category';
import { MatSort } from '@angular/material/sort';
import { Mawater } from '../../../models/mawater';
import { MawaterDialogComponent } from '../mawater-dialog/mawater-dialog.component';
import { GetImagePath } from '../../../Common/getImagePath';

@Component({
  selector: 'app-mawater',
  templateUrl: './mawater.component.html',
  styleUrls: ['./mawater.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule],
  providers: [CommonService],
})
export class MawaterComponent implements OnInit , OnDestroy {
  mawaters: Mawater[] = [];
  dbPath = '/mawater';
  mawatersService = inject(CommonService);
  displayedColumns: string[] = [
    'mawaterImage',
    'mawaterName',
    'mawaterArabicName',
    'actions',
  ];
  dataSource: MatTableDataSource<Mawater> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllMawaters();
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

  openDialog(id: string) {
    debugger;
    this.dialog.open(MawaterDialogComponent, {
      data: { id: id },
       width: '600px',
    });
  }

  getAllMawaters() {
    this.mawatersService
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
          item.mawaterImage = GetImagePath.getMawaterImage(item.mawaterImage);
          return item;
        });
        console.log(mappedData);
        this.mawaters = mappedData;
        this.dataSource = new MatTableDataSource<Mawater>(data);
      });
  }
  
  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
