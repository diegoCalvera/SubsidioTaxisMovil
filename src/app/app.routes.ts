import { Routes } from '@angular/router';
import { RoleGuard } from 'src/utils/guards/role-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'data-taxi',
    loadComponent: () => import('./pages/taxi-driver/data-taxi/data-taxi.page').then(m => m.DataTaxiPage),
    canActivate: [RoleGuard]
  },
  {
    path: 'data-user',
    loadComponent: () => import('./pages/taxi-driver/data-user/data-user.page').then(m => m.DataUserPage),
    canActivate: [RoleGuard]
  },
  {
    path: 'qr-viewer',
    loadComponent: () => import('./pages/taxi-driver/qr-viewer/qr-viewer.page').then(m => m.QrViewerPage),
    canActivate: [RoleGuard]
  },
  {
    path: 'barcode-scanner',
    loadComponent: () => import('./pages/station/barcode/barcode.page').then(m => m.BarcodePage),
    canActivate: [RoleGuard]
  },  {
    path: 'put-gas',
    loadComponent: () => import('./pages/station/put-gas/put-gas.page').then( m => m.PutGasPage)
  }

];
