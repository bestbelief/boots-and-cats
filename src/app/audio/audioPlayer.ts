import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export class AudioPlayer {
    private context: AudioContext;
    private playing = [];

    constructor (private http: Http) {
        try {
            // Fix up for prefixing
            //window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this.context = new AudioContext();

        } catch(e) {
            alert('Web Audio API is not supported in this browser');
            console.log(e);
        }
    }

    getContext(): AudioContext {
        return this.context;
    }

    stopAll() {
        for (let source of this.playing) {
            source.stop();
        }
        this.playing = [];
    }

    loadSound(url: string): Promise<AudioBuffer> {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        return new Promise<AudioBuffer>((resolve, reject) => {
            request.onload = () => {
                this.context.decodeAudioData(request.response, (buffer) => {
                    resolve(buffer);
                }, (e) => console.log(e));
            };
            request.send();
        });
    }

    loopSound(audio: AudioBuffer, startTime: number = 0, loopTime: number = 0) {
        for (var i = 0; i < 20; i++) {
            var source = this.context.createBufferSource(); // creates a sound source
            source.buffer = audio;                          // tell the source which sound to play
            source.connect(this.context.destination);       // connect the source to the context's destination (the speakers)
            source.start(startTime+loopTime*i);
            this.playing.push(source);
        }
    }

    playSound(audio: AudioBuffer, time: number = 0) {
        var source = this.context.createBufferSource(); // creates a sound source
        source.buffer = audio;                          // tell the source which sound to play
        source.connect(this.context.destination);       // connect the source to the context's destination (the speakers)
        source.start(time);
        this.playing.push(source);
    }
}