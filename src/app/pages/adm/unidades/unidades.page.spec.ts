import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesPage } from './unidades.page';

describe('UnidadesPage', () => {
  let component: UnidadesPage;
  let fixture: ComponentFixture<UnidadesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
