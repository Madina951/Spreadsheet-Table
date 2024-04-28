import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { TableRow } from "../models/tableRow.model";
import { Search } from "../models/search.model";
import { Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class TableController {
    constructor(
        private http: HttpService
    ) {}

    loadTable$(request: Search[]): Observable<TableRow[]> {
        
        const params = {search: JSON.stringify(request)};

        return this.http.get<TableRow[]>('/api/table', params);
    }
}