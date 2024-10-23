import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './navbar/dashboard/dashboard.component';
import { AudienceComponent } from './navbar/audience/audience.component';
import { GridComponent } from './navbar/grid/grid.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'audience', component: AudienceComponent },
  { path: 'grid', component: GridComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
