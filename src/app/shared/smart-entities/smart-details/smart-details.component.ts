import { Component, Input } from '@angular/core';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';

@Component({
  selector: 'app-smart-details',
  templateUrl: './smart-details.component.html',
  styleUrls: ['./smart-details.component.scss'],
})
export class SmartDetailsComponent {
  @Input() public isCourseInGroupReadonly = true;
  @Input() public titleText = 'Деталі зв\'язаних сутностей';

  constructor(public smartDetailsService: SmartDetailsService) { }
}
