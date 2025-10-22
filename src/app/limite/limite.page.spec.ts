import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LimitePage } from './limite.page';

describe('LimitePage', () => {
  let component: LimitePage;
  let fixture: ComponentFixture<LimitePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
