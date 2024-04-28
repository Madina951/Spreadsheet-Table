import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss'
})
export class PopoverComponent {
  @Input('template') content: TemplateRef<any>;
}
