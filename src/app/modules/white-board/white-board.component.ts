import { WhiteBoardService } from './../services/white-board.services';
import { Router } from '@angular/router';
import { AuthentificationService } from './../services/authentification.service';
import { Component, OnInit } from "@angular/core";
import { BoardShape} from 'src/app/interfaces/coordinate.interface';



@Component ({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['white-board.component.scss']
})

export class WhiteBoardComponent implements OnInit {

  public brushSizeBoard: number = 3;
  public colorValueBoard: string = "#000000";
  public mainCanvasBoard: HTMLCanvasElement;
  public shapes: BoardShape[] = [];
  public base64: Array<any> = []

  constructor(
    private authentificationService: AuthentificationService,
    private router: Router,
    private whiteBoardService: WhiteBoardService)
    {}

  public ngOnInit(): void {
    this.authentificationService.getUserId();
  }

  public getBrushSize(brushSize: number): number {
    this.brushSizeBoard = brushSize;
    // console.log(brushSize);
    return this.brushSizeBoard;
  }

  public getColorValue(colorValue: string): string {
    this.colorValueBoard = colorValue;
    // console.log(this.colorValueBoard);
    return this.colorValueBoard;
  }

  public logOut(): void {
    this.authentificationService.logout();
    this.router.navigate['login'];
  }

  public publish(): void {
    this.whiteBoardService.publishImg();
    this.whiteBoardService.clearCanvas();
  }

  public getCanvas(clearCanvas: HTMLCanvasElement): HTMLCanvasElement {
   this.mainCanvasBoard=clearCanvas;
   return this.mainCanvasBoard;
  }

  public clear(): void{
    this.whiteBoardService.clearCanvas();
  }

  public getShape(publishedShape: BoardShape): void {
    this.shapes = [...this.shapes, publishedShape];
    console.log('Get shape', this.shapes);
  }



 }


