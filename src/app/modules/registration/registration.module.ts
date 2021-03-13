import { RegistrationComponent } from './registration.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationComponent
      }
    ])
  ],
  providers: []
})

export class RegistrationModule {}
