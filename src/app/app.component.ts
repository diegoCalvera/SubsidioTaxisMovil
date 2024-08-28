import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { carSportOutline, personOutline, qrCodeOutline } from 'ionicons/icons';
import { LoginPage } from './pages/login/login.page';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonToolbar,
    IonTitle,
    IonButton,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    LoginPage,
    IonContent,
  ],
})
export class AppComponent implements OnInit {
  userRole: string | null = null;
  login: boolean = true;
  menuOptions: any[] = [];

  public appPagesDriver = [
    { title: 'Datos De Vehículo', url: 'data-taxi', icon: 'car-sport-outline' },
    { title: 'Datos De Conductor', url: 'data-user', icon: 'person-outline' },
    { title: 'Ver Código QR', url: 'qr-viewer', icon: 'qr-code-outline' },
  ];

  public appPagesStation = [
    { title: 'Lector QR', url: 'barcode-scanner', icon: 'qr-code-outline' },
  ];

  constructor(private authService: AuthService) {
    addIcons({ personOutline, carSportOutline, qrCodeOutline });
  }

  ngOnInit() {
    this.setMenuOptions();
  }

  setMenuOptions() {
    this.userRole = this.authService.getUserRole();
    if (this.userRole == null || this.userRole == '') {
      this.login = true;
    } else {
      if (this.userRole == 'TAXI') {
        this.menuOptions = this.appPagesDriver;
      } else if (this.userRole == 'ESTACION') {
        this.menuOptions = this.appPagesStation;
      }
      this.login = false;
    }
  }

  onLoginSuccess() {
    this.setMenuOptions();
  }

  logout() {
    this.authService.logout();
    this.setMenuOptions();
  }

  title = 'Subsidio Taxis';
}
