import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropbDownDirective } from './dropdown.directive';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, DropbDownDirective],
  imports: [CommonModule],
  //   BECAUSE WE DON'T WANT TO USE THESE COMPONENTS INTO THIS MODULE ONLY BUT OTHER MODULES, WE THEN HAVE TO EXPORT THEM TO BE AVAILABLE FROM OTHER MODULES
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropbDownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
