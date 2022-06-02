import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppConfigService } from './app-config.service';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  urlStudents: string = this.config.settings.apis.urlApi;

  constructor(private http: HttpClient, private config: AppConfigService) { }

  

  public getById(urlSchema: string, id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('client-id', encodeURI(this.config.settings.clientid))

    const url = `${this.urlStudents}${urlSchema}/${id}`;
    return this.http.get<any>(url, {
      ...(headers !== null && { headers })
    });
  }

  public post(urlSchema: string, body: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('client-id', encodeURI(this.config.settings.clientid))

    const url = `${this.urlStudents}${urlSchema}`;
    return this.http.post<any>(url, body, {
      ...(headers !== null && { headers })
    });
  }

  public put(urlSchema: string, id: string, body: any): Observable<any> {
    let headers = new HttpHeaders();
    
    headers = headers.set('client-id', encodeURI(this.config.settings.clientid))
    
    const url = `${this.urlStudents}${urlSchema}/${id}`;
    return this.http.put<any>(url, body, {
      ...(headers !== null && { headers })
    });
  }

  public delete(urlSchema: string, id: string): Observable<any> {
    let headers = new HttpHeaders();
    
    headers = headers.set('client-id', encodeURI(this.config.settings.clientid))
    
    const url = `${this.urlStudents}${urlSchema}/${id}`;
    return this.http.delete<any>(url, {
      ...(headers !== null && { headers })
    });
  }

  public getAll(urlSchema: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('client-id', encodeURI(this.config.settings.clientid))
    
    const url = `${this.urlStudents}${urlSchema}`;
    return this.http.get<any>(url,
      {
        ...(headers !== null && { headers })
      });
  }
}
