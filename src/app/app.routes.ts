import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'event',
    pathMatch: 'full'
  },

  {
    path: '',
    loadComponent: () => import('./features/map/map').then(e => e.Map),
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search').then(e => e.Search),
  },
];
