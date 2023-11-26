import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'attributes-vs-props',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Props and attributes</h2>
    <div>
      <p>This is a property</p>
      <button [disabled]="isDisabled" (click)="isDisabled = true">Property (click to disable)</button>
      <button (click)="isDisabled = false;">Reset</button>
    </div>

    <div>
      <p>This is a attribute bind</p>
      <button #btn [attr.data-like]="doYouLikeMe" (click)="doYouLikeMe = !doYouLikeMe">Attribute</button>
      <p>{{btn.attributes.getNamedItem('data-like')?.value}}</p>
    </div>
  `,
  styles: ``
})
export class AttributesVsPropsComponent {

  isDisabled = false;
  doYouLikeMe = false;
}
