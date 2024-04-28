import { inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopoverComponent } from './popover.component';
import { take } from 'rxjs';

@Injectable()
export class PopoverService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);

  open(origin: HTMLElement, content: TemplateRef<any>): OverlayRef {
    const overlayRef = this.overlay.create(this.getOverlayConfig(origin));
    const injector = Injector.create({
      parent: this.injector,
      providers: [{provide: OverlayRef, useValue: overlayRef}]
    });

    const popover = overlayRef.attach(new ComponentPortal(PopoverComponent, null, injector));
    popover.instance.content = content;

    return overlayRef;

  }

  private getOverlayConfig(origin: HTMLElement): OverlayConfig {
    const self = this;

    return new OverlayConfig({
      disposeOnNavigation: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition({autoClose: true}),
      positionStrategy: getOverlayPosition(),
      backdropClass: 'popover-backdrop',
      hasBackdrop: false
    });

    function getOverlayPosition(): PositionStrategy {
      return self.overlay.position()
        .flexibleConnectedTo(origin)
        .withGrowAfterOpen(true)
        .withPositions([{originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top',}])
        .withPush(true)
        .withFlexibleDimensions(false)
        .withViewportMargin(0)
        .withDefaultOffsetY(5);
    }
  }
}
