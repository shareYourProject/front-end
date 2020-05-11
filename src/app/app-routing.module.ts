import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// pages
import { HomeComponent } from './pages/home/home.component';
import { UserPublicPageComponent } from './pages/user-public-page/user-public-page.component';

// user dashboard pages
import { UserMainComponent } from './pages/user/user-main/user-main.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

// project pages
import { ProjectMainComponent } from './pages/project/project-main/project-main.component';
import { ProjectDashboardComponent } from './pages/project/project-dashboard/project-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { ProjectPublicComponent } from './pages/project-public/project-public.component';
import { UserSettingsComponent } from './pages/user/user-settings/user-settings.component';
import { ProjectSettingsComponent } from './pages/project/project-settings/project-settings.component';
import { PostPageComponent } from './pages/post-page/post-page.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, /*canActivate: [NotAuthGuard]*/ }, // TODO :remove comment
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  {
    path: 'me', component: UserMainComponent, canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'settings', component: UserSettingsComponent }
    ]
  },
  { path: 'user/:id', component: UserPublicPageComponent },
  { path: 'project/:id', component: ProjectPublicComponent },
  {
    path: 'project/:id', component: ProjectMainComponent, children: [
      { path: 'dashboard', component: ProjectDashboardComponent },
      { path: 'settings', component: ProjectSettingsComponent },
      { path: 'post/:postId', component: PostPageComponent }
    ]
  },
  { path: '**', redirectTo: '' } // keep it at last position !
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
