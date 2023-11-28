import { Component, OnInit, afterRender, signal, computed, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChange } from '@angular/core';
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
    <button (click)="incrementProp(); incrementSignal();">Increment Prop and Signal</button>
    <br>

    <div class="wrapper">
      <div class="box">
        <h2>Prop {{numberOfItems}}</h2>
        @for(i of propsArray; track i) {
          <app-property [count]="counterProp"></app-property>
        }
      </div>
      <div class="box">
        <h2>Signal {{numberOfItems}}</h2>
        @for(item of signalsArray(); track item) {
          
          <app-signal [count]="item"></app-signal>
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
  constructor (private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 2000)
  }
  ngOnInit(): void {

  }


  numberOfItems = 1000;

  title = `angular17-playground`;

  counterProp = 0;
  counterSignal = signal(0);

  propsArray = Array.from({length: this.numberOfItems}, (v, k) => k+1);
  
  // I might create an array of N but each item points to the same signal.
  // I need to create an array with N different signals
  signalsArray = computed(() => Array.from({length: this.numberOfItems}, (v, k) => k).map(v => this.counterSignal()));
  
  dymmyArray = Array.from({length: this.numberOfItems}, (v, k) => k+1); 


  public incrementSignal() {
    this.counterSignal.update(val => val + 1);
    
    
    
  }
  public incrementProp() {
    this.counterProp++;
  }
  
}
