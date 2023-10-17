import { Injectable, computed, effect, signal } from '@angular/core';
import { MatchDto, TipperDto, TippersService } from '../swagger';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  alltippers = signal<TipperDto[]>([]);
  allMatches = signal<MatchDto[]>([]);
  categories = computed(() => [...new Set(this.alltippers()
    .flatMap(x => x.tippingCategoryNames)
    .sort())]);


  //currentUser = computed(() => this.allUsers().singleOrDefault(x => x.name === this.username()));

  _ = effect(()=> console.log(this.alltippers()));
  __ = effect(()=> console.log(this.categories()));


  constructor(private tippersService: TippersService) { 
    this.tippersService.tippersGet().subscribe(x=> {
      this.alltippers.set(x);
      
    })
  }
}
