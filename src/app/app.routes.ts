import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'user-incidents',
    loadComponent: () => import('./user-incidents/user-incidents.page').then( m => m.UserIncidentsPage)
  },
];
