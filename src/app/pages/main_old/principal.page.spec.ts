import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { principalPage } from './principal.page';

describe('principalPage', () => {
  let component: principalPage;
  let fixture: ComponentFixture<principalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ principalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(principalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
