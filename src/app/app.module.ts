import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard/user-dashboard.component';
import { UserFeedComponent } from './pages/user-dashboard/user-feed/user-feed.component';
import { UserPublicPageComponent } from './pages/user-public-page/user-public-page.component';
import { ProjectDashboardComponent } from './pages/project/project-dashboard/project-dashboard.component';
import { ProjectMainComponent } from './pages/project/project-main/project-main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserDashboardComponent,
    UserFeedComponent,
    UserPublicPageComponent,
    ProjectDashboardComponent,
    ProjectMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
