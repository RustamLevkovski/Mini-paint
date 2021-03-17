import { Component } from "@angular/core";

@Component({
  selector: 'app-brush-size',
  templateUrl: './brush-size.component.html',
  styleUrls: ['./brush-size.component.scss']
})

export class BrushSizeComponent {

  public currentSize: number = 3;

  public getSize(change): void {
    this.currentSize = change.target.value
    console.log(this.currentSize);
  }

}
