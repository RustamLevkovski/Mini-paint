import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ShapeType } from 'src/app/enums/shape-type.enum';

@Component({
  selector: 'app-templtes',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TemplatesComponent  {

  public currentSize = '50';
  @Output() public shapeChange = new EventEmitter<ShapeType>();
  @Output() public changeSize = new EventEmitter<string>();

  public circle(): void {
    this.shapeChange.next(ShapeType.CIRCLE);
  }
  public rectangle(): void {
    this.shapeChange.next(ShapeType.RECT);
  }

  public line(): void {
    this.shapeChange.next(ShapeType.LINE);
  }

  public getSize(event: Event): void {
    this.currentSize = (event.target as HTMLInputElement).value;
    this.changeSize.next(this.currentSize);
  }
}
