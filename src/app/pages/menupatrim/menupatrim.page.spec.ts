import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenupatrimPage } from './menupatrim.page';

describe('MenupatrimPage', () => {
  let component: MenupatrimPage;
  let fixture: ComponentFixture<MenupatrimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenupatrimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenupatrimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
