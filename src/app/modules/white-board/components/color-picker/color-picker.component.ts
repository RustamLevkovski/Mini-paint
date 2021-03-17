import { Component } from "@angular/core";

@Component ({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})

export class ColorPickerComponent {
  public getColor(change): string {
    console.log(change.target.value);
    const currentColor = change.target.value
    return currentColor
  }
}
