/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarColorComponent } from './car-color.component';

describe('CarColorComponent', () => {
  let component: CarColorComponent;
  let fixture: ComponentFixture<CarColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
