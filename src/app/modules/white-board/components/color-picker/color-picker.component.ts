import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component ({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ColorPickerComponent {

  @Output() public changeColor = new EventEmitter<string>();

  public currentColor = '#000000';

  public getColor(event: Event): void {
    this.currentColor = (event.target as HTMLInputElement).value;
    this.changeColor.next(this.currentColor);
  }
}
