import { SavedImg } from './../../interfaces/savedImg.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map, filter } from 'rxjs/operators';


@ Injectable()

export class GalleryService {
  constructor(private http: HttpClient) {}

  public getPublishedImages(uid): Observable<SavedImg[]> {
    return this.http.get(`${environment.fbDbUrl}/savedImg.json`)
    .pipe(
      filter(response => !!response),
      map((response: {[key: string]: any }) => {
         return Object
        .keys(response)
        .map(key => ({
          ...response[key],
          id: key
        }));
      }),
      map(data => data.filter(res => res.authorID === uid))
    );
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/savedImg/${id}.json`);
  }
}
