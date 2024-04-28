import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, debounceTime, of, shareReplay, switchMap, tap } from 'rxjs';
import { TableRow } from '../models/tableRow.model';
import { Headers } from '../models/headers.model';
import { Search } from '../models/search.model';
import { HttpService } from './http.service';
import { TableController } from './table-controller';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  
  private rows$$ = new BehaviorSubject<TableRow[]>([]);
  private search$$ = new BehaviorSubject<Search[]>([]);

  constructor(
    private http: HttpService,
    private controller: TableController
  ) { }

  init$(): Observable<any> {
    return this.loadTable$();
  }

  private loadTable$(): Observable<any> {
    return this.search$$.pipe(
      switchMap((search) => this.controller.loadTable$(search)),
      tap((table) => (this.rows$$.next(table)))
    );
  }

  get rows$() {
    return this.rows$$.asObservable().pipe(shareReplay());
  }

  get search$() {
    return this.search$$.asObservable().pipe(debounceTime(500));
  }
}
