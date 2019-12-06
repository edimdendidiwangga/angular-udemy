import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { Loading } from './loading.component';
import { PlaceholderDirective } from './placeholder/placeholder.direct';
import { DropdownDirective } from './dropdown.directive';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    AlertComponent,
    Loading,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    Loading,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  providers: [LoggingService],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {}