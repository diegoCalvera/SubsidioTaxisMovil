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
import { Taxi } from 'src/app/model/taxi';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-data-taxi',
  templateUrl: './data-taxi.page.html',
  styleUrls: ['./data-taxi.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonSpinner,
    FormsModule,
    IonHeader,
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
export class DataTaxiPage {
  taxi!: Taxi;
  loading: boolean = true;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {
    this.setTaxi();
  }

  async setTaxi() {
    this.loading = true;
    await this.databaseService
      .getTaxi('placa', this.authService.getPlaca())
      .subscribe((data) => {
        this.taxi = data[0];
        this.loading = false;
      });
  }
}
