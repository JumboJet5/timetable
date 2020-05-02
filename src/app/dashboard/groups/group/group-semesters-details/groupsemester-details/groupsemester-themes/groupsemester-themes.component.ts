import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SmartDetailsService } from '@app/service/smart-details/smart-details.service';
import { EntityTypesEnum } from 'src/core/interfaces/entity-info.interface';
import { IGroupsemester } from 'src/core/interfaces/groupsemester.interface';
import { ITheme } from 'src/core/interfaces/theme.interface';

@Component({
  selector: 'app-groupsemester-themes',
  templateUrl: './groupsemester-themes.component.html',
  styleUrls: ['../../../../../../../core/stylesheet/default-form.scss', './groupsemester-themes.component.scss'],
})
export class GroupsemesterThemesComponent {
  @Input() public groupsemester: IGroupsemester;
  @Output() public needUpdateThemes: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _smartDetailsService: SmartDetailsService) { }

  private _groupThemes: ITheme[];

  public get groupThemes(): ITheme[] {
    return this._groupThemes;
  }

  @Input()
  public set groupThemes(value: ITheme[]) {
    this._groupThemes = [...value];
    if (!!this.groupsemester) this._groupThemes.sort(this._themeEnableComparator.bind(this));
  }

  public themeChanged(event: MatCheckboxChange, theme: ITheme) {
    if (!this.groupsemester || !theme) return;

    const {id, name, short_name} = theme;
    if (event.checked && !this.groupsemester.themes.find(item => item.id === id))
      this.groupsemester.themes.push({id, name, short_name});
    if (!event.checked && !!this.groupsemester.themes.find(item => item.id === id))
      this.groupsemester.themes = this.groupsemester.themes.filter(item => item.id !== id);

    this.needUpdateThemes.emit();
  }

  public isThemeEnableForGroupsemester(themeId: number): boolean {
    return !!this.groupsemester && !!this.groupsemester.themes && this.groupsemester.themes.some(theme => theme.id === themeId);
  }

  public openDetails(entity: ITheme) {
    this._smartDetailsService.currentEntity = {entity, type: EntityTypesEnum.THEME};
  }

  private _themeEnableComparator(firstTheme: ITheme, secondTheme: ITheme): number {
    switch (true) {
      case !this.isThemeEnableForGroupsemester(firstTheme.id) && this.isThemeEnableForGroupsemester(secondTheme.id):
        return 1;
      case this.isThemeEnableForGroupsemester(firstTheme.id) && !this.isThemeEnableForGroupsemester(secondTheme.id):
        return -1;
      default:
        return 0;
    }
  }
}
