import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Participant } from '../domain/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  public url: string = environment.apiUrl + '/api/participant';

  constructor(public httpClient: HttpClient) { }

  findAll(): Observable<any>{
    return this.httpClient.get(this.url);
  }

  save(participant: Participant): Observable<any>{
    return this.httpClient.post(this.url, participant);
  }

  delete(id: string): Observable<any>{
    return this.httpClient.delete(this.url + `/${id}`);
  }
}
