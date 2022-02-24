import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesList } from '../../../shared/shared-constant';
import { EditUsersComponent } from './pages/admin/users/edit-users/edit-users.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { UsersListComponent } from './pages/admin/users/users-list/users-list.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { InternalServerComponent } from './pages/errors/internal-server/internal-server.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/errors/unauthorized/unauthorized.component';
import { AuthGuard } from './routes/guards/auth-guard';
import { RoleGuard } from './routes/guards/role-guard';
import { RoutesList } from './routes/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesList.AdminHome,
    pathMatch: 'full'
  },
  {
    path: RoutesList.AdminHome,
    loadChildren: () => import('../app/pages/admin/home/home.module').then(m => m.HomeAdminModule),
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: RoutesList.Login,
    loadChildren: () => import('../app/pages/auth/login/login.module').then(m => m.LoginModule),
    pathMatch: 'full',
  },
  {
    path: RoutesList.Register,
    loadChildren: () => import('../app/pages/auth/register/register.module').then(m => m.RegisterModule),
    pathMatch: 'full',
  },
  {
    path: RoutesList.ForgotPassword,
    loadChildren: () => import('../app/pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    pathMatch: 'full',
  },
  {
    path: RoutesList.AdminUsers,
    loadChildren: () => import('../app/pages/admin/users/users-list/users-list.module').then(m => m.UsersListModule),
    pathMatch: 'full',
    canActivate: [RoleGuard],
    data: { roles: [RolesList.Admin] },
  },
  {
    path: RoutesList.AdminUsers + '/:id',
    loadChildren: () => import('../app/pages/admin/users/edit-users/edit-users.module').then(m => m.EditUsersModule),
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: RoutesList.Unauthorized,
    loadChildren: () => import('../app/pages/errors/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule),
    pathMatch: 'full',
  },
  {
    path: RoutesList.InternalError,
    loadChildren: () => import('../app/pages/errors/internal-server/internal-server.module').then(m => m.InternalServerModule),
    pathMatch: 'full',
  },
  {
    path: RoutesList.NotFound,
    loadChildren: () => import('../app/pages/errors/not-found/not-found.module').then(m => m.NotFoundModule),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('../app/pages/errors/not-found/not-found.module').then(m => m.NotFoundModule),
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
