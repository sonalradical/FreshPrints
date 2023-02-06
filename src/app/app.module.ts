import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { UserListComponent } from './user-list/user-list.component';
import { HistoryComponent } from './history/history.component';
import { UserComponent } from './user/user.component';
@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, NgSelectModule],
  exports: [NgSelectModule],
  declarations: [AppComponent, NavbarComponent, SpinnerComponent, HistoryComponent, UserListComponent, UserComponent],
  bootstrap: [AppComponent],
  providers: []
})

export class AppModule { }
