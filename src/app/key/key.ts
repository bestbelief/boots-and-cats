import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'key',
    templateUrl: './key.html',
    styleUrls: ['./key.scss'],
    host: {
        '(document:keydown)': 'keypress($event)',
        '(document:keyup)': 'release($event)',
        '(click)': 'click()'
    }
})
export class KeyComponent implements OnInit {
    @Input() tone: string;
    @Input() key: string;
    @Input() context: AudioContext;
    private toneBuffer;
    @HostBinding('class.pressed') pressed: boolean = false;
    @HostBinding('class.black') @Input() black: boolean = false; 
    @Input() name: string;


    ngOnInit() {
        this.loadTone()
        if (!this.name) {
            this.name = this.key;
        }
    }

    loadTone() {
      var request = new XMLHttpRequest();
      request.open('GET', '/assets/audio/piano/'+this.tone+'.ogg', true);
      request.responseType = 'arraybuffer';

      // Decode asynchronously
      request.onload = () => {
          this.context.decodeAudioData(request.response, (buffer) => {
              this.toneBuffer = buffer;
          }, (e) => console.log(e));
      };
      request.send();
    }

    getKeyName(event: KeyboardEvent) {
        var key = event.key;
        if (key.toLowerCase() === 'dead') {
            key = event.code;
        }
        return key.toLowerCase();
    }

    keypress(event: KeyboardEvent) {

        if (this.getKeyName(event) === this.key.toLowerCase() &&
            event.repeat !== true) {
            this.playTone();
        }
    }

    click() {
        this.playTone();
        setTimeout(() => this.setPressed(false), 200);
    }

    playTone() {
        this.setPressed(true);

        var source = this.context.createBufferSource(); // creates a sound source
        source.buffer = this.toneBuffer;                // tell the source which sound to play
        source.connect(this.context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);
    }

    release(event: KeyboardEvent) {
        if (this.getKeyName(event) === this.key.toLowerCase()) {
            this.setPressed(false);
        }
    }

    setPressed(what: boolean) {
        this.pressed = what;
    }
}
