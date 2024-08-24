import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { FileUpload } from '../models/FileUpload';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  commonRef: AngularFirestoreCollection<any> | any;
  //private basePath = '/categories_images';
  constructor(private db: AngularFirestore , private storage: AngularFireStorage
    
  ) {}

  getAllData(path:string): AngularFirestoreCollection<any> {
    return this.db.collection(path);
  }

  saveData(data: any,path:string) {
    debugger;
    this.db.collection(path)
      .add({ ...data })
      .then(() => console.log('Save Successfully'));
  }

  updateData(id: string, data: any,path:string): Promise<void> {
    return this.db.collection(path).doc(id).update(data);
  }

  getData(key: string,path:string) {
    return this.db.collection(path).doc(key).valueChanges();
  }

  pushFileToStorage(fileUpload: FileUpload,fileName : string,basePath :string): Observable<number | undefined> {
    debugger;
    const filePath = `${basePath}/${fileName/*fileUpload.file.name*/}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name =fileName /*fileUpload.file.name*/;
          this.saveFileData(fileUpload , basePath);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload,  basePath :string): void {
    debugger;
    this.db.collection(basePath).add(fileUpload);
  }

  getFile(basePath:string): any {
    debugger;
    var m = this.storage.ref(basePath).getDownloadURL();
    console.log(m);
    return this.storage.ref(basePath).getDownloadURL();
  }

  deleteDocument(collection: string, docId: string) {
    return this.db.collection(collection).doc(docId).delete();
  }

  deleteFile(filePath: string) {
    return this.storage.ref(filePath).delete();
  }

  deleteDocumentAndFile(collection: string, docId: string, filePath: string) {
    return this.deleteDocument(collection, docId).then(() => {
      return this.deleteFile(filePath).toPromise();
    });
  }


}
