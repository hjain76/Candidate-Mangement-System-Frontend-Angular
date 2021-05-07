import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CrudComponent } from './crud/crud.component';
import { CandidateService } from './candidate.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardGuard } from './auth-guard.guard';
import { TrendsComponent } from './trends/trends.component';
import { LogsComponent } from './logs/logs.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrudComponent,
    TrendsComponent,
    LogsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '958171236568-sj3hvmpr448tf4r4bm7tn1ve2fch8ogh.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
    , AuthGuardGuard],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
