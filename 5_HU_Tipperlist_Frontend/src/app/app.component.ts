import { Component, effect, signal } from '@angular/core';
import { DataService } from './core/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dataService: DataService){}

  countryName: string = "Uru";
  selectedCategory = signal('Firma');

  setSelectedCategory(currentCategory: string): void{
      this.selectedCategory.set(currentCategory);
  }

  _ = effect(()=> console.log(this.selectedCategory()));
}
