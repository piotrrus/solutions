/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { BaseComponent } from './base.component';
import { ErrorMsgService } from '@shared/forms/errors/error-msg.service';

@Component({
     template: '',
})
export abstract class BaseFormComponent extends BaseComponent {
     abstract form: { form: FormGroup };
     abstract formChange: EventEmitter<any>;
     abstract isFormValid: EventEmitter<boolean>;
     private validationService = new ErrorMsgService();

     public checkFormAndEmit(): void {
          this.form.form.valueChanges
               .pipe(
                    tap(() => {
                         this.formChange.emit(this.form.form.getRawValue());
                         this.isFormValid.emit(this.form.form.valid);
                    }),
                    takeUntil(this.destruct$)
               )
               .subscribe();
     }

     public getErrorMessage(validatorName: string) {
          return this.validationService.getValidatorErrorMessage(validatorName);
        }

}
