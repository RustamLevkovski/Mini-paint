import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public authForm: FormGroup;

  constructor (private fb: FormBuilder) {
    this._createForm()
  }

  public ngOnInit(): void {

  }

  public submit(): void {

    if (this.authForm.valid) {
      console.log('Form submitted', this.authForm);
      const formData = {... this.authForm.value}
      console.log('FormData', formData);
      console.log('Status ', this.authForm.status);
    }
  }

  private _createForm(): void {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    })
  }
}
