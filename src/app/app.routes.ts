import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'data-taxi',
    pathMatch: 'full',
  },
  {
    path: 'data-taxi',
    loadComponent: () => import('./pages/taxi-driver/data-taxi/data-taxi.page').then(m => m.DataTaxiPage),
  },
  {
    path: 'data-user',
    loadComponent: () => import('./pages/taxi-driver/data-user/data-user.page').then(m => m.DataUserPage),
  },
  {
    path: 'qr-viewer',
    loadComponent: () => import('./pages/taxi-driver/qr-viewer/qr-viewer.page').then(m => m.QrViewerPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'qr-viewer',
    loadComponent: () => import('./pages/taxi-driver/qr-viewer/qr-viewer.page').then(m => m.QrViewerPage)
  }
];
