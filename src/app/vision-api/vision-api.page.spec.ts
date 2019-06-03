import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionApiPage } from './vision-api.page';

describe('VisionApiPage', () => {
  let component: VisionApiPage;
  let fixture: ComponentFixture<VisionApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionApiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
