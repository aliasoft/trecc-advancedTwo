import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CampagneTrecc } from 'app/shared/model/campagne-trecc.model';
import { CampagneTreccService } from './campagne-trecc.service';
import { CampagneTreccComponent } from './campagne-trecc.component';
import { CampagneTreccDetailComponent } from './campagne-trecc-detail.component';
import { CampagneTreccUpdateComponent } from './campagne-trecc-update.component';
import { CampagneTreccDeletePopupComponent } from './campagne-trecc-delete-dialog.component';
import { ICampagneTrecc } from 'app/shared/model/campagne-trecc.model';

@Injectable({ providedIn: 'root' })
export class CampagneTreccResolve implements Resolve<ICampagneTrecc> {
  constructor(private service: CampagneTreccService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICampagneTrecc> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CampagneTrecc>) => response.ok),
        map((campagne: HttpResponse<CampagneTrecc>) => campagne.body)
      );
    }
    return of(new CampagneTrecc());
  }
}

export const campagneRoute: Routes = [
  {
    path: '',
    component: CampagneTreccComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Campagnes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CampagneTreccDetailComponent,
    resolve: {
      campagne: CampagneTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Campagnes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CampagneTreccUpdateComponent,
    resolve: {
      campagne: CampagneTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Campagnes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CampagneTreccUpdateComponent,
    resolve: {
      campagne: CampagneTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Campagnes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const campagnePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CampagneTreccDeletePopupComponent,
    resolve: {
      campagne: CampagneTreccResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Campagnes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
