import data from '../../assets/data';
import { Observable, map, of } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { TableRow } from '../models/tableRow.model';
import { TableFilter } from '../models/filter.model';

export class FakeBackend {
    rows: any[] = data as TableRow[];

    loadTable$(request: TableFilter): Observable<HttpResponse<TableRow[]>> {

        let response = [...this.rows];

        for(let header in request) {
            const filterValue = request[header];

            if (filterValue.type === 'text') {
                response = response.filter(row => row?.[header]?.toString().includes?.(filterValue.value as string));
                continue;
            }

            response = response.filter(row => row[header] === filterValue.value);
        }
        
        return of(response).pipe(
            map(table => this.wrapInHttpResponse(table))
        );
    }

    wrapInHttpResponse(table: TableRow[]): HttpResponse<TableRow[]> {
        return new HttpResponse<TableRow[]>({body: table});
    }
}