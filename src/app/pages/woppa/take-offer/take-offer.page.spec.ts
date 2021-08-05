import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOfferPage } from './take-offer.page';

describe('TakeOfferPage', () => {
  let component: TakeOfferPage;
  let fixture: ComponentFixture<TakeOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
