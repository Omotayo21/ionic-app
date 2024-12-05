// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDAYORtT_yPLCmeN38hLh7ZhjOjc3N23yU',
    authDomain: 'citizen-report-app-45f6c.firebaseapp.com',
    projectId: 'citizen-report-app-45f6c',
    databaseURL:
      'https://citizen-report-app-45f6c-default-rtdb.firebaseio.com/',
    storageBucket: 'citizen-report-app-45f6c.appspot.com',
    messagingSenderId: '382465207068',
    appId: '1:382465207068:web:2b647e65ba8807858c68d9',
    measurementId: 'G-9JFKSH4G0L',
  } as FirebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
