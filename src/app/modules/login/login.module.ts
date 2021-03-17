import { FB_CONFIG } from './../../fb.config';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthentificationService } from './services/authentification.service';
import { AngularFireModule } from "@angular/fire";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FB_CONFIG),
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ]),
  ],
  providers: [
    AuthentificationService
  ]
})

export class LoginModule {}
