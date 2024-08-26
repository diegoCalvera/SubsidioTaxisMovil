import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTaxiPage } from './data-taxi.page';

describe('DataTaxiPage', () => {
  let component: DataTaxiPage;
  let fixture: ComponentFixture<DataTaxiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTaxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
