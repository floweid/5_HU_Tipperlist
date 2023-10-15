import { Injectable, computed, effect, signal } from '@angular/core';
import { MatchDto, TipperDto } from '../swagger';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  alltippers = signal<TipperDto[]>([]);
  allMatches = signal<MatchDto[]>([]);
  //categories = computed(()=> {this.alltippers.})

  x = signal(0);
  y = signal(0);

  sum = computed(()=> this.x() + this.y());
  _ = effect(()=> console.log("Sum changed " + this.x()));

  constructor() { }
}
