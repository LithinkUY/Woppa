import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseOfferPage } from './choose-offer.page';

describe('ChooseOfferPage', () => {
  let component: ChooseOfferPage;
  let fixture: ComponentFixture<ChooseOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
