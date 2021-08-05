import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuconfigPage } from './menuconfig.page';

describe('menuconfigPage', () => {
  let component: MenuconfigPage;
  let fixture: ComponentFixture<MenuconfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuconfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuconfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
