import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { AppComponent } from './containers/app/app.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { HealthModule } from '../health/health.module';

import { Store } from 'store';
import { ThemeButtonComponent } from './components/theme-button/theme-button.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NavigationComponent, ThemeButtonComponent],
  imports: [BrowserModule, AuthModule, HealthModule, AppRoutingModule],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
