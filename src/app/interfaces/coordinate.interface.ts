export interface Coordinates {
  from: Point;
  to: Point;
}

export interface Point {
  x: number;
  y: number;
}

export interface BoardShape {
  color: string;
  thickness: number;
  data: Coordinates[];
  actual: boolean;
  type: BoardShapeType;
}

export enum BoardShapeType {
  CURVE = 'curve',
  POINT = 'point',
}



