/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MawaterStructureComponent } from './mawaterStructure.component';

describe('MawaterStructureComponent', () => {
  let component: MawaterStructureComponent;
  let fixture: ComponentFixture<MawaterStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MawaterStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MawaterStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
