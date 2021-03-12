import { LoginComponent } from './login.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  providers: [

  ]
})

export class LoginModule {}