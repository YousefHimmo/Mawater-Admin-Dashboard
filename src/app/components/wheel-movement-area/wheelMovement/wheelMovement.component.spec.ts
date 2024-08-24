/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WheelMovementComponent } from './wheelMovement.component';

describe('WheelMovementComponent', () => {
  let component: WheelMovementComponent;
  let fixture: ComponentFixture<WheelMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheelMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
