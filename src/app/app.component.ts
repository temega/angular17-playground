import { Component, OnInit, afterRender, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyComponent } from './property/property.component';
import { SignalComponent } from './signal/signal.component';

import { AttributesVsPropsComponent } from './attributes-vs-props/attributes-vs-props.component';
import { MoreSignalsComponent } from './more-signals/more-signals.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, PropertyComponent, SignalComponent, AttributesVsPropsComponent, MoreSignalsComponent],
  providers: [],
  template: `
    <h1>{{title}}!</h1>
    <div>
      <input [(ngModel)]="numberOfItems" />
    </div>
    <div class="wrapper">
      <div class="box">
        <h3>{{numberOfItems}} component property binds</h3>
        <div>
          <button (click)="incrementProp()">Increment all</button>
          <button (click)="incrementRandomProp()">Random Increment</button>
        </div>
        @for(item of propsArray; track item) {
          <app-property [count]="item"></app-property>
        }
      </div>
      <div class="box">
        <h3>{{numberOfItems}} Signal binds</h3>
        <div>
          <button (click)="incrementSignal()">Increment all</button>
          <button (click)="incrementRandomSignals()">Random Increment Signal</button>
        </div>
        @for(item of signalsArray; track item) {
          <app-signal [countSignal]="item"></app-signal>
        }
      </div>
    </div>

    
    
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        
      }
      .box {
        
        max-height: 600px;
        overflow: auto;
        flex: 1 0;
      }
    `
  ],
})
export class AppComponent implements OnInit{
  constructor () {
    afterRender(() => {
      console.timeEnd('timer');
    })
  }
  ngOnInit(): void {

  }

  numberOfItems = 500;

  title = `Angular 17 Signals Speedtest`;

  counterProp = 0;
  counterSignal = signal(0);

  propsArray = Array.from({length: this.numberOfItems}, (v, k) => 0);
  
  signalsArray = this.arrayOfUniqueSignals(0);
  

  private arrayOfUniqueSignals(initialValue: number) {
    return Array.from({ length: this.numberOfItems }, () => signal(initialValue));
  }

  public incrementSignal() {
    this.signalsArray.forEach((signalVal, index, self) => {
      self[index].update(curr => curr + 1);
    });
  }

  public incrementRandomSignals() {
    console.time('timer');
    let changeCounter = 0;
    this.signalsArray.forEach((signalVal, index, self) => {
      if (this.randomness()) {
        self[index].update(curr => curr + 1)
        changeCounter++;
      };
    });
  }

  public incrementRandomProp() {
    console.time('timer');
    let changeCounter = 0;
    this.propsArray.forEach((currVal, index, self) => {
      if (this.randomness()) {
        self[index] = currVal + 1;
        changeCounter++;
      };
    });
  }

  private randomness() {
    return Math.random() < 0.5;
  }

  public incrementProp() {
    this.propsArray.forEach((currVal, index, self) => {
      self[index] = currVal + 1;
    });
  }
  
}
