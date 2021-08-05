import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenurelPage } from './menurel.page';

describe('MenurelPage', () => {
  let component: MenurelPage;
  let fixture: ComponentFixture<MenurelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenurelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenurelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
