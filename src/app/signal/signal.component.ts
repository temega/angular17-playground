import { Component, Input, Signal, SimpleChanges, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="count">{{(countSignal())}}</span>&nbsp;
  `,
  styles: 
    `
      .count {font-size: 10px;}
      
    `
  ,
})
export class SignalComponent {
  constructor(){
  }

  ngOnInit(): void {
  }


  @Input() countSignal: WritableSignal<number> = signal(0);

}
