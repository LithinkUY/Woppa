import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenurhPage } from './menurh.page';

describe('MenurhPage', () => {
  let component: MenurhPage;
  let fixture: ComponentFixture<MenurhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenurhPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenurhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
