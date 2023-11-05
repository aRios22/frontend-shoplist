import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DetailShoppingListComponent } from './detail-shopping-list/detail-shopping-list.component';

const routes: Routes = [
  { path: "", component:HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "main-page", component:MainPageComponent },
  { path: "detail-shopping-list", component:DetailShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
