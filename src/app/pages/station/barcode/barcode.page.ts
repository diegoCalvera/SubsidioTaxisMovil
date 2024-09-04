import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
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
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { Taxi } from 'src/app/model/taxi';
import { DatabaseService } from 'src/app/services/database.service';
import { PutGasPage } from '../put-gas/put-gas.page';
import Swal from 'sweetalert2';
import { Transacciones } from 'src/app/model/transacciones';
import { AuthService } from 'src/app/services/auth.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonFabButton,
    IonFab,
    IonInput,
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
  isSupported = false;
  barcodes: Barcode[] = [];

  scannedResult: string | null = null;
  isScanning: boolean = false;
  datosTaxi: boolean = false;
  datosModificados: boolean = false;
  taxi?: Taxi | null;
  message = 'Boton para aceptar vehiculo';
  realizandoPeticion: boolean = false;

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
      //this.checkPermission();
    });
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    
    this.datosModificados = false;
    let placa = 'XXX333';

    if (this.isSupported) {
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert();
        return;
      }
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);
      placa = barcodes[0].rawValue;
    }

    this.realizandoPeticion = true;
    this.databaseService
      .getTaxi('placa', placa)
      .subscribe((data) => {
        this.realizandoPeticion = false;
        if (data.length > 0) {
          this.taxi = data[0];
          this.datosTaxi = true;
        } else {
          alert('Taxi no encontrado');
          this.datosTaxi = false;
        }
      });
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permisos denegados',
      message:
        'Por favor acepta los permisos de cámara para realizar el escaner el código.',
      buttons: ['OK'],
    });
    await alert.present();
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

    if (role === 'confirm' && this.taxi != null) {
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
            this.datosModificados = true;
          })
          .catch((e) => {
            console.log(e);
            this.taxi!.subsidio = this.taxi!.subsidio + valorTanqueo;
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
      placa: this.taxi?.placa,
      timestamp: new Date(),
      tipo_transaccion: 'RECHAZO',
      valor: 0,
    };
    this.databaseService.createTransaccion(transaccion).then(() => {
      this.toast.fire({
        text: 'Vehiculo rechazado',
        icon: 'info',
      });
    });
    this.datosTaxi = false;
    this.datosModificados = false;
  }

  async rechazarVehiculo() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro que desea rechazar el vehículo?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Acción cancelada');
          },
        },
        {
          text: 'Si',
          handler: () => {
            this.rejectTransaction();
          },
        },
      ],
    });

    await alert.present();
  }
}
