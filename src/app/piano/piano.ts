import { Component } from '@angular/core';
import { routerTransition } from '../util/routerTransition';

@Component({
  selector: 'piano',
  templateUrl: './piano.html',
  styleUrls: ['./piano.scss'],
  //animations: [routerTransition()],
  host: {
    //'[@routerTransition]': '',
  }
})
export class PianoComponent {}
