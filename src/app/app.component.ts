import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterLink, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, carSportOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, personOutline, qrCodeOutline, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPagesDriver = [
    { title: 'Datos De Vehículo', url: 'data-taxi', icon: 'car-sport-outline' },
    { title: 'Datos De Conductor', url: 'data-user', icon: 'person-outline' },
    { title: 'Ver Código QR', url: 'qr-viewer', icon: 'qr-code-outline' },
  ];

  public appPagesStation = [
    { title: 'Lector QR', url: '/pages/Lector QR', icon: 'mail' },
    { title: 'Outbox', url: '/pages/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/pages/favorites', icon: 'heart' },
    { title: 'Archived', url: '/pages/archived', icon: 'archive' },
    { title: 'Trash', url: '/pages/trash', icon: 'trash' },
    { title: 'Spam', url: '/pages/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
    addIcons({ mailOutline, personOutline, carSportOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, qrCodeOutline });
  }

  title = 'Subsidio Taxis';
}
