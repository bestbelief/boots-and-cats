import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PianoComponent } from './piano/piano';
import { KeyComponent } from './key/key';
import { DrumKitComponent } from './drumkit/drumkit';
import { DrumComponent } from './drum/drum';
import { AudioManager } from './audioManager/audioManager';
import { BPM } from './bpm/bpm';

const appRoutes: Routes = [
  { path: 'piano', component: PianoComponent },
  { path: 'drums', component: DrumKitComponent },
  { path: '',
    redirectTo: '/piano',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/piano' }
];

@NgModule({
  declarations: [
    AppComponent,
    PianoComponent,
    KeyComponent,
    DrumKitComponent,
    DrumComponent,
    AudioManager,
    BPM
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
