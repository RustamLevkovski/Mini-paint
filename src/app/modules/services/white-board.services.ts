import { SavedImg } from './../../interfaces/savedImg.interface';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take} from 'rxjs/operators';

@Injectable()

export class WhiteBoardService {

  public clearCanvasEvent = new Subject();
  public publishEvent = new Subject();
  public base64Complete = new Subject<string>();
  public authorID: string;

  constructor(private http: HttpClient) {}

  public clearCanvas(): void {
    this.clearCanvasEvent.next();
  }

  public publishImg(): void {
    this.authorID = localStorage.getItem('userID');
    this.base64Complete
    .pipe(take(1)).subscribe(base64 => {
      const savedImage: SavedImg = {
        base64,
        authorID: this.authorID,
        id: ''
      };
      this.sendData(savedImage);
     });
    this.publishEvent.next();
  }

  private sendData(savedImg: SavedImg): void {
     this.http.post(`${environment.fbDbUrl}/savedImg.json`, savedImg)
    .pipe(take(1)).subscribe();
  }
}
