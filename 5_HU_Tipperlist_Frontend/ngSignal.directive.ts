import { Directive, ElementRef, HostListener, Input, OnInit, WritableSignal, effect } from '@angular/core';

@Directive({
  selector: '[ngSignal]'
})
export class NgSignalDirective<T> implements OnInit {
  private ele: HTMLInputElement | HTMLSelectElement = null!;
  private valueTypeName = 'string';
  private inputTypeName = 'unknown';
  @Input({ required: true }) ngSignal: WritableSignal<T> = null!;
  @Input() ngSignalLog = '';

  private _ = effect(() => {
    if (!this.ele || !this.ngSignal) return;
    this.ele.value = `${this.ngSignal()}`;
  });

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.ele = this.elementRef.nativeElement as HTMLInputElement | HTMLSelectElement;
    const val = this.ngSignal();
    this.valueTypeName = typeof val;
    this.inputTypeName = this.elementRef.nativeElement.type;
    if (this.valueTypeName === 'object') this.valueTypeName = (val as object).constructor.name;
    if (this.ngSignalLog) console.log(`[ngSignal] ngOnInit: ${this.ngSignalLog} (valueType=${this.valueTypeName} / inputType=${this.inputTypeName})`);
    if (this.inputTypeName === 'radio') {
      if (val == this.ele.value) this.setValue();
    }
    else if (this.valueTypeName === 'Date') {
      const strVal = (val as Date).toLocaleDateString(); //24.12.2023
      const p = strVal.split('.');
      const dateStringWithCorrectFormat = `${p[2]}-${p[1].padStart(2, '0')}-${p[0].padStart(2, '0')}`; //2023-12-24
      this.ele.value = dateStringWithCorrectFormat;
    }
    else {
      this.ele.value = `${val}`;
    }
  }

  @HostListener('change') onChange() {
    // if (this.ngSignalLog) console.log(`[ngSignal] onChange ${this.ngSignalLog}`);
    this.setValue();
  }
  @HostListener('keyup') onKeyup() {
    // if (this.ngSignalLog) console.log(`[ngSignal] onKeyup ${this.ngSignalLog}`);
    this.setValue();
  }

  private setValue(): void {
    let value: any = this.inputTypeName === 'checkbox' ? (this.ele as any)['checked'] : this.ele.value;
    // if (this.ngSignalLog) console.log([ngSignal] setValue ${this.ngSignalLog}: trying to set ${value} for type ${this.valueTypeName}`);
    if (this.valueTypeName === 'number') value = parseFloat(value);
    if (this.valueTypeName === 'Date') value = new Date(value);
    if (this.valueTypeName === 'boolean' || this.valueTypeName === 'object') value = JSON.parse(value);
    if (this.ngSignalLog) console.log(`[ngSignal] setValue ${this.ngSignalLog} --> ${value} (${typeof (value)})`);
    if (this.inputTypeName === 'radio' && value) (this.ele as any)['checked'] = true;
    this.ngSignal.set(value as T);
  }
}
