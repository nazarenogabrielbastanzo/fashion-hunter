import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { fadeInAnimation } from './modules/shared/animations/animations';
import { BreakpointsService } from './services/breakpoints.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInAnimation],
})
export class AppComponent implements OnDestroy {
  destroyed = new Subject<void>();
  currentScreenSize!: string;

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(
    private contexts: ChildrenOutletContexts,
    private breakpointObserver: BreakpointObserver,
    private breakpointsSvc: BreakpointsService
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            this.breakpointsSvc.currentScreenSizeSource.next(this.currentScreenSize);
          }
        }
      });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
