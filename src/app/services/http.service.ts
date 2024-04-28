import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) { }

  public get<T>(url: string, params: { [param: string]: any} ): Observable<T> {
    const headers = new HttpHeaders();

    return this.http.get<T>(url, { headers, params });
  }

  public post<T>(url: string, body: any, params?: { [param: string]: any}): Observable<T> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'aplication/json');

    return this.http.post<T>(url, body, { headers, params });
  }
}
