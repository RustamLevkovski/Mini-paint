import { ShapeType } from './../../../../enums/shape-type.enum';
import { Coordinates, Point, BoardShape, BoardShapeType} from './../../../../interfaces/coordinate.interface';
import { Dimension } from './../../../../interfaces/dimension.interface';
import { takeUntil, switchMap, map, pairwise, filter } from 'rxjs/operators';
import {
  Component,
  ElementRef,
  Input, ViewChild,
  OnDestroy, OnInit,
  Renderer2 } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { WhiteBoardService } from 'src/app/modules/services/white-board.services';

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.scss']
})

export class DrawAreaComponent implements OnInit, OnDestroy {
@Input() public brushSize: number;
@Input() public colorValue: string;
@Input() public shapes: BoardShape[];
@Input() public templateSize: number;
@Input() public template: ShapeType;
@ViewChild('mainCanvas', {static: true}) public mainCanvasRef: ElementRef;
@ViewChild('whiteBoard', {static: true}) public boardRef: ElementRef;

public shape: BoardShape;
public currentCoord: Point;
private mainCanvas: HTMLCanvasElement;
private currentShapeData: Coordinates[] = [];
private mouseCoords$: Observable<Point[]>;
private mouseUp$: Observable<Event>;
private mouseOut$: Observable<Event>;
private destroy$ = new Subject();

constructor(private renderer: Renderer2, private whiteBoardService: WhiteBoardService) {}

public ngOnInit(): void {
  this.whiteBoardService.clearCanvasEvent.pipe(takeUntil(this.destroy$)).subscribe(() => this.clearMainCanvas());
  this.whiteBoardService.publishEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
    this.whiteBoardService.base64Complete.next(this.getBase64());
  });
  this.mainCanvas = this.mainCanvasRef.nativeElement as HTMLCanvasElement;
  this.initMainCanvas();
  this.initStream();
  this.observeStream();
}

private initMainCanvas(): void {
  const board = this.boardRef.nativeElement as HTMLDivElement;
  const { width, height } = board.getBoundingClientRect();
  const mainContext = this.mainCanvas.getContext('2d');
  const rect: Dimension = { width, height };
  this.setCanvasSize(rect, this.mainCanvas);
  mainContext.scale(1, 1);
  }

private initStream(): void {
  const mouseMove$ = fromEvent(this.mainCanvas, 'mousemove');
  const mouseDown$ = fromEvent(this.mainCanvas, 'mousedown').pipe();
  this.mouseOut$ = fromEvent(this.mainCanvas, 'mouseout');
  this.mouseUp$ = fromEvent(this.mainCanvas, 'mouseup');
  this.mouseCoords$ = mouseDown$.pipe(
    switchMap(() => {
      return mouseMove$.pipe(
        map((event: MouseEvent) => ({x: event.offsetX, y: event.offsetY})),
        pairwise(),
        takeUntil(this.mouseUp$),
        takeUntil(this.mouseOut$)
      );
    }),
    takeUntil(this.destroy$)
  );
}

private observeStream(): void {
  this.mouseCoords$.pipe(takeUntil(this.destroy$)).subscribe(([from, to]) => {
    const coords: Coordinates = {from, to};
    const color = this.colorValue;
    const thickness = this.brushSize;
    if (this.template === 'line') {
    this.drawPoint(this.mainCanvas, color, thickness, from, to);
  }
    this.currentShapeData = [... this.currentShapeData, coords];
  });
  this.mouseUp$.subscribe((event: MouseEvent) => {
    const point: Point = {x: event.offsetX, y: event.offsetY};
    this.currentCoord = point;

    if (this.template === 'rectangle'){
      this.drawRectangle(this.mainCanvas, this.colorValue, this.brushSize);
    }
    if (this.template === 'circle') {
      this.drawCircle(this.mainCanvas, this.colorValue, this.brushSize);
    }
    const coords: Coordinates = {from: point, to: point};
    this.currentShapeData = [... this.currentShapeData, coords];
    this.addShape();
  });

  this.mouseOut$
  .pipe(filter(() => this.currentShapeData.length > 0))
  .subscribe(() => this.addShape());
}

private addShape(): void {
    const shape: BoardShape = {
    color: this.colorValue,
    thickness: this.brushSize,
    actual: true,
    type: BoardShapeType.CURVE,
    data: this.currentShapeData
  };
    this.currentShapeData = [];
    this.shape = shape;
  }

private drawPoint(
  canvas: HTMLCanvasElement,
  color: string,
  thickness: number,
  from: Point,
  to: Point
): void {
  const contex = canvas.getContext('2d');
  contex.strokeStyle = color;
  contex.lineCap = 'square';
  contex.lineWidth = thickness;
  contex.beginPath();
  contex.moveTo(from.x, from.y);
  contex .lineTo(to.x, to.y);
  contex.stroke();
}

private drawRectangle(
  canvas: HTMLCanvasElement,
  color: string,
  thickness: number
): void {
  const contex = canvas.getContext('2d');
  contex.strokeStyle = color;
  contex.lineCap = 'round';
  contex.lineWidth = thickness;
  contex.beginPath();
  contex.strokeRect(this.currentCoord.x, this.currentCoord.y, this.templateSize, this.templateSize);
}

private drawCircle(
  canvas: HTMLCanvasElement,
  color: string,
  thickness: number
  ): void {
  const contex = canvas.getContext('2d');
  contex.strokeStyle = color;
  contex.lineCap = 'round';
  contex.lineWidth = thickness;
  contex.beginPath();
  contex.arc(this.currentCoord.x, this.currentCoord.y, this.templateSize, 0, Math.PI * 2, false);
  contex.stroke();
}

private setCanvasSize(size: Dimension, canvas: HTMLCanvasElement): void {
  this.renderer.setProperty(canvas, 'width', size.width);
  this.renderer.setProperty(canvas, 'height', size.height);
}

private clearMainCanvas(): void {
  const mainContex = this.mainCanvas.getContext('2d');
  mainContex.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
}

private getBase64(): string {
  const base64 = this.mainCanvas.toDataURL();
  return base64;
}

public ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}
