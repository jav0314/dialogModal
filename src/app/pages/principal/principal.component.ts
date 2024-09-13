import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { PersonService } from '../../service/person.service';
import { Person } from '../../models/person';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../../dialog/details/details.component';
import { EditComponent } from '../../dialog/edit/edit.component';
import { NewpostComponent } from '../../dialog/newpost/newpost.component';
import { DeleteComponent } from '../../dialog/delete/delete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  private personService = inject(PersonService);
  public listaPerson: Person[] = [];
  public displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  public searchControl = new FormControl('');
  public data = this.searchControl.value;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.personService.detailsGet().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaPerson = data;
        }
      },
      error: (err) => {
        console.log(err + 'error');
      },
    });
  }

  detailsPerson(id: number) {
    this.personService.detailsByIdGet(id).subscribe({
      next: (data) => {
        this.openInfoDialog(data);
      },
      error: (err) => {
        console.log(err + 'error');
      },
    });
  }

  openInfoDialog(person: Person): void {
    this.dialog.open(DetailsComponent, {
      data: person,
    });
  }

  editPerson(id: number) {
    const person = this.listaPerson.find((p) => p.id === id);
    if (person) {
      this.dialog
        .open(EditComponent, {
          data: person,
        })
        .afterClosed()
        .subscribe((result) => {
          if (result === 'success') {
            this.getList();
          }
        });
    }
  }

  deletePerson(id: number) {
    const person = this.listaPerson.find((p) => p.id === id);
    if (person) {
      this.dialog
        .open(DeleteComponent, {
          data: person,
        })
        .afterClosed()
        .subscribe((result) => {
          this.getList();
        });
    }
  }

  openNewPostDialog(): void {
    const dialogRef = this.dialog.open(NewpostComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getList();
      }
    });
  }

  filterById(): void {
    const searchValue = this.searchControl.value?.trim();
    if (searchValue === '') {
      this.getList();
    } else {
      const id = Number(searchValue);
      if (!isNaN(id)) {
        this.personService.filterId(id).subscribe({
          next: (data: Person) => (this.listaPerson = [data]),
          error: (error) => {
            this.getList();
            console.error('Error al buscar el usuario:', error);
          },
        });
      } else {
        console.error('El valor ingresado no es un número válido.');
      }
    }
  }
  clearSearch(): void {
    this.searchControl.setValue('');
    this.getList();
  }
}
