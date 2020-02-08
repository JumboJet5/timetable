import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestParams } from '@interfaces';
import * as URLS from 'src/core/urls';

@Injectable()
export class RoomService {

  constructor(private http: HttpClient) { }

  public getRooms(params: IRequestParams): Observable<any> {
    return this.http.get<any>(URLS.ROOMS, {params: params as {}});
  }

  public getRoom(id: number): Observable<any> {
    return this.http.get<any>(URLS.ROOM(id));
  }
}
