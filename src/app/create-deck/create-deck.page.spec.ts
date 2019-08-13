import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeckPage } from './create-deck.page';

describe('CreateDeckPage', () => {
  let component: CreateDeckPage;
  let fixture: ComponentFixture<CreateDeckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
