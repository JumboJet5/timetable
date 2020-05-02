import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageable, IRequestParams } from '@interfaces';
import { IRoom } from 'src/core/interfaces/room.interface';
import * as URLS from 'src/core/urls';

@Injectable({providedIn: 'root'})
export class RoomService {

  constructor(private http: HttpClient) { }

  public getRooms(params: IRequestParams): Observable<IPageable<IRoom>> {
    return this.http.get<IPageable<IRoom>>(URLS.ROOMS, {params: params as {}});
  }

  public getRoom(id: number): Observable<IRoom> {
    return this.http.get<IRoom>(URLS.ROOM(id));
  }

  public createRoom(room: IRoom): Observable<IRoom> {
    return this.http.post<IRoom>(URLS.ROOMS, room);
  }

  public updateRoom(id: number, room: IRoom): Observable<IRoom> {
    return this.http.put<IRoom>(URLS.ROOM(id), room);
  }

  public deleteRoom(id: number): Observable<null> {
    return this.http.delete<null>(URLS.ROOM(id));
  }
}
