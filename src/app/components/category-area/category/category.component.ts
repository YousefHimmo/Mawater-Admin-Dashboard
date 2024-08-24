import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { map } from 'rxjs';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { CommonService } from '../../../services/common.service';
import { Category } from '../../../models/category';
import { MatSort } from '@angular/material/sort';
import { GetImagePath } from '../../../Common/getImagePath';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule],
  providers: [CommonService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit , OnDestroy {
  categories: Category[] = [];
  dbPath="/category";
  categoryService = inject(CommonService);
  displayedColumns: string[] = ['categoryImage','categoryName','categoryArabicName','sortNumber','actions'];
  dataSource: MatTableDataSource<Category> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator| any;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
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
    this.dialog.open(CategoryDialogComponent, {
      data: {id: id},
       width: '600px',
    })
  }
  
  getAllCategories() {
    debugger
    this.categoryService
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
          item.categoryImage = GetImagePath.getCategoryImage(item.categoryImage);
          return item;
        });
        console.log(mappedData);
        this.categories = mappedData;
        this.dataSource = new MatTableDataSource<Category>(mappedData);
      });
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
