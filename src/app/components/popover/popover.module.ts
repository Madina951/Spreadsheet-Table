import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { PopoverService } from './popover.service';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [PopoverComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [PopoverService]
})
export class PopoverModule {
}
