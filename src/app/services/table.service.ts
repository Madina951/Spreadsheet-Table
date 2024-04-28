import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, debounceTime, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { TableRow } from '../models/tableRow.model';
import { HttpService } from './http.service';
import { TableController } from './table-controller';
import { TableFilter, TableFilterValue } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  
  private rows$$ = new BehaviorSubject<TableRow[]>([]);
  private filters$$ = new BehaviorSubject<TableFilter>({});

  constructor(
    private http: HttpService,
    private controller: TableController
  ) { }

  init$(): Observable<any> {
    return this.loadTable$();
  }

  private loadTable$(): Observable<any> {
    return this.filters$$.pipe(
      switchMap((filter) => this.controller.loadTable$(filter)),
      tap((table) => (this.rows$$.next(table)))
    );
  }

  get rows$() {
    return this.rows$$.asObservable().pipe(shareReplay());
  }

  getFilterValue$(header: string): Observable<TableFilterValue> {
    return this.filters$$.asObservable().pipe(
      map((filter) => filter[header])
    );
  }

  setFilterValue(header: string, value: TableFilterValue) {
    this.filters$$.next({...this.filters$$.getValue(),[header]: value})
  }

  clearFilter(header: string) {
    const clearFilter = delete this.filters$$.getValue()[header];
    this.filters$$.next({...this.filters$$.getValue()});
  }
}
