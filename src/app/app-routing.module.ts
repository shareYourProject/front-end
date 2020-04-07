import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// pages
import { MainComponent } from './pages/main/main.component';
import { UserPublicPageComponent } from './pages/user-public-page/user-public-page.component';

// user dashboard pages
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard/user-dashboard.component';
import { UserFeedComponent } from './pages/user-dashboard/user-feed/user-feed.component';

// project pages
import { ProjectMainComponent } from './pages/project/project-main/project-main.component';
import { ProjectDashboardComponent } from './pages/project/project-dashboard/project-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';



const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent},
  {
    path: 'me', component: UserDashboardComponent, canActivateChild:[AuthGuard],
    children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: 'feed', component: UserFeedComponent },
    ]
  },
  { path: 'user/:id', component: UserPublicPageComponent },
  {
    path: 'project/:id', component: ProjectMainComponent, children: [
      { path: 'dashboard', component: ProjectDashboardComponent },
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
