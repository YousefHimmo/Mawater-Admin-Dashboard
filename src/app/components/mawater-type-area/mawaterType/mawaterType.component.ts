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
import { MawaterStructure } from '../../../models/mawaterStructure';
import { MawaterStatusDialogComponent } from '../../mawater-status-area/mawaterStatus/mawaterStatusDialog/mawaterStatusDialog.component';
import { MawaterType } from '../../../models/mawaterType';
import { MawaterTypeDialogComponent } from './mawaterType-dialog/mawaterType-dialog.component';


@Component({
  selector: 'app-mawaterType',
  templateUrl: './mawaterType.component.html',
  styleUrls: ['./mawaterType.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,MatPaginatorModule],
  providers: [] 
})
export class MawaterTypeComponent implements OnInit , OnDestroy {

  dbPath = "/mawaterType";
  mawaterType: MawaterType[] = [];
  mawaterTypeService = inject(CommonService);
  displayedColumns: string[] = ['mTypeArabicName', 'mTypeName','actions'];
  dataSource: MatTableDataSource<MawaterType> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator| any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    debugger;
    this.getAllmawaterType();
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
    this.dialog.open(MawaterTypeDialogComponent, {
      data: {id: id},
       width: '600px',
    })
  }
  
  getAllmawaterType() {
    this.mawaterTypeService
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
        this.mawaterType = data;
        this.dataSource = new MatTableDataSource<MawaterType>(data);
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }

}
