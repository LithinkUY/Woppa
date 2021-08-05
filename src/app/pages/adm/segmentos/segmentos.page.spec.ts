import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentosPage } from './segmentos.page';

describe('SegmentosPage', () => {
  let component: SegmentosPage;
  let fixture: ComponentFixture<SegmentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
