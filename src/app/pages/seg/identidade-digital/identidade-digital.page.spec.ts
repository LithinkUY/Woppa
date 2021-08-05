import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentidadeDigitalPage } from './identidade-digital.page';

describe('IdentidadeDigitalPage', () => {
  let component: IdentidadeDigitalPage;
  let fixture: ComponentFixture<IdentidadeDigitalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentidadeDigitalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentidadeDigitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
