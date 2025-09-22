import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projectapi: string = `${environment.apiUrl}/project/`

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(this.projectapi + `getProjects`);
  }
}
