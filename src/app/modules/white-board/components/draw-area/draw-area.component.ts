import { Coordinates, Point, BoardShape, BoardShapeType } from './../../../../interfaces/coordinate.interface';
import { Dimension } from './../../../../interfaces/dimension.interface';
import { takeUntil, switchMap, map, pairwise, filter } from 'rxjs/operators';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from "@angular/core";
import { fromEvent, Observable, Subject } from "rxjs";
import { WhiteBoardService } from "src/app/modules/services/white-board.services"; // Надо наполнить и заполнить WhiteBoardService

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.scss']
})

export class DrawAreaComponent implements OnInit, OnDestroy {
@Input() public brushSize: number;
@Input() public colorValue: string;

@Output() public publishedShape = new EventEmitter();

@ViewChild('mainCanvas', {static: true}) public mainCanvasRef: ElementRef;
@ViewChild('whiteBoard', {static: true}) public boardRef: ElementRef;

public shape: BoardShape;

private mainCanvas: HTMLCanvasElement;
private currentShapeData: Coordinates[] = []; // У меня этого нет. Импортируется из этого интерфейса
private mouseCoords$: Observable<Point[]> // у меня нет типа Point
private mouseUp$:  Observable<Event>;
private mouseOut$: Observable<Event>;
private destroy$ = new Subject;

constructor(private renderer: Renderer2, private whiteBoardService: WhiteBoardService) {}

ngOnInit(): void {
  this.mainCanvas = this.mainCanvasRef.nativeElement as HTMLCanvasElement;
  this.initMainCanvas();
  this.initStream();
  this.observeStream();
  console.log(this.brushSize);
  console.log(this.colorValue);


}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
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
  const mouseDown$ = fromEvent(this.mainCanvas, 'mousedown').pipe(
    );

  this.mouseOut$ = fromEvent(this.mainCanvas, 'mouseout');
  this.mouseUp$ = fromEvent(this.mainCanvas, 'mouseup');

  this.mouseCoords$ = mouseDown$.pipe(
    switchMap(()=> {
      return mouseMove$.pipe(
        map((event: MouseEvent)=>({x: event.offsetX, y: event.offsetY})),
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
    const color = this.colorValue; //моя доработка - значению импортирую из color-picker component
    const thickness = this.brushSize; //моя доработка - значению импортирую из brush-size component
    this.drawPoint(this.mainCanvas, color, thickness, from, to);
    this.currentShapeData = [... this.currentShapeData, coords];
  });
  this.mouseUp$.subscribe((event: MouseEvent) => {
    const point: Point = {x: event.offsetX, y: event.offsetY};
    const coords: Coordinates = {from: point, to: point};
    this.currentShapeData = [... this.currentShapeData, coords];
    this.addShape();
  });

  this.mouseOut$
  .pipe(filter(()=> this.currentShapeData.length > 0))
  .subscribe(() => this.addShape());
}

private addShape(): void {
  const shape: BoardShape = {  //импортируется. у меня нет.
    color: this.colorValue, // моя доработка
    thickness: this.brushSize, //моя доработка
    actual: true,
    type: BoardShapeType.CURVE, // ваще в душе не ебу. Импортится из видеоконференции
    data: this.currentShapeData
  };
  console.log(shape);
  // this.whiteBoardService.sendData(shape).subscribe(() => {
  //   this.clearMainCanvas();
  // })
  // this.clearMainCanvas();
  this.currentShapeData = [];
  this.shape = shape;
  this.publishedShape.next(this.shape);
  // this.changeBoard.next(shape); // output - вопрос надо ли они мне у меня все реализуется в этом компоненте
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
  contex.lineCap = 'round';
  contex.lineWidth = thickness;
  contex.beginPath();
  contex.moveTo(from.x, from.y);
  contex.lineTo(to.x, to.y);
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



}
