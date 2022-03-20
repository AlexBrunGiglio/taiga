import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesList } from '../../../shared/shared-constant';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/roles.guard';
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
  {
    path: RoutesList.ActivateAccount,
    loadChildren: () => import('../pages/auth/activate-account/activate-account.module').then(m => m.ActivateAccountModule),
    pathMatch: 'full',
  },
  {
    path: RoutesList.Profile,
    loadChildren: () => import('../pages/public/profil/profile.module').then(m => m.ProfileModule),
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: RoutesList.AdminHome,
    loadChildren: () => import('../pages/admin/dashboard/dashboard.module').then(m => m.DashboardModule),
    pathMatch: 'full',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RolesList.Admin] },
  },
  {
    path: RoutesList.AdminUsers,
    loadChildren: () => import('../pages/admin/users/users-list.module').then(m => m.UsersListModule),
    pathMatch: 'full',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RolesList.Admin] },
  },
  {
    path: RoutesList.AdminUsers + '/:id',
    loadChildren: () => import('../pages/admin/users/edit-user.module').then(m => m.EditUserModule),
    pathMatch: 'full',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [RolesList.Admin] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
