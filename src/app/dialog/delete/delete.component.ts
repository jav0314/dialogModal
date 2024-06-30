import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonService } from '../../service/person.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete',
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
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DeleteComponent>);
  personService = inject(PersonService);
  deleteForm: FormGroup;
  fb = inject(FormBuilder);

  constructor() {
    this.deleteForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name],
      email: [this.data.email],
    });
  }

  deletePerson() {
    if (this.deleteForm.valid) {
      const deletePerson = this.deleteForm.getRawValue();
      this.personService.deleteDel(deletePerson.id).subscribe({
        next: () => {
          this.dialogRef.close('success');
          alert('Usuario eliminado');
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
