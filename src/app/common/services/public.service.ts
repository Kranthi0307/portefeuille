import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { environment } from "../../../environments/environment";
import { DecryptionService } from "./decryption.service";

@Injectable({ providedIn: 'root' })
export class PublicService {

  private readonly http_client = inject(HttpClient);
  private readonly decryption_service = inject(DecryptionService);

  private readonly public_api: string = `${environment.apiUrl}/public-api/v1`;

  public readonly projects = toSignal(
    this.http_client.get<any>(`${this.public_api}/getProjects`).pipe(
      map((response: any) => {
        return response.data.map((item: any) => this.decryption_service.decrypt(item))
      })
    ),
    { initialValue: [] }
  )

  public readonly skills = toSignal(
    this.http_client.get<any>(`${this.public_api}/getSkills`).pipe(
      map((response: any) => {
        return response.data.map((item: any) => this.decryption_service.decrypt(item))
      })
    ),
    { initialValue: [] }
  )

  public readonly work = toSignal(
    this.http_client.get<any>(`${this.public_api}/getWork`).pipe(
      map((response: any) => {
        return response.data.map((item: any) => this.decryption_service.decrypt(item))
      })
    ),
    { initialValue: [] }
  )

  public readonly education = toSignal(
    this.http_client.get<any>(`${this.public_api}/getEducation`).pipe(
      map((response: any) => {
        return response.data.map((item: any) => this.decryption_service.decrypt(item))
      })
    ),
    { initialValue: [] }
  )
}
