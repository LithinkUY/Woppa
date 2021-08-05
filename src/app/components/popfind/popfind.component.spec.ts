import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopfindComponent } from './popfind.component';

describe('PopfindComponent', () => {
  let component: PopfindComponent;
  let fixture: ComponentFixture<PopfindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopfindComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopfindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
