import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Student } from 'src/app/models/Students';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  urlStudents:string;

  constructor(private http: HttpClient) { }

  public getById(urlSchema: string, id:string): Observable<any> {
    const url = `${this.urlStudents}${urlSchema}/${id}`;
    return this.http.get<any>(url);
  }

  public post(urlSchema: string, body:any): Observable<any> {
    const url = `${this.urlStudents}${urlSchema}`;
    return this.http.post<any>(url, body);
  }

  public put(urlSchema: string, id:string, body:any): Observable<any> {
    const url = `${this.urlStudents}${urlSchema}/${id}`;
    return this.http.post<any>(url, body);
  }

  public getQueryResult(urlSchema: string, searchTerm:string): Observable<any> {
    const url = `${this.urlStudents}${urlSchema}/${searchTerm}`;
    return this.http.get<any>(url);
  }
}