import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenufinPage } from './menufin.page';

describe('MenufinPage', () => {
  let component: MenufinPage;
  let fixture: ComponentFixture<MenufinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenufinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenufinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
