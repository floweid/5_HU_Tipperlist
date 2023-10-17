import { Injectable, computed, effect, signal } from '@angular/core';
import { MatchDto, MatchesService, TipperDto, TippersService } from '../swagger';
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
    tipperIdSelected = signal(0);


  //currentUser = computed(() => this.allUsers().singleOrDefault(x => x.name === this.username()));

  _ = effect(()=> console.log(this.alltippers()));
  __ = effect(()=> console.log(this.categories()));
  ___ = effect(()=> console.log(this.allMatches()));
  ____ = effect(()=> console.log(this.tipperIdSelected()));


  constructor(private tippersService: TippersService, private matchService: MatchesService) { 
    this.tippersService.tippersGet().subscribe(x=> {
      this.alltippers.set(x);
    });

    this.matchService.matchesGet().subscribe(x=> {
      this.allMatches.set(x);
    })
  }
}
