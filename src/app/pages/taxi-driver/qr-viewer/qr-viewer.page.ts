import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-viewer',
  templateUrl: './qr-viewer.page.html',
  styleUrls: ['./qr-viewer.page.scss'],
  standalone: true,
  imports: [IonicModule, QRCodeModule, CommonModule, FormsModule]
})
export class QrViewerPage implements OnInit {

  cedula: string = '123456789';

  constructor() { }

  cambiarCedula(nuevaCedula: string) {
    this.cedula = nuevaCedula;
  }

  ngOnInit() {
  }

}
