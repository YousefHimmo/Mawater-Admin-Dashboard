import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import {FormBuilder,Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import {CommonModule, NgClass} from '@angular/common';
import { Settings } from '../../../models/settings';
import { v4 as uuid } from 'uuid';
import { map } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [ReactiveFormsModule,NgClass,FormsModule,CommonModule],
  standalone: true
})
export class SettingsComponent implements OnInit {

  dbPath = "/settings";
  
  settingsService = inject(CommonService);
  fb = inject(FormBuilder);
  id:string = ""
  settingsForm = this.fb.group({
    location: ['', Validators.required],
    arabiclocation : ['', Validators.required],
    email : ['', Validators.required],
    phoneNumber : ['', Validators.required],
    whatsAppNumber : ['', Validators.required],
    faceBookUrl : ['', Validators.required],
    instagramUrl : ['', Validators.required],
  });

  ngOnInit() {
    this.getSettingsData();
  }

  onSubmit(){
    if (this.settingsForm.valid) {
      debugger
      const value = this.settingsForm.value;
      const obj: Settings = {
        settingId: uuid(), location: "", arabiclocation: "",
        email: '',
        phoneNumber: '',
        whatsAppNumber: '',
        faceBookUrl: '',
        instagramUrl: ''
      };
      const mappingObj = Object.assign(obj, value);
      if(!this.id){
        this.settingsService.saveData(mappingObj,this.dbPath);
      }
      else{
        this.settingsService.updateData(this.id, mappingObj,this.dbPath);
      }
    }
  }

  getSettingsData() {
    this.settingsService
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
        const setting = data[0];
        this.settingsForm.setValue({
          location:setting.location,
          arabiclocation :setting.arabiclocation,
          email : setting.email,
          phoneNumber :setting.phoneNumber,
          whatsAppNumber : setting.whatsAppNumber,
          faceBookUrl : setting.faceBookUrl,
          instagramUrl : setting.instagramUrl,
        })
        this.id = setting.id
      });
  }



}


