import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonService } from '../../service/person.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Person } from '../../models/person';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@Component({
  selector: 'app-newpost',
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
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.css',
})
export class NewpostComponent {
  personForm: FormGroup;
  dialogRef = inject(MatDialogRef<NewpostComponent>);
  personService = inject(PersonService);
  fb = inject(FormBuilder);
  constructor() {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      createDate: [dayjs().utc(true).format()],
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const newPerson: Person = this.personForm.value;
      console.log(newPerson.createDate);
      this.personService.createPost(newPerson).subscribe({
        next: () => {
          this.dialogRef.close('success');
          alert('Usuario ' + newPerson.name + ' a sido creado');
        },
        error: (err) => {
          alert('Usuario ' + newPerson.name + ' no ha podido ser creado');
          console.log(err + 'error');
          this.dialogRef.close('error');
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
