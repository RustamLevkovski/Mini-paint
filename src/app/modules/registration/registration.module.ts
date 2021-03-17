import { FB_CONFIG } from './../../fb.config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AuthentificationService } from '../services/authentification.service';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(FB_CONFIG),
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationComponent
      }
    ])
  ],
  providers: [
    AuthentificationService
  ]
})

export class RegistrationModule {}
