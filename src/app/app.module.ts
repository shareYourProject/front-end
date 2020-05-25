import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { UserMainComponent } from './pages/user/user-main/user-main.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserPublicPageComponent } from './pages/user-public-page/user-public-page.component';
import { ProjectDashboardComponent } from './pages/project/project-dashboard/project-dashboard.component';
import { ProjectMainComponent } from './pages/project/project-main/project-main.component';
import { LoginComponent } from './pages/login/login.component';

// simulate a back end
import { fakeBackendProvider } from './dev/fakeBackEnd';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { WatchDogComponent } from './dev/watch-dog/watch-dog.component';
import { ProjectPublicComponent } from './pages/project-public/project-public.component';
import { UserSettingsComponent } from './pages/user/user-settings/user-settings.component';
import { DebugNavComponent } from './components/debug-nav/debug-nav.component';
import { ProjectSettingsComponent } from './pages/project/project-settings/project-settings.component';
import { ViewObjectTableComponent } from './components/view-object-table/view-object-table.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LinksListComponent } from './components/links-list/links-list.component';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    UserMainComponent,
    UserDashboardComponent,
    UserPublicPageComponent,
    ProjectDashboardComponent,
    ProjectMainComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    WatchDogComponent,
    ProjectPublicComponent,
    UserSettingsComponent,
    DebugNavComponent,
    ProjectSettingsComponent,
    ViewObjectTableComponent,
    PostPageComponent,
    UserListComponent,
    LinksListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    //fakeBackendProvider, // REMOVE THIS BEFORE DEPLOY !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
