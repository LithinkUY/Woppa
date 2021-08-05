import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuadmPage } from './menuadm.page';

describe('MenuadmPage', () => {
  let component: MenuadmPage;
  let fixture: ComponentFixture<MenuadmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuadmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuadmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
