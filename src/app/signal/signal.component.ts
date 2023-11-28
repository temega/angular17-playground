import { Component, Input, Signal, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="count">{{(count)}}</span>&nbsp;
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


  @Input() count: number = 0;

}
