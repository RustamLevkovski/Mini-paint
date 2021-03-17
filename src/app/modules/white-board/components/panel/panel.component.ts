import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from "@angular/core";
import { ColorPickerComponent } from '../color-picker/color-picker.component';



@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent {

  public palleteForm: FormGroup;



  constructor (
    private fb: FormBuilder
  ) {
    this._createForm()
  }


private _createForm(): void {
  this.palleteForm = this.fb.group({
    color: new FormControl('')
  })
}
}
