import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesjudiciaisPage } from './acoesjudiciais.page';

describe('AcoesjudiciaisPage', () => {
  let component: AcoesjudiciaisPage;
  let fixture: ComponentFixture<AcoesjudiciaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcoesjudiciaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcoesjudiciaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
