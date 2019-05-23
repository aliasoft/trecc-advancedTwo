import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';

type EntityResponseType = HttpResponse<IParamNotifTrecc>;
type EntityArrayResponseType = HttpResponse<IParamNotifTrecc[]>;

@Injectable({ providedIn: 'root' })
export class ParamNotifTreccService {
  public resourceUrl = SERVER_API_URL + 'api/param-notifs';

  constructor(protected http: HttpClient) {}

  create(paramNotif: IParamNotifTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paramNotif);
    return this.http
      .post<IParamNotifTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(paramNotif: IParamNotifTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paramNotif);
    return this.http
      .put<IParamNotifTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IParamNotifTrecc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParamNotifTrecc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(paramNotif: IParamNotifTrecc): IParamNotifTrecc {
    const copy: IParamNotifTrecc = Object.assign({}, paramNotif, {
      debutHoraire: paramNotif.debutHoraire != null && paramNotif.debutHoraire.isValid() ? paramNotif.debutHoraire.toJSON() : null,
      finHoraire: paramNotif.finHoraire != null && paramNotif.finHoraire.isValid() ? paramNotif.finHoraire.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.debutHoraire = res.body.debutHoraire != null ? moment(res.body.debutHoraire) : null;
      res.body.finHoraire = res.body.finHoraire != null ? moment(res.body.finHoraire) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((paramNotif: IParamNotifTrecc) => {
        paramNotif.debutHoraire = paramNotif.debutHoraire != null ? moment(paramNotif.debutHoraire) : null;
        paramNotif.finHoraire = paramNotif.finHoraire != null ? moment(paramNotif.finHoraire) : null;
      });
    }
    return res;
  }
}
