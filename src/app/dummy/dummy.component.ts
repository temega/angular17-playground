import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span>{{val}} </span>
  `,
  styles: ``
})
export class DummyComponent {
  val = 'd';
}
