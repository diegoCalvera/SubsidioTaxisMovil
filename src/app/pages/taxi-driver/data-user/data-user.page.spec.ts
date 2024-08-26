import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataUserPage } from './data-user.page';

describe('DataUserPage', () => {
  let component: DataUserPage;
  let fixture: ComponentFixture<DataUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
