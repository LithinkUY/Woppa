import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuicanhelpPage } from './menuicanhelp.page';

describe('MenuicanhelpPage', () => {
  let component: MenuicanhelpPage;
  let fixture: ComponentFixture<MenuicanhelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuicanhelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuicanhelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
