import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-brush-size',
  templateUrl: './brush-size.component.html',
  styleUrls: ['./brush-size.component.scss']
})

export class BrushSizeComponent {

  @Output() public changeBrushSize = new EventEmitter();

  public currentSize: number = 3;

  public getSize(change): void {
    this.currentSize = change.target.value
    this.changeBrushSize.next(this.currentSize);
    // console.log(this.currentSize);
  }

}
