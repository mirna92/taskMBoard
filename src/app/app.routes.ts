import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',loadChildren: () => import('@features/feature.module').then(m => m.FeatureModule)
  
},
];
