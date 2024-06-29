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

  detailsByIdGet(id: Person) {
    return this.http.get<Person[]>(`${this.apiLink}/${id}`);
  }
  createPost(id: Person) {
    return this.http.post<any>(this.apiLink, id);
  }

  deleteDel(id: number) {
    return this.http.delete<any>(`${this.apiLink}/${id}`);
  }

  editPut(id: number) {
    return this.http.put<any>(this.apiLink, id);
  }
}
