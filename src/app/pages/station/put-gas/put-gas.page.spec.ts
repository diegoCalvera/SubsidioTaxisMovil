import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PutGasPage } from './put-gas.page';

describe('PutGasPage', () => {
  let component: PutGasPage;
  let fixture: ComponentFixture<PutGasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PutGasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
