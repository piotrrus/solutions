import { NgModule } from '@angular/core';
import { NumberOnlyDirective } from '@shared/directives/number-only.directive';
import { TextOnlyDirective } from '@shared/directives/text-only.directive';
import { TrimDirective } from '@shared/directives/trim.directive';

const DIRECTIVES = [
     NumberOnlyDirective,
     TrimDirective,
     TextOnlyDirective,
];
@NgModule({
     declarations: [DIRECTIVES],
     exports: [DIRECTIVES],
})
export class DirectivesModule { }
