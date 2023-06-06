import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthModule } from 'src/auth/auth.module';

import { AppComponent } from './containers/app/app.component';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
