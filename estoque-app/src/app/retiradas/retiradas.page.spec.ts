import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetiradasPage } from './retiradas.page';

describe('RetiradasPage', () => {
  let component: RetiradasPage;
  let fixture: ComponentFixture<RetiradasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiradasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});