import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlagComponent } from './flag/flag.component';
import { MatchResultComponent } from './match-result/match-result.component';
import { TipperNamesComponent } from './tipper-names/tipper-names.component';



@NgModule({
  declarations: [
    FlagComponent,
    MatchResultComponent,
    TipperNamesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FlagComponent,
    MatchResultComponent,
    TipperNamesComponent
  ]
})
export class SharedModule { }
