import { take } from 'rxjs/operators';
import { User } from './../../interfaces/user.interface';
import { AuthentificationService } from '../../services/authentification.service';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthentificationService,
    private router: Router
  ) {
    this._createForm();
  }
  public submit(): void {
    if (!this.authForm.invalid) {
      const user: User = {
        email: this.authForm.value.email,
        password: this.authForm.value.password,
        returnSecureToken: true,
      };
      this.auth
        .login(user)
        .pipe(take(1))
        .subscribe((result) => {
          this.auth.setToken(result.user.refreshToken);
          this.authForm.reset();
          this.router.navigate(['/white-board']);
        });
    }
  }

  private _createForm(): void {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }
}
