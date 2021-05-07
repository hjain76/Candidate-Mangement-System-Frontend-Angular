
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { CrudComponent } from './crud/crud.component';
import { LoginComponent } from './login/login.component';
import { LogsComponent } from './logs/logs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TrendsComponent } from './trends/trends.component';

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'crud', component: CrudComponent, canActivate: [AuthGuardGuard] },
  { path: 'crud/trends', component: TrendsComponent, canActivate: [AuthGuardGuard] },
  { path: 'crud/logs', component: LogsComponent, canActivate: [AuthGuardGuard] },
  { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

