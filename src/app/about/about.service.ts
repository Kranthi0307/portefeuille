import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private readonly aboutapi: string = `${environment.apiUrl}/about/`

  constructor(private http: HttpClient) { }

  getWork(): Observable<any> {
    return this.http.get<string[]>(this.aboutapi + `getWork`);
  }

  getEducation(): Observable<any> {
    return this.http.get<string[]>(this.aboutapi + `getEducation`);
  }
}
