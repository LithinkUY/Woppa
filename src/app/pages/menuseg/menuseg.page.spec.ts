import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusegPage } from './menuseg.page';

describe('MenusegPage', () => {
  let component: MenusegPage;
  let fixture: ComponentFixture<MenusegPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusegPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
