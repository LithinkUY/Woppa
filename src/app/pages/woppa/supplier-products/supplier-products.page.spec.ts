import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductsPage } from './supplier-products.page';

describe('SupplierProductsPage', () => {
  let component: SupplierProductsPage;
  let fixture: ComponentFixture<SupplierProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
