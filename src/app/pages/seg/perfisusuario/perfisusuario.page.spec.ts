import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfisusuarioPage } from './perfisusuario.page';

describe('PerfisusuarioPage', () => {
  let component: PerfisusuarioPage;
  let fixture: ComponentFixture<PerfisusuarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfisusuarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfisusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
