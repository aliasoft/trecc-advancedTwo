import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NotificationTrecc } from 'app/shared/model/notification-trecc.model';
import { NotificationTreccService } from './notification-trecc.service';
import { NotificationTreccComponent } from './notification-trecc.component';
import { NotificationTreccDetailComponent } from './notification-trecc-detail.component';
import { NotificationTreccUpdateComponent } from './notification-trecc-update.component';
import { NotificationTreccDeletePopupComponent } from './notification-trecc-delete-dialog.component';
import { INotificationTrecc } from 'app/shared/model/notification-trecc.model';

@Injectable({ providedIn: 'root' })
export class NotificationTreccResolve implements Resolve<INotificationTrecc> {
  constructor(private service: NotificationTreccService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INotificationTrecc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NotificationTrecc>) => response.ok),
        map((notification: HttpResponse<NotificationTrecc>) => notification.body)
      );
    }
    return of(new NotificationTrecc());
  }
}

export const notificationRoute: Routes = [
  {
    path: '',
    component: NotificationTreccComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Notifications'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NotificationTreccDetailComponent,
    resolve: {
      notification: NotificationTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Notifications'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NotificationTreccUpdateComponent,
    resolve: {
      notification: NotificationTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Notifications'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NotificationTreccUpdateComponent,
    resolve: {
      notification: NotificationTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Notifications'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const notificationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NotificationTreccDeletePopupComponent,
    resolve: {
      notification: NotificationTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Notifications'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
