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
import { SearchComponent } from './pages/search/search.component';
import { LoggedUserResolverService } from './resolvers/logged-user-resolver.service';
import { ProjectResolverService } from './resolvers/project-resolver.service';
import { PostResolverService } from './resolvers/post-resolver.service';
import { UserResolverService } from './resolvers/user-resolver.service';
import { ProjectCreateFormComponent } from './pages/project-create-form/project-create-form.component';
import { ProjectMembersComponent } from './pages/project/project-members/project-members.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', redirectTo: 'search/', pathMatch: 'full' },
  { path: 'search/:query', component: SearchComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'post/:post_id', component: PostPageComponent, resolve: { post: PostResolverService, me: LoggedUserResolverService } },
  {
    path: 'me', component: UserMainComponent, canActivateChild: [AuthGuard], resolve: { user: LoggedUserResolverService },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'settings', component: UserSettingsComponent }
    ]
  },
  { path: 'user/:user_id', component: UserPublicPageComponent, resolve: { user: UserResolverService } },
  { path: 'project/new', component: ProjectCreateFormComponent, canActivate: [AuthGuard], resolve: { me: LoggedUserResolverService } },
  { path: 'project/:project_id', component: ProjectPublicComponent, resolve: { project: ProjectResolverService, me: LoggedUserResolverService } },
  {
    path: 'project/:project_id', component: ProjectMainComponent, resolve: { project: ProjectResolverService, me: LoggedUserResolverService },
    children: [
      { path: 'dashboard', component: ProjectDashboardComponent },
      { path: 'settings', component: ProjectSettingsComponent },
      { path: 'members', component: ProjectMembersComponent },
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
