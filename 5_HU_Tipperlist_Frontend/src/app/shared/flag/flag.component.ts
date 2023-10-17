import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent {
  @Input()  countryName: string = null!;
  @Input()  showCountryName: boolean = false;
  @Input()  isNameLeft: boolean = true;

  flagMap: Record<string, string> = {
    'Arg': 'ar',
    'Aus': 'au',
    'Bel': 'be',
    'Bra': 'br',
    'Can': 'ca',
    'Cmr': 'cm',
    'Crc': 'cr',
    'Cro': 'hr',
    'Den': 'dk',
    'Ecu': 'ec',
    'Eng': 'england',
    'Esp': 'es',
    'Fra': 'fr',
    'Ger': 'de',
    'Gha': 'gh',
    'Irn': 'ir',
    'Jpn': 'jp',
    'Kor': 'co',
    'Ksa': 'sa',
    'Mar': 'ma',
    'Mex': 'mx',
    'Ned': 'nl',
    'Pol': 'pl',
    'Por': 'pt',
    'Qat': 'qa',
    'Sen': 'se',
    'Srb': 'rs',
    'Sui': 'ch',
    'Tun': 'tn',
    'Uru': 'uy',
    'Usa': 'us',
    'Wal': 'wales'
};


 }
