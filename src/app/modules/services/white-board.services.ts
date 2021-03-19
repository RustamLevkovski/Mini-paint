import { BoardShape, FbCreateResponse } from './../../interfaces/coordinate.interface';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map} from 'rxjs/operators';



@Injectable()

export class WhiteBoardService {

  constructor(private http: HttpClient) {}

  public sendData(shape: BoardShape): Observable<BoardShape> {
    return this.http.post(`${environment.fbDbUrl}/shape.json`, shape)
    .pipe(map((response: FbCreateResponse) => {
      return {
        ...shape,
        id: response.name
      }
    }))
  }

}
