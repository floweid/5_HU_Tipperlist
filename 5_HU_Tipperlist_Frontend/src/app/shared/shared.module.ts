import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlagComponent } from './flag/flag.component';
import { MatchResultComponent } from './match-result/match-result.component';
import { TipperNamesComponent } from './tipper-names/tipper-names.component';
import { TippedMatchesComponent } from './tipped-matches/tipped-matches.component';
import { NgSignalDirective } from './ngSignal.directive';



@NgModule({
  declarations: [
    FlagComponent,
    MatchResultComponent,
    TipperNamesComponent,
    TippedMatchesComponent,
    NgSignalDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FlagComponent,
    MatchResultComponent,
    TipperNamesComponent,
    TippedMatchesComponent,
    NgSignalDirective
  ]
})
export class SharedModule { }
