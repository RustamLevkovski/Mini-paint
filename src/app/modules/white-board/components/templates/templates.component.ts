import { Component } from '@angular/core';

@Component({
  selector: 'app-templtes',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})

export class TemplatesComponent {

  public isCircle = false;
  public isRectangle = false;
  public isRoundedRectangle = false;

  public circle(): void {
    this.isCircle = true;
  }

  public rectangle(): void {
    this.isRectangle = true;
  }

  public roundedRectangle(): void {
    this.isRoundedRectangle = true;
  }

}
