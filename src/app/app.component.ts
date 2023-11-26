import { Component, OnInit, afterRender, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PropertyComponent } from './property/property.component';
import { SignalComponent } from './signal/signal.component';
import { DummyComponent } from './dummy/dummy.component';
import { AttributesVsPropsComponent } from './attributes-vs-props/attributes-vs-props.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PropertyComponent, SignalComponent, DummyComponent, AttributesVsPropsComponent],
  providers: [],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <button (click)="incrementSignal()">Increment Signal</button>
    <button (click)="incrementProp()">Increment Prop</button>
    <button (click)="incrementProp(); incrementSignal();">Increment Prop and Signal</button>
    <br>
    <button (click)="incrementFirstNth()">Increment Signal list</button>

    <div class="wrapper">
      <div class="box">
        <h2>Prop</h2>
        @for(i of propsArray; track i) {
          <app-property [count]="counterProp"></app-property>
        }
      </div>
      <div class="box">
        <h2>Signal</h2>
        @for(i of signalsArray; track i) {
          
          <app-signal [count]="signalsArray[i]"></app-signal>
        }
      </div>
    </div>

    <div class="box">
      @for(i of dymmyArray; track i) {
        <app-dummy></app-dummy>
      }
    </div>

    <attributes-vs-props></attributes-vs-props>


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
      console.log('render???')
      // - end timer
    });
  }
  ngOnInit(): void {
  }

  title = `angular17-playground`;

  counterProp = 0;
  counterSignal = 0;

  propsArray = Array.from({length: 1000}, (v, k) => k+1);
  signalsArray = Array.from({length: 1000}, (v, k) => k).map(v => 0);

  dymmyArray = Array.from({length: 1000}, (v, k) => k+1); 
  
  



  public incrementSignal() {
    this.counterSignal++;
    
  }

  public incrementFirstNth() {
    
    this.signalsArray = this.signalsArray.map(el => el+1);
    

  }

  public incrementProp() {
    this.counterProp++;
  }
  
}
