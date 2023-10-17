import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlagComponent } from './flag/flag.component';
import { MatchResultComponent } from './match-result/match-result.component';



@NgModule({
  declarations: [
    FlagComponent,
    MatchResultComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FlagComponent,
    MatchResultComponent
  ]
})
export class SharedModule { }
