import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../../service/person.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<EditComponent>);
  personService = inject(PersonService);
  fb = inject(FormBuilder);

  editForm: FormGroup;

  constructor() {
    this.editForm = this.fb.group({
      id: [{ value: this.data.id, disabled: true }],
      name: [this.data.name],
      email: [this.data.email],
    });
  }

  onSave() {
    if (this.editForm.valid) {
      const updatedPerson = {
        ...this.editForm.getRawValue(),
      };

      this.personService.editPut(updatedPerson).subscribe({
        next: () => {
          this.dialogRef.close('success');
          alert('Cambios realizados');
        },
        error: (err) => {
          console.log(err);
          this.dialogRef.close('error');
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
