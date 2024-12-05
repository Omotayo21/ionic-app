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
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment'; // Import environment
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // Firebase App
import { provideAuth, getAuth } from '@angular/fire/auth'; // Firebase Auth
import { provideDatabase, getDatabase } from '@angular/fire/database'; // Firebase Realtime Database
import { provideStorage, getStorage } from '@angular/fire/storage'; // Firebase Storage
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Initialize Firebase
    provideAuth(() => getAuth()), // Provide Firebase Auth
    provideDatabase(() => getDatabase()), // Provide Firebase Database
    provideStorage(() => getStorage()), // Provide Firebase Storage
   
    provideFirestore(() => getFirestore()),
  ],
});
