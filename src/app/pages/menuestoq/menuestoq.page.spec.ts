import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuestoqPage } from './menuestoq.page';

describe('MenuestoqPage', () => {
  let component: MenuestoqPage;
  let fixture: ComponentFixture<MenuestoqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuestoqPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuestoqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
