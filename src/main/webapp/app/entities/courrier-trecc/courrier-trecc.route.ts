import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CourrierTrecc } from 'app/shared/model/courrier-trecc.model';
import { CourrierTreccService } from './courrier-trecc.service';
import { CourrierTreccComponent } from './courrier-trecc.component';
import { CourrierTreccDetailComponent } from './courrier-trecc-detail.component';
import { CourrierTreccUpdateComponent } from './courrier-trecc-update.component';
import { CourrierTreccDeletePopupComponent } from './courrier-trecc-delete-dialog.component';
import { ICourrierTrecc } from 'app/shared/model/courrier-trecc.model';

@Injectable({ providedIn: 'root' })
export class CourrierTreccResolve implements Resolve<ICourrierTrecc> {
  constructor(private service: CourrierTreccService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICourrierTrecc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CourrierTrecc>) => response.ok),
        map((courrier: HttpResponse<CourrierTrecc>) => courrier.body)
      );
    }
    return of(new CourrierTrecc());
  }
}

export const courrierRoute: Routes = [
  {
    path: '',
    component: CourrierTreccComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Courriers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CourrierTreccDetailComponent,
    resolve: {
      courrier: CourrierTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Courriers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CourrierTreccUpdateComponent,
    resolve: {
      courrier: CourrierTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Courriers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CourrierTreccUpdateComponent,
    resolve: {
      courrier: CourrierTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Courriers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const courrierPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CourrierTreccDeletePopupComponent,
    resolve: {
      courrier: CourrierTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Courriers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
