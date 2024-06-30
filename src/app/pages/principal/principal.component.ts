import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {
  private personService = inject(PersonService);
  public listaPerson: Person[] = [];
  public displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  ngOnInit() {
    this.getList();
  }
  constructor(private dialog: MatDialog) {}

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
  openeditDialog(person: Person): void {
    this.dialog.open(EditComponent, {
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

  deletePerson(id: any) {}
}
