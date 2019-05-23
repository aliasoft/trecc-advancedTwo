import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICampagneTrecc } from 'app/shared/model/campagne-trecc.model';

type EntityResponseType = HttpResponse<ICampagneTrecc>;
type EntityArrayResponseType = HttpResponse<ICampagneTrecc[]>;

@Injectable({ providedIn: 'root' })
export class CampagneTreccService {
  public resourceUrl = SERVER_API_URL + 'api/campagnes';

  constructor(protected http: HttpClient) {}

  create(campagne: ICampagneTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(campagne);
    return this.http
      .post<ICampagneTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(campagne: ICampagneTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(campagne);
    return this.http
      .put<ICampagneTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICampagneTrecc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICampagneTrecc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(campagne: ICampagneTrecc): ICampagneTrecc {
    const copy: ICampagneTrecc = Object.assign({}, campagne, {
      dateDebut: campagne.dateDebut != null && campagne.dateDebut.isValid() ? campagne.dateDebut.toJSON() : null,
      dateFin: campagne.dateFin != null && campagne.dateFin.isValid() ? campagne.dateFin.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
      res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((campagne: ICampagneTrecc) => {
        campagne.dateDebut = campagne.dateDebut != null ? moment(campagne.dateDebut) : null;
        campagne.dateFin = campagne.dateFin != null ? moment(campagne.dateFin) : null;
      });
    }
    return res;
  }
}
