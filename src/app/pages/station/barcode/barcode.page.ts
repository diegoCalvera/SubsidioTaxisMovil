import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  AlertController,
} from '@ionic/angular/standalone';
import { Taxi } from 'src/app/model/taxi';
import { DatabaseService } from 'src/app/services/database.service';
import { PutGasPage } from '../put-gas/put-gas.page';
import Swal from 'sweetalert2';
import { Transacciones } from 'src/app/model/transacciones';
import { AuthService } from 'src/app/services/auth.service';

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
    ReactiveFormsModule,
  ],
})
export class BarcodePage {
  scannedResult: string | null = null;
  isScanning: boolean = false;
  datosTaxi: boolean = false;
  taxi!: Taxi;
  message = 'Boton para aceptar vehiculo';

  toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 4000,
  });

  constructor(
    private platform: Platform,
    private databaseService: DatabaseService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private alertController: AlertController
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

    await new Promise((resolve) => setTimeout(resolve, 500));

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
      componentProps: {
        vehicleInfo: this.taxi, // Aquí pasas los datos al modal
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const valorTanqueo = data;
      if (valorTanqueo > this.taxi.subsidio) {
        this.toast.fire({
          text: 'El valor de recarga es mayor al subsidio',
          icon: 'error',
        });
      } else {
        this.taxi.subsidio = this.taxi.subsidio - valorTanqueo;
        let transaccion: Transacciones = {
          estacion: this.authService.getEstacion() || '',
          placa: this.taxi.placa,
          timestamp: new Date(),
          tipo_transaccion: 'TANQUEO',
          valor: -valorTanqueo,
        };
        this.databaseService
          .updateTaxi(this.taxi)
          .then(() => {
            this.databaseService.createTransaccion(transaccion);
            this.toast.fire({
              text: 'Recarga existosa!',
              icon: 'success',
            });
            this.datosTaxi = false;
          })
          .catch((e) => {
            console.log(e);
            this.taxi.subsidio = this.taxi.subsidio + valorTanqueo;
            this.toast.fire({
              text: 'Error en la recarga',
              icon: 'error',
            });
          });
      }
    }
  }

  rejectTransaction() {
    let transaccion: Transacciones = {
      estacion: this.authService.getEstacion() || '',
      placa: this.taxi.placa,
      timestamp: new Date(),
      tipo_transaccion: 'RECHAZO',
      valor: 0,
    };
    this.databaseService.createTransaccion(transaccion).then(() => {
      this.toast.fire({
        text: 'Vehiculo rechazado',
        icon: 'info',
      });
      this.datosTaxi = false;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro que desea rechazar el vehículo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Acción cancelada');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.rejectTransaction();
          },
        },
      ],
    });

    await alert.present();
  }
}
