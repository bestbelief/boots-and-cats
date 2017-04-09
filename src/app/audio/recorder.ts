import { Injectable } from '@angular/core';
import { AudioPlayer } from './audioPlayer';


@Injectable()
export class Recorder {
    private recording = false;
    private startTime;
    private stopTime;
    private recordings = [];

    constructor(private player: AudioPlayer) {}

    isRecording(): boolean {
        return this.recording;
    }

    startRecording() {
        this.startTime = this.currentTime();
        this.recording = true;
        this.recordings = [];
        this.player.stopAll();
        console.log('Starting');
    }

    currentTime() {
        return this.player.getContext().currentTime;
    }

    addSound(sound: AudioBuffer) {
        if (this.recording) {
            this.recordings.push({sound, time: this.currentTime() - this.startTime});
        }
    }

    stopRecording() {
        this.stopTime = this.currentTime();
        this.recording = false;
        console.log('Stopping');
    }

    playLastRecording(repeat: boolean = false) {
        console.log('Playing');

        let startPlayingTime = this.currentTime();
        let loopTime = this.stopTime - this.startTime;

        for (let record of this.recordings) {
            let diff = this.currentTime() - startPlayingTime;
            let time = this.currentTime() + record.time - diff;
            if (repeat) {
                this.player.loopSound(record.sound, time, loopTime);
            } else {
                this.player.playSound(record.sound, time);
            }
        }
    }

    recordTimeSpan(bpm = 96, howManyQuaters = 4) {
        console.log('Recording time span');
        this.startRecording();
        var oneMin = 60000;
        setTimeout(() => {
            this.stopRecording();
            this.playLastRecording(true);
        }, oneMin/bpm*howManyQuaters);
        
    }
}

