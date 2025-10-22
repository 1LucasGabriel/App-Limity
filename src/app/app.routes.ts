import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'limite',
    loadComponent: () => import('./limite/limite.page').then( m => m.LimitePage)
  },
  {
    path: 'derivada',
    loadComponent: () => import('./derivada/derivada.page').then( m => m.DerivadaPage)
  },
];
