/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarTransmissionComponent } from './carTransmission.component';

describe('CarTransmissionComponent', () => {
  let component: CarTransmissionComponent;
  let fixture: ComponentFixture<CarTransmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTransmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
