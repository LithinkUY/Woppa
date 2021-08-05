import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaacoesPage } from './minhaacoes.page';

describe('MinhaacoesPage', () => {
  let component: MinhaacoesPage;
  let fixture: ComponentFixture<MinhaacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhaacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhaacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
