import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./system/home/home.component";
import {LoginComponent} from "./system/login/login.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '' , redirectTo: '/login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
