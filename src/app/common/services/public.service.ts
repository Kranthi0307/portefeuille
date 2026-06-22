import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, of, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { Education } from "../domains/education";
import { Experience } from "../domains/experience";
import { Info } from "../domains/info";
import { Project } from "../domains/project";
import { Skill } from "../domains/skill";

@Injectable({ providedIn: 'root' })
export class PublicService {

  private readonly http_client = inject(HttpClient);

  private readonly public_api: string = `${environment.apiUrl}/public-api/v1`;

  public readonly is_loading = signal<boolean>(true);

  public readonly info = toSignal(
    this.http_client.get<Info>(`${this.public_api}/info`).pipe(
      tap(() => this.is_loading.set(false)),
      map(response => response.data),
      catchError((error: any) => {
        this.is_loading.set(false)
        return of({
          projects: [] as Project[],
          skills: [] as Skill[],
          experiences: [] as Experience[],
          educations: [] as Education[]
        })
      })
    ),
    {
      initialValue: {
        projects: [] as Project[],
        skills: [] as Skill[],
        experiences: [] as Experience[],
        educations: [] as Education[]
      }
    }
  )
}
