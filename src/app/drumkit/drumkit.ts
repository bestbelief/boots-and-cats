import { Component, animate, style, transition, trigger } from '@angular/core';
import { Recorder } from '../audio/recorder';
import { AudioPlayer } from '../audio/audioPlayer';
import { routerTransition } from '../util/routerTransition';

@Component({
    selector: 'drumkit',
    templateUrl: './drumkit.html',
    styleUrls: ['./drumkit.scss'],
    providers: [Recorder],

    //animations: [routerTransition()],
    host: {
        '(document:keydown)': 'keypress($event)',
        //'[@routerTransition]': '',
    }
})
export class DrumKitComponent {

    constructor(private recorder: Recorder,
                private player: AudioPlayer) {}

    keypress(event: KeyboardEvent) {
        console.log(event.key.toLowerCase());
        if (event.code.toLowerCase() === 'space') {
            if (this.recorder.isRecording()) {
                this.recorder.stopRecording();
                this.recorder.playLastRecording(true);
            } else {
                this.recorder.startRecording();
            }

        } else if (event.key.toLowerCase() === 'x') {
            if (this.recorder.isRecording()) {
                this.recorder.stopRecording();
            }

            this.recorder.startRecording();
            
        } else if (event.key.toLowerCase() === 'z') {
            if (this.recorder.isRecording()) {
                this.recorder.stopRecording();
            }

        } else if (event.key.toLowerCase() === 'c') {
            this.player.stopAll();

        } else if (event.key.toLowerCase() === 'v') {
            if (this.recorder.isRecording()) {
                this.recorder.stopRecording();
            }

            this.recorder.recordTimeSpan();
        }
    }
}
