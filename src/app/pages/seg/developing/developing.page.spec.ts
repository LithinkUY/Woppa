import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopingPage } from './developing.page';

describe('DevelopingPage', () => {
  let component: DevelopingPage;
  let fixture: ComponentFixture<DevelopingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
