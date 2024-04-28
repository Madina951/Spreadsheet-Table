import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { TableRow } from "../models/tableRow.model";
import { Observable } from "rxjs";
import { TableFilter } from "../models/filter.model";


@Injectable({providedIn: 'root'})
export class TableController {
    constructor(
        private http: HttpService
    ) {}

    loadTable$(request: TableFilter): Observable<TableRow[]> {
        
        const params = {filter: JSON.stringify(request)};

        return this.http.get<TableRow[]>('/api/table', params);
    }
}