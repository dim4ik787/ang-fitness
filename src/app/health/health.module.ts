import { NgModule } from '@angular/core';
import { HealthRoutingModule } from './health-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [HealthRoutingModule, SharedModule.forRoot()],
  exports: [],
  declarations: [],
  providers: [],
})
export class HealthModule {}
