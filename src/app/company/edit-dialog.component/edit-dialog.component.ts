import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Company } from '../../employee/models/company.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',  // Ensure this path is correct
  styleUrls: []    // Ensure this path is correct
})
export class EditDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      firstName: [data.firstName],
      lastName: [data.lastName],
      company: [data.company]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.data,
        ...this.form.value
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
