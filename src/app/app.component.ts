import { Component } from '@angular/core';
import { AudioPlayer } from './audio/audioPlayer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [AudioPlayer] // initialize service
})
export class AppComponent {
    title = 'Rock on!';

    constructor(private audioService: AudioPlayer) {}
}
