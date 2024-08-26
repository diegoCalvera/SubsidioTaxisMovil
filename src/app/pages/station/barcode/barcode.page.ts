import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { QrScannerService } from 'src/app/services/qr-scanner.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonicModule],
})
export class BarcodePage {
  scannedData: string | null = null;

  constructor(private qrScannerService: QrScannerService) { }

  async scanCode() {
    try {
      this.scannedData = await this.qrScannerService.startScan();
    } catch (error) {
      console.error('Error scanning QR code', error);
    }
  }

  stopScan() {
    this.qrScannerService.stopScan();
  }

}
