import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenucadPage } from './menucad.page';

describe('MenucadPage', () => {
  let component: MenucadPage;
  let fixture: ComponentFixture<MenucadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenucadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenucadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
