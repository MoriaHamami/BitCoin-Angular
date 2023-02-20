import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactResolver } from './services/contact.resolver';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: { contact: ContactResolver }
  },
  // {
  //   path: 'contact/edit/:id', 
  //   component: ContactEditComponent,
  //   resolve: { contact: ContactResolver }
  // },
  {
    path: 'contact', component: ContactIndexComponent, children: [
      // {
      //   path: ':id',
      //   component: ContactDetailsComponent,
      //   resolve: { contact: ContactResolver }
      // },
      {
        path: 'edit/:id', 
        component: ContactEditComponent,
        resolve: { contact: ContactResolver }
      },
      {
        path: 'edit', 
        component: ContactEditComponent,
      },
    ]
  },
  // { path: 'contact', component: ContactIndexComponent },
  { path: 'stats', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment?.production })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
