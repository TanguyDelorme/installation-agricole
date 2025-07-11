import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'event',
    pathMatch: 'full'
  },

  {
    path: '',
    loadComponent: () => import('./features/map/map.component').then(e => e.MapComponent),
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search.component').then(e => e.SearchComponent),
  },
];
