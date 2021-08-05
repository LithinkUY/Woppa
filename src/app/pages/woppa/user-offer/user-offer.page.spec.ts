import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOfferPage } from './user-offer.page';

describe('UserOfferPage', () => {
  let component: UserOfferPage;
  let fixture: ComponentFixture<UserOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
