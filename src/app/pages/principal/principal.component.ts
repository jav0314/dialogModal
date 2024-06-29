import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PersonService } from '../../service/person.service';
import { Person } from '../../models/person';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

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
  editPerson(id: any) {}
  deletePerson(id: any) {}
}
