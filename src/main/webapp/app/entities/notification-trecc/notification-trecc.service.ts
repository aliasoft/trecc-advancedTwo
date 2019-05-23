import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INotificationTrecc } from 'app/shared/model/notification-trecc.model';

type EntityResponseType = HttpResponse<INotificationTrecc>;
type EntityArrayResponseType = HttpResponse<INotificationTrecc[]>;

@Injectable({ providedIn: 'root' })
export class NotificationTreccService {
  public resourceUrl = SERVER_API_URL + 'api/notifications';

  constructor(protected http: HttpClient) {}

  create(notification: INotificationTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .post<INotificationTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(notification: INotificationTrecc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .put<INotificationTrecc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INotificationTrecc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INotificationTrecc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(notification: INotificationTrecc): INotificationTrecc {
    const copy: INotificationTrecc = Object.assign({}, notification, {
      timestampProcess:
        notification.timestampProcess != null && notification.timestampProcess.isValid() ? notification.timestampProcess.toJSON() : null
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
      res.body.forEach((notification: INotificationTrecc) => {
        notification.timestampProcess = notification.timestampProcess != null ? moment(notification.timestampProcess) : null;
      });
    }
    return res;
  }
}
