import { Component, Input, effect, signal } from '@angular/core';
import { SingleTipDto } from 'src/app/swagger';

@Component({
  selector: 'app-tipped-matches',
  templateUrl: './tipped-matches.component.html',
  styleUrls: ['./tipped-matches.component.scss']
})
export class TippedMatchesComponent {
  //@Input() tipps : SingleTipDto[] = null!;
  @Input() tipperName: string = null!;

  goalDif = signal(0);


  _ = effect(()=> console.log(this.goalDif()));
}
