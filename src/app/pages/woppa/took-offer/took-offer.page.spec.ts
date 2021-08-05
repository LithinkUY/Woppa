import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TookOfferPage } from './took-offer.page';

describe('TookOfferPage', () => {
  let component: TookOfferPage;
  let fixture: ComponentFixture<TookOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TookOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TookOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
