import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentGamePage } from './current-game.page';

describe('CurrentGamePage', () => {
  let component: CurrentGamePage;
  let fixture: ComponentFixture<CurrentGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
