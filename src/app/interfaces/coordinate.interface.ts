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
  // changeID?: ChangeIDDto;
  type: BoardShapeType;
}

export enum BoardShapeType {
  CURVE = 'curve',
  POINT = 'point',
}


export interface FbCreateResponse {
  name: string
}
