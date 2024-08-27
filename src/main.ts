import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'subsidiotaxis-1e01d',
        appId: '1:748153370852:web:d6e46a86f4ab2b71aad4f1',
        storageBucket: 'subsidiotaxis-1e01d.appspot.com',
        apiKey: 'AIzaSyDaIvaYFASv-TxB7OEuun5INbFbtOyTVIY',
        authDomain: 'subsidiotaxis-1e01d.firebaseapp.com',
        messagingSenderId: '748153370852',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
});
