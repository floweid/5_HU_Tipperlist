import { Component, EventEmitter, Input, Output, SimpleChange, computed, effect, signal } from '@angular/core';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-tipper-names',
  templateUrl: './tipper-names.component.html',
  styleUrls: ['./tipper-names.component.scss']
})
export class TipperNamesComponent {
 @Input() selectedCategory: string = null!;
 @Output() tipperIdSelected = new EventEmitter<number>();

 selectedCategorySignal = signal('');
 ngOnChanges(changes :SimpleChange): void {
  this.selectedCategorySignal.set(this.selectedCategory);
 }
 

 filteredTippers = computed(()=> this.dataService.alltippers().filter(tipper =>
  tipper.tippingCategoryNames.includes(this.selectedCategorySignal())));

  _ = effect(()=> console.log(this.filteredTippers()));


  setTipperId(tipperId: number): void{
    this.dataService.tipperIdSelected.set(tipperId);
  }

  constructor(private dataService: DataService){}
}
