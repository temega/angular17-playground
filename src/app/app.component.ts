import { Component, OnInit, WritableSignal, afterRender, computed, signal } from '@angular/core';
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

  numberOfItems = 1000;

  title = `Angular 17 Signals Speedtest`; 
  
  private arrayOfValuesGenerator(initialValue: () => any) {
    return Array.from({ length: this.numberOfItems }, () => initialValue());
  }
  
  
  signalsArray = this.arrayOfValuesGenerator(() => signal(0));

  public incrementSignal() {
    this.signalsArray.forEach((signalVal, index, arr) => {
      arr[index].update((curr: number) => curr + 1);
    });
  }

  public incrementRandomSignals() {
    console.time('timer');
    this.signalsArray.forEach((value, index, array) => {
      if (this.randomness()) {
        value.update((current: any) => current + 1)
      };
    });
  }

  propsArray = this.arrayOfValuesGenerator(() => 0);
  
  public incrementProp() {
    this.propsArray.forEach((value, index, array) => {
      array[index] = value + 1;
    });
  }

  public incrementRandomProp() {
    console.time('timer');
    this.propsArray.forEach((value, index, array) => {
      if (this.randomness()) {
        array[index] = value + 1;
      };
    });
  }


  private randomness() {
    return Math.random() < 0.2;
  }

  
  
}
