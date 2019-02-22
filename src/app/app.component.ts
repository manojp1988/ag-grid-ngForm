import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-tab-group>
      <mat-tab label="Horizontal Grid">
        <vertical-grid> </vertical-grid>
      </mat-tab>
      <mat-tab label="Vertical Grid">
        <horizontal-grid></horizontal-grid>
      </mat-tab>
    </mat-tab-group>
  `
})
export class AppComponent {}
