import { ShapeType } from './../../enums/shape-type.enum';
import { WhiteBoardService } from './../services/white-board.services';
import { AuthentificationService } from './../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { BoardShape} from 'src/app/interfaces/coordinate.interface';

@Component ({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['white-board.component.scss']
})

export class WhiteBoardComponent implements OnInit {

  public brushSizeBoard = '3';
  public colorValueBoard = '#000000';
  public templateSizeBoard = '50';
  public mainCanvasBoard: HTMLCanvasElement;
  public shapes: BoardShape[] = [];
  public base64: Array<string> = [];
  public isShow = false;
  public templateBoard = ShapeType.LINE;

  constructor(
    private authentificationService: AuthentificationService,
    private whiteBoardService: WhiteBoardService)
    {}

  public ngOnInit(): void {
    this.authentificationService.getUserId();
  }

  public getShape(shape: ShapeType): ShapeType {
    this.templateBoard = shape;
    return this.templateBoard;
  }

  public getBrushSize(brushSize: string): string {
    this.brushSizeBoard = brushSize;
    return this.brushSizeBoard;
  }

  public getColorValue(colorValue: string): string {
    this.colorValueBoard = colorValue;
    return this.colorValueBoard;
  }

  public getTemplateSize(templateSize: string): string{
    this.templateSizeBoard = templateSize;
    return this.templateSizeBoard;
  }

  public logOut(): void {
    this.authentificationService.logout();
  }

  public publish(): void {
    this.whiteBoardService.publishImg();
    this.whiteBoardService.clearCanvas();
    this.showModal();
  }

  public getCanvas(clearCanvas: HTMLCanvasElement): HTMLCanvasElement {
   this.mainCanvasBoard = clearCanvas;
   return this.mainCanvasBoard;
  }

  public clear(): void{
    this.whiteBoardService.clearCanvas();
  }

  public showModal(): void {
    this.isShow = true;
  }

  public closeModal(): void {
    this.isShow = false;
  }
}


