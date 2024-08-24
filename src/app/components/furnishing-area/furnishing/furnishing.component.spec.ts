/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FurnishingComponent } from './furnishing.component';

describe('FurnishingComponent', () => {
  let component: FurnishingComponent;
  let fixture: ComponentFixture<FurnishingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurnishingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
