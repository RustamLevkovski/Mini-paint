import { Router } from '@angular/router';
import { AuthentificationService } from './../services/authentification.service';
import { Component, Input, OnInit } from "@angular/core";
import { BoardShape } from 'src/app/interfaces/coordinate.interface';

@Component ({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['white-board.component.scss']
})

export class WhiteBoardComponent implements OnInit {

  public brushSizeBoard: number = 3;
  public colorValueBoard: string = "#000000";

  constructor(private authentificationService: AuthentificationService, private router: Router) {}

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

  public logOut(): void {
    this.authentificationService.logout();
    this.router.navigate['login'];
  }

  public publish(): void {

  }
}
