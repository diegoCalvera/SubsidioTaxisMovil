import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  constructor() { }

  async checkPermission() {
    // Solicita permisos de cámara
    const status = await BarcodeScanner.checkPermission({ force: true });
    return status.granted;
  }

  async startScan() {
    const permission = await this.checkPermission();
    if (!permission) {
      throw new Error('No se concedieron los permisos de cámara');
    }

    await BarcodeScanner.hideBackground(); // Oculta la vista previa de la cámara en segundo plano

    const result = await BarcodeScanner.startScan(); // Inicia el escaneo de código QR

    BarcodeScanner.showBackground(); // Restaura el fondo

    if (result.hasContent) {
      return result.content; // Retorna los datos del código QR
    } else {
      throw new Error('No se detectó ningún código QR');
    }
  }

  stopScan() {
    BarcodeScanner.stopScan(); // Detener el escaneo
  }
}