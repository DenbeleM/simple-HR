import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/employee/models/company.model';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html'
})
export class EditDialogComponent {
  companyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { company: Company }
  ) {
    this.companyForm = this.fb.group({
      id: [data.company ? data.company.id : null],
      name: [data.company ? data.company.name : '', Validators.required],
      employees: [data.company ? data.company.employees : []]
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.dialogRef.close(this.companyForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
