import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from '@ionic/angular/standalone';
import { QRCodeModule } from 'angularx-qrcode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-qr-viewer',
  templateUrl: './qr-viewer.page.html',
  styleUrls: ['./qr-viewer.page.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonButtons,
    IonContent,
    QRCodeModule,
    IonHeader,
    IonButton,
    IonMenuButton,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSpinner,
  ],
})
export class QrViewerPage {
  placa!: any;
  loading: boolean = true;

  constructor(private authService: AuthService) {
    this.placa = this.authService.getPlaca();
    this.loading = false;
  }
}
