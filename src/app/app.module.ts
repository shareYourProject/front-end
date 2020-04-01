import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './pages/main/main.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard/user-dashboard.component';
import { UserFeedComponent } from './pages/user-dashboard/user-feed/user-feed.component';
import { UserPublicPageComponent } from './pages/user-public-page/user-public-page.component';
import { ProjectDashboardComponent } from './pages/project/project-dashboard/project-dashboard.component';
import { ProjectMainComponent } from './pages/project/project-main/project-main.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserDashboardComponent,
    UserFeedComponent,
    UserPublicPageComponent,
    ProjectDashboardComponent,
    ProjectMainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
