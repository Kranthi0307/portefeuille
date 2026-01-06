import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private readonly skillapi: string = `${environment.apiUrl}/skill/`

  constructor(private http: HttpClient) { }

  getSkills(): Observable<any> {
    return this.http.get<string[]>(this.skillapi + `getSkills`);
  }
}
