
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-brush-size',
  templateUrl: './brush-size.component.html',
  styleUrls: ['./brush-size.component.scss']
})

export class BrushSizeComponent {

  @Output() public changeBrushSize = new EventEmitter<string>();

  public currentSize = '3';

  public getSize(event: Event): void {
    this.currentSize = (event.target as HTMLInputElement).value;
    this.changeBrushSize.next(this.currentSize);
  }
}
