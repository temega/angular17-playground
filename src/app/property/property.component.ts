import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="count">{{count}}</span>&nbsp;
  `,
  styles: 
    `
      .count {font-size: 10px;}
      :host { display: inline; }
    `
  ,
})
export class PropertyComponent {
  @Input() count: number = 0;
  constructor() {
    
  }

}
