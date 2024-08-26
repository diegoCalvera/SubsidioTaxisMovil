import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.page.html',
  styleUrls: ['./data-user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DataUserPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  email: string = 'carlos.raba@intempo.co';

  editarInformacion() {
    // Navega a la vista de edición o muestra un modal/formulario
    this.navCtrl.navigateForward('/editar-conductor');
  }

}
