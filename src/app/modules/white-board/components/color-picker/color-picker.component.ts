import { Component, EventEmitter, Output } from "@angular/core";

@Component ({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})


export class ColorPickerComponent {

  @Output() public changeColor = new EventEmitter();

  public currentColor: string = "#000000";

  public getColor(change): void {
    // console.log(change.target.value);
    this.currentColor = change.target.value;
    this.changeColor.next(this.currentColor);
  }
}
