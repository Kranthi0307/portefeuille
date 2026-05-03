import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private readonly skillapi: string = `${environment.apiUrl}/skills-api/`
}
