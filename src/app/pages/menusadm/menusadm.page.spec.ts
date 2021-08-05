import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusadmPage } from './menusadm.page';

describe('MenusadmPage', () => {
  let component: MenusadmPage;
  let fixture: ComponentFixture<MenusadmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusadmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusadmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
