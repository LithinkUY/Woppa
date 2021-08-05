import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenugerPage } from './menuger.page';

describe('MenugerPage', () => {
  let component: MenugerPage;
  let fixture: ComponentFixture<MenugerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenugerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenugerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
