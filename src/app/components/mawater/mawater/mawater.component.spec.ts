/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MawaterComponent } from './mawater.component';

describe('MawaterComponent', () => {
  let component: MawaterComponent;
  let fixture: ComponentFixture<MawaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MawaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MawaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
