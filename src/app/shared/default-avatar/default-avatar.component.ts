import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-avatar',
  templateUrl: './default-avatar.component.html',
  styleUrls: ['./default-avatar.component.scss']
})
export class DefaultAvatarComponent {
  public text: string;

  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  @Input()
  set fullName(value: string) {
    const words = value.split(' ');
    this.text = words[0].slice(0, 1);
    if (words.length > 1) this.text += words[1].slice(0, 1);
    this._fullName = value;
  }
}
