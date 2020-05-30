import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-load-image',
  templateUrl: './load-image.component.html',
  styleUrls: [
    '../../../core/stylesheet/loader.scss',
    './load-image.component.scss',
  ],
})
export class LoadImageComponent implements OnInit {
  @ViewChild('hidden') public hiddenInput: ElementRef<HTMLInputElement>;
  @Output() public onImageChange: EventEmitter<File> = new EventEmitter<File>();
  @Input() public disabled = false;
  @Input() public imageSrc: SafeUrl | string;
  @Input() public defaultSrc = '/static/assets/img/no-image-found.png';
  @Input() public isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onClick() {
    if (!this.disabled && !this.isLoading && !!this.hiddenInput) this.hiddenInput.nativeElement.click();
  }

  public onChange() {
    if (!!this.hiddenInput && !!this.hiddenInput.nativeElement.files.length)
      this.onImageChange.emit(this.hiddenInput.nativeElement.files.item(0));
  }
}
