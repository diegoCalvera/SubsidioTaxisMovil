import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent,IonInput, IonHeader, IonLabel, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItemDivider, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoGoogle, lockClosed, eye, eyeOff, at } from 'ionicons/icons'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonItemDivider,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCol,
    IonInput,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonLabel,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonGrid]
})
export class LoginPage implements OnInit {


  formSingIn!: FormGroup;
  //Variables
  verMostrarContrasena: boolean = false;
  realizandoPeticion: boolean = false;
  @ViewChild('contrasenaInput') contrasenaInput!: IonInput;

  constructor() {

    addIcons({ logoGoogle, lockClosed, eye, eyeOff, at });
    this.formSingIn = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^.{7,}$')])
    });
  }

  ngOnInit() {
  }

  iniciarSesion(){

  }


  get emailControl(): FormControl {
    return this.formSingIn.get('email') as FormControl;
  }

  get paswordControl(): FormControl {
    return this.formSingIn.get('password') as FormControl;
  }

  
  mostrarContrasena() {
    this.verMostrarContrasena = !this.verMostrarContrasena;
    this.contrasenaInput['elementRef'].nativeElement.type = this.verMostrarContrasena ? "text" : "password";
  }

  reestablecerContrasena(){

  }


}
