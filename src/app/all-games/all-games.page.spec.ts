import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGamesPage } from './all-games.page';

describe('AllGamesPage', () => {
  let component: AllGamesPage;
  let fixture: ComponentFixture<AllGamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllGamesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
