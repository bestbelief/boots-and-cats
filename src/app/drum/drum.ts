import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { AudioPlayer } from '../audio/audioPlayer';
import { Recorder } from '../audio/recorder';

@Component({
    selector: 'drum',
    templateUrl: './drum.html',
    styleUrls: ['./drum.scss'],
    host: {
        '(document:keydown)': 'keypress($event)',
        '(document:keyup)': 'release($event)',
        '(click)': 'click()',
        '[class.someClass]':'someField'
    }
})
export class DrumComponent implements OnInit {
    @Input() type: string;
    @Input() key: string;
    @Input() name: string;
    @HostBinding('class') @Input() styles = 'symbol';
    @HostBinding('class.pressed') pressed: boolean = false;
    private context: AudioContext;
    private sound: AudioBuffer;
    private loaded: boolean = false;

    
    constructor(private audioService: AudioPlayer,
                private recorder: Recorder) {}

    ngOnInit() {
        this.loadSound()
        if (!this.name) {
            this.name = this.key;
        }
    }

    loadSound() {
        this.audioService.loadSound('/assets/audio/drums/'+this.type+'.ogg')
            .then((buffer) => {
                this.loaded = true;
                this.sound = buffer;
            });
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
        if (!this.loaded) return;

        if (this.recorder.isRecording) {
            this.recorder.addSound(this.sound);
        }

        this.setPressed(true);
        this.audioService.playSound(this.sound);
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
