import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { connectionAPI } from '../appsettings';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private http = inject(HttpClient);
  public apiLink = connectionAPI.apiURL + 'Person';
  constructor() {}

  detailsGet() {
    return this.http.get<Person[]>(this.apiLink);
  }

  detailsByIdGet(id: number) {
    return this.http.get<Person>(`${this.apiLink}/${id}`);
  }
  createPost(person: Person) {
    return this.http.post<any>(this.apiLink, person);
  }

  deleteDel(id: number) {
    return this.http.delete<any>(`${this.apiLink}/${id}`);
  }

  editPut(person: Person) {
    return this.http.put<any>(`${this.apiLink}/${person.id}`, person);
  }

  filterId(id: number) {
    return this.http.get<Person>(`${this.apiLink}/id/${id}`);
  }

  filterName(name: string) {
    return this.http.get<Person[]>(`${this.apiLink}/name/${name}`);
  }

  filterDate(dateFrom: string, dateTo: string) {
    return this.http.get<Person[]>(
      `${this.apiLink}/date/${dateFrom}/${dateTo}`
    );
  }
}
