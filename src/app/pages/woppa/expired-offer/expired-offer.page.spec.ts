import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredOfferPage } from './expired-offer.page';

describe('ExpiredOfferPage', () => {
  let component: ExpiredOfferPage;
  let fixture: ComponentFixture<ExpiredOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
