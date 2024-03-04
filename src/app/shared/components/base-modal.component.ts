import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
     template: '',
})
export abstract class BaseModalComponent {
     public isFormValid = false;
     public formData: unknown;

     constructor(public dialogRef: MatDialogRef<unknown>) {}

     public onFormChange($event: unknown) {
          console.log($event)
          $event ? (this.formData = $event) : null;
     }

     public onFormValid($event: boolean) {
          this.isFormValid = $event;
          console.log($event)
     }

     public onSave(): void {
          this.dialogRef.close(this.formData);
     }

     public onClose(): void {
          this.dialogRef.close(false);
     }
}
