import {Routes} from '@angular/router';
import {LoginComponent} from './structured/login/login.component';
import {GamesComponent} from "./unstructured/bingo-board/games.component";

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./structured/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'bingo-board',
    component: GamesComponent,
  },
];
