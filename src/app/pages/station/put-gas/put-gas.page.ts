import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  ModalController,
  NavParams,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-put-gas',
  templateUrl: './put-gas.page.html',
  styleUrls: ['./put-gas.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonButton,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonButtons,
    IonItem,
    IonInput,
  ],
})
export class PutGasPage {
  formTanqueo!: FormGroup;
  vehicleInfo: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.vehicleInfo = this.navParams.get('vehicleInfo');
  }

  ngOnInit() {
    this.construirFormulario();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.valorControl.value, 'confirm');
  }

  construirFormulario() {
    this.formTanqueo = new FormGroup({
      valor: new FormControl('', [Validators.required]),
    });
  }

  get valorControl(): FormControl {
    return this.formTanqueo.get('valor') as FormControl;
  }
}
