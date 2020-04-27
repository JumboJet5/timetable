import { Injectable } from '@angular/core';
import { IEntityInfo } from 'src/core/interfaces/entity-info.interface';

@Injectable()
export class SmartDetailsService {
  constructor() {
  }

  private _currentEntity: IEntityInfo;

  public get currentEntity(): IEntityInfo {
    return this._currentEntity;
  }

  public set currentEntity(value: IEntityInfo) {
    this._currentEntity = value;
  }
}
