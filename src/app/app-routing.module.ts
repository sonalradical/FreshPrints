import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }