import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private skillapi: string = `${environment.apiUrl}/skill/`

  constructor(private http: HttpClient) { }

  getSkills(): Observable<any> {
    return this.http.get(this.skillapi + `getSkills`);
  }
}
