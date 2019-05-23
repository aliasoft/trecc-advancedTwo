import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TraceTrecc } from 'app/shared/model/trace-trecc.model';
import { TraceTreccService } from './trace-trecc.service';
import { TraceTreccComponent } from './trace-trecc.component';
import { TraceTreccDetailComponent } from './trace-trecc-detail.component';
import { TraceTreccUpdateComponent } from './trace-trecc-update.component';
import { TraceTreccDeletePopupComponent } from './trace-trecc-delete-dialog.component';
import { ITraceTrecc } from 'app/shared/model/trace-trecc.model';

@Injectable({ providedIn: 'root' })
export class TraceTreccResolve implements Resolve<ITraceTrecc> {
  constructor(private service: TraceTreccService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITraceTrecc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TraceTrecc>) => response.ok),
        map((trace: HttpResponse<TraceTrecc>) => trace.body)
      );
    }
    return of(new TraceTrecc());
  }
}

export const traceRoute: Routes = [
  {
    path: '',
    component: TraceTreccComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Traces'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TraceTreccDetailComponent,
    resolve: {
      trace: TraceTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Traces'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TraceTreccUpdateComponent,
    resolve: {
      trace: TraceTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Traces'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TraceTreccUpdateComponent,
    resolve: {
      trace: TraceTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Traces'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tracePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TraceTreccDeletePopupComponent,
    resolve: {
      trace: TraceTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Traces'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
