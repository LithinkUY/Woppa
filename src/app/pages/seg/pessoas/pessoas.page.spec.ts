import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasPage } from './pessoas.page';

describe('PessoasPage', () => {
  let component: PessoasPage;
  let fixture: ComponentFixture<PessoasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
