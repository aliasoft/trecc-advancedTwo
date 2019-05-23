import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITraceTrecc } from 'app/shared/model/trace-trecc.model';

type EntityResponseType = HttpResponse<ITraceTrecc>;
type EntityArrayResponseType = HttpResponse<ITraceTrecc[]>;

@Injectable({ providedIn: 'root' })
export class TraceTreccService {
  public resourceUrl = SERVER_API_URL + 'api/traces';

  constructor(protected http: HttpClient) {}

  create(trace: ITraceTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trace);
    return this.http
      .post<ITraceTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(trace: ITraceTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trace);
    return this.http
      .put<ITraceTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITraceTrecc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITraceTrecc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(trace: ITraceTrecc): ITraceTrecc {
    const copy: ITraceTrecc = Object.assign({}, trace, {
      timestampProcess: trace.timestampProcess != null && trace.timestampProcess.isValid() ? trace.timestampProcess.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timestampProcess = res.body.timestampProcess != null ? moment(res.body.timestampProcess) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((trace: ITraceTrecc) => {
        trace.timestampProcess = trace.timestampProcess != null ? moment(trace.timestampProcess) : null;
      });
    }
    return res;
  }
}
