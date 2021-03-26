import { ShapeType } from './../../../../enums/shape-type.enum';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent {

  @Output() public getBrushSizePanel = new EventEmitter<string>();
  @Output() public getColorValuePanel = new EventEmitter<string>();
  @Output() public getTemplateSizePanel = new EventEmitter<string>();
  @Output() public shapeChange = new EventEmitter<ShapeType>();

  public isShow = true;

public getBrushSize(brushSize: string): void {
  this.getBrushSizePanel.next(brushSize);
  }

  public getColorValue(colorValue: string): void {
    this.getColorValuePanel.next(colorValue);
  }

  public getTemplateSize(templateSize: string): void {
    this.getTemplateSizePanel.next(templateSize);
  }

  public getShape(shape: ShapeType): void{
    this.shapeChange.next(shape);
  }

  public showTemplates(): void {
      this.isShow = !this.isShow;
  }
}
