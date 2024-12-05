import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'index',
        loadComponent: () =>
          import('../signup/signup.component').then((m) => m.SignupComponent),
      },
      {
        path: 'add-post',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tabs/index',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '',
    redirectTo: '/tabs/index',
    pathMatch: 'full',
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('../login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('../signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'report',
    loadComponent: () =>
      import('../report/report.component').then((m) => m.ReportComponent),
  },
  {
    path: 'incidents',
    loadComponent: () =>
      import('../incidents/incidents.component').then(
        (m) => m.IncidentsComponent
      ),
  },
  {
    path: 'incidents',
    loadChildren: () =>
      import('../user-incidents/user-incidents.page').then((m) => m.UserIncidentsPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.component').then((m) => m.HomeComponent),
  }, // Placeholder for the home page
];
