import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { DecryptionService } from "./decryption.service";

@Injectable({ providedIn: 'root' })
export class PublicService {

  private readonly httpClient = inject(HttpClient);

  private decryptionService = inject(DecryptionService);

  private readonly publicApi: string = `${environment.apiUrl}/public-api/v1`;

  //Create a writable signal for manual updates
  private _projects = signal<any[]>([]);
  private _skills = signal<any[]>([]);
  private _education = signal<any[]>([]);
  private _work = signal<any[]>([]);

  //Expose as Readonly signals for components
  projects = this._projects.asReadonly();
  skills = this._skills.asReadonly();
  education = this._education.asReadonly();
  work = this._work.asReadonly();

  public getProjects() {
    this.httpClient.get<any>(this.publicApi + '/getProjects')
      .subscribe({
        next: (response: any) => {
          const projects = response.data.map((item: any) => this.decryptionService.decrypt(item))
          this._projects.set(projects)
        },
        error: () => this._projects.set([])
      })
  }

  public getSkills() {
    this.httpClient.get<any>(this.publicApi + '/getSkills')
      .subscribe({
        next: (response: any) => {
          const skills = response.data.map((item: any) => this.decryptionService.decrypt(item))
          this._skills.set(skills)
        },
        error: () => this._skills.set([])
      })
  }

  public getWork() {
    this.httpClient.get<any>(this.publicApi + '/getWork')
      .subscribe({
        next: (response: any) => {
          const work = response.data.map((item: any) => this.decryptionService.decrypt(item))
          this._work.set(work)
        },
        error: () => this._work.set([])
      })
  }

  public getEducation() {
    this.httpClient.get<any>(this.publicApi + '/getEducation')
      .subscribe({
        next: (response: any) => {
          const education = response.data.map((item: any) => this.decryptionService.decrypt(item))
          this._education.set(education)
        },
        error: () => this._education.set([])
      })
  }
}
