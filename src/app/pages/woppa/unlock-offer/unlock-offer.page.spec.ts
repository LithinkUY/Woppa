import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockOfferPage } from './unlock-offer.page';

describe('UnlockOfferPage', () => {
  let component: UnlockOfferPage;
  let fixture: ComponentFixture<UnlockOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
