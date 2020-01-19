import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { FormatService } from 'src/app/service/format/format.service';
import { SelectComponent } from 'src/app/shared/select-input/select/select.component';

@Component({
    selector: 'app-menu-select',
    templateUrl: './menu-select.component.html',
    styleUrls: ['./menu-select.component.scss', '../../../assets/stylesheet/default-form.scss'],
})
export class MenuSelectComponent implements OnInit, OnDestroy {
    @Output() public changeSelected: EventEmitter<OptionInterface[]> = new EventEmitter<OptionInterface[]>();
    @Output() public needRefreshChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() public without: any[] = [];
    @Input() public placeholder: string;
    @Input() public sortByField = 'name';
    @Input() public multiple: boolean;
    @Input() public maxLength = 20;
    @Input() public withSearch: boolean;
    @Input() public disabled: boolean;
    @Input() public selectControl: AbstractControl;
    @Input() public loadPage: (option: LoadPageInterface) => Observable<OptionsResponseInterface>;
    @Input() public loadItem: (id: number) => Observable<OptionInterface>;
    @ViewChild('selectInput', {static: false}) selectInput: ElementRef;
    @ViewChild(SelectComponent, {static: false}) select: SelectComponent;
    public options: OptionInterface[];
    public selectedOptions: OptionInterface[];
    public allOptionsCount: number;
    public displayedOptions: OptionInterface[];
    public pageNumberForAllOptions: number;
    public pageNumber: number;
    public pageSize: number;
    public optionMap: Map<number, any> = new Map();
    private allLoaded: boolean;
    private isInitiated = false;
    private subscriptions: Subscription[] = [];

    get needRefresh(): boolean {
        return false;
    }

    @Input('needRefresh') set needRefresh(value: boolean) {
        if (value && this.isInitiated) this.ngOnInit();
    }

    constructor(public formatService: FormatService) {
    }

    @Input() public itemToSting = (item) => item ? (item.name && item.name.length < this.maxLength ? item.name : item.short_name) : '';

    public ngOnInit(): void {
        this.pageNumberForAllOptions = 0;
        this.pageNumber = 0;
        this.pageSize = 20;
        this.options = [];
        this.displayedOptions = [];
        this.selectedOptions = [];
        this.selectControl.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe(() => this.onSelect());
        if (this.selectControl.enabled) {
            this.getSelectedFromFormControl()
                .forEach(id => this.loadOption(id));
            this.loadOptions();
        }
        this.isInitiated = true;
        setTimeout(() => this.needRefreshChange.emit(false));
    }

    public getSelectedFromFormControl(): number[] {
        return this.multiple ? this.selectControl.value || [] : (this.selectControl.value ? [this.selectControl.value] : []);
    }

    public getSearchString(): string {
        return this.selectInput ? this.selectInput.nativeElement.value : undefined;
    }

    public loadOptions(): void {
        this.subscriptions.push(this.loadPage({
            search: this.getSearchString(),
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
        }).subscribe(resp => this.formatResponse(resp)));
    }

    public loadOption(id: number): void {
        this.subscriptions.push(this.loadItem(id)
                                    .pipe(tap(resp => this.selectedOptions.push(resp)))
                                    .subscribe(resp => this.addSelectedToAllOption([resp])));
    }

    public addSelectedToAllOption(selectedOptions: OptionInterface[]): void {
        selectedOptions.forEach(option => {
            if (!this.optionMap.has(option.id)) {
                this.optionMap.set(option.id, option);
                this.options.push(option);
            }
        });
        if (this.sortByField) this.formatService.unificationOptions(this.options, this.sortByField);
    }

    public formatResponse(response: OptionsResponseInterface): void {
        this.pageNumber++;
        this.displayedOptions.push(...response.results
                                              .filter(i => this.selectedOptions
                                                               .every(s => s.id !== i.id)));
        response.results
                .forEach(item => this.optionMap.set(item.id, item));
        this.allLoaded = !response.next;
        return !this.getSearchString() ? this.changeAllOptions(response) : undefined;
    }

    public changeAllOptions(response: OptionsResponseInterface): void {
        this.pageNumberForAllOptions++;
        this.options.push(...response.results);
        if (this.sortByField) this.formatService.unificationOptions(this.options, this.sortByField);
        this.allOptionsCount = response.count;
    }

    public onInput(): void {
        const searchString = this.getSearchString();
        switch (true) {
            case !!searchString && this.options.length === this.allOptionsCount:
                this.displayedOptions = this.options
                                            .filter(option => this.formatService.isOptionSearched(option, searchString));
                break;
            case !!searchString:
                this.displayedOptions = [];
                this.pageNumber = 0;
                this.loadOptions();
                break;
            default:
                this.onOptionSelectClose();
        }
    }

    public onOptionSelectClose(): void {
        if (this.withSearch && this.selectInput) this.selectInput.nativeElement.value = '';
        this.addSelectedToAllOption([...this.selectedOptions, ...this.displayedOptions]);
        const selectedIdsSet = new Set(this.getSelectedFromFormControl());
        this.selectedOptions = this.options.filter(item => selectedIdsSet.has(item.id));
        this.displayedOptions = this.options.filter(item => !selectedIdsSet.has(item.id));
        this.pageNumber = this.pageNumberForAllOptions;
        this.allLoaded = this.options.length === this.allOptionsCount;
    }

    public onDown(): void {
        return !this.allLoaded ? this.loadOptions() : undefined;
    }

    public onSelect(): void {
        const selectedIdsSet = new Set(this.getSelectedFromFormControl());
        const selected = [...this.selectedOptions, ...this.displayedOptions]
            .filter(option => selectedIdsSet.has(option.id));
        this.getSelectedFromFormControl()
            .forEach(id => !this.options.find(option => option.id === id) ? this.loadOption(id) : null);
        this.changeSelected.emit(selected);
    }

    @HostListener('window:beforeunload')
    public ngOnDestroy(): void {
        this.formatService.unsubscribeFromAllSubscriptions(this.subscriptions);
    }
}
