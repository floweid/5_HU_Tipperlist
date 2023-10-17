import { Component, Input } from '@angular/core';
import { MatchDto, SingleTipDto, TipDto } from 'src/app/swagger';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.scss']
})
export class MatchResultComponent {
  @Input() match: MatchDto = null!;
  @Input() tipp: SingleTipDto = null!;
}
