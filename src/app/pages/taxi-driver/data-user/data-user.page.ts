import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
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
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Taxista } from 'src/app/model/taxista';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.page.html',
  styleUrls: ['./data-user.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonContent,
    IonAvatar,
    IonTitle,
    IonMenuButton,
    IonToolbar,
    IonButton,
    IonButtons,
    CommonModule,
    FormsModule,
  ],
})
export class DataUserPage {
  usuario!: Taxista;
  loading: boolean = true;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {
    this.setTaxista();
  }

  async setTaxista() {
    this.loading = true;
    await this.databaseService
      .getTaxista('placa_taxi', this.authService.getPlaca())
      .subscribe((data) => {
        this.usuario = data[0];
        this.loading = false;
      });
  }
}
