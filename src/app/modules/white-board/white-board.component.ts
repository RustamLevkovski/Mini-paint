import { Component, Input, OnInit } from "@angular/core";

@Component ({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['white-board.component.scss']
})

export class WhiteBoardComponent implements OnInit {

  public brushSizeBoard: number;
  public colorValueBoard: string;

  public ngOnInit(): void {
  }

  public getBrushSize(brushSize: number): number {
    this.brushSizeBoard = brushSize;
    console.log(brushSize);
    return this.brushSizeBoard;
  }

  public getColorValue(colorValue: string): string {
    this.colorValueBoard = colorValue;
    console.log(this.colorValueBoard);
    return this.colorValueBoard;
  }
}
