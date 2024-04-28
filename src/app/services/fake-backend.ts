import data from '../../assets/data';
import { Observable, map, of } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { TableRow } from '../models/tableRow.model';
import { Search } from '../models/search.model';

export class FakeBackend {
    rows: TableRow[] = data as TableRow[];

    loadTable$(request: Search[]): Observable<HttpResponse<TableRow[]>> {
        const resp = this.rows;
        return of(resp).pipe(
            map(table => this.wrapInHttpResponse(table))
        );
    }

    wrapInHttpResponse(table: TableRow[]): HttpResponse<TableRow[]> {
        return new HttpResponse<TableRow[]>({body: table});
    }
}