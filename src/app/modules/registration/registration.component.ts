import { AuthentificationService } from './../services/authentification.service';
import { User } from './../../interfaces/user.interface';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['registration.component.scss']
})

export class RegistrationComponent {

  public regForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reg: AuthentificationService,
    private router: Router,
    ) {
    this._createForm();
  }
  public submit(): void {
    if (this.regForm.valid) {
      if (this.regForm.invalid) {
        return;
      }
      const user: User = {
        email: this.regForm.value.email,
        password: this.regForm.value.password,
        returnSecureToken: true
      };
      this.reg.signUp(user);
      this.router.navigate(['/login']);
    }
  }

  private _createForm(): void {
  this.regForm = this.fb.group({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  });
  }
}
