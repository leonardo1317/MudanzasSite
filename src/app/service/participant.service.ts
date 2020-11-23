import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  public url: string = environment.apiUrl + '/api/participant';

  constructor(public httpClient: HttpClient) { }

  findAll(): Observable<any>{
    return this.httpClient.get(this.url);
  }

  save(participantId: string, file:File): Observable<any>{

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('participantId', participantId);
   
    return this.httpClient.post(this.url, formData);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + `/${id}`);
  }
}
