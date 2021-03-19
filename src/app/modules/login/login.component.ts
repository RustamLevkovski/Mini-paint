import { User } from './../../interfaces/user.interface';
import { AuthentificationService } from '../services/authentification.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/auth';


@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public authForm: FormGroup;

  constructor (
    private fb: FormBuilder,
    private auth: AuthentificationService,
    private router: Router,
    // private fAuth: AngularFireAuth
    ) {
    this._createForm()
  }

  public ngOnInit(): void {

  }

  public submit(): void {
    if (!this.authForm.invalid) {
      const user: User = {
        email: this.authForm.value.email,
        password: this.authForm.value.password,
        returnSecureToken: true
        }
        this.auth.login(user).then((result) => {
          // console.log(result);
          this.auth.setToken(result.user.b.b.h)
          this.authForm.reset();

            this.router.navigate(['/white-board']);

        });
    }

  }

  private _createForm(): void {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    })
  }
}
