import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrViewerPage } from './qr-viewer.page';

describe('QrViewerPage', () => {
  let component: QrViewerPage;
  let fixture: ComponentFixture<QrViewerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
