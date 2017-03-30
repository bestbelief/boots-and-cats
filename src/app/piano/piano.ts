import { Component } from '@angular/core';

@Component({
  selector: 'piano',
  templateUrl: './piano.html',
  styleUrls: ['./piano.scss']
})
export class PianoComponent {
    context: AudioContext;

    constructor() {
        try {
            // Fix up for prefixing
            //window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this.context = new AudioContext();

        } catch(e) {
            console.log('Web Audio API is not supported in this browser');
            console.log(e);
        }
    }
}
