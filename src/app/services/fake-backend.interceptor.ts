import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, switchMap, tap } from "rxjs";
import { FakeBackend } from "./fake-backend";


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private fakeBackend = new FakeBackend();

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(req.url.includes('api/table')) {
            return this.fakeBackend.loadTable$(
                    JSON.parse(req.params.get('search')!)
                );
        }
        return next.handle(req);
    }
}