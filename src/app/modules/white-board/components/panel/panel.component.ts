import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';




@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent {

  @Output() public getBrushSizePanel = new EventEmitter();
  @Output() public getColorValuePanel = new EventEmitter();

  public isShow = true;

public getBrushSize(brushSize: number): void {
  console.log(brushSize);
  this.getBrushSizePanel.next(brushSize);
  }

  public getColorValue(colorValue: string): void {
    this.getColorValuePanel.next(colorValue);
  }

  public showTemplates(): void {
      this.isShow = !this.isShow;
  }

}
