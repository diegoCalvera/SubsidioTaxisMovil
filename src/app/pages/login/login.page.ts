import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItemDivider,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { at, eye, eyeOff, lockClosed, logoGoogle } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
    IonGrid,
  ],
})
export class LoginPage {
  @ViewChild('contrasenaInput') contrasenaInput!: IonInput;
  @Output() loginSuccess = new EventEmitter<void>();

  toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 4000,
  });

  formSingIn!: FormGroup;
  verMostrarContrasena: boolean = false;
  realizandoPeticion: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    addIcons({ logoGoogle, lockClosed, eye, eyeOff, at });
    this.formSingIn = new FormGroup({
      usuario: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    this.validarRol();
  }

  imagenPerfilTamano = computed(() => '100');

  async iniciarSesion() {
    if (
      await this.authService.login(
        this.usuarioControl.getRawValue(),
        this.passwordControl.getRawValue()
      )
    ) {
      this.validarRol();
    } else {
      this.toast.fire({
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
      });
    }
  }

  validarRol() {
    if (this.authService.getUserRole() === 'TAXI') {
      this.loginSuccess.emit();
      this.router.navigate(['/data-taxi']);
    } else if (this.authService.getUserRole() === 'ESTACION') {
      this.loginSuccess.emit();
      this.router.navigate(['/barcode-scanner']);
    }
  }

  get usuarioControl(): FormControl {
    return this.formSingIn.get('usuario') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.formSingIn.get('password') as FormControl;
  }

  mostrarContrasena() {
    this.verMostrarContrasena = !this.verMostrarContrasena;
    this.contrasenaInput['elementRef'].nativeElement.type = this
      .verMostrarContrasena
      ? 'text'
      : 'password';
  }

  reestablecerContrasena() {}

  logout() {
    this.authService.logout();
  }
}
