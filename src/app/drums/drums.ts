import { Component } from '@angular/core';

@Component({
  selector: 'drums',
  templateUrl: './drums.html',
  styleUrls: ['./drums.scss']
})
export class DrumsComponent {
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
