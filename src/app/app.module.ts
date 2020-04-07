import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard/user-dashboard.component';
import { UserFeedComponent } from './pages/user-dashboard/user-feed/user-feed.component';
import { UserPublicPageComponent } from './pages/user-public-page/user-public-page.component';
import { ProjectDashboardComponent } from './pages/project/project-dashboard/project-dashboard.component';
import { ProjectMainComponent } from './pages/project/project-main/project-main.component';
import { LoginComponent } from './pages/login/login.component';

// simulate a back end
import { fakeBackendProvider } from './dev/fakeBackEnd';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    UserFeedComponent,
    UserPublicPageComponent,
    ProjectDashboardComponent,
    ProjectMainComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    fakeBackendProvider, // REMOVE THIS BEFORE DEPLOY !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
