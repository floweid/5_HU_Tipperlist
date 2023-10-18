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
    currentTipper = computed(() => {
      const tipper = this.alltippers().singleOrDefault(x => x.id === this.tipperIdSelected());
      return tipper ? tipper.name : '-'; // Replace 'DefaultName' with your desired default value
    });
    //.where(x=> x.id == this.tipperIdSelected()).select(x=> x.name)

  //currentUser = computed(() => this.allUsers().singleOrDefault(x => x.name === this.username()));

  _ = effect(()=> console.log(this.alltippers()));
  __ = effect(()=> console.log(this.categories()));
  ___ = effect(()=> console.log(this.allMatches()));
  ____ = effect(()=> console.log(this.tipperIdSelected()));
  _____ = effect(()=> console.log(this.currentTipper()));


  constructor(private tippersService: TippersService, private matchService: MatchesService) { 
    this.tippersService.tippersGet().subscribe(x=> {
      this.alltippers.set(x);
    });

    this.matchService.matchesGet().subscribe(x=> {
      this.allMatches.set(x);
    })
  }
}
