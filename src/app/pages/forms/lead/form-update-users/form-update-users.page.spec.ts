import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateUsersPage } from './form-update-users.page';

describe('FormUpdateUsersPage', () => {
  let component: FormUpdateUsersPage;
  let fixture: ComponentFixture<FormUpdateUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUpdateUsersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUpdateUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
