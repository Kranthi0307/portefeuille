import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly projectapi: string = `${environment.apiUrl}/project/`

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get<string[]>(this.projectapi + `getProjects`);
  }
}
