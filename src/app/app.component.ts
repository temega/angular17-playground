import { Component, OnInit, afterRender, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PropertyComponent } from './property/property.component';
import { SignalComponent } from './signal/signal.component';
import { DummyComponent } from './dummy/dummy.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PropertyComponent, SignalComponent, DummyComponent],
  providers: [],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <button (click)="incrementSignal()">Increment Signal</button>
    <button (click)="incrementProp()">Increment Prop</button>
    <button (click)="incrementProp(); incrementSignal();">Increment Prop and Signal</button>
    <div class="box">
      <h2>Prop</h2>
      @for(i of loopArray; track i) {
        <app-property [count]="counterProp"></app-property>
      }
    </div>
    <div class="box">
      <h2>Signal</h2>
      @for(i of loopArray; track i) {
        <app-signal [count]="counterSignal"></app-signal>
      }
    </div>

    <div class="box">
      @for(i of loopArray; track i) {
        <app-dummy></app-dummy>
      }
    </div>


    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .box {
        max-height: 300px;
        overflow: auto;
      }
    `
  ],
})
export class AppComponent implements OnInit{
  constructor () {
    afterRender(() => {
      console.log('render???')
      // - end timer
    });
  }
  ngOnInit(): void {
  }
  title = `angular17-playground`;

  counterSignal = 0;
  counterProp = 0;

  loopArray = Array.from({length: 1000}, (v, k) => k+1); 

  public incrementSignal() {
    this.counterSignal++;
  }

  public incrementProp() {
    this.counterProp++;
  }
  
}
