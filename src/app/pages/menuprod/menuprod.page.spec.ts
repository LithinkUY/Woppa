import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuprodPage } from './menuprod.page';

describe('MenuprodPage', () => {
  let component: MenuprodPage;
  let fixture: ComponentFixture<MenuprodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuprodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuprodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
