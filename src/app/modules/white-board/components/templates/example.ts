import { WhiteboardService } from '../../services/whiteboard.service';
import { Coordinates } from '../../types/coordinates.interface';
import { BoardActions } from '@app-shared/ui-components/board-actions/types/board-actions.interface';
import { BoardMenu } from '@app-shared/ui-components/board-actions/types/board-menu.interface';
import { map, pairwise, switchMap, takeUntil, filter, tap } from 'rxjs/operators';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { Point } from 'src/app/modules/video-conference/types/coordinates.interface';
import {
  Dimension,
  BoardShape,
  BoardShapeType,
} from 'src/app/modules/video-conference/types/shape.interface';

@Component({
  selector: 'app-whiteboard-canvas',
  templateUrl: './whiteboard-canvas.component.html',
  styleUrls: ['./whiteboard-canvas.component.scss'],
})
export class WhiteboardCanvasComponent implements OnInit, OnDestroy {
  @Input() public tools: BoardMenu;
  @Input() public shapes: BoardShape[];
  @Input() public isDrawEnabled: boolean;
  @Input() public zoomValue = 100;
  @Input() public size: Dimension;
  @Output() public changeActiveTool = new EventEmitter<BoardActions>();
  @Output() public changeBoard = new EventEmitter<BoardShape>();
  @ViewChild('mainCanvas', { static: true }) public mainCanvasRef: ElementRef;
  @ViewChild('board', { static: true }) public boardRef: ElementRef;

  private mainCanvas: HTMLCanvasElement;
  private currentShapeData: Coordinates[] = [];
  private destroy$ = new Subject();
  private mouseCoords$: Observable<Point[]>;
  private mouseUp$: Observable<Event>;
  private mouseOut$: Observable<Event>;
  private readonly BG_COLOR = '#ffffff';
  private readonly MOUSE_LEFT_BUTTON_KEYCODE = 0;

  private leftMouseBtnFilter = (event: MouseEvent) =>
    event.button === this.MOUSE_LEFT_BUTTON_KEYCODE;

  constructor(private renderer: Renderer2, private whiteboardService: WhiteboardService) {}

  public ngOnInit(): void {
    this.mainCanvas = this.mainCanvasRef.nativeElement as HTMLCanvasElement;
    this.whiteboardService
      .loadImageFromBoard()
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => this.downloadBoardPng());
    this.initMainCanvas();
    this.initStream();
    this.observeStreams();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initMainCanvas(): void {
    const board = this.boardRef.nativeElement as HTMLDivElement; // получил ссылку на доску из html board comp
    // const rect = this.size ? this.size : board.getBoundingClientRect();
    const mainContext = this.mainCanvas.getContext('2d'); // настройка главного канваса что рисуем в 2 д. обязательный параметр

    mainContext.scale(1, 1); //масштабирование по 2 осям
    this.setCanvasSize(rect, this.mainCanvas); //установка размеров в ручную
  }

  private initStream(): void { //преобразование mousemove в observerable
    const mouseMove$ = fromEvent(this.mainCanvas, 'mousemove');
    const mouseDown$ = fromEvent(this.mainCanvas, 'mousedown').pipe(
      filter(this.leftMouseBtnFilter)
    );

    this.mouseOut$ = fromEvent(this.mainCanvas, 'mouseout');
    this.mouseUp$ = fromEvent(this.mainCanvas, 'mouseup').pipe(filter(this.leftMouseBtnFilter));

    this.mouseCoords$ = mouseDown$.pipe(
      switchMap(() => {
        return mouseMove$.pipe(
          map((event: MouseEvent) => ({ x: event.offsetX, y: event.offsetY })),
          pairwise(), //усредняет координаты
          takeUntil(this.mouseUp$),
          takeUntil(this.mouseOut$)
        );
      }),
      takeUntil(this.destroy$)
    );
  }

  private observeStreams(): void { // забираю результат того события.
    this.mouseCoords$.pipe(takeUntil(this.destroy$)).subscribe(([from, to]) => {
      const coords: Coordinates = { from, to };
      const color = this.getColor();
      const thickness = this.getThickness();
      this.drawPoint(this.mainCanvas, color, thickness, from, to); //метод рисования
      this.currentShapeData = [...this.currentShapeData, coords];
    });

    this.mouseUp$.subscribe((event: MouseEvent) => { // отписки
      const point: Point = { x: event.offsetX, y: event.offsetY };
      const coords: Coordinates = { from: point, to: point };

      this.currentShapeData = [...this.currentShapeData, coords];

      this.addShape();
    });

    this.mouseOut$
      .pipe(filter(() => this.currentShapeData.length > 0))
      .subscribe(() => this.addShape());
  }

  private addShape(): void { // есть большой канвас. когда отпускаю мышь - ты стираешь что нарисовал. коорд сохраняю массив элементы и на соновании этого отрисовываю маленький канвас внутри фигуры
    const shape: BoardShape = {
      color: this.getColor(),
      thickness: this.getThickness(),
      actual: true,
      type: BoardShapeType.CURVE,
      data: this.currentShapeData,
    };
    this.clearMainCanvas();
    this.currentShapeData = [];
    this.changeBoard.next(shape);
  }

  private drawPoint(
    canvas: HTMLCanvasElement,
    color: string,
    thisckness: number,
    from: Point,
    to: Point
  ): void {
    const context = canvas.getContext('2d');
    context.strokeStyle = color;
    context.lineCap = 'round';
    context.lineWidth = thisckness;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  }

  private setCanvasSize(size: Dimension, canvas: HTMLCanvasElement): void {
    this.renderer.setProperty(canvas, 'width', size.width);
    this.renderer.setProperty(canvas, 'height', size.height);
  }

  private clearMainCanvas(): void {
    const mainContext = this.mainCanvas.getContext('2d');
    mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
  }

  private getThickness(): number {
    return Object.values(this.tools).find((tool) => tool.isSelected).thickness;
  }

  private getColor(): string {
    const color = !this.tools.gummy.isSelected ? this.tools.color.value : this.BG_COLOR;
    return color;
  }

//   public downloadBoardPng(): void {
//     const temporaryCanvas: HTMLCanvasElement = this.renderer.createElement('canvas');
//     const fileSaver = this.renderer.createElement('a');
//     const context = temporaryCanvas.getContext('2d');
//     context.lineCap = 'round';
//     const rect = this.size ? this.size : document.documentElement.getBoundingClientRect();
//     this.setCanvasSize(rect, temporaryCanvas);
//     context.fillStyle = this.BG_COLOR;
//     context.fillRect(0, 0, rect.width, rect.height);
//     this.shapes
//       .filter((shape) => shape.actual)
//       .forEach((shape) =>
//         shape.data.forEach((coords) =>
//           this.drawPoint(temporaryCanvas, shape.color, shape.thickness, coords.from, coords.to)
//         )
//       );
//     fileSaver.href = temporaryCanvas
//       .toDataURL('image/png')
//       .replace('image/png', 'image/octet-stream');
//     fileSaver.download = 'board.png';
//     fileSaver.click();
//   }
// }
