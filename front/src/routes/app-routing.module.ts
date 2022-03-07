import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoutesList } from './routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesList.Home,
    pathMatch: 'full'
  },
  {
    path: RoutesList.Home,
    loadChildren: () => import('../pages/public/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full',

  },
  {
    path: RoutesList.Register,
    loadChildren: () => import('../pages/auth/register/register.module').then(m => m.RegisterModule),
    pathMatch: 'full',
  },
  {
    path: RoutesList.Login,
    loadChildren: () => import('../pages/auth/login/login.module').then(m => m.LoginModule),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
