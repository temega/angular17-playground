import { Component, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'more-signals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>The real good stuff</h2>
    {{counter()}} - computed: {{together()}}
    <button (click)="addUp()">Add up</button>
  `,
  styles: `
    :host {
      display: block;
      background: gold;
      padding: 10px;
      box-sizing: border-box;
      
    }
  `
})
export class MoreSignalsComponent {
  constructor() {
    
  }
  
  arr = ['hellow', 'my', 'name', 'is', 'a', 'very', 'long', 'array'];
  
  counter = signal(1);
  
  together = computed(() => this.counter() * 2);
  
  addUp() {
    this.counter.update((curr) => curr + 1)
  }

}
