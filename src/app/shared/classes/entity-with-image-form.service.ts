import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormatService } from '@app/service/format/format.service';
import { EntityFormService } from '@app/shared/classes/entity-form.service';


@Injectable()
export class EntityWithImageFormService<TItem extends { img: string | SafeUrl }, TFormBody extends { img: string | SafeUrl } = TItem>
  extends EntityFormService<TItem, TFormBody> {
  public imageSrc: SafeUrl | string;

  constructor(public formatService: FormatService,
              private _domSanitizer: DomSanitizer) {
    super(formatService);
  }

  public resetForm(item: Partial<TFormBody>): void { // todo same trouble as in parent class
    this.form.reset({...item});
    this.imageSrc = item.img;
  }

  public getImagePath(img: File): void {
    this.imageSrc = img ? this._domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(img)) : '';
    this.form.get('img').patchValue(img);
    this.form.get('img').markAsDirty();
  }
}
