import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactResolver } from './services/contact.resolver';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: { contact: ContactResolver }, 
    canActivate: [AuthGuard]
  },
  {
    path: 'contact', component: ContactIndexComponent, canActivate: [AuthGuard], children: [
      {
        path: 'edit/:id',
        component: ContactEditComponent,
        resolve: { contact: ContactResolver },
        canActivate: [AuthGuard]
      },
      {
        path: 'edit',
        component: ContactEditComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment?.production })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
