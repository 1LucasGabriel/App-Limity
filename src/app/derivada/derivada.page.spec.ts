import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DerivadaPage } from './derivada.page';

describe('DerivadaPage', () => {
  let component: DerivadaPage;
  let fixture: ComponentFixture<DerivadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DerivadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
