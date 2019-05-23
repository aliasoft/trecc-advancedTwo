import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';
import { ParamNotifTreccService } from './param-notif-trecc.service';
import { ParamNotifTreccComponent } from './param-notif-trecc.component';
import { ParamNotifTreccDetailComponent } from './param-notif-trecc-detail.component';
import { ParamNotifTreccUpdateComponent } from './param-notif-trecc-update.component';
import { ParamNotifTreccDeletePopupComponent } from './param-notif-trecc-delete-dialog.component';
import { IParamNotifTrecc } from 'app/shared/model/param-notif-trecc.model';

@Injectable({ providedIn: 'root' })
export class ParamNotifTreccResolve implements Resolve<IParamNotifTrecc> {
  constructor(private service: ParamNotifTreccService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParamNotifTrecc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ParamNotifTrecc>) => response.ok),
        map((paramNotif: HttpResponse<ParamNotifTrecc>) => paramNotif.body)
      );
    }
    return of(new ParamNotifTrecc());
  }
}

export const paramNotifRoute: Routes = [
  {
    path: '',
    component: ParamNotifTreccComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamNotifs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParamNotifTreccDetailComponent,
    resolve: {
      paramNotif: ParamNotifTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamNotifs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParamNotifTreccUpdateComponent,
    resolve: {
      paramNotif: ParamNotifTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamNotifs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParamNotifTreccUpdateComponent,
    resolve: {
      paramNotif: ParamNotifTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamNotifs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paramNotifPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ParamNotifTreccDeletePopupComponent,
    resolve: {
      paramNotif: ParamNotifTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ParamNotifs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
