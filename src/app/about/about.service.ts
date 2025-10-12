import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private aboutapi: string = `${environment.apiUrl}/about/`

  constructor(private http: HttpClient) { }

  getWork(): Observable<any> {
    return this.http.get<string[]>(this.aboutapi + `getWork`);
  }

  getEducation(): Observable<any> {
    return this.http.get<string[]>(this.aboutapi + `getEducation`);
  }
}
