import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PianoComponent } from './piano/piano'
import { KeyComponent } from './key/key'
import { DrumsComponent } from './drums/drums'

const appRoutes: Routes = [
  { path: 'piano', component: PianoComponent },
  { path: 'drums', component: DrumsComponent },
  { path: '',
    redirectTo: '/piano',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    PianoComponent,
    KeyComponent,
    DrumsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
