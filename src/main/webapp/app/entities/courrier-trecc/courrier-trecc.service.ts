import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICourrierTrecc } from 'app/shared/model/courrier-trecc.model';

type EntityResponseType = HttpResponse<ICourrierTrecc>;
type EntityArrayResponseType = HttpResponse<ICourrierTrecc[]>;

@Injectable({ providedIn: 'root' })
export class CourrierTreccService {
  public resourceUrl = SERVER_API_URL + 'api/courriers';

  constructor(protected http: HttpClient) {}

  create(courrier: ICourrierTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(courrier);
    return this.http
      .post<ICourrierTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(courrier: ICourrierTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(courrier);
    return this.http
      .put<ICourrierTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICourrierTrecc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICourrierTrecc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(courrier: ICourrierTrecc): ICourrierTrecc {
    const copy: ICourrierTrecc = Object.assign({}, courrier, {
      demandeEnvoi: courrier.demandeEnvoi != null && courrier.demandeEnvoi.isValid() ? courrier.demandeEnvoi.toJSON() : null,
      dateEnvoi: courrier.dateEnvoi != null && courrier.dateEnvoi.isValid() ? courrier.dateEnvoi.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.demandeEnvoi = res.body.demandeEnvoi != null ? moment(res.body.demandeEnvoi) : null;
      res.body.dateEnvoi = res.body.dateEnvoi != null ? moment(res.body.dateEnvoi) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((courrier: ICourrierTrecc) => {
        courrier.demandeEnvoi = courrier.demandeEnvoi != null ? moment(courrier.demandeEnvoi) : null;
        courrier.dateEnvoi = courrier.dateEnvoi != null ? moment(courrier.dateEnvoi) : null;
      });
    }
    return res;
  }
}
