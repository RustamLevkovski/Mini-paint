import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  public regForm: FormGroup;

  constructor (private fb: FormBuilder) {
    this._createForm ()
  }

  public ngOnInit(): void {

  }

  public submit(): void {

    if(this.regForm.valid) {
      console.log('Form Group', this.regForm);
      const formData = this.regForm.value;
      console.log('Form Data', formData);
    }



  }

  private _createForm(): void {
  this.regForm = this.fb.group({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  })
  }
}
