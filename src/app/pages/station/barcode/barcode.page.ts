import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  ModalController,
  Platform,
} from '@ionic/angular/standalone';
import { Taxi } from 'src/app/model/taxi';
import { DatabaseService } from 'src/app/services/database.service';
import { PutGasPage } from '../put-gas/put-gas.page';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class BarcodePage {
  scannedResult: string | null = null;
  isScanning: boolean = false;
  datosTaxi: boolean = false;
  taxi!: Taxi;
  message = 'Boton para aceptar vehiculo';

  constructor(
    private platform: Platform,
    private databaseService: DatabaseService,
    private modalCtrl: ModalController
  ) {
    this.platform.ready().then(() => {
      this.checkPermission();
    });
  }

  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      console.log('Permiso concedido');
    } else {
      console.log('Permiso no concedido');
    }
  }

  async startScan() {
    if (this.isScanning) {
      return;
    }

    this.isScanning = true;

    BarcodeScanner.hideBackground();
    document.body.classList.add('scanner-active');

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.scannedResult = result.content;
      this.databaseService
        .getTaxi('placa', this.scannedResult)
        .subscribe((data) => {
          if (data.length > 0) {
            this.taxi = data[0];
            this.datosTaxi = true;
            this.stopScan();
          } else {
            alert('Taxi no encontrado');
            this.stopScan();
          }
        });
    } else {
      this.isScanning = false;
    }
    document.body.classList.remove('scanner-active');
    BarcodeScanner.showBackground();
  }

  async stopScan() {
    await BarcodeScanner.stopScan();
    this.isScanning = false;
    BarcodeScanner.showBackground();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: PutGasPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
}
