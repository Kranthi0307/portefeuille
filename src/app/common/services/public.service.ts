import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { environment } from "../../../environments/environment";
import { Education } from "../domains/education";
import { Experience } from "../domains/experience";
import { Info } from "../domains/info";
import { Project } from "../domains/project";
import { Skill } from "../domains/skill";
import { DecryptionService } from "./decryption.service";

@Injectable({ providedIn: 'root' })
export class PublicService {

  private readonly http_client = inject(HttpClient);
  private readonly decryption_service = inject(DecryptionService);

  private readonly public_api: string = `${environment.apiUrl}/public-api/v1`;

  public readonly info = toSignal(
    this.http_client.get<Info>(`${this.public_api}/info`).pipe(
      map(response => response.data)
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
