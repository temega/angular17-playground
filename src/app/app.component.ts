import { Component, OnInit, afterRender, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PropertyComponent } from './property/property.component';
import { SignalComponent } from './signal/signal.component';
import { DummyComponent } from './dummy/dummy.component';
import { AttributesVsPropsComponent } from './attributes-vs-props/attributes-vs-props.component';
import { MoreSignalsComponent } from './more-signals/more-signals.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PropertyComponent, SignalComponent, DummyComponent, AttributesVsPropsComponent, MoreSignalsComponent],
  providers: [],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <button (click)="incrementProp()">Increment Prop</button>
    <button (click)="incrementSignal()">Increment Signal</button>
    <hr>
    <button (click)="incrementRandomProp()">Random Increment Prop</button>
    <button (click)="incrementRandomSignals()">Random Increment Signal</button>
    <hr>
    <button (click)="incrementProp(); incrementSignal();">Increment Prop and Signal</button>
    <br>

    <div class="wrapper">
      <div class="box">
        <h2>Prop {{numberOfItems}}</h2>
        @for(item of propsArray; track item) {
          <app-property [count]="item"></app-property>
        }
      </div>
      <div class="box">
        <h2>Signal {{numberOfItems}}</h2>
        @for(item of signalsArray; track item) {
          <app-signal [countSignal]="item"></app-signal>
        }
      </div>
    </div>

    <div class="box">
      @for(i of dymmyArray; track i) {
        <app-dummy></app-dummy>
      }
    </div>
<hr>
    <attributes-vs-props></attributes-vs-props>
<hr>

      <more-signals></more-signals>



    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        
      }
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
      console.timeEnd('randomSignal');
      console.timeEnd('randomProp');
    })
  }
  ngOnInit(): void {

  }

  numberOfItems = 5000;

  title = `angular17-playground`;

  counterProp = 0;
  counterSignal = signal(0);

  propsArray = Array.from({length: this.numberOfItems}, (v, k) => 0);
  
  signalsArray = this.arrayOfUniqueSignals(0);
  
  dymmyArray = Array.from({length: this.numberOfItems}, (v, k) => 0); 

  private arrayOfUniqueSignals(initialValue: number) {
    return Array.from({ length: this.numberOfItems }, () => signal(initialValue));
  }

  public incrementSignal() {
    // this.counterSignal.update(val => val + 1);

    // Loop over array and change their values
    this.signalsArray.forEach((signalVal, index, self) => {
      self[index].update(curr => curr + 1);
    });
  }

  public incrementRandomSignals() {
    console.time('randomSignal');
    this.signalsArray.forEach((signalVal, index, self) => {
      if (this.randomness()) self[index].update(curr => curr + 1);
    });
  }

  public incrementRandomProp() {
    console.time('randomProp');
    this.propsArray.forEach((currVal, index, self) => {
      if (this.randomness()) self[index] = currVal + 1;
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
